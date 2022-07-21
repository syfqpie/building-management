from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
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

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsSuperAdmin
        ]

        return [permission() for permission in permission_classes]    

    def get_queryset(self):
        queryset = self.queryset
        return queryset
    
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
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsSuperAdmin
        ]

        return [permission() for permission in permission_classes]    
    
    def get_queryset(self):
        queryset = self.queryset
        return queryset

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

        serializer = FloorSerializer(floor, many=False)
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

        serializer = FloorSerializer(floor, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Floor deactivated' },
            status=status.HTTP_200_OK,
            headers=headers
        )


class UnitNumberViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = UnitNumber.objects.all()
    serializer_class = UnitNumberSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsSuperAdmin
        ]

        return [permission() for permission in permission_classes]    

    def get_queryset(self):
        queryset = self.queryset
        return queryset

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

        serializer = UnitNumberSerializer(unit_number, many=False)
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

        serializer = UnitNumberSerializer(unit_number, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Unit number deactivated' },
            status=status.HTTP_200_OK,
            headers=headers
        )
 

class UnitViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsSuperAdmin
        ]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = self.queryset
        return queryset    
    

    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by=request.user)


    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)
 
    # Get extended units
    @action(methods=['GET'], detail=False)
    def extended_all(self, request, *args, **kwargs):
        units = Unit.objects.all()
        serializer = UnitExtendedSerializer(units, many=True)
        return Response(serializer.data)
    
    # Get extended unit
    @action(methods=['GET'], detail=True)
    def extended(self, request, *args, **kwargs):
        unit = self.get_object()
        serializer = UnitExtendedSerializer(unit, many=False)
        return Response(serializer.data)

    # Enable maintenance
    @action(methods=['GET'], detail=True, url_path='enable-maintenance')
    def enable_maintenance(self, request, *args, **kwargs):
        unit = self.get_object()
        
        if unit.is_maintenance is True:
            raise PermissionDenied(detail='Unit maintenance is already enabled')
        
        unit.is_maintenance = True
        unit.save()

        serializer = UnitExtendedSerializer(unit, many=False)
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

        serializer = UnitExtendedSerializer(unit, many=False)
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

        serializer = UnitExtendedSerializer(unit, many=False)
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

        serializer = UnitExtendedSerializer(unit, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Unit deactivated' },
            status=status.HTTP_200_OK,
            headers=headers
        )
    
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
                units.filter(renter__isnull=False).count(), 
                units.filter(renter__isnull=True).count()
            ]
        }
        
        return JsonResponse(data_)
