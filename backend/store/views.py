from django.conf import settings
from django.db.models import Count, Avg
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.mixins import (
    RetrieveModelMixin,
    CreateModelMixin,
    DestroyModelMixin,
)
from rest_framework.pagination import PageNumberPagination
import stripe
from django.db.models.functions import Round

from .permissions import IsReviewAuthorOrReadOnly

from .models import (
    Category,
    Product,
    Customer,
    Order,
    OrderItem,
    Cart,
    CartItem,
    Address,
    Review,
    Wishlist,
    WishlistItem,
)
from .serializers import (
    AddCartItemSerializer,
    CategorySerializer,
    ProductSerializer,
    CurrentCustomerSerializer,
    OrderSerializer,
    OrderItemSerializer,
    CartSerializer,
    CartItemSerializer,
    AddressSerializer,
    ReviewSerializer,
    SimpleProductSerializer,
    WishlistItemSerializer,
    WishlistSerializer,
)

stripe.api_key = settings.STRIPE_SECRET_KEY


class CategoryViewset(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewset(ModelViewSet):
    serializer_class = SimpleProductSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 10
    lookup_field = "slug"

    def get_queryset(self):
        return (
            Product.objects.annotate(
                review_count=Count("reviews"),
                average_rating=Round(Avg("reviews__rating"), 1),
            )
            .prefetch_related("reviews")
            .order_by("name")
            .all()
        )

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProductSerializer
        return super().get_serializer_class()

    # def get_object(self):
    #     slug = self.kwargs.get("slug")
    #     return get_object_or_404(self.get_queryset(), slug=slug)


class CustomerViewset(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CurrentCustomerSerializer


class OrderViewset(ModelViewSet):
    serializer_class = OrderSerializer

    def get_queryset(self):
        user = self.request.user

        if user.is_staff:
            return Order.objects.all()

        customer_id = Customer.objects.only("id").get(user_id=user.id)
        return Order.objects.filter(customer_id=customer_id)


class OrderItemViewset(ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class CartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, format=None):
        customer = Customer.objects.get(user=request.user)
        cart, _ = Cart.objects.prefetch_related("items").get_or_create(
            customer=customer
        )
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def post(self, request: Request, format=None):
        serializer = AddCartItemSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, format=None):
        item_id = request.data.get("item_id")
        if not item_id:
            return Response(
                {"detail": "Item ID is required."}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            cart_item = CartItem.objects.get(pk=item_id)

            if cart_item.cart.customer.user != request.user:
                return Response(
                    {"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND
                )

            cart_item.delete()
            return Response(
                {"detail": "Item deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )

        except CartItem.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)


class CartViewset(
    CreateModelMixin, RetrieveModelMixin, DestroyModelMixin, GenericViewSet
):
    queryset = Cart.objects.prefetch_related("items__product").all()
    serializer_class = CartSerializer


class CartItemViewset(ModelViewSet):
    queryset = CartItem.objects.select_related("product").all()
    serializer_class = CartItemSerializer


class AddressViewset(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class ReviewViewset(ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsReviewAuthorOrReadOnly]

    def get_queryset(self):
        product_slug = self.kwargs.get("product_slug")
        return Review.objects.filter(product__slug=product_slug).select_related(
            "product"
        )
        
    def perform_create(self, serializer):
        product_slug = self.kwargs.get("product_slug")
        product = get_object_or_404(Product, slug=product_slug)
        serializer.save(product=product, author=self.request.user.customer)


class WishlistAPIView(APIView):
    """API for viewing and adding products to the wishlist."""

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        """Retrieve the user's wishlist items."""
        customer = get_object_or_404(Customer, user=request.user)
        wishlist = (
            Wishlist.objects.prefetch_related("items__product")
            .filter(customer=customer)
            .first()
        )

        if not wishlist:
            return Response(
                {"detail": "Your wishlist is empty."}, status=status.HTTP_200_OK
            )

        serializer = WishlistSerializer(wishlist)
        return Response(serializer.data)

    def post(self, request, format=None):
        """
        Add a product to the wishlist.
        Request body: {'product_id': 1}
        """
        customer = get_object_or_404(Customer, user=request.user)
        product = get_object_or_404(Product, pk=request.data.get("product_id"))

        wishlist, _ = Wishlist.objects.get_or_create(customer=customer)

        # Check if product already exists in the wishlist
        wishlist_item, created = WishlistItem.objects.get_or_create(
            wishlist=wishlist, product=product
        )

        if not created:
            return Response(
                {"detail": "Product is already in your wishlist."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = WishlistItemSerializer(wishlist_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, format=None):
        """
        Remove a product from the wishlist.
        Request body: {'product_id': 1}
        """
        customer = get_object_or_404(Customer, user=request.user)
        product_id = request.data.get("product_id")

        wishlist = Wishlist.objects.filter(customer=customer).first()
        if not wishlist:
            return Response(
                {"detail": "Wishlist does not exist."}, status=status.HTTP_404_NOT_FOUND
            )

        wishlist_item = WishlistItem.objects.filter(
            wishlist=wishlist, product_id=product_id
        ).first()

        if not wishlist_item:
            return Response(
                {"detail": "Product not found in wishlist."},
                status=status.HTTP_404_NOT_FOUND,
            )

        wishlist_item.delete()

        return Response(
            {"detail": "Product removed from wishlist."},
            status=status.HTTP_204_NO_CONTENT,
        )


@api_view(["POST"])
def create_checkout_session(request):
    YOUR_DOMAIN = request.build_absolute_uri("/")[:-1]
    cart = get_object_or_404(Cart, customer=request.user.customer)
    line_items = []

    for cart_item in cart.items.all():
        product = cart_item.product
        line_items.append(
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": product.name,
                        "images": [
                            "https://pngimg.com/uploads/headphones/headphones_PNG7645.png",
                        ],
                    },
                    "unit_amount": int(product.unit_price * 100),
                },
                "quantity": cart_item.quantity,
            }
        )

    try:
        checkout_session = stripe.checkout.Session.create(
            customer_email=request.user.email,
            line_items=line_items,
            payment_method_types=["card"],
            mode="payment",
            success_url=settings.FRONTEND_BASE_URL
            + "success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=settings.FRONTEND_BASE_URL + "cancel",
            metadata={
                "cart_id": cart.id,
            },
        )
    except stripe.error.StripeError as e:
        print("Stripe error:", e)
    except Exception as e:
        print("General error:", e)

    return Response(data=checkout_session.url)


def fulfill_checkout(session):
    """
    Fulfill the order after a successful Stripe checkout session.
    """
    try:
        cart_id = session.get("metadata", {}).get("cart_id")
        if not cart_id:
            print("Cart ID not found in session metadata.")
            return

        cart = Cart.objects.prefetch_related("items__product").get(id=cart_id)
        customer = cart.customer

        # Create an order
        order = Order.objects.create(
            customer=customer,
            status=Order.PAYMENT_STATUS_COMPLETE,
        )

        # Add items to the order
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                unit_price=cart_item.product.unit_price,
            )

            # Update product inventory
            cart_item.product.inventory -= cart_item.quantity
            cart_item.product.save()

        # Clear the cart
        cart.items.all().delete()

        print(
            f"Order {order.id} created successfully for customer {customer.user.username}."
        )

    except Cart.DoesNotExist:
        print("Cart not found.")
    except Exception as e:
        print(f"Error fulfilling checkout: {e}")


@csrf_exempt
@api_view(["POST"])
def stripe_webhook(request):
    """Handle Stripe webhook events."""
    payload = request.body
    sig_header = request.META.get("HTTP_STRIPE_SIGNATURE")
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        return Response(
            {"detail": "Invalid payload."}, status=status.HTTP_400_BAD_REQUEST
        )
    except stripe.error.SignatureVerificationError as e:
        return Response(
            {"detail": "Invalid signature."}, status=status.HTTP_400_BAD_REQUEST
        )

    # Handle the checkout.session.completed event
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        fulfill_checkout(session)

    return Response({"detail": "Webhook received."}, status=status.HTTP_200_OK)
