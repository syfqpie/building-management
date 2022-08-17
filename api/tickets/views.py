from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django.db.models import Count, Q, Sum
from django.http import JsonResponse
from django.utils.timezone import now
from django.utils.decorators import method_decorator

from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema

from users.models import UserType
from users.permissions import IsAdminStaff, IsSuperAdmin

from .models import (
    TicketStatus, TicketTag, Ticket, TicketActivity, TicketComment
)
from .serializers import (
    TicketCommentExtendedSerializer, TicketExtendedSerializer, TicketTagSerializer, TicketSerializer,
    TicketActivitySerializer, TicketCommentSerializer,
    TicketStatusSerializer
)


@method_decorator(name='list', decorator=swagger_auto_schema(
    tags=['Ticket Tags'], operation_id='Get ticket tags',
    operation_description='List all ticket tags'
))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(
    tags=['Ticket Tags'], operation_id='Get ticket tag',
    operation_description='Retrieve ticket tag information'
))
@method_decorator(name='create', decorator=swagger_auto_schema(
    tags=['Ticket Tags'], operation_id='Create a ticket tag',
    operation_description='Create a new ticket tag'
))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(
    tags=['Ticket Tags'], operation_id='Edit ticket tag',
    operation_description='Edit ticket tag information'
))
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


@method_decorator(name='list', decorator=swagger_auto_schema(
    tags=['Tickets'], operation_id='Get tickets',
    operation_description='List all tickets'
))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(
    tags=['Tickets'], operation_id='Get ticket',
    operation_description='Retrieve ticket information'
))
@method_decorator(name='create', decorator=swagger_auto_schema(
    tags=['Tickets'], operation_id='Create a ticket',
    operation_description='Create a new ticket'
))
@method_decorator(name='partial_update', decorator=swagger_auto_schema(
    tags=['Tickets'], operation_id='Edit ticket',
    operation_description='Edit ticket information'
))
class TicketViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    serializer_class_validator = {
        'update_status': TicketStatusSerializer
    }
    serializer_class_admin = {
        'retrieve_ext': TicketExtendedSerializer
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

    def get_serializer_class(self):
        # Check serializer class by action
        if hasattr(self, 'serializer_class_admin'):
            return self.serializer_class_admin.get(self.action, self.serializer_class)

        # Return original class
        return super().get_serializer_class()
    
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
    
    # Get extended ticket
    @swagger_auto_schema(tags=['Tickets'], operation_id='Get ticket extended',
        operation_description='Get ticket extended information')
    @action(methods=['GET'], detail=True, url_path='extended')
    def retrieve_ext(self, request, *args, **kwargs):
        ticket = self.get_object()
        serializer = self.get_serializer(ticket, many=False)
        return Response(serializer.data)
    
    # Update status
    @swagger_auto_schema(tags=['Tickets'], operation_id='Update ticket status',
        operation_description='Update a ticket status')
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

    # Get ticket overview
    @swagger_auto_schema(tags=['Tickets'], operation_id='Get ticket overview',
        operation_description='Get ticket overview information')
    @action(methods=['GET'], detail=False, url_path='overview')
    def get_overview(self, request, *args, **kwargs):
        # tickets = self.get_queryset()
        current_date = now()
        tickets = Ticket.objects.all()

        """
            Month over Month growth
            x = new month
            y = old month
            z = difference percentage
            z = (x - y) / y * 100
            None = infinty
        """
        overview_total = {
            'tickets': tickets.aggregate(
                count=Count('id'),
                percentage=(
                    Count('id', filter=Q(created_at__year=current_date.year,
                        created_at__month=current_date.month)) -
                    Count('id', filter=Q(created_at__year=current_date.year,
                        created_at__month=current_date.month - 1))
                ) / (
                    Count('id', filter=Q(created_at__year=current_date.year,
                        created_at__month=current_date.month - 1))
                ) * 100
            ),
            'opened': tickets.aggregate(
                count=Count('id', filter=Q(status=TicketStatus.OPENED)),
                percentage=(
                    Count('id', filter=Q(status=TicketStatus.OPENED,
                        created_at__year=current_date.year,
                        created_at__month=current_date.month)) -
                    Count('id', filter=Q(status=TicketStatus.OPENED,
                        created_at__year=current_date.year,
                        created_at__month=current_date.month - 1))
                ) / (
                    Count('id', filter=Q(status=TicketStatus.OPENED,
                        created_at__year=current_date.year,
                        created_at__month=current_date.month - 1))
                ) * 100
            ),
            'inProgress': tickets.aggregate(
                count=Count('id', filter=Q(status=TicketStatus.IN_PROGRESS)),
                percentage=(
                    Count('id', filter=Q(status=TicketStatus.IN_PROGRESS,
                        created_at__year=current_date.year,
                        created_at__month=current_date.month)) -
                    Count('id', filter=Q(status=TicketStatus.IN_PROGRESS,
                        created_at__year=current_date.year,
                        created_at__month=current_date.month - 1))
                ) / (
                    Count('id', filter=Q(status=TicketStatus.IN_PROGRESS,
                        created_at__year=current_date.year,
                        created_at__month=current_date.month - 1))
                ) * 100
            ),
            'completed': tickets.aggregate(
                count=Count('id', filter=(
                    Q(status=TicketStatus.RESOLVED) |
                    Q(status=TicketStatus.CLOSED) |
                    Q(status=TicketStatus.DUPLICATED)
                )),
                percentage=(
                    Count('id', filter=(
                        Q(status=TicketStatus.RESOLVED,
                            created_at__year=current_date.year,
                            created_at__month=current_date.month) |
                        Q(status=TicketStatus.CLOSED,
                            created_at__year=current_date.year,
                            created_at__month=current_date.month) |
                        Q(status=TicketStatus.DUPLICATED,
                            created_at__year=current_date.year,
                            created_at__month=current_date.month))) -
                    Count('id', filter=(
                        Q(status=TicketStatus.RESOLVED,
                            created_at__year=current_date.year,
                            created_at__month=current_date.month - 1) |
                        Q(status=TicketStatus.CLOSED,
                            created_at__year=current_date.year,
                            created_at__month=current_date.month - 1) |
                        Q(status=TicketStatus.DUPLICATED,
                            created_at__year=current_date.year,
                            created_at__month=current_date.month - 1)))
                ) / (
                    Count('id', filter=(
                        Q(status=TicketStatus.RESOLVED,
                            created_at__year=current_date.year,
                            created_at__month=current_date.month - 1) |
                        Q(status=TicketStatus.CLOSED,
                            created_at__year=current_date.year,
                            created_at__month=current_date.month - 1) |
                        Q(status=TicketStatus.DUPLICATED,
                            created_at__year=current_date.year,
                            created_at__month=current_date.month - 1)))
                ) * 100
            )
        }

        return JsonResponse({
            'total': overview_total
        })


@method_decorator(name='list', decorator=swagger_auto_schema(
    tags=['Ticket Activities'], operation_id='Get ticket activities',
    operation_description='List all ticket activities'
))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(
    tags=['Ticket Activities'], operation_id='Get ticket activity',
    operation_description='Retrieve ticket activity information'
))
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


