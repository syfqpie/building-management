from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

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


class UnitExtendedSerializer(serializers.ModelSerializer):

    block = BlockSerializer(many=False, read_only=True)
    floor = FloorSerializer(many=False, read_only=True)
    unit_number = UnitNumberSerializer(many=False, read_only=True)
    renter = RenterSerializer(many=False, read_only=True)
    
    class Meta:
        model = Unit
        fields = '__all__'