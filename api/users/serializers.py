from django.utils.timezone import now
from django.utils.translation import gettext as _

from allauth.account import app_settings
from rest_framework import serializers

from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = '__all__'
        read_only_fields = ('email', 'id')

class CustomResendVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=app_settings.EMAIL_MAX_LENGTH)