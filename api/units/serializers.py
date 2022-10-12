from django.utils.translation import gettext as _
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from residents.serializers import ResidentSerializer, ResidentVehicleSerializer
from users.serializers import CustomUserEmailSerializer

from .models import (
    Block, Floor, UnitNumber,
    Unit, UnitActivity,
    ParkingLot, ParkingLotPass
)


class BlockSerializer(serializers.ModelSerializer):
    """
    Base serializer for Block model
    """

    class Meta:
        model = Block
        fields = '__all__'


class BlockNoSerializer(serializers.ModelSerializer):
    """
    Serializer for Block model

    Restrict fields to id and block only
    """

    class Meta:
        model = Block
        fields = ['id', 'block']


class FloorSerializer(serializers.ModelSerializer):
    """
    Base serializer for Floor
    """

    class Meta:
        model = Floor
        fields = '__all__'


class FloorNoSerializer(serializers.ModelSerializer):
    """
    Serializer for Floor model

    Restrict fields to id and floor only
    """

    class Meta:
        model = Floor
        fields = ['id', 'floor']


class UnitNumberSerializer(serializers.ModelSerializer):
    """
    Base serializer for UnitNumber model
    """

    class Meta:
        model = UnitNumber
        fields = '__all__'


class UnitSerializer(serializers.ModelSerializer):
    """
    Base serializer for Unit model

    Unique validators; block, floor, unit_number
    """

    class Meta:
        model = Unit
        fields = '__all__'
        validators = [
            UniqueTogetherValidator(
                queryset=Unit.objects.all(),
                fields=[
                    'block',
                    'floor',
                    'unit_number'
                ],
                message='Block, floor, and unit number combination already exists'
            )
        ]


class UnitNoSerializer(serializers.ModelSerializer):
    """
    Serializer for Unit model

    Restrict fields to id and unit_no only
    """

    class Meta:
        model = Unit
        fields = ['id', 'unit_no']


class UnitExtendedSerializer(serializers.ModelSerializer):
    """
    Serializer for Unit model

    Extended owner field for view
    """
    owner = ResidentSerializer(many=False, read_only=True)
    
    class Meta:
        model = Unit
        fields = '__all__'


class UnitActivitySerializer(serializers.ModelSerializer):
    """
    Base serializer for UnitActivity model
    """

    class Meta:
        model = UnitActivity
        fields = '__all__'


class UnitActivityNonNestedSerializer(serializers.ModelSerializer):
    """
    Serializer for UnitActivity

    Extended unit and activity_by fields for view
    """
    unit = UnitNoSerializer(read_only=True)
    activity_by = CustomUserEmailSerializer(read_only=True)

    class Meta:
        model = UnitActivity
        exclude = [
            'current_owner',
        ]


class UnitActivityNestedSerializer(serializers.ModelSerializer):
    """
    Serializer for UnitActivity model

    Extended activity_by field for view
    """
    activity_by = CustomUserEmailSerializer(read_only=True)

    class Meta:
        model = UnitActivity
        exclude = [
            'current_owner',
            'unit'
        ]


class ParkingLotSerializer(serializers.ModelSerializer):
    """
    Base serializer for ParkingLot model
    """
    
    class Meta:
        model = ParkingLot
        fields = '__all__'
        read_only_fields = ['is_occupied']


class ParkingLotExtendedSerializer(serializers.ModelSerializer):
    """
    Serializer for ParkingLot model

    Extended block and floor fields for view
    """
    block = BlockNoSerializer(many=False, read_only=True)
    floor = FloorNoSerializer(many=False, read_only=True)

    class Meta:
        model = ParkingLot
        fields = '__all__'


class ParkingLotPassSerializer(serializers.ModelSerializer):
    """
    Base serializer for ParkingLotPass model
    """
    
    class Meta:
        model = ParkingLotPass
        fields = '__all__'


class ParkingLotPassCurrentSerializer(serializers.ModelSerializer):
    """
    Serializer for ParkingLotPass model

    Extended resident and vehicle fields for view
    """
    resident = ResidentSerializer(many=False, read_only=True)
    vehicle = ResidentVehicleSerializer(many=False, read_only=True)

    class Meta:
        model = ParkingLotPass
        exclude = [
            'parking_lot'
        ]
