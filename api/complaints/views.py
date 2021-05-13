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

from .models import Complaint

from .serializers import (
    ComplaintSerializer,
    ComplaintExtendedSerializer
)

class ComplaintViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
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
        queryset = Complaint.objects.all()
        return queryset
    
    # Get extended complaints
    @action(methods=['GET'], detail=False)
    def extended_all(self, request, *args, **kwargs):
        complaints = Complaint.objects.all()
        
        serializer = ComplaintExtendedSerializer(complaints, many=True)
        return Response(serializer.data)
    
    # Get extended complaint
    @action(methods=['GET'], detail=True)
    def extended(self, request, *args, **kwargs):
        complaint = self.get_object()
        
        serializer = ComplaintExtendedSerializer(complaint, many=False)
        return Response(serializer.data)
    
    # Close complaint
    @action(methods=['GET'], detail=True)
    def close(self, request, *args, **kwargs):
        complaint = self.get_object()
        complaint.status = 'CL'
        complaint.closed_at = datetime.now()
        complaint.save()
        
        serializer = ComplaintExtendedSerializer(complaint, many=False)
        return Response(serializer.data)