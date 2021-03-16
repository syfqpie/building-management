from datetime import datetime
from calendar import timegm
import json

from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings
from django.utils.translation import gettext as _
from rest_framework import serializers
from django.utils.timezone import now

from .models import (
    Billing
)

from medias.serializers import MediaSerializer
from units.serializers import UnitExtendedSerializer

class BillingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Billing
        fields = '__all__'


class BillingExtendedSerializer(serializers.ModelSerializer):

    unit = UnitExtendedSerializer(many=False, read_only=True)
    media = MediaSerializer(many=False, read_only=True)

    class Meta:
        model = Billing
        fields = '__all__'