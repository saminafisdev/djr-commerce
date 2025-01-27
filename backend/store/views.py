from django.shortcuts import get_object_or_404
from rest_framework import viewsets
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


class CategoryViewset(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = SimpleProductSerializer
    pagination_class = PageNumberPagination
    pagination_class.page_size = 10

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProductSerializer
        return super().get_serializer_class()

    def get_object(self):
        slug = self.kwargs.get("slug")
        return get_object_or_404(self.queryset, slug=slug)


class CustomerViewset(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class OrderViewset(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderItemViewset(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer


class CartViewset(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class CartItemViewset(viewsets.ModelViewSet):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer


class AddressViewset(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class ReviewViewset(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
