from rest_framework import permissions


class IsReviewAuthorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow authors of a review to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.customer == request.user.customer
