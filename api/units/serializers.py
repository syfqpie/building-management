from django.utils.translation import gettext as _
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from .models import (
    Block,
    Floor,
    UnitNumber,
    Unit
)

from renters.serializers import RenterSerializer


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


class UnitExtendedSerializer(serializers.ModelSerializer):
    renter = RenterSerializer(many=False, read_only=True)
    
    class Meta:
        model = Unit
        fields = '__all__'
