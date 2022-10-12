import calendar

from django.db.models import Count, Q
from django.http import JsonResponse
from django.utils.timezone import now
from django.utils.decorators import method_decorator

from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema

from utils.auth.permissions import IsAdminStaff
from utils.helpers import dict_snake_to_camel, camel_to_capitalize

from .docs import (
    DocuConfigTicketTag,
    DocuConfigTicket,
    DocuConfigTicketActivity,
    DocuConfigTicketComment
)
from .models import (
    TicketPriority,
    TicketStatus,
    TicketTag,
    Ticket,
    TicketActivity,
    TicketComment
)
from .serializers import (
    TicketCommentExtendedSerializer,
    TicketExtendedSerializer,
    TicketTagSerializer,
    TicketSerializer,
    TicketActivitySerializer,
    TicketCommentSerializer,
    TicketStatusSerializer
)


@method_decorator(name='list', decorator=DocuConfigTicketTag.LIST)
@method_decorator(name='retrieve', decorator=DocuConfigTicketTag.RETRIEVE)
@method_decorator(name='create', decorator=DocuConfigTicketTag.CREATE)
@method_decorator(name='partial_update', decorator=DocuConfigTicketTag.PARTIAL_UPDATE)
class TicketTagViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    """Viewset for TicketTag model"""
    
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
        """Override perform_create to update created_by"""

        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        """Override perform_update to update last_modified_by"""

        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)


