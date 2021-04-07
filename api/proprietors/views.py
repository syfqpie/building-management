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
    Proprietor
)

from .serializers import (
    ProprietorSerializer
)

class ProprietorViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Proprietor.objects.all()
    serializer_class = ProprietorSerializer
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
        queryset = Proprietor.objects.all()

        # if self.request.user.is_anonymous:
        #     queryset = Proprietor.objects.none()

        # else:
        #     user = self.request.user
            
        #     if user.user_type == 'AD':
        #         Proprietor.objects.all()
        #     else:
        #         Proprietor.objects.none()

        return queryset    
 
    # Activate proprietor
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        proprietor = self.get_object()
        proprietor.is_active = True
        proprietor.save()

        serializer = ProprietorSerializer(proprietor, many=False)
        return Response(serializer.data)

    # Deactivate proprietor
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        proprietor = self.get_object()
        proprietor.is_active = False
        proprietor.deactivated_at = datetime.now()
        proprietor.save()
        
        serializer = ProprietorSerializer(proprietor, many=False)
        return Response(serializer.data)
    
    # Search proprietor by NRIC
    @action(methods=['POST'], detail=False)
    def search(self, request, *args, **kwargs):

        request_ = json.loads(request.body.decode('utf-8'))
        request_text_ = request_['text']

        proprietors = Proprietor.objects.filter(
           nric__icontains=request_text_
        )[:5]
        
        serializer = ProprietorSerializer(proprietors, many=True)
        return Response(serializer.data)