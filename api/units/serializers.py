from django.utils.translation import gettext as _
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from users.serializers import CustomUserEmailSerializer

from .models import (
    Block,
    Floor,
    UnitNumber,
    Unit,
    ParkingLot,
    UnitActivity
)

from residents.serializers import ResidentSerializer


class BlockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Block
        fields = '__all__'


class FloorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Floor
        fields = '__all__'


class UnitNumberSerializer(serializers.ModelSerializer):

    class Meta:
        model = UnitNumber
        fields = '__all__'


class UnitSerializer(serializers.ModelSerializer):

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
    
    class Meta:
        model = Unit
        fields = ['id', 'unit_no']


class UnitExtendedSerializer(serializers.ModelSerializer):
    owner = ResidentSerializer(many=False, read_only=True)
    
    class Meta:
        model = Unit
        fields = '__all__'


class UnitActivitySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UnitActivity
        fields = '__all__'


class UnitActivityNonNestedSerializer(serializers.ModelSerializer):
    unit = UnitNoSerializer(read_only=True)
    activity_by = CustomUserEmailSerializer(read_only=True)
    class Meta:
        model = UnitActivity
        exclude = [
            'current_owner',
        ]


class UnitActivityNestedSerializer(serializers.ModelSerializer):
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