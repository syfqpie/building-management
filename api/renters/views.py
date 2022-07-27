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
from dj_rest_auth.registration.views import RegisterView

from django_filters.rest_framework import DjangoFilterBackend
from users.models import UserType

from core.settings import DEBUG

from core.helpers import (
    DjangoFilterDescriptionInspector,
    NoTitleAutoSchema,
    NoUnderscoreBeforeNumberCamelCaseJSONParser,
    ResultsPagination
)

from users.permissions import IsSuperAdmin

from .models import (
    Renter
)

from .serializers import (
    RenterAdminSerializer,
    RenterSerializer,
    RenterPublicSerializer,
    RenterCustomRegisterSerializer
)


@method_decorator(
    name='list', 
    decorator=swagger_auto_schema(
        operation_id='Get all renters',
        operation_description='Retrieve all renters information',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        tags=['Renters']
    )
)
@method_decorator(
    name='retrieve', 
    decorator=swagger_auto_schema(
        operation_id='Get renter',
        operation_description='Retrieve a renter information',
        tags=['Renters']
    )
)
@method_decorator(
    name='create', 
    decorator=swagger_auto_schema(
        operation_id='Create renter',
        operation_description='Create a new renter entry',
        tags=['Renters']
    )
)
@method_decorator(
    name='partial_update', 
    decorator=swagger_auto_schema(
        operation_id='Patch renter',
        operation_description='Partial update a renter information',
        tags=['Renters']
    )
)
@method_decorator(
    name='destroy', 
    decorator=swagger_auto_schema(
        operation_id='Delete renter',
        operation_description='Delete a renter',
        tags=['Renters']
    )
)
class RenterViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Renter.objects.all()
    serializer_class = RenterSerializer
    serializer_class_admin = {
        'list': RenterAdminSerializer
    }
    serializer_class_public = {
        'list': RenterPublicSerializer
    }
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = [
        'gender',
        'is_active'
    ]
    search_fields = [
        'renter_no',
        'name',
        'email'
    ]
    http_method_names = [
        'get',
        'post',
        'patch',
        'head',
        'options',
        'trace',
    ]

    def get_permissions(self):
        permission_classes = [IsAuthenticated]

        if self.action == 'activate':
            permission_classes.append(IsSuperAdmin)
        elif self.action == 'deactivate':
            permission_classes.append(IsSuperAdmin)

        return [permission() for permission in permission_classes]
    
    def get_serializer_class(self):
        user = self.request.user

        if user.user_type == UserType.ADMIN and hasattr(self, 'serializer_class_admin'):
            return self.serializer_class_admin.get(self.action, self.serializer_class)
        elif user.user_type == UserType.PUBLIC and hasattr(self, 'serializer_class_public'):
            return self.serializer_class_public.get(self.action, self.serializer_class)
        
        return super().get_serializer_class()

    def get_queryset(self):
        user = self.request.user

        if user.user_type == UserType.PUBLIC:
            queryset = self.queryset.filter(renter_user=user)
        else:
            queryset = self.queryset

        return queryset

    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)

    # Activate renter
    @action(methods=['GET'], detail=True)
    @swagger_auto_schema(
        operation_description='Activate an renter',
        operation_id='Activate renter',
        tags=['Renters'])
    def activate(self, request, *args, **kwargs):
        renter = self.get_object()

        if renter.is_active is True:
            raise PermissionDenied(detail='Renter is already activated')
        renter.is_active = True
        renter.save()

        serializer = self.get_serializer(renter, many=False)
        return Response(serializer.data)

    # Deactivate renter
    @action(methods=['GET'], detail=True)
    @swagger_auto_schema(
        operation_description='Deactivate a renter',
        operation_id='Deactivate renter',
        tags=['Renters'])
    def deactivate(self, request, *args, **kwargs):
        renter = self.get_object()

        if renter.is_active is False:
            raise PermissionDenied(detail='Renter is already deactivated')
        renter.is_active = False
        renter.save()

        serializer = self.get_serializer(renter, many=False)
        return Response(serializer.data)


@method_decorator(
    name='post', 
    decorator=swagger_auto_schema(
        operation_id='Register new account for renter',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        tags=['Renters']
    )
)
class RenterCustomRegisterView(RegisterView):
    parser_classes = [NoUnderscoreBeforeNumberCamelCaseJSONParser]
    serializer_class = RenterCustomRegisterSerializer

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsSuperAdmin
        ]

        return [permission() for permission in permission_classes]  

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        renter_user = self.perform_create(serializer)
        response_msg = {
            'Success':  f'Renter user created, an email has been sent to {renter_user.email}'
        }
            
        return Response(
            response_msg,
            status=status.HTTP_201_CREATED
        )