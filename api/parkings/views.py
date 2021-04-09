import json

from django.shortcuts import render
from django.db.models import Q

from datetime import datetime

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend
from core.settings import DEBUG

from .models import (
    ParkingUnit,
    ParkingLot,
    ParkingOwner
)

from .serializers import (
    ParkingUnitSerializer,
    ParkingLotSerializer,
    ParkingLotExtendedSerializer,
    ParkingOwnerSerializer,
    ParkingOwnerExtendedSerializer
)

class ParkingUnitViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = ParkingUnit.objects.all()
    serializer_class = ParkingUnitSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if DEBUG:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        # if self.action == 'list':
        #     permission_classes = [AllowAny]
        # else:
        #     permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = ParkingUnit.objects.all()

        # if self.request.user.is_anonymous:
        #     queryset = ParkingUnit.objects.none()

        # else:
        #     user = self.request.user
            
        #     if user.user_type == 'AD':
        #         ParkingUnit.objects.all()
        #     else:
        #         ParkingUnit.objects.none()

        return queryset    
 
    # Activate parking unit
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        unit = self.get_object()
        unit.is_active = True
        unit.save()

        serializer = ParkingUnitSerializer(unit, many=False)
        return Response(serializer.data)

    # Deactivate parking unit
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        unit = self.get_object()
        unit.is_active = False
        unit.deactivated_at = datetime.now()
        unit.save()
        
        serializer = ParkingUnitSerializer(unit, many=False)
        return Response(serializer.data)
    
class ParkingLotViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = ParkingLot.objects.all()
    serializer_class = ParkingLotSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if DEBUG:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        # if self.action == 'list':
        #     permission_classes = [AllowAny]
        # else:
        #     permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = ParkingLot.objects.all()

        # if self.request.user.is_anonymous:
        #     queryset = ParkingLot.objects.none()

        # else:
        #     user = self.request.user
            
        #     if user.user_type == 'AD':
        #         ParkingLot.objects.all()
        #     else:
        #         ParkingLot.objects.none()

        return queryset    
    
    # Get extended lot
    @action(methods=['GET'], detail=True)
    def extended(self, request, *args, **kwargs):
        lot = self.get_object()

        serializer = ParkingLotExtendedSerializer(lot, many=False)
        return Response(serializer.data)
    
    # Get extended lots
    @action(methods=['GET'], detail=False)
    def extended_all(self, request, *args, **kwargs):
        lots = ParkingLot.objects.all()

        serializer = ParkingLotExtendedSerializer(lots, many=True)
        return Response(serializer.data)
    
    # Activate parking Lot
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        lot = self.get_object()
        lot.is_active = True
        lot.save()

        serializer = ParkingLotSerializer(lot, many=False)
        return Response(serializer.data)

    # Deactivate parking Lot
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        lot = self.get_object()
        lot.is_active = False
        lot.deactivated_at = datetime.now()
        lot.save()
        
        serializer = ParkingLotSerializer(lot, many=False)
        return Response(serializer.data)
    
class ParkingOwnerViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = ParkingOwner.objects.all()
    serializer_class = ParkingOwnerSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if DEBUG:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        # if self.action == 'list':
        #     permission_classes = [AllowAny]
        # else:
        #     permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = ParkingOwner.objects.all()

        # if self.request.user.is_anonymous:
        #     queryset = ParkingOwner.objects.none()

        # else:
        #     user = self.request.user
            
        #     if user.user_type == 'AD':
        #         ParkingOwner.objects.all()
        #     else:
        #         ParkingOwner.objects.none()

        return queryset    
    
    # Get extended owner
    @action(methods=['GET'], detail=True)
    def extended(self, request, *args, **kwargs):
        owner = self.get_object()

        serializer = ParkingOwnerExtendedSerializer(owner, many=False)
        return Response(serializer.data)
    
    # Get extended owners
    @action(methods=['GET'], detail=False)
    def extended_all(self, request, *args, **kwargs):
        owners = ParkingOwner.objects.all()

        serializer = ParkingOwnerExtendedSerializer(owners, many=True)
        return Response(serializer.data)
 
    # Activate parking owner
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        owner = self.get_object()
        owner.is_active = True
        owner.save()

        serializer = ParkingOwnerSerializer(owner, many=False)
        return Response(serializer.data)

    # Deactivate parking owner
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        owner = self.get_object()
        owner.is_active = False
        owner.deactivated_at = datetime.now()
        owner.save()
        
        serializer = ParkingOwnerSerializer(owner, many=False)
        return Response(serializer.data)
    