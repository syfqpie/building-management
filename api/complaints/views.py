from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from users.models import UserType

from .models import Complaint

from .serializers import (
    ComplaintSerializer,
    ComplaintPublicSerializer
)


class ComplaintViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    serializer_class_public = {
        'list': ComplaintPublicSerializer
    }
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)

    def get_permissions(self):
        permission_classes = [IsAuthenticated]

        return [permission() for permission in permission_classes]    

    def get_queryset(self):
        user = self.request.user

        if user.user_type == UserType.PUBLIC:
            queryset = self.queryset.filter(created_by=user)
        else:
            queryset = self.queryset

        return queryset

    def get_serializer_class(self):
        user = self.request.user

        if user.user_type == UserType.PUBLIC and hasattr(self, 'serializer_class_public'):
            return self.serializer_class_public.get(self.action, self.serializer_class)
        
        return super(ComplaintViewSet, self).get_serializer_class()