@method_decorator(name='list', decorator=DocuConfigTicket.LIST)
@method_decorator(name='retrieve', decorator=DocuConfigTicket.RETRIEVE)
@method_decorator(name='create', decorator=DocuConfigTicket.CREATE)
@method_decorator(name='partial_update', decorator=DocuConfigTicket.PARTIAL_UPDATE)
class TicketViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    """Viewset for Ticket model"""

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
        """Override get_serializer_class for default action"""

        if hasattr(self, 'serializer_class_admin'):
            return self.serializer_class_admin.get(self.action, self.serializer_class)

        # Return original class
        return super().get_serializer_class()
    
    def get_serializer_validator_class(self):
        """
        Override get_serializer_validator_class for
        serializer validation class by action
        """

        if hasattr(self, 'serializer_class_validator'):
            return self.serializer_class_validator.get(self.action, self.serializer_class)

        # Return default method
        return super().get_serializer_class()

    def perform_create(self, serializer):
        """Override perform_create to update created_by"""

        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        """Override perform_update to update last_modified_by"""

        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)
    
    def get_serializer(self, *args, **kwargs):
        """Override get_serializer to get serializer validator"""

        is_partial = kwargs.get('partial', None)

        if self.action == 'update_status' and not is_partial == None:
            serializer_class = self.get_serializer_validator_class()
            kwargs.setdefault('context', self.get_serializer_context())
            return serializer_class(*args, **kwargs)

        # Return default method
        return super().get_serializer(*args, **kwargs)
    
    @swagger_auto_schema(**DocuConfigTicket.RETRIEVE_EXT.value)
    @action(methods=['GET'], detail=True, url_path='extended')
    def retrieve_ext(self, request, *args, **kwargs):
        """Get extended ticket"""

        ticket = self.get_object()
        serializer = self.get_serializer(ticket, many=False)
        return Response(serializer.data)
    
    @swagger_auto_schema(**DocuConfigTicket.UPDATE_STATUS.value)
    @action(methods=['PATCH'], detail=True, url_path='update-status')
    def update_status(self, request, *args, **kwargs):
        """Update ticket status"""

        # Instantiate ticket
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

    @swagger_auto_schema(**DocuConfigTicket.OVERVIEW.value)
    @action(methods=['GET'], detail=False, url_path='overview')
    def get_overview(self, request, *args, **kwargs):
        """
        Get ticket overview

        Month over Month growth

        x = new month
        y = old month
        z = difference percentage
        z = (x - y) / y * 100
        None = infinty
        """

        # Get this year's tickets
        current_date = now()
        tickets = Ticket.objects.all().filter(created_at__year=current_date.year)

        # Q filters
        tickets_pctg_exp = (( Count('id', filter=Q(created_at__month=current_date.month)) -
                Count('id', filter=Q(created_at__month=current_date.month - 1))
            ) / Count('id', filter=Q(created_at__month=current_date.month - 1)) * 100
        )

        opened_pctg_exp = ((Count('id', filter=Q(status=TicketStatus.OPENED, created_at__month=current_date.month)) -
                Count('id', filter=Q(status=TicketStatus.OPENED, created_at__month=current_date.month - 1))
            ) / Count('id', filter=Q(status=TicketStatus.OPENED, created_at__month=current_date.month - 1)) * 100
        )

        progress_pctg_exp = (( Count('id', filter=Q(status=TicketStatus.IN_PROGRESS, created_at__month=current_date.month)) -
                Count('id', filter=Q(status=TicketStatus.IN_PROGRESS, created_at__month=current_date.month - 1))
            ) / Count('id', filter=Q(status=TicketStatus.IN_PROGRESS, created_at__month=current_date.month - 1)) * 100
        )
        completed_pctg_exp = ((Count('id', filter=(
                Q(status=TicketStatus.RESOLVED, created_at__month=current_date.month) |
                Q(status=TicketStatus.CLOSED, created_at__month=current_date.month) |
                Q(status=TicketStatus.DUPLICATED, created_at__month=current_date.month))) - Count('id', filter=(
                    Q(status=TicketStatus.RESOLVED, created_at__month=current_date.month - 1) |
                    Q(status=TicketStatus.CLOSED, created_at__month=current_date.month - 1) |
                    Q(status=TicketStatus.DUPLICATED, created_at__month=current_date.month - 1))
                )) / Count('id', filter=(
            Q(status=TicketStatus.RESOLVED, created_at__month=current_date.month - 1) |
            Q(status=TicketStatus.CLOSED, created_at__month=current_date.month - 1) |
            Q(status=TicketStatus.DUPLICATED, created_at__month=current_date.month - 1))) * 100
        )

        overview_total = {
            'tickets': tickets.aggregate(
                count=Count('id'),
                percentage=tickets_pctg_exp
            ),
            'opened': tickets.aggregate(
                count=Count('id', filter=Q(status=TicketStatus.OPENED)),
                percentage=opened_pctg_exp
            ),
            'in_progress': tickets.aggregate(
                count=Count('id', filter=Q(status=TicketStatus.IN_PROGRESS)),
                percentage=progress_pctg_exp
            ),
            'completed': tickets.aggregate(
                count=Count('id', filter=(
                    Q(status=TicketStatus.RESOLVED) |
                    Q(status=TicketStatus.CLOSED) |
                    Q(status=TicketStatus.DUPLICATED)
                )),
                percentage=completed_pctg_exp
            )
        }

        return JsonResponse(dict_snake_to_camel(overview_total))
    
    @swagger_auto_schema(**DocuConfigTicket.STATUS_OVERVIEW.value)
    @action(methods=['GET'], detail=False, url_path='status-overview')
    def get_status_overview(self, request, *args, **kwargs):
        """Get ticket status overview"""

        # Get this year's tickets
        current_date = now()
        tickets = Ticket.objects.all().filter(created_at__year=current_date.year)
        
        # Prepare response data
        status_monthly = [
            { 'name': 'Opened', 'series': [] },
            { 'name': 'In progress', 'series': [] },
            { 'name': 'Resolved', 'series': [] },
            { 'name': 'Closed', 'series': [] },
            { 'name': 'Duplicated', 'series': [] }
        ]

        for month in range(1, 13):
            # Get all status counts
            agg_data = tickets.aggregate(
                opened=Count('id', filter=Q(status=TicketStatus.OPENED, created_at__month=month)),
                in_progress=Count('id', filter=Q(status=TicketStatus.IN_PROGRESS, created_at__month=month)),
                resolved=Count('id', filter=Q(status=TicketStatus.RESOLVED, created_at__month=month)),
                closed=Count('id', filter=Q(status=TicketStatus.CLOSED, created_at__month=month)),
                duplicated=Count('id', filter=Q(status=TicketStatus.DUPLICATED, created_at__month=month))
            )

            # Append data
            status_monthly[0]['series'].append({
                'name': f'{ calendar.month_name[month][:3] }',
                'value': agg_data['opened']
            })
            status_monthly[1]['series'].append({
                'name': f'{ calendar.month_name[month][:3] }',
                'value': agg_data['in_progress']
            })
            status_monthly[2]['series'].append({
                'name': f'{ calendar.month_name[month][:3] }',
                'value': agg_data['resolved']
            })
            status_monthly[3]['series'].append({
                'name': f'{ calendar.month_name[month][:3] }',
                'value': agg_data['closed']
            })
            status_monthly[4]['series'].append({
                'name': f'{ calendar.month_name[month][:3] }',
                'value': agg_data['duplicated']
            })
        
        return JsonResponse(status_monthly, safe=False)
    
    @swagger_auto_schema(**DocuConfigTicket.PRIORITY_OVERVIEW.value)
    @action(methods=['GET'], detail=False, url_path='priority-overview')
    def get_priority_overview(self, request, *args, **kwargs):
        """Get ticket priority overview"""

        # Get this year's tickets
        current_date = now()
        tickets = Ticket.objects.all().filter(created_at__year=current_date.year)

        # Prepare response data
        by_priority = []
        agg_data = tickets.aggregate(
            critical=Count('id', filter=Q(priority=TicketPriority.CRIT)),
            high=Count('id', filter=Q(priority=TicketPriority.HIGH), distinct=True),
            normal=Count('id', filter=Q(priority=TicketPriority.NORMAL)),
            low=Count('id', filter=Q(priority=TicketPriority.LOW)),
            very_low=Count('id', filter=Q(priority=TicketPriority.VLOW))
        )

        for key in agg_data:
            by_priority.append({
                'name': camel_to_capitalize(key),
                'value': agg_data[key]
            })
        
        return JsonResponse(by_priority, safe=False)


