from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

import datetime

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.utils.decorators import method_decorator

from django_filters.rest_framework import DjangoFilterBackend

from core.helpers import (
    DjangoFilterDescriptionInspector,
    NoTitleAutoSchema,
    NoUnderscoreBeforeNumberCamelCaseJSONParser,
    ResultsPagination
)

from .models import (
    UserType,
    CustomUser
)
from .serializers import (
    CustomUserSerializer,
    CustomUserNotSuperAdminSerializer
)
from .permissions import (
    IsAdminStaff,
    IsSuperAdmin,
    IsCustomUserOwnerOrAdmin
) 

@method_decorator(
    name='list', 
    decorator=swagger_auto_schema(
        operation_id='Get all users',
        operation_description='Retrieve all users information',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        tags=['Users']
    )
)
@method_decorator(
    name='retrieve', 
    decorator=swagger_auto_schema(
        operation_id='Get user',
        operation_description='Retrieve a user information',
        tags=['Users']
    )
)
@method_decorator(
    name='create', 
    decorator=swagger_auto_schema(
        operation_id='Create user',
        operation_description='Create a new user entry',
        tags=['Users']
    )
)
@method_decorator(
    name='partial_update', 
    decorator=swagger_auto_schema(
        operation_id='Patch user',
        operation_description='Partial update a user information',
        tags=['Users']
    )
)
@method_decorator(
    name='destroy', 
    decorator=swagger_auto_schema(
        operation_id='Delete user',
        operation_description='Delete a user',
        tags=['Users']
    )
)
class CustomUserViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    serializer_class_by_action = {
        'update': CustomUserNotSuperAdminSerializer,
        'partial_update': CustomUserNotSuperAdminSerializer
    }
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = [
        'user_type',
        'is_active'
    ]

    def get_permissions(self):
        permission_classes = [IsAuthenticated]

        if self.action == 'activate':
            permission_classes.append(IsAdminStaff)
        elif self.action == 'deactivate':
            permission_classes.append(IsAdminStaff)
        elif self.action == 'destroy':
            permission_classes.append(IsSuperAdmin)
        elif self.action == 'partial_update':
            permission_classes.append(IsCustomUserOwnerOrAdmin)

        return [permission() for permission in permission_classes]    
    
    # Override get_queryset
    def get_queryset(self):
        queryset = self.queryset
        return queryset
    
    # Override get_serializer_class for default action
    def get_serializer_class(self):
        # Get request user
        user = self.request.user

        # Check serializer class by action and if user is not superuser
        if hasattr(self, 'serializer_class_by_action') and not user.is_superuser:
            return self.serializer_class_by_action.get(self.action, self.serializer_class)

        # Return original class
        return super(CustomUserViewSet, self).get_serializer_class()
    
    # Activate account
    @action(methods=['GET'], detail=True)
    @swagger_auto_schema(
        operation_description='Activate a user account',
        operation_id='Activate user account',
        tags=['Users'])
    def activate(self, request, *args, **kwargs):
        user = self.get_object()

        if user.is_active is True:
            raise PermissionDenied(detail='User account is already activated')
        
        user.is_active = True
        user.save()

        serializer = CustomUserSerializer(user, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'User account activated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Deactivate account
    @action(methods=['GET'], detail=True)
    @swagger_auto_schema(
        operation_description='Deactivate a user account',
        operation_id='Deactivate user account',
        tags=['Users'])
    def deactivate(self, request, *args, **kwargs):
        user = self.get_object()

        if user.is_active is False:
            raise PermissionDenied(detail='User account is already deactivated')
        
        user.is_active = False
        user.save()

        serializer = CustomUserSerializer(user, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'User account deactivated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Get account information
    @action(methods=['GET'], detail=False, url_path='get-account-info')
    @swagger_auto_schema(
        operation_description='Get self account information',
        operation_id='Get account information',
        tags=['Users'])
    def get_account_information(self, request, *args, **kwargs):
        user = request.user

        serializer = CustomUserSerializer(user, many=False)
        return Response(serializer.data)

    