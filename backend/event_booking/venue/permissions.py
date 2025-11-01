from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdminOrReadOnly(BasePermission):
    """
    Allow read-only access for everyone authenticated,
    but restrict write access (POST, PUT, DELETE)
    only to admin/staff users.
    """
    def has_permission(self, request, view):
        # SAFE_METHODS = ('GET', 'HEAD', 'OPTIONS')
        if request.method in SAFE_METHODS:
            return True
        return request.user and request.user.is_staff