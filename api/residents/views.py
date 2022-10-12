from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from dj_rest_auth.registration.views import RegisterView
from django_filters.rest_framework import DjangoFilterBackend

from users.models import UserType
from utils.auth.permissions import IsAdminStaff, IsSuperAdmin
from utils.helpers import NoUnderscoreBeforeNumberCamelCaseJSONParser

from .docs import (
    DocuConfigResident,
    DocuConfigResidentCustomRegister,
    DocuConfigResidentVehicle
)
from .models import (
    Resident, ResidentVehicle
)
from .serializers import (
    ResidentSerializer,
    ResidentAdminSerializer,
    ResidentPublicSerializer,
    ResidentCustomRegisterSerializer,
    ResidentVehicleSerializer
)


@method_decorator(name='list', decorator=DocuConfigResident.LIST)
@method_decorator(name='retrieve', decorator=DocuConfigResident.RETRIEVE)
@method_decorator(name='create', decorator=DocuConfigResident.CREATE)
@method_decorator(name='partial_update', decorator=DocuConfigResident.PARTIAL_UPDATE)
@method_decorator(name='destroy', decorator=DocuConfigResident.DESTROY)
class ResidentViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    """
    Viewset for Resident model
    """

    queryset = Resident.objects.all()
    serializer_class = ResidentSerializer
    serializer_class_admin = {
        'list': ResidentAdminSerializer
    }
    serializer_class_public = {
        'list': ResidentPublicSerializer
    }
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = [
        'gender', 'is_active'
    ]
    search_fields = [
        'resident_no', 'name', 'email'
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
        permission_classes = [
            IsAuthenticated,
            IsAdminStaff
        ]

        if self.action == 'activate':
            permission_classes.append(IsSuperAdmin)
        elif self.action == 'deactivate':
            permission_classes.append(IsSuperAdmin)

        return [permission() for permission in permission_classes]
    
    def get_serializer_class(self):
        user = self.request.user

        if not user.is_anonymous:
            if user.user_type == UserType.ADMIN and hasattr(self, 'serializer_class_admin'):
                return self.serializer_class_admin.get(self.action, self.serializer_class)
            elif user.user_type == UserType.PUBLIC and hasattr(self, 'serializer_class_public'):
                return self.serializer_class_public.get(self.action, self.serializer_class)
        
        return super().get_serializer_class()

    def get_queryset(self):
        """Override get_queryset to filter results according to user_type"""

        user = self.request.user

        if user.is_authenticated and user.user_type == UserType.PUBLIC:
            queryset = self.queryset.filter(resident_user=user)
        elif user.is_authenticated and user.user_type == UserType.ADMIN:
            queryset = self.queryset
        else:
            queryset = self.queryset.none()

        return queryset

    def perform_create(self, serializer):
        """Override perform_create to update created_by"""

        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        """Override perform_update to update last_modified_by"""

        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)
    
    def create(self, request, *args, **kwargs):
        """Override to disable method"""
        response = {'message': 'Not allowed'}
        return Response(response, status=status.HTTP_403_FORBIDDEN)

    @action(methods=['GET'], detail=True)
    @swagger_auto_schema(**DocuConfigResident.ACTIVATE.value)
    def activate(self, request, *args, **kwargs):
        """
        Activate resident
        
        Return 403 if already activated
        """

        # Instantiate resident
        resident = self.get_object()

        if resident.is_active is True:
            raise PermissionDenied(detail='Resident is already activated')
        
        # Update and save
        resident.is_active = True
        resident.save()

        serializer = self.get_serializer(resident, many=False)
        return Response(serializer.data)

    # Deactivate resident
    @action(methods=['GET'], detail=True)
    @swagger_auto_schema(**DocuConfigResident.DEACTIVATE.value)
    def deactivate(self, request, *args, **kwargs):
        """
        Deactivate resident
        
        Return 403 if already deactivated
        """
        
        # Instantiate resident
        resident = self.get_object()

        if resident.is_active is False:
            raise PermissionDenied(detail='Resident is already deactivated')
        
        # Update and save
        resident.is_active = False
        resident.save()

        serializer = self.get_serializer(resident, many=False)
        return Response(serializer.data)


@method_decorator(name='post', decorator=DocuConfigResidentCustomRegister.POST)
class ResidentCustomRegisterView(RegisterView):
    """Custom view for Resident registration"""

    parser_classes = [NoUnderscoreBeforeNumberCamelCaseJSONParser]
    serializer_class = ResidentCustomRegisterSerializer

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsAdminStaff
        ]

        return [permission() for permission in permission_classes]  

    def create(self, request, *args, **kwargs):
        """Append custom response message"""
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        resident_user = self.perform_create(serializer)
        response_msg = {
            'Success':  f'Resident user created, an email has been sent to {resident_user.email}'
        }
            
        return Response(
            response_msg,
            status=status.HTTP_201_CREATED
        )


@method_decorator(name='list', decorator=DocuConfigResidentVehicle.LIST)
@method_decorator(name='retrieve', decorator=DocuConfigResidentVehicle.RETRIEVE)
@method_decorator(name='create', decorator=DocuConfigResidentVehicle.CREATE)
@method_decorator(name='partial_update', decorator=DocuConfigResidentVehicle.PARTIAL_UPDATE)
class ResidentVehicleViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    """Viewset for ResidentVehicle model"""
    queryset = ResidentVehicle.objects.all()
    serializer_class = ResidentVehicleSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = [
        'resident', 'vehicle_type', 'is_active'
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
        permission_classes = [
            IsAuthenticated,
            IsAdminStaff
        ]

        if self.action == 'activate':
            permission_classes.append(IsSuperAdmin)
        elif self.action == 'deactivate':
            permission_classes.append(IsSuperAdmin)

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        """Override perform_create to update created_by"""
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        """Override perform_update to update last_modified_by"""
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)

    @action(methods=['GET'], detail=True)
    @swagger_auto_schema(**DocuConfigResidentVehicle.ACTIVATE.value)
    def activate(self, request, *args, **kwargs):
        """
        Activate resident
        
        Return 403 if already activated
        """
        
        # Instantiate vehicle
        vehicle = self.get_object()

        if vehicle.is_active is True:
            raise PermissionDenied(detail='Vehicle is already activated')
        
        # Update and save
        vehicle.is_active = True
        vehicle.save()

        serializer = self.get_serializer(vehicle, many=False)
        return Response(serializer.data)

    @action(methods=['GET'], detail=True)
    @swagger_auto_schema(**DocuConfigResidentVehicle.DEACTIVATE.value)
    def deactivate(self, request, *args, **kwargs):
        """
        Deactivate resident vehicle
        
        Return 403 if already deactivated
        """
        
        # Instantiate vehicle
        vehicle = self.get_object()

        if vehicle.is_active is False:
            raise PermissionDenied(detail='Vehicle is already deactivated')
        
        # Update and save
        vehicle.is_active = False
        vehicle.save()

        serializer = self.get_serializer(vehicle, many=False)
        return Response(serializer.data)
