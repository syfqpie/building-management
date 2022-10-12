from django.contrib.auth.forms import SetPasswordForm
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from allauth.account import app_settings
from dj_rest_auth.serializers import PasswordResetSerializer

from .forms import MyResetPasswordForm


class MyResendVerificationSerializer(serializers.Serializer):
    """
    Custom resend verification serializer
    """

    email = serializers.EmailField(max_length=app_settings.EMAIL_MAX_LENGTH)


class MyVerifyEmailSerializer(serializers.Serializer):
    """
    Custom verify email serializer
    
    User will receive a verification email and will be
    asked to change password to new password
    """

    key = serializers.CharField()
    new_password1 = serializers.CharField(max_length=128)
    new_password2 = serializers.CharField(max_length=128)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Override TokenObtainPairSerializer to
    add extra parameters to token
    """
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username
        token['email'] = user.email
        token['userType'] = user.user_type

        return token


class MyPasswordResetSerializer(PasswordResetSerializer):
    """
    Override PasswordResetSerializer
    """

    @property
    def password_reset_form_class(self):
        return MyResetPasswordForm


class MySetPasswordSerializer(serializers.Serializer):
    """
    Custom serializer to enable change password while
    verifying email
    """

    new_password1 = serializers.CharField(max_length=128)
    new_password2 = serializers.CharField(max_length=128)

    set_password_form_class = SetPasswordForm

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
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
