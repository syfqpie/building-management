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
        Serializer for block
    """

    class Meta:
        model = Block
        fields = '__all__'


class BlockNoSerializer(serializers.ModelSerializer):
    """
        Serializer for block no
    """

    class Meta:
        model = Block
        fields = ['id', 'block']


class FloorSerializer(serializers.ModelSerializer):
    """
        Serializer for floor
    """

    class Meta:
        model = Floor
        fields = '__all__'


class FloorNoSerializer(serializers.ModelSerializer):
    """
        Serializer for floor no
    """

    class Meta:
        model = Floor
        fields = ['id', 'floor']


class UnitNumberSerializer(serializers.ModelSerializer):
    """
        Serializer for unit number
    """

    class Meta:
        model = UnitNumber
        fields = '__all__'


class UnitSerializer(serializers.ModelSerializer):
    """
        Serializer for unit
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
        Serializer for unit no
    """

    class Meta:
        model = Unit
        fields = ['id', 'unit_no']


class UnitExtendedSerializer(serializers.ModelSerializer):
    """
        Serializer for unit extended
    """
    owner = ResidentSerializer(many=False, read_only=True)
    
    class Meta:
        model = Unit
        fields = '__all__'


class UnitActivitySerializer(serializers.ModelSerializer):
    """
        Serializer for unit activity
    """

    class Meta:
        model = UnitActivity
        fields = '__all__'


class UnitActivityNonNestedSerializer(serializers.ModelSerializer):
    """
        Serializer for unit activity non nested
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
        Serializer for unit activity nested
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
        Serializer for parking lot
    """
    
    class Meta:
        model = ParkingLot
        fields = '__all__'
        read_only_fields = ['is_occupied']


class ParkingLotExtendedSerializer(serializers.ModelSerializer):
    """
        Serializer for parking lot extended
    """
    block = BlockNoSerializer(many=False, read_only=True)
    floor = FloorNoSerializer(many=False, read_only=True)

    class Meta:
        model = ParkingLot
        fields = '__all__'


class ParkingLotPassSerializer(serializers.ModelSerializer):
    """
        Serializer for parking lot pass
    """
    
    class Meta:
        model = ParkingLotPass
        fields = '__all__'


class ParkingLotPassCurrentSerializer(serializers.ModelSerializer):
    """
        Serializer for parking lot pass
    """
    resident = ResidentSerializer(many=False, read_only=True)
    vehicle = ResidentVehicleSerializer(many=False, read_only=True)

    class Meta:
        model = ParkingLotPass
        exclude = [
            'parking_lot'
        ]
