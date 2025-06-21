from os import read
from django.db.models import Avg
from rest_framework import serializers

from core.models import User
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


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "description"]


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "product", "customer", "description", "rating", "date"]
        read_only_fields = ["id", "customer", "date"]

    def create(self, validated_data):
        user = self.context["request"].user
        customer = Customer.objects.get(user=user)
        validated_data["customer"] = customer
        return super().create(validated_data)


class SimpleProductSerializer(serializers.ModelSerializer):
    review_count = serializers.IntegerField(read_only=True)
    average_rating = serializers.DecimalField(
        read_only=True, max_digits=3, decimal_places=2
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "unit_price",
            "inventory",
            "review_count",
            "average_rating",
        ]

    # def get_review_count(self, obj):
    #     return obj.reviews.count()

    # def get_average_rating(self, obj):
    #     avg = obj.reviews.aggregate(Avg("rating"))["rating__avg"]
    #     return round(avg, 1) if avg is not None else None


class ProductSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    review_count = serializers.IntegerField(read_only=True)
    average_rating = serializers.DecimalField(
        read_only=True, max_digits=3, decimal_places=2
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "unit_price",
            "category",
            "inventory",
            "created_at",
            "updated_at",
            "reviews",
            "review_count",
            "average_rating",
        ]


class CurrentCustomerSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source="customer.phone", read_only=True)
    birth_date = serializers.DateField(source="customer.birth_date", read_only=True)
    membership = serializers.CharField(source="customer.membership", read_only=True)
    gender = serializers.CharField(source="customer.gender", read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "phone",
            "birth_date",
            "gender",
            "membership",
        ]


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["id", "order_date", "shipped_date", "payment_status", "customer"]


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["id", "order", "product", "quantity", "unit_price"]


class AddCartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()

    class Meta:
        model = CartItem
        fields = ["id", "product_id", "quantity"]

    def validate_product(self, value):
        if not Product.objects.filter(pk=value).exists():
            raise serializers.ValidationError("No product with the given ID was found.")
        return value

    def save(self, **kwargs):
        user = self.context["request"].user
        customer = Customer.objects.get(user=user)
        cart, _ = Cart.objects.get_or_create(customer=customer)
        product_id = self.validated_data["product_id"]
        quantity = self.validated_data["quantity"]

        try:
            cart_item = CartItem.objects.get(cart=cart, product_id=product_id)
            cart_item.quantity += quantity
            cart_item.save()
            self.instance = cart_item
        except CartItem.DoesNotExist:
            self.instance = CartItem.objects.create(cart=cart, **self.validated_data)

        return self.instance


class CartItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer(read_only=True)
    subtotal = serializers.SerializerMethodField()

    def get_subtotal(self, cart_item):
        return cart_item.product.unit_price * cart_item.quantity

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity", "subtotal"]


class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()
    total_items = serializers.SerializerMethodField()

    def get_total_price(self, cart):
        return sum(
            [item.product.unit_price * item.quantity for item in cart.items.all()]
        )

    def get_total_items(self, cart):
        return sum([item.quantity for item in cart.items.all()])

    class Meta:
        model = Cart
        fields = [
            "id",
            "customer",
            "created_at",
            "items",
            "total_price",
            "total_items",
        ]


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["id", "street", "city", "customer"]


class WishlistItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer(read_only=True)

    class Meta:
        model = WishlistItem
        fields = ["id", "product"]


class WishlistSerializer(serializers.ModelSerializer):
    items = WishlistItemSerializer(many=True, read_only=True)

    class Meta:
        model = Wishlist
        fields = ["id", "items"]