@method_decorator(name='list', decorator=swagger_auto_schema(
    tags=['Ticket Comments'], operation_id='Get ticket comments',
    operation_description='List all ticket comments'
))
@method_decorator(name='retrieve', decorator=swagger_auto_schema(
    tags=['Ticket Comments'], operation_id='Get ticket comment',
    operation_description='Retrieve ticket comment information'
))
class TicketCommentViewSet(NestedViewSetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = TicketComment.objects.all()
    serializer_class = TicketCommentSerializer
    serializer_class_admin = {
        'list': TicketCommentExtendedSerializer
    }
    filter_backends = [DjangoFilterBackend, OrderingFilter]

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsAdminStaff
        ]

        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = self.queryset

        # Queryset for nested
        if 'parent_lookup_id' in self.kwargs:
            queryset = queryset.filter(ticket__id=self.kwargs['parent_lookup_id'])
        else:
            pass

        return queryset
    
    def get_serializer_class(self):
        # Check serializer class by action
        if hasattr(self, 'serializer_class_admin'):
            return self.serializer_class_admin.get(self.action, self.serializer_class)

        # Return original class
        return super().get_serializer_class()

    # Post comment
    @swagger_auto_schema(tags=['Ticket Comments'], operation_id='Add comment',
        operation_description='Add ticket commit')
    @action(methods=['POST'], detail=False, url_path='add-comment')
    def add_comment(self, request, *args, **kwargs):
        # Get ticket instance
        ticket_id = kwargs.get('parent_lookup_id', None)

        # Validate data
        request.data['ticket'] = ticket_id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        # Create
        TicketComment.objects.create(
            ticket=validated_data['ticket'],
            reply_to=validated_data.get('reply_to', None),
            comment=validated_data['comment'],
            created_by=request.user
        )

        return Response(
            {'detail': 'Comment added'},
            status=status.HTTP_201_CREATED
        )

