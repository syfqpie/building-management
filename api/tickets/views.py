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
    TicketActivitySerializer, TicketCommentSerializer,
    TicketStatusSerializer
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
    serializer_class_validator = {
        'update_status': TicketStatusSerializer
    }
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

    # For validation only
    def get_serializer_validator_class(self):
        # Check serializer validation class by action
        if hasattr(self, 'serializer_class_validator'):
            return self.serializer_class_validator.get(self.action, self.serializer_class)

        # Return default method
        return super().get_serializer_class()

    def perform_create(self, serializer):
        # Saving user to created_by
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        # Saving user to last_modified_by
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)
    
    def get_serializer(self, *args, **kwargs):
        is_partial = kwargs.get('partial', None)

        # Check to get serializer validator
        if self.action == 'update_status' and not is_partial == None:
            serializer_class = self.get_serializer_validator_class()
            kwargs.setdefault('context', self.get_serializer_context())
            return serializer_class(*args, **kwargs)

        # Return default method
        return super().get_serializer(*args, **kwargs)
    
    # Update status
    @action(methods=['PATCH'], detail=True, url_path='update-status')
    def update_status(self, request, *args, **kwargs):
        # Get ticket instance
        ticket = self.get_object()

        # Serialize and check if form is valid
        serializer = self.get_serializer(
            ticket, data=request.data, partial=False
        )
        serializer.is_valid(raise_exception=True)

        # Check if pair already exist
        try:
            activity = TicketActivity.objects.get(ticket=ticket, status=request.data['status'])
            raise PermissionDenied(detail='You have updated to this status already')
        except TicketActivity.DoesNotExist:
            pass
        
        # Update data, add activity setup and save
        ticket.status = request.data['status']
        ticket.last_modified_by = request.user
        ticket._activity_setup = {
            'current_status': ticket.status,
            'notes': request.data['notes']
        }
        ticket.save(update_fields=[
            'status',
            'last_modified_at',
            'last_modified_by'
        ])

        # Prepare response
        serializer = self.get_serializer(ticket, many=False)
        headers = self.get_success_headers(serializer.data)
        
        return Response(
            { 'detail': f'Ticket status updated to { ticket.get_status_display() }' },
            status=status.HTTP_200_OK,
            headers=headers
        )


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

