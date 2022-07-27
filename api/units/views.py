import datetime

from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render
from django.utils import timezone

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from users.permissions import IsSuperAdmin

from .models import (
    Block,
    Floor,
    UnitNumber,
    Unit
)

from .serializers import (
    BlockSerializer,
    FloorSerializer,
    UnitNumberSerializer,
    UnitSerializer,
    UnitExtendedSerializer
)


class BlockViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Block.objects.all()
    serializer_class = BlockSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
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
            IsSuperAdmin
        ]

        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)
    
    # Activate block
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        block = self.get_object()

        if block.is_active is True:
            raise PermissionDenied(detail='Block is already activated')
        
        block.is_active = True
        block.save()

        serializer = self.get_serializer(block, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Block activated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Deactivate block
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        block = self.get_object()

        if block.is_active is False:
            raise PermissionDenied(detail='Block is already deactivated')
        
        block.is_active = False
        block.save()

        serializer = self.get_serializer(block, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Block deactivated' },
            status=status.HTTP_200_OK,
            headers=headers
        )


class FloorViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Floor.objects.all()
    serializer_class = FloorSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
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
            IsSuperAdmin
        ]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)

    # Activate floor
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        floor = self.get_object()

        if floor.is_active is True:
            raise PermissionDenied(detail='Floor is already activated')
        
        floor.is_active = True
        floor.save()

        serializer = self.get_serializer(floor, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Floor activated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Deactivate block
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        floor = self.get_object()

        if floor.is_active is False:
            raise PermissionDenied(detail='Floor is already deactivated')
        
        floor.is_active = False
        floor.save()

        serializer = self.get_serializer(floor, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Floor deactivated' },
            status=status.HTTP_200_OK,
            headers=headers
        )


class UnitNumberViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = UnitNumber.objects.all()
    serializer_class = UnitNumberSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
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
            IsSuperAdmin
        ]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)
    
    # Activate unit number
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        unit_number = self.get_object()

        if unit_number.is_active is True:
            raise PermissionDenied(detail='Unit number is already activated')
        
        unit_number.is_active = True
        unit_number.save()

        serializer = self.get_serializer(unit_number, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Unit number activated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Deactivate unit number
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        unit_number = self.get_object()

        if unit_number.is_active is False:
            raise PermissionDenied(detail='Unit number is already deactivated')
        
        unit_number.is_active = False
        unit_number.save()

        serializer = self.get_serializer(unit_number, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Unit number deactivated' },
            status=status.HTTP_200_OK,
            headers=headers
        )
 

class UnitViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
    serializer_class_admin = {
        'list_ext': UnitExtendedSerializer,
        'retrieve_ext': UnitExtendedSerializer
    }
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    http_method_names = [
        "get",
        "post",
        "patch",
        "delete",
        "head",
        "options",
        "trace",
    ]
    filterset_fields = [
        'is_active',
        'is_maintenance'
    ]

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsSuperAdmin
        ]

        return [permission() for permission in permission_classes]

    # Override get_serializer_class for default action
    def get_serializer_class(self):
        # Check serializer class by action
        if hasattr(self, 'serializer_class_admin'):
            return self.serializer_class_admin.get(self.action, self.serializer_class)

        # Return original class
        return super().get_serializer_class()
    
    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)
 
    # Get extended units
    @action(methods=['GET'], detail=False, url_path='extended')
    def list_ext(self, request, *args, **kwargs):
        units = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(units, many=True)
        return Response(serializer.data)
    
    # Get extended unit
    @action(methods=['GET'], detail=True, url_path='extended')
    def retrieve_ext(self, request, *args, **kwargs):
        unit = self.get_object()
        serializer = self.get_serializer(unit, many=False)
        return Response(serializer.data)

    # Enable maintenance
    @action(methods=['GET'], detail=True, url_path='enable-maintenance')
    def enable_maintenance(self, request, *args, **kwargs):
        unit = self.get_object()
        
        if unit.is_maintenance is True:
            raise PermissionDenied(detail='Unit maintenance is already enabled')
        
        unit.is_maintenance = True
        unit.save()

        serializer = self.get_serializer(unit, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Unit maintenance enabled' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Disable maintenance
    @action(methods=['GET'], detail=True, url_path='disable-maintenance')
    def disable_maintenance(self, request, *args, **kwargs):
        unit = self.get_object()

        if unit.is_maintenance is False:
            raise PermissionDenied(detail='Unit maintenance is already disabled')
        
        unit.is_maintenance = False
        unit.save()

        serializer = self.get_serializer(unit, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Unit maintenance disabled' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Activate unit
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        unit = self.get_object()
        
        if unit.is_active is True:
            raise PermissionDenied(detail='Unit is already activated')
        
        unit.is_active = True
        unit.save()

        serializer = self.get_serializer(unit, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Unit activated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Deactivate unit
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        unit = self.get_object()

        if unit.is_active is False:
            raise PermissionDenied(detail='Unit is already deactivated')
        
        unit.is_active = False
        unit.save()

        serializer = self.get_serializer(unit, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Unit deactivated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Deactivate unit
    @action(methods=['POST'], detail=True, url_path='assign-owner')
    def assign_owner(self, request, *args, **kwargs):
        unit = self.get_object()

        is_replace = request.data.get('replace', False)
        moved_in_at = request.data.get('moved_in_at', None)

        # Check if unit already have an owner and not replacing
        if unit.owner and is_replace == False:
            raise PermissionDenied(
                detail='Unit already have a owner. You should replace instead'
            )

        # Unit value validation
        try:
            owner_id = request.data['resident']
        except Exception as e:
            raise PermissionDenied(detail='Owner is required')
        
        unit_serializer = self.get_serializer(
            unit,
            data={ 'owner': owner_id },
            partial=True
        )
        unit_serializer.is_valid(raise_exception=True)

        # Owner value validation
        # if moved_in_at:
        #     try:
        #         parsed_datetime = datetime.datetime.fromisoformat(moved_in_at)
        #     except ValueError:
        #         raise ValidationError(detail={
        #             'moved_in_at': (
        #                 'Datetime has wrong format. Use one of theseformats',
        #                 'instead: YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z].'
        #             )
        #         })
        # else:
        #     parsed_datetime = timezone.now()

        # owner = unit_serializer.validated_data['owner']
        # owner.moved_in_at = parsed_datetime

        # Saving
        self.perform_update(unit_serializer)
        # owner.save()

        serializer = self.get_serializer(unit, many=False)
        return Response(serializer.data)
    
    # Get ownership count
    @action(methods=['GET'], detail=False, url_path='ownership-count')
    def ownership_count(self, request, *args, **kwargs):
        units = self.get_queryset()

        data_ = {
            'labels': [
                'Owned', 
                'Available'
            ],
            'datas': [
                units.filter(owner__isnull=False).count(), 
                units.filter(owner__isnull=True).count()
            ]
        }
        
        return JsonResponse(data_)
