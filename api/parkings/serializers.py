from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    ParkingUnit,
    ParkingLot,
    ParkingOwner
)

from units.serializers import (
    BlockSerializer,
    FloorSerializer,
    UnitSerializer
)

class ParkingUnitSerializer(serializers.ModelSerializer):

    class Meta:
        model = ParkingUnit
        fields = '__all__'

class ParkingLotSerializer(serializers.ModelSerializer):

    class Meta:
        model = ParkingLot
        fields = '__all__'

class ParkingLotExtendedSerializer(serializers.ModelSerializer):

    block = BlockSerializer(many=False)
    floor = FloorSerializer(many=False)
    parking_unit = ParkingUnitSerializer(many=False)
    class Meta:
        model = ParkingLot
        fields = '__all__'

class ParkingOwnerSerializer(serializers.ModelSerializer):

    class Meta:
        model = ParkingOwner
        fields = '__all__'

class ParkingOwnerExtendedSerializer(serializers.ModelSerializer):
    
    unit = UnitSerializer(many=False)
    lot = ParkingLotExtendedSerializer(many=False)
    class Meta:
        model = ParkingOwner
        fields = '__all__'