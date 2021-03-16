from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Block,
    Floor,
    UnitNumber,
    Unit
)

from proprietors.serializers import ProprietorSerializer
from complaints.serializers import ComplaintSerializer

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
    proprietor = ProprietorSerializer(many=False, read_only=True)
    unit_complaints = ComplaintSerializer(many=True, read_only=True)
    
    class Meta:
        model = Unit
        fields = '__all__'