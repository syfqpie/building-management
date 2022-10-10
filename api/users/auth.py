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

from core.helpers import (
    DjangoFilterDescriptionInspector,
    NoTitleAutoSchema,
    NoUnderscoreBeforeNumberCamelCaseJSONParser
)

from .forms import MyResetPasswordForm
from .models import CustomUser
from .serializers import (
    CustomResendVerificationSerializer,
    CustomSetPasswordSerializer,
    CustomVerifyEmailSerializer,
)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username
        token['email'] = user.email
        token['userType'] = user.user_type

        return token


@method_decorator(
    name='post', 
    decorator=swagger_auto_schema(
        operation_id='Login',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['username', 'password'],
            properties={
                'username': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Registered user email',
                    example='user@example.com'
                ),
                'password': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Password',
                    example='XXXXXXXXXXXXX'
                )
            },
        ),
        responses={
            status.HTTP_201_CREATED: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'accessToken': openapi.Schema(
                        type=openapi.TYPE_STRING,
                        description='Generated access token',
                        example=(
                            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.'
                            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                        )
                    ),
                    'refreshToken': openapi.Schema(
                        type=openapi.TYPE_STRING,
                        description='Generated refresh token',
                        example=(
                            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.'
                            'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                        )
                    ),
                    'user': openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        description='User information',
                        properties={
                            'pk': openapi.Schema(
                                type=openapi.TYPE_INTEGER,
                                example=1
                            ),
                            'username': openapi.Schema(
                                type=openapi.TYPE_STRING,
                                example='user@example.com'
                            ),
                            'email': openapi.Schema(
                                type=openapi.TYPE_STRING,
                                example='user@example.com'
                            ),
                            'firstName': openapi.Schema(
                                type=openapi.TYPE_STRING,
                                example='John'
                            ),
                            'lastName': openapi.Schema(
                                type=openapi.TYPE_STRING,
                                example='Doe'
                            )
                        }
                    )
                }
            ),
            status.HTTP_400_BAD_REQUEST: openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'nonFieldErrors': openapi.Schema(
                        type=openapi.TYPE_ARRAY,
                        description='Non field errors',
                        items=[''],
                        example=[
                            'Unable to log in with provided credentials.'
                        ]
                    ),
                }
            )
        },
        tags=['Authentication']
    )
)
class MyLoginView(LoginView):
    """
    Login
    
    Check the credentials and return JWT if the credentials 
    are valid and authenticated. Calls auth login method to
    register User ID in session

    Accept the following POST parameters: username, password
    Return the token object key.
    """
    pass


@method_decorator(
    name='post', 
    decorator=swagger_auto_schema(
        operation_id='Logout',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        tags=['Authentication']
    )
)
class MyLogoutView(LogoutView):
    """
    Logout
    
    Calls logout method and delete the token object
    assigned to the current User object.

    Accepts/Returns nothing.
    """
    http_method_names = ['post']


@method_decorator(
    name='post', 
    decorator=swagger_auto_schema(
        operation_id='Obtain token',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        tags=['Authentication']
    )
)
class MyTokenObtainPairView(TokenObtainPairView):
    """
    Obtain token
    
    Takes a set of user credentials and returns an access and refresh JSON web
    token pair to prove the authentication of those credentials.
    """
    serializer_class = MyTokenObtainPairSerializer


@method_decorator(
    name='post', 
    decorator=swagger_auto_schema(
        operation_id='Refresh token',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        tags=['Authentication']
    )
)
class MyTokenRefreshView(TokenRefreshView):
    """
    Refresh token

    Takes a refresh type JSON web token and returns an access type JSON web
    token if the refresh token is valid.
    """
    pass


@method_decorator(
    name='post', 
    decorator=swagger_auto_schema(
        operation_id='Verify token',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        tags=['Authentication']
    )
)
class MyTokenVerifyView(TokenVerifyView):
    """
    Verify token

    Takes a token and indicates if it is valid.  This view provides no
    information about a token's fitness for a particular use.
    """
    pass


@method_decorator(
    name='post', 
    decorator=swagger_auto_schema(
        operation_id='Change password',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        tags=['Authentication']
    )
)
class MyPasswordChangeView(PasswordChangeView):
    """
    Change password

    Accepts the following POST parameters: newPassword1, newPassword2

    Returns the success/fail message.
    """
    parser_classes = [NoUnderscoreBeforeNumberCamelCaseJSONParser]


class MyPasswordResetSerializer(PasswordResetSerializer):
    """
    Override PasswordResetSerializer
    """
    @property
    def password_reset_form_class(self):
        return MyResetPasswordForm


@method_decorator(
    name='post', 
    decorator=swagger_auto_schema(
        operation_id='Request to reset password',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        tags=['Authentication']
    )
)
class MyPasswordResetView(PasswordResetView):
    """
    Request to reset password
    
    Calls password save method.

    Accepts the following POST parameters: email

    Returns the success/fail message.
    """
    serializer_class = MyPasswordResetSerializer


