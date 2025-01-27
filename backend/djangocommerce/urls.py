from django.contrib import admin
from django.urls import path, re_path, include
from debug_toolbar.toolbar import debug_toolbar_urls

urlpatterns = [
    re_path(r"^auth/", include("djoser.urls")),
    re_path(r"^auth/", include("djoser.urls.jwt")),
    path("admin/", admin.site.urls),
    path("api/", include("store.urls")),
] + debug_toolbar_urls()
