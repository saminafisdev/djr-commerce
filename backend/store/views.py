from django.conf import settings
from django.shortcuts import get_object_or_404, redirect

from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, GenericViewSet, ReadOnlyModelViewSet
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.mixins import (
    RetrieveModelMixin,
    CreateModelMixin,
    DestroyModelMixin,
)
from rest_framework.pagination import PageNumberPagination
import stripe

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
    CustomerSerializer,
    OrderSerializer,
    OrderItemSerializer,
    CartSerializer,
    CartItemSerializer,
    AddressSerializer,
    ReviewSerializer,
    WishlistItemSerializer,
    WishlistSerializer,
)

stripe.api_key = settings.STRIPE_SECRET_KEY


class CategoryViewset(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewset(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 10

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProductSerializer
        return super().get_serializer_class()

    def get_object(self):
        slug = self.kwargs.get("slug")
        return get_object_or_404(self.queryset, slug=slug)


class CustomerViewset(ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class OrderViewset(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderItemViewset(ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class CartAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, format=None):
        customer = Customer.objects.get(user=request.user)
        cart = get_object_or_404(
            Cart.objects.prefetch_related("items"), customer=customer
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
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


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
            + "/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=settings.FRONTEND_BASE_URL + "/cancel",
            metadata={
                "cart_id": cart.id,
            },
        )
    except stripe.error.StripeError as e:
        print("Stripe error:", e)
    except Exception as e:
        print("General error:", e)

    return Response(data=checkout_session.url)
