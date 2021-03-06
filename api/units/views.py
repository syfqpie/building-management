from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend
from core.settings import DEBUG

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
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if DEBUG:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        # if self.action == 'list':
        #     permission_classes = [AllowAny]
        # else:
        #     permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Block.objects.all()
        return queryset
    
    # Activate block
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        block = self.get_object()
        block.is_active = True
        block.save()

        serializer = BlockSerializer(block, many=False)
        return Response(serializer.data)

    # Deactivate block
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        block = self.get_object()
        block.is_active = False
        block.save()
        
        serializer = BlockSerializer(block, many=False)
        return Response(serializer.data)
 

class FloorViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Floor.objects.all()
    serializer_class = FloorSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if DEBUG:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        # if self.action == 'list':
        #     permission_classes = [AllowAny]
        # else:
        #     permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Floor.objects.all()
        return queryset
    
    # Activate floor
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        floor = self.get_object()
        floor.is_active = True
        floor.save()

        serializer = FloorSerializer(floor, many=False)
        return Response(serializer.data)

    # Deactivate block
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        floor = self.get_object()
        floor.is_active = False
        floor.save()
        
        serializer = FloorSerializer(floor, many=False)
        return Response(serializer.data)
 

class UnitNumberViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = UnitNumber.objects.all()
    serializer_class = UnitNumberSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if DEBUG:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        # if self.action == 'list':
        #     permission_classes = [AllowAny]
        # else:
        #     permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = UnitNumber.objects.all()
        return queryset
    
    # Activate unit number
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        unit_number = self.get_object()
        unit_number.is_active = True
        unit_number.save()

        serializer = UnitNumberSerializer(unit_number, many=False)
        return Response(serializer.data)

    # Deactivate unit number
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        unit_number = self.get_object()
        unit_number.is_active = False
        unit_number.save()
        
        serializer = UnitNumberSerializer(unit_number, many=False)
        return Response(serializer.data)
 

class UnitViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if DEBUG:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        # if self.action == 'list':
        #     permission_classes = [AllowAny]
        # else:
        #     permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Unit.objects.all()
        return queryset    
 
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
    @action(methods=['GET'], detail=True)
    def enable_maintenance(self, request, *args, **kwargs):
        unit = self.get_object()
        unit.is_maintenance = True
        unit.save()

        serializer = UnitExtendedSerializer(unit, many=False)
        return Response(serializer.data)

    # Disable maintenance
    @action(methods=['GET'], detail=True)
    def disable_maintenance(self, request, *args, **kwargs):
        unit = self.get_object()
        unit.is_maintenance = False
        unit.save()
        
        serializer = UnitExtendedSerializer(unit, many=False)
        return Response(serializer.data)

    # Activate unit
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        unit = self.get_object()
        unit.is_active = True
        unit.save()

        serializer = UnitExtendedSerializer(unit, many=False)
        return Response(serializer.data)

    # Deactivate unit
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        unit = self.get_object()
        unit.is_active = False
        unit.save()
        
        serializer = UnitExtendedSerializer(unit, many=False)
        return Response(serializer.data)
    
    # Get ownership count
    @action(methods=['GET'], detail=False)
    def ownership_count(self, request, *args, **kwargs):
        units = Unit.objects.all()

        data_ = {
            'labels': [
                'Owned', 
                'Available'
            ],
            'datas': [
                units.filter(proprietor__isnull=False).count(), 
                units.filter(proprietor__isnull=True).count()
            ]
        }
        
        return JsonResponse(data_)