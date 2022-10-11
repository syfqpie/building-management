from datetime import datetime, timezone

from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordResetForm
from django.core.mail import EmailMultiAlternatives
from django.template import loader
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _

from allauth.account.models import EmailAddress
from allauth.account.utils import send_email_confirmation
from allauth.account.views import ConfirmEmailView

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from dj_rest_auth.registration.serializers import VerifyEmailSerializer
from dj_rest_auth.registration.views import VerifyEmailView
from dj_rest_auth.serializers import PasswordResetSerializer
from dj_rest_auth.views import (
    LoginView,
    LogoutView,
    PasswordResetView,
    PasswordResetConfirmView,
    PasswordChangeView,
)

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from utils.helpers import (
    DjangoFilterDescriptionInspector,
    NoTitleAutoSchema,
    NoUnderscoreBeforeNumberCamelCaseJSONParser
)

from .docs import (
    DocuConfigLogin,
    DocuConfigLogout,
    DocuConfigPasswordReset,
    DocuConfigTokenRefresh,
    DocuConfigTokenVerify,
    DocuConfigVerifyEmail,
    DocuConfigPasswordChange
)
from .serializers import MyPasswordResetSerializer


@method_decorator(name='post', decorator=DocuConfigLogin.POST)
class MyLoginView(LoginView):
    """
    Login
    
    Check the credentials and return JWT if the credentials 
    are valid and authenticated.
    
    Calls auth login method to register User ID in session.
    """
    pass


@method_decorator(name='post', decorator=DocuConfigLogout.POST)
class MyLogoutView(LogoutView):
    """
    Logout
    
    Calls logout method and delete the token object
    assigned to the current User object.
    """
    http_method_names = ['post']


@method_decorator(name='post', decorator=DocuConfigPasswordReset.POST)
class MyPasswordResetView(PasswordResetView):
    """
    Request to reset password
    
    Request a password resest link to be sent to registered email.
    """
    serializer_class = MyPasswordResetSerializer


@method_decorator(name='post', decorator=DocuConfigTokenRefresh.POST)
class MyTokenRefreshView(TokenRefreshView):
    """
    Refresh token

    Takes a refresh type JSON web token and returns an access
    type JSON web token if the refresh token is valid.
    """
    pass


@method_decorator(name='post', decorator=DocuConfigTokenVerify.POST)
class MyTokenVerifyView(TokenVerifyView):
    """
    Verify token

    Takes a token and indicates if it is valid. 
    
    This view provides no information about a token's fitness
    for a particular use.
    """
    pass