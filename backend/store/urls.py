from django.urls import path
from rest_framework_nested import routers
from .views import (
    CartAPIView,
    CategoryViewset,
    ProductViewset,
    CustomerViewset,
    OrderViewset,
    OrderItemViewset,
    CartViewset,
    CartItemViewset,
    AddressViewset,
    ReviewViewset,
    WishlistAPIView,
)

router = routers.DefaultRouter()

router.register("categories", CategoryViewset, basename="category")
router.register("products", ProductViewset, basename="product")
router.register("customers", CustomerViewset, basename="customer")
router.register("orders", OrderViewset, basename="order")
router.register("order-items", OrderItemViewset, basename="orderitem")
router.register("carts", CartViewset, basename="cart")
router.register("cart-items", CartItemViewset, basename="cartitem")
router.register("addresses", AddressViewset, basename="address")
router.register("reviews", ReviewViewset, basename="review")

carts_router = routers.NestedDefaultRouter(router, "carts", lookup="cart")
carts_router.register("items", CartItemViewset, basename="cart-item")

urlpatterns = [
    path(
        "products/<slug:slug>/",
        ProductViewset.as_view(
            {"get": "retrieve", "put": "update", "delete": "destroy"}
        ),
        name="product-detail",
    ),
    path("cart/", CartAPIView.as_view(), name="cart"),
    path("wishlist/", WishlistAPIView.as_view(), name="wishlist"),
]
urlpatterns += router.urls + carts_router.urls
