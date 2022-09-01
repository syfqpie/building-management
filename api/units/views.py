from django.db.models import Count, Q
from django.http import JsonResponse
from django.utils.timezone import now

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from core.helpers import camel_to_capitalize

from users.permissions import IsAdminStaff, IsSuperAdmin

from .models import (
    Block, Floor, UnitNumber,
    Unit, UnitActivity, ActivityType,
    ParkingLot, ParkingLotPass
)

from .serializers import (
    BlockSerializer, FloorSerializer, UnitNumberSerializer,
    UnitSerializer, UnitExtendedSerializer,
    UnitActivityNestedSerializer, UnitActivityNonNestedSerializer,
    ParkingLotSerializer, ParkingLotExtendedSerializer,
    ParkingLotPassSerializer
)


class BlockViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Block.objects.all()
    serializer_class = BlockSerializer
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
            IsSuperAdmin
        ]

        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)
    
    # Activate block
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        block = self.get_object()

        if block.is_active is True:
            raise PermissionDenied(detail='Block is already activated')
        
        block.is_active = True
        block.save()

        serializer = self.get_serializer(block, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Block activated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Deactivate block
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        block = self.get_object()

        if block.is_active is False:
            raise PermissionDenied(detail='Block is already deactivated')
        
        block.is_active = False
        block.save()

        serializer = self.get_serializer(block, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Block deactivated' },
            status=status.HTTP_200_OK,
            headers=headers
        )


class FloorViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Floor.objects.all()
    serializer_class = FloorSerializer
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
            IsSuperAdmin
        ]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)

    # Activate floor
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        floor = self.get_object()

        if floor.is_active is True:
            raise PermissionDenied(detail='Floor is already activated')
        
        floor.is_active = True
        floor.save()

        serializer = self.get_serializer(floor, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Floor activated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Deactivate block
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        floor = self.get_object()

        if floor.is_active is False:
            raise PermissionDenied(detail='Floor is already deactivated')
        
        floor.is_active = False
        floor.save()

        serializer = self.get_serializer(floor, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Floor deactivated' },
            status=status.HTTP_200_OK,
            headers=headers
        )


class UnitNumberViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = UnitNumber.objects.all()
    serializer_class = UnitNumberSerializer
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
            IsSuperAdmin
        ]

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)
    
    # Activate unit number
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        unit_number = self.get_object()

        if unit_number.is_active is True:
            raise PermissionDenied(detail='Unit number is already activated')
        
        unit_number.is_active = True
        unit_number.save()

        serializer = self.get_serializer(unit_number, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Unit number activated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Deactivate unit number
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        unit_number = self.get_object()

        if unit_number.is_active is False:
            raise PermissionDenied(detail='Unit number is already deactivated')
        
        unit_number.is_active = False
        unit_number.save()

        serializer = self.get_serializer(unit_number, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Unit number deactivated' },
            status=status.HTTP_200_OK,
            headers=headers
        )
 

class UnitViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Unit.objects.all()
    serializer_class = UnitSerializer
    serializer_class_admin = {
        'list_ext': UnitExtendedSerializer,
        'retrieve_ext': UnitExtendedSerializer
    }
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    http_method_names = [
        "get",
        "post",
        "patch",
        "delete",
        "head",
        "options",
        "trace",
    ]
    filterset_fields = [
        'is_active',
        'is_maintenance'
    ]

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsAdminStaff
        ]

        if self.action == 'destroy':
            permission_classes.append(IsSuperAdmin)

        return [permission() for permission in permission_classes]

    # Override get_serializer_class for default action
    def get_serializer_class(self):
        # Check serializer class by action
        if hasattr(self, 'serializer_class_admin'):
            return self.serializer_class_admin.get(self.action, self.serializer_class)

        # Return original class
        return super().get_serializer_class()
    
    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)
 
    # Get extended units
    @action(methods=['GET'], detail=False, url_path='extended')
    def list_ext(self, request, *args, **kwargs):
        units = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(units, many=True)
        return Response(serializer.data)
    
    # Get extended unit
    @action(methods=['GET'], detail=True, url_path='extended')
    def retrieve_ext(self, request, *args, **kwargs):
        unit = self.get_object()
        serializer = self.get_serializer(unit, many=False)
        return Response(serializer.data)

    # Enable maintenance
    @action(methods=['GET'], detail=True, url_path='enable-maintenance')
    def enable_maintenance(self, request, *args, **kwargs):
        unit = self.get_object()
        
        if unit.is_maintenance is True:
            raise PermissionDenied(detail='Unit maintenance is already enabled')
        
        # Change value, add signal setup
        unit.is_maintenance = True
        unit.last_modified_by = request.user
        unit._activity_setup = {
            'current_owner': unit.owner,
            'activity_type': ActivityType.ENABLE_MAINTENANCE,
            'notes': None,
            'activity_by': request.user
        }

        # Saving
        unit.save(update_fields=[
            'is_maintenance',
            'last_modified_at',
            'last_modified_by'
        ])

        serializer = self.get_serializer(unit, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Unit maintenance enabled' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Disable maintenance
    @action(methods=['GET'], detail=True, url_path='disable-maintenance')
    def disable_maintenance(self, request, *args, **kwargs):
        unit = self.get_object()

        if unit.is_maintenance is False:
            raise PermissionDenied(detail='Unit maintenance is already disabled')
        
        # Change value, add signal setup
        unit.is_maintenance = False
        unit.last_modified_by = request.user
        unit._activity_setup = {
            'current_owner': unit.owner,
            'activity_type': ActivityType.DISABLE_MAINTENANCE,
            'notes': None,
            'activity_by': request.user
        }

        # Saving
        unit.save(update_fields=[
            'is_maintenance',
            'last_modified_at',
            'last_modified_by'
        ])

        serializer = self.get_serializer(unit, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Unit maintenance disabled' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Activate unit
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        unit = self.get_object()
        
        if unit.is_active is True:
            raise PermissionDenied(detail='Unit is already activated')
        
        # Change value, add signal setup
        unit.is_active = True
        unit.last_modified_by = request.user
        unit._activity_setup = {
            'current_owner': unit.owner,
            'activity_type': ActivityType.ACTIVATE,
            'notes': None,
            'activity_by': request.user
        }

        # Saving
        unit.save(update_fields=[
            'is_active',
            'last_modified_at',
            'last_modified_by'
        ])

        serializer = self.get_serializer(unit, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Unit activated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Deactivate unit
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        unit = self.get_object()

        if unit.is_active is False:
            raise PermissionDenied(detail='Unit is already deactivated')
        
        # Change value, add signal setup
        unit.is_active = False
        unit.last_modified_by = request.user
        unit._activity_setup = {
            'current_owner': unit.owner,
            'activity_type': ActivityType.DEACTIVATE,
            'notes': None,
            'activity_by': request.user
        }
        
        # Saving
        unit.save(update_fields=[
            'is_active',
            'last_modified_at',
            'last_modified_by'
        ])

        serializer = self.get_serializer(unit, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Unit deactivated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Assign owner
    @action(methods=['POST'], detail=True, url_path='assign-owner')
    def assign_owner(self, request, *args, **kwargs):
        unit = self.get_object()
        notes = request.data.get('notes', None)

        # Check if unit already have an owner and not replacing
        if unit.owner:
            raise PermissionDenied(
                detail='Unit already have a owner. You should check out last owner first instead'
            )

        # Unit value validation
        try:
            owner_id = request.data['resident']
        except Exception as e:
            raise PermissionDenied(detail='Owner is required')
        
        unit_serializer = self.get_serializer(
            unit,
            data={ 'owner': owner_id },
            partial=True
        )
        unit_serializer.is_valid(raise_exception=True)

        # Change value, add signal setup
        owner = unit_serializer.validated_data['owner']
        owner.is_owner = True
        unit.owner = owner
        unit._activity_setup = {
            'current_owner': owner,
            'activity_type': ActivityType.MOVE_IN,
            'notes': notes,
            'activity_by': request.user
        }

        # Saving
        unit.save(update_fields=[
            'owner',
            'last_modified_at',
            'last_modified_by'
        ])
        owner.save()

        serializer = UnitExtendedSerializer(unit, many=False)
        return Response(serializer.data)
    
    # Get ownership count
    @action(methods=['GET'], detail=False, url_path='ownership-count')
    def ownership_count(self, request, *args, **kwargs):
        units = self.get_queryset()

        data_ = {
            'labels': [
                'Owned', 
                'Available'
            ],
            'datas': [
                units.filter(owner__isnull=False).count(), 
                units.filter(owner__isnull=True).count()
            ]
        }
        
        return JsonResponse(data_)


class UnitActivityViewSet(NestedViewSetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = UnitActivity.objects.all()
    serializer_class = UnitActivityNestedSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

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
            queryset = queryset.filter(unit__id=self.kwargs['parent_lookup_id'])[:5]
        else:
            pass

        return queryset

    # Override get_serializer_class for default action
    def get_serializer_class(self):
        # Get serializer for non nested
        if 'parent_lookup_id' not in self.kwargs:
            return UnitActivityNonNestedSerializer
        else:
            pass

        # Return original class
        return super().get_serializer_class()


    # Get unit activity overview
    @action(methods=['GET'], detail=False, url_path='overview')
    def get_overview(self, request, *args, **kwargs):
        # Get this year's activities
        current_date = now()
        activities = UnitActivity.objects.all().filter(activity_at__year=current_date.year)

        # Prepare response data
        by_type = []
        agg_data = activities.aggregate(
            move_in=Count('id', filter=Q(activity_type=ActivityType.MOVE_IN)),
            move_out=Count('id', filter=Q(activity_type=ActivityType.MOVE_OUT), distinct=True),
            activate=Count('id', filter=Q(activity_type=ActivityType.ACTIVATE)),
            deactivate=Count('id', filter=Q(activity_type=ActivityType.DEACTIVATE)),
            enable_maintenance=Count('id', filter=Q(activity_type=ActivityType.ENABLE_MAINTENANCE)),
            disable_maintenance=Count('id', filter=Q(activity_type=ActivityType.DISABLE_MAINTENANCE))
        )

        for key in agg_data:
            by_type.append({
                'name': camel_to_capitalize(key),
                'value': agg_data[key]
            })
        
        return JsonResponse(by_type, safe=False)


class ParkingLotViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = ParkingLot.objects.all()
    serializer_class = ParkingLotSerializer
    serializer_class_admin = {
        'list_ext': ParkingLotExtendedSerializer,
        'retrieve_ext': ParkingLotExtendedSerializer,
        'assign_resident': ParkingLotPassSerializer
    }
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsAdminStaff
        ]

        return [permission() for permission in permission_classes]
    
    # Override get_serializer_class for default action
    def get_serializer_class(self):
        # Check serializer class by action
        if hasattr(self, 'serializer_class_admin'):
            return self.serializer_class_admin.get(self.action, self.serializer_class)

        # Return original class
        return super().get_serializer_class()
    
    def perform_create(self, serializer):
        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)
 
    # Get extended lots
    @action(methods=['GET'], detail=False, url_path='extended')
    def list_ext(self, request, *args, **kwargs):
        lots = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(lots, many=True)
        return Response(serializer.data)
    
    # Get extended lot
    @action(methods=['GET'], detail=True, url_path='extended')
    def retrieve_ext(self, request, *args, **kwargs):
        lot = self.get_object()
        serializer = self.get_serializer(lot, many=False)
        return Response(serializer.data)

    # Activate lot
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        lot = self.get_object()

        if lot.is_active is True:
            raise PermissionDenied(detail='Lot is already activated')
        
        lot.is_active = True
        lot.last_modified_at = now()
        lot.last_modified_by = request.user
        lot.save(update_fields=[
            'is_active',
            'last_modified_at',
            'last_modified_by'
        ])

        serializer = self.get_serializer(lot, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Lot activated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    # Deactivate lot
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        lot = self.get_object()

        if lot.is_active is False:
            raise PermissionDenied(detail='Lot is already deactivated')
        
        lot.is_active = False
        lot.last_modified_at = now()
        lot.last_modified_by = request.user
        lot.save(update_fields=[
            'is_active',
            'last_modified_at',
            'last_modified_by'
        ])

        serializer = self.get_serializer(lot, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'Lot deactivated' },
            status=status.HTTP_200_OK,
            headers=headers
        )
    
    # Assign resident
    @action(methods=['POST'], detail=True, url_path='assign-resident')
    def assign_resident(self, request, *args, **kwargs):
        lot = self.get_object()

        # Check if lot is occupied else append lot id to request data
        if lot.is_occupied:
            raise PermissionDenied(
                detail='Lot is occupied'
            )
        else:
            request.data['parking_lot'] = lot.id
        
        # Validate data
        pass_serializer = self.get_serializer(data=request.data)
        pass_serializer.is_valid(raise_exception=True)
        validated_data = pass_serializer.validated_data

        # Check if resident and vehicle's resident is not match
        if validated_data['resident'] != validated_data['vehicle'].resident:
            raise PermissionDenied(
                detail='Resident and vehicle is not matched'
            )

        # Check if access card is not active
        passes = ParkingLotPass.objects.all().filter(
            access_card_no=validated_data['access_card_no'],
            is_active=True
        )
        if passes.exists():
            raise PermissionDenied(
                detail='Access card is currently used'
            )

        # Create pass
        ParkingLotPass.objects.create(
            access_card_no=validated_data['access_card_no'],
            resident=validated_data['resident'],
            vehicle=validated_data['vehicle'],
            parking_lot=validated_data['parking_lot'],
            created_by=request.user
        )

        # # Update and save
        lot.is_occupied = True
        lot.last_modified_at = now()
        lot.last_modified_by = request.user
        lot.save(update_fields=[
            'is_occupied',
            'last_modified_at',
            'last_modified_by'
        ])

        serializer = ParkingLotExtendedSerializer(lot, many=False)
        return Response(serializer.data)

    # Checkout resident
    @action(methods=['GET'], detail=True, url_path='checkout-resident')
    def checkout_resident(self, request, *args, **kwargs):
        lot = self.get_object()
        current_pass = lot.lot_passes.first()
        current_time = now()

        # Check if lot is occupied
        if not lot.is_occupied:
            raise PermissionDenied(
                detail='Lot is not occupied'
            )

        # Update pass
        current_pass.ended_at = current_time
        current_pass.is_active = False
        current_pass.last_modified_at = current_time
        current_pass.last_modified_by = request.user

        # Update lot
        lot.is_occupied = False
        lot.last_modified_at = current_time
        lot.last_modified_by = request.user

        # Save pass and lot
        current_pass.save(update_fields=[
            'ended_at',
            'is_active',
            'last_modified_at',
            'last_modified_by'
        ])
        lot.save(update_fields=[
            'is_occupied',
            'last_modified_at',
            'last_modified_by'
        ])

        serializer = ParkingLotExtendedSerializer(lot, many=False)
        return Response(serializer.data)


class ParkingLotPassViewSet(NestedViewSetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = ParkingLotPass.objects.all()
    serializer_class = ParkingLotPassSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsAdminStaff
        ]

        return [permission() for permission in permission_classes]
