from django.contrib import admin
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


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "description"]
    search_fields = ["name"]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "slug", "unit_price", "inventory", "category"]
    search_fields = ["name", "slug"]
    list_filter = ["category"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ["user", "phone", "membership"]
    search_fields = ["user__username", "phone"]
    list_filter = ["membership"]


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "order_date", "shipped_date", "status", "customer"]
    search_fields = ["id", "customer__user__username"]
    list_filter = ["status", "order_date"]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ["order", "product", "quantity", "unit_price"]
    search_fields = ["order__id", "product__name"]


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ["id", "customer", "created_at"]
    search_fields = ["id", "customer__user__username"]


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ["cart", "product", "quantity"]
    search_fields = ["cart__id", "product__name"]


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ["street", "city", "customer"]
    search_fields = ["street", "city", "customer__user__username"]


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["product", "customer", "rating", "date"]
    search_fields = ["product__name", "customer__user__username"]
    list_filter = ["rating", "date"]
