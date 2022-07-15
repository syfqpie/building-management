from rest_framework.permissions import IsAdminUser, BasePermission, SAFE_METHODS
from .models import CustomUser, UserType


class IsSuperAdmin(IsAdminUser):
    """
    Allows access only to super admin users.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_superuser and 
            request.user.is_staff and
            request.user.user_type == UserType.ADMIN
        )


class IsAdminStaff(IsAdminUser):
    """
    Allows access only to admin staff users.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_staff and
            request.user.user_type == UserType.ADMIN
        )

class IsCustomUserOwnerOrAdmin(BasePermission):
    """
    Object-level permission to only allow owners of an object or admin to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Return permission
        return obj == request.user or (
            request.user.is_staff and
            request.user.user_type == UserType.ADMIN
        )