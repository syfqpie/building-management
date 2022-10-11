from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import PasswordResetSerializer

from allauth.account import app_settings
from allauth.account.adapter import get_adapter


from .forms import MyResetPasswordForm


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
