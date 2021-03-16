from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Complaint
)

# from units.serializers import UnitExtendedSerializer

class ComplaintSerializer(serializers.ModelSerializer):

    class Meta:
        model = Complaint
        fields = '__all__'


class ComplaintExtendedSerializer(serializers.ModelSerializer):

    # unit = UnitExtendedSerializer(many=False, read_only=True)
    
    class Meta:
        model = Complaint
        fields = '__all__'