@method_decorator(
    name='post', 
    decorator=swagger_auto_schema(
        operation_id='Confirm reset password',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        tags=['Authentication']
    )
)
class MyPasswordResetConfirmView(PasswordResetConfirmView):
    """
    Confirm reset password

    Password reset e-mail link is confirmed, therefore
    this resets the user's password.

    Accepts the following POST parameters: token, uid,
        new_password1, new_password2
    
    Returns the success/fail message.
    """
    parser_classes = [NoUnderscoreBeforeNumberCamelCaseJSONParser]
    

class MyPasswordResetForm(PasswordResetForm):
    """
    This is to add subject refix to the default email
    """
    def send_mail(self, subject_template_name, email_template_name,
                  context, from_email, to_email, html_email_template_name=None):
        """
        Send a django.core.mail.EmailMultiAlternatives to `to_email`.
        """
        subject = loader.render_to_string(subject_template_name, context)
        # Email subject *must not* contain newlines
        subject = ''.join(subject.splitlines())
        body = loader.render_to_string(email_template_name, context)

        email_message = EmailMultiAlternatives(subject, body, from_email, [to_email])
        if html_email_template_name is not None:
            html_email = loader.render_to_string(html_email_template_name, context)
            email_message.attach_alternative(html_email, 'text/html')

        email_message.send()


class MyCheckEmailVerificationView(APIView, ConfirmEmailView):
    """
    Check account verification
    
    Check whether the account is verified

    Accepts the following POST parameters: key
    
    Returns detail of verification status.
    """

    permission_classes = (AllowAny,)
    allowed_methods = ('POST', 'OPTIONS', 'HEAD')

    @swagger_auto_schema(
        request_body=VerifyEmailSerializer,
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Return detail',
                examples={
                    "application/json": {
                        'detail': 'string'
                    }
                }
            )
        },
        tags=['Authentication'])
    def post(self, request, *args, **kwargs):
        try:
            verify_email_serializer = VerifyEmailSerializer(data={'key': request.data['key']})        
            verify_email_serializer.is_valid(raise_exception=True)
            self.kwargs['key'] = verify_email_serializer.validated_data['key']
            confirmation = self.get_object()
            
            return Response(
                {
                    'email': confirmation.email_address.email,
                    'verified': confirmation.email_address.verified
                },
                status=status.HTTP_200_OK
            )
        
        except:
            return Response({'detail': _('Invalid key')}, status=status.HTTP_400_BAD_REQUEST)


class MyResendVerificationView(GenericAPIView):
    """
    Resend email verification
    
    Resend email verification

    Accepts the following POST parameters: email
    
    Returns detail of status.
    """

    permission_classes = (AllowAny,)
    allowed_methods = ('POST', 'OPTIONS', 'HEAD')

    @swagger_auto_schema(
        request_body=CustomResendVerificationSerializer,
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Return detail',
                examples={
                    "application/json": {
                        'detail': 'string'
                    }
                }
            )
        },
        tags=['Authentication'])
    def post(self, request, *args, **kwargs):
        try:
            serializer = CustomResendVerificationSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = CustomUser.objects.get(email=serializer.validated_data['email'])
            email_address = EmailAddress.objects.get(email=serializer.validated_data['email'])
            if not email_address.verified:
                send_email_confirmation(request, user, signup=False)
                return Response({'detail': _('Verification e-mail sent.')}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': _('This email address is verified')}, status=status.HTTP_400_BAD_REQUEST)
        except EmailAddress.DoesNotExist:
            return Response({'detail': _('E-mail is not registered')}, status=status.HTTP_400_BAD_REQUEST)


# @method_decorator(
#     name='post', 
#     decorator=swagger_auto_schema(
#         operation_id='Verify registration email for resident',
#         filter_inspectors=[DjangoFilterDescriptionInspector],
#         tags=['Authentication']
#     )
# )
class MyVerifyEmailView(VerifyEmailView):
    """
    Verify a new registered account
    
    Verify a new registered account in the system

    Accepts the following POST parameters: key,
        newPassword1, newPassword2
    
    Returns status detail.
    """
    parser_classes = [NoUnderscoreBeforeNumberCamelCaseJSONParser]
    
    @swagger_auto_schema(
        request_body=CustomVerifyEmailSerializer,
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Return detail',
                examples={
                    "application/json": {
                        'detail': 'string'
                    }
                }
            )
        },
        tags=['Authentication'])
    def post(self, request, *args, **kwargs):
        serializers = CustomVerifyEmailSerializer(data=request.data)
        serializers.is_valid(raise_exception=True)

        verify_email_serializer = VerifyEmailSerializer(data={'key': request.data['key']})        
        verify_email_serializer.is_valid(raise_exception=True)
        self.kwargs['key'] = verify_email_serializer.validated_data['key']
        confirmation = self.get_object()

        if confirmation.email_address.verified:
            return Response({'detail': _('This email address is verified')}, status=status.HTTP_400_BAD_REQUEST)
        
        User = get_user_model()
        user = User.objects.get(email=confirmation.email_address.email)
        user.activated_at = datetime.now(timezone.utc)

        set_password_serializer = CustomSetPasswordSerializer(
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

        confirmation.confirm(self.request)
        user.save()
        set_password_serializer.save()

        return Response({'detail': _('ok')}, status=status.HTTP_200_OK)

