from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
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
    SimpleProductSerializer,
)


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
        serializer.is_valid()
        serializer.save()
        return Response(serializer.data)


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
