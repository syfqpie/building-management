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

from .auth import IsSuperAdmin

from .models import (
    CustomUser
)

from .serializers import (
    CustomUserSerializer
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
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = [
        'user_type',
        'is_active'
    ]

    def get_permissions(self):
        permission_classes = [IsAuthenticated]

        if self.action == 'activate':
            permission_classes.append(IsSuperAdmin)
        elif self.action == 'deactivate':
            permission_classes.append(IsSuperAdmin)

        return [permission() for permission in permission_classes]    
    
    def get_queryset(self):
        queryset = self.queryset
        return queryset
    
    def perform_update(self, serializer):
        serializer.save(last_modified_at=datetime.datetime.utcnow())
    
    # Activate account
    @action(methods=['GET'], detail=True)
    @swagger_auto_schema(
        operation_description='Activate an account',
        operation_id='Activate account',
        tags=['Users'])
    def activate(self, request, *args, **kwargs):
        user = self.get_object()

        if user.is_active is True:
            raise PermissionDenied(detail='User is already activated')
        
        user.is_active = True
        user.save()

        serializer = CustomUserSerializer(user, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'User activated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Deactivate account
    @action(methods=['GET'], detail=True)
    @swagger_auto_schema(
        operation_description='Deactivate an account',
        operation_id='Deactivate account',
        tags=['Users'])
    def deactivate(self, request, *args, **kwargs):
        user = self.get_object()

        if user.is_active is False:
            raise PermissionDenied(detail='User is already deactivated')
        
        user.is_active = False
        user.save()

        serializer = CustomUserSerializer(user, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Block deactivated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    