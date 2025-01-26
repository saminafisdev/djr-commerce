from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewset,
    ProductViewset,
    CustomerViewset,
    OrderViewset,
    OrderItemViewset,
    CartViewset,
    CartItemViewset,
    AddressViewset,
    ReviewViewset,
)

router = DefaultRouter()

router.register("categories", CategoryViewset, basename="category")
router.register("products", ProductViewset, basename="product")
router.register("customers", CustomerViewset, basename="customer")
router.register("orders", OrderViewset, basename="order")
router.register("order-items", OrderItemViewset, basename="orderitem")
router.register("carts", CartViewset, basename="cart")
router.register("cart-items", CartItemViewset, basename="cartitem")
router.register("addresses", AddressViewset, basename="address")
router.register("reviews", ReviewViewset, basename="review")

urlpatterns = []
urlpatterns += router.urls