@method_decorator(name='list', decorator=DocuConfigTicketActivity.LIST)
@method_decorator(name='retrieve', decorator=DocuConfigTicketActivity.RETRIEVE)
class TicketActivityViewSet(NestedViewSetMixin, viewsets.ReadOnlyModelViewSet):
    """Viewset for TicketActivity model"""

    queryset = TicketActivity.objects.all()
    serializer_class = TicketActivitySerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsAdminStaff
        ]

        return [permission() for permission in permission_classes]


@method_decorator(name='list', decorator=DocuConfigTicketComment.LIST)
@method_decorator(name='retrieve', decorator=DocuConfigTicketComment.RETRIEVE)
class TicketCommentViewSet(NestedViewSetMixin, viewsets.ReadOnlyModelViewSet):
    """Viewset for TicketComment model"""

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
        """Override get_queryset to filter results according to parent_lookup_id or not"""

        queryset = self.queryset

        # Queryset for nested
        if 'parent_lookup_id' in self.kwargs:
            queryset = queryset.filter(ticket__id=self.kwargs['parent_lookup_id'])
        else:
            pass

        return queryset
    
    def get_serializer_class(self):
        """Override get_serializer_class for default action"""

        if hasattr(self, 'serializer_class_admin'):
            return self.serializer_class_admin.get(self.action, self.serializer_class)

        # Return original class
        return super().get_serializer_class()

    @swagger_auto_schema(**DocuConfigTicketComment.ADD_COMMENT.value)
    @action(methods=['POST'], detail=False, url_path='add-comment')
    def add_comment(self, request, *args, **kwargs):
        """Post a comment to a ticket"""

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

