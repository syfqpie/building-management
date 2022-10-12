from datetime import datetime, timezone

from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _

from allauth.account.models import EmailAddress
from allauth.account.utils import send_email_confirmation

from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)

from dj_rest_auth.registration.serializers import VerifyEmailSerializer
from dj_rest_auth.registration.views import VerifyEmailView
from dj_rest_auth.views import (
    LoginView,
    LogoutView,
    PasswordResetView,
    PasswordResetConfirmView,
    PasswordChangeView,
)

from drf_yasg.utils import swagger_auto_schema

from users.models import (
    CustomUser
)
from utils.helpers import (
    NoUnderscoreBeforeNumberCamelCaseJSONParser
)

from .docs import (
    DocuConfigLogin,
    DocuConfigLogout,
    DocuConfigPasswordReset,
    DocuConfigPasswordResetConfirm,
    DocuConfigResendVerification,
    DocuConfigTokenRefresh,
    DocuConfigTokenVerify,
    DocuConfigVerifyEmail,
    DocuConfigPasswordChange
)
from .serializers import (
    MyResendVerificationSerializer,
    MyVerifyEmailSerializer,
    MySetPasswordSerializer,
    MyPasswordResetSerializer
)


@method_decorator(name='post', decorator=DocuConfigLogin.POST)
class MyLoginView(LoginView):
    """
    Login
    
    Check the credentials and return JWT if the credentials 
    are valid and authenticated.
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


@method_decorator(name='post', decorator=DocuConfigPasswordChange.POST)
class MyPasswordChangeView(PasswordChangeView):
    """
    Change password

    Change user account password.
    """
    parser_classes = [NoUnderscoreBeforeNumberCamelCaseJSONParser]


@method_decorator(name='post', decorator=DocuConfigPasswordReset.POST)
class MyPasswordResetView(PasswordResetView):
    """
    Request to reset password
    
    Request a password resest link to be sent to registered email.
    """
    serializer_class = MyPasswordResetSerializer


@method_decorator(name='post', decorator=DocuConfigPasswordResetConfirm.POST)
class MyPasswordResetConfirmView(PasswordResetConfirmView):
    """
    Confirm reset password

    Password reset email link is confirmed, therefore
    this resets the user's password.
    """
    parser_classes = [NoUnderscoreBeforeNumberCamelCaseJSONParser]


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


class MyResendVerificationView(GenericAPIView):
    """
    Resend email verification

    Resend email verification to registered email
    if the account is not verified yet.
    """

    permission_classes = (AllowAny,)
    allowed_methods = ('POST', 'OPTIONS', 'HEAD')

    @swagger_auto_schema(**DocuConfigResendVerification.POST.value)
    def post(self, request, *args, **kwargs):
        # Check email existance first
        try:
            serializer = MyResendVerificationSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = CustomUser.objects.get(email=serializer.validated_data['email'])
            email_address = EmailAddress.objects.get(email=serializer.validated_data['email'])

            # If exist
            if not email_address.verified:
                # Send email if exist and not verified
                send_email_confirmation(request, user, signup=False)
                return Response({'detail': _('Verification e-mail sent.')}, status=status.HTTP_200_OK)
            else:
                # Return 400 if exist and already verified
                return Response({'detail': _('This email address is verified')}, status=status.HTTP_400_BAD_REQUEST)
        except EmailAddress.DoesNotExist:
            # If not exist
            return Response({'detail': _('E-mail is not registered')}, status=status.HTTP_400_BAD_REQUEST)


class MyVerifyEmailView(VerifyEmailView):
    """
    Verify account
    
    Verify a new registered account in the system.
    """
    
    parser_classes = [NoUnderscoreBeforeNumberCamelCaseJSONParser]
    
    @swagger_auto_schema(**DocuConfigVerifyEmail.POST.value)
    def post(self, request, *args, **kwargs):
        # Email form validation
        serializers = MyVerifyEmailSerializer(data=request.data)
        serializers.is_valid(raise_exception=True)

        # Get email instance
        verify_email_serializer = VerifyEmailSerializer(data={'key': request.data['key']})        
        verify_email_serializer.is_valid(raise_exception=True)
        self.kwargs['key'] = verify_email_serializer.validated_data['key']
        confirmation = self.get_object()

        # If already verified, return 400
        if confirmation.email_address.verified:
            return Response({'detail': _('This email address is verified')}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get use instance and activation datetime
        User = get_user_model()
        user = User.objects.get(email=confirmation.email_address.email)
        user.activated_at = datetime.now(timezone.utc)

        # Password validation
        set_password_serializer = MySetPasswordSerializer(
            data={
                'new_password1': request.data['new_password1'],
                'new_password2': request.data['new_password2']
            },
            context={
                'request': {
                    'user': user
                }
            }
        )
        set_password_serializer.is_valid(raise_exception=True)

        # Confirm and save new password
        confirmation.confirm(self.request)
        user.save()
        set_password_serializer.save()

        # Return response
        return Response({'detail': _('ok')}, status=status.HTTP_200_OK)
