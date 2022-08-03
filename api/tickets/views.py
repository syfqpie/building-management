from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from users.models import UserType
from users.permissions import IsAdminStaff, IsSuperAdmin

from .models import (
    TicketStatus, TicketTag, Ticket, TicketActivity, TicketComment
)
from .serializers import (
    TicketTagSerializer, TicketSerializer,
    TicketActivitySerializer, TicketCommentSerializer
)


class TicketTagViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = TicketTag.objects.all()
    serializer_class = TicketTagSerializer
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
            IsAdminStaff
        ]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)


class TicketViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
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
            IsAdminStaff
        ]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        # Saving admin to created_by
        request = serializer.context['request']
        instance = serializer.save(created_by=request.user)

        # Create activity
        TicketActivity.objects.create(
            ticket=instance,
            status=TicketStatus.OPENED,
            notes='Ticket opened',
            created_by=request.user
        )

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)


class TicketActivityViewSet(NestedViewSetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = TicketActivity.objects.all()
    serializer_class = TicketActivitySerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsAdminStaff
        ]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)


class TicketCommentViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = TicketComment.objects.all()
    serializer_class = TicketCommentSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    http_method_names = [
        'get',
        'post',
        'head',
        'options',
        'trace',
    ]

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsAdminStaff
        ]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)

