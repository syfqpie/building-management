from django.contrib.auth.forms import SetPasswordForm
from django.utils.timezone import now
from django.utils.translation import gettext as _

from allauth.account import app_settings
from allauth.account.models import EmailAddress
from allauth.account.adapter import get_adapter
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from decouple import config

from .models import CustomUser, UserType


class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = [
            'id',
		    'full_name',
		    'user_type',
		    'email',
		    'is_active',
            'is_staff',
            'is_superuser',
            'last_login',
            'date_joined',
            'created_at',
		    'last_modified_at',
        ]
        read_only_fields = ['email']


class CustomUserNotSuperAdminSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = [
            'id',
		    'full_name',
		    'user_type',
		    'email',
		    'is_active',
            'is_staff',
            'is_superuser',
            'last_login',
            'date_joined',
            'created_at',
		    'last_modified_at',
        ]
        read_only_fields = [
            'user_type', 'email',
            'is_active', 'is_staff',
            'is_superuser'
        ]


class EmailVerificationSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = EmailAddress
        fields = [
            'email',
            'verified',
            'user'
        ]


class CustomResendVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=app_settings.EMAIL_MAX_LENGTH)


class CustomVerifyEmailSerializer(serializers.Serializer):
    key = serializers.CharField()
    new_password1 = serializers.CharField(max_length=128)
    new_password2 = serializers.CharField(max_length=128)


class CustomSetPasswordSerializer(serializers.Serializer):
    new_password1 = serializers.CharField(max_length=128)
    new_password2 = serializers.CharField(max_length=128)

    set_password_form_class = SetPasswordForm

    def __init__(self, *args, **kwargs):
        super(CustomSetPasswordSerializer, self).__init__(*args, **kwargs)
        self.request = self.context.get('request')
        self.user = self.request['user']

    def validate(self, attrs):
        self.set_password_form = self.set_password_form_class(
            user=self.user, data=attrs
        )

        if not self.set_password_form.is_valid():
            raise serializers.ValidationError(self.set_password_form.errors)
        return attrs

    def save(self):
        self.set_password_form.save()


class AdminCustomRegisterSerializer(RegisterSerializer):
    admin_user = serializers.PrimaryKeyRelatedField(read_only=True)
    full_name = serializers.CharField()
    is_superuser = serializers.BooleanField(required=False)
    email = serializers.EmailField(required=False, source='username')
    password1 = serializers.HiddenField(required=False, default=config('REGISTER_DEF_PWD', ''))
    password2 = serializers.HiddenField(required=False, default=config('REGISTER_DEF_PWD', ''))

    def get_cleaned_data(self):
        # Get extra parameter
        data = {
            'username': self.validated_data.get('username', None),
            'password1': self.validated_data.get('password1', None),
            'password2': self.validated_data.get('password2', None),
            'email': self.validated_data.get('username', None),
            'full_name': self.validated_data.get('full_name', None),
            'is_superuser': self.validated_data.get('is_superuser', False),
            'user_type': UserType.ADMIN,
            'is_staff': True
        }

        return data

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        return email
    
    def save(self, request):
        # Call default first
        admin_user = super().save(request)

        # To save this values
        admin_user.full_name = self.cleaned_data.get('full_name')
        admin_user.is_superuser = self.cleaned_data.get('is_superuser')
        admin_user.user_type = self.cleaned_data.get('user_type')
        admin_user.is_staff = self.cleaned_data.get('is_staff')

        admin_user.save()

        return admin_user


class CustomUserEmailSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = [
            'id',
		    'email'
        ]
        read_only_fields = ['email']