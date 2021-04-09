from django.shortcuts import render
from django.db.models import Q

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend
from core.settings import DEBUG

from .models import (
    Billing,
    MaintenanceBaseFee
)

from .serializers import (
    BillingSerializer,
    BillingExtendedSerializer,
    MaintenanceBaseFeeSerializer
)

class BillingViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if DEBUG:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        # if self.action == 'list':
        #     permission_classes = [IsAuthenticated]
        # else:
        #     permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = Billing.objects.all()
        return queryset
    
    # Get extended billing
    @action(methods=['GET'], detail=True)
    def extended(self, request, *args, **kwargs):
        billing = self.get_object()
        
        serializer = BillingExtendedSerializer(billing, many=False)
        return Response(serializer.data)
    
    # Get extended billings
    @action(methods=['GET'], detail=False)
    def extended_all(self, request, *args, **kwargs):
        billings = Billing.objects.all()
        
        serializer = BillingExtendedSerializer(billings, many=True)
        return Response(serializer.data)

    # Verify payment
    @action(methods=['GET'], detail=True)
    def verify_payment(self, request, *args, **kwargs):
        billing = self.get_object()
        billing.is_paid = True
        billing.paid_at = datetime.now()
        # PDF generation
        billing.save()
        
        serializer = BillingExtendedSerializer(Billing, many=False)
        return Response(serializer.data)

class MaintenanceBaseFeeViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = MaintenanceBaseFee.objects.all()
    serializer_class = MaintenanceBaseFeeSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        if DEBUG:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        # if self.action == 'list':
        #     permission_classes = [IsAuthenticated]
        # else:
        #     permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = MaintenanceBaseFee.objects.all()
        return queryset