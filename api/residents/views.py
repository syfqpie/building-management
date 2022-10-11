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

from residents.docs import DocuConfigResidentCustomRegister
from utils.helpers import (
    DjangoFilterDescriptionInspector, NoTitleAutoSchema,
    NoUnderscoreBeforeNumberCamelCaseJSONParser, ResultsPagination
)

from users.models import UserType
from utils.auth.permissions import IsAdminStaff, IsSuperAdmin

from .models import (
    Resident, ResidentVehicle
)
from .serializers import (
    ResidentSerializer, ResidentAdminSerializer,
    ResidentPublicSerializer, ResidentCustomRegisterSerializer,
    ResidentVehicleSerializer
)


@method_decorator(
    name='list', 
    decorator=swagger_auto_schema(
        operation_id='Get all residents',
        operation_description='Retrieve all residents information',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        tags=['Residents']
    ))
@method_decorator(
    name='retrieve', 
    decorator=swagger_auto_schema(
        operation_id='Get resident',
        operation_description='Retrieve a resident information',
        tags=['Residents']
    ))
@method_decorator(
    name='create', 
    decorator=swagger_auto_schema(
        operation_id='Create resident',
        operation_description='Create a new resident entry',
        tags=['Residents']
    ))
@method_decorator(
    name='partial_update', 
    decorator=swagger_auto_schema(
        operation_id='Patch resident',
        operation_description='Partial update a resident information',
        tags=['Residents']
    ))
@method_decorator(
    name='destroy', 
    decorator=swagger_auto_schema(
        operation_id='Delete resident',
        operation_description='Delete a resident',
        tags=['Residents']
    ))
class ResidentViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
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
        user = self.request.user

        if user.is_authenticated and user.user_type == UserType.PUBLIC:
            queryset = self.queryset.filter(resident_user=user)
        elif user.is_authenticated and user.user_type == UserType.ADMIN:
            queryset = self.queryset
        else:
            queryset = self.queryset.none()

        return queryset

    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)

    # Activate resident
    @action(methods=['GET'], detail=True)
    @swagger_auto_schema(operation_id='Activate resident',
        operation_description='Activate a resident', tags=['Residents'])
    def activate(self, request, *args, **kwargs):
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
    @swagger_auto_schema(operation_id='Deactivate resident',
        operation_description='Deactivate a resident', tags=['Residents'])
    def deactivate(self, request, *args, **kwargs):
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
    parser_classes = [NoUnderscoreBeforeNumberCamelCaseJSONParser]
    serializer_class = ResidentCustomRegisterSerializer

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsAdminStaff
        ]

        return [permission() for permission in permission_classes]  

    def create(self, request, *args, **kwargs):

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


class ResidentVehicleViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
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
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)

    # Activate vehicle
    @action(methods=['GET'], detail=True)
    @swagger_auto_schema(operation_id='Activate vehicle',
        operation_description='Activate a vehicle', tags=['Vehicles'])
    def activate(self, request, *args, **kwargs):
        vehicle = self.get_object()

        if vehicle.is_active is True:
            raise PermissionDenied(detail='Vehicle is already activated')
        
        # Update and save
        vehicle.is_active = True
        vehicle.save()

        serializer = self.get_serializer(vehicle, many=False)
        return Response(serializer.data)

    # Deactivate vehicle
    @action(methods=['GET'], detail=True)
    @swagger_auto_schema(operation_id='Deactivate vehicle',
        operation_description='Deactivate a vehicle', tags=['Vehicles'])
    def deactivate(self, request, *args, **kwargs):
        vehicle = self.get_object()

        if vehicle.is_active is False:
            raise PermissionDenied(detail='Vehicle is already deactivated')
        
        # Update and save
        vehicle.is_active = False
        vehicle.save()

        serializer = self.get_serializer(vehicle, many=False)
        return Response(serializer.data)
