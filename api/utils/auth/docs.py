import enum

from rest_framework import status
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

# Constant
DEF_TAG = 'Authentication'


class DocuConfigLogin(enum.Enum):
    """LoginView's drf-yasg documentation configuration"""

    POST = swagger_auto_schema(
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
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'accessToken': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Generated access token',
                            format='byte',
                            example=(
                                'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.'
                                'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                            )
                        ),
                        'refreshToken': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Generated refresh token',
                            format='byte',
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
                                    description='User\'s PK',
                                    example=1
                                ),
                                'username': openapi.Schema(
                                    type=openapi.TYPE_STRING,
                                    description='User\'s username',
                                    example='user@example.com'
                                ),
                                'email': openapi.Schema(
                                    type=openapi.TYPE_STRING,
                                    description='User\'s email',
                                    example='user@example.com'
                                ),
                                'firstName': openapi.Schema(
                                    type=openapi.TYPE_STRING,
                                    description='User\'s first name',
                                    example='John'
                                ),
                                'lastName': openapi.Schema(
                                    type=openapi.TYPE_STRING,
                                    description='User\'s last name',
                                    example='Doe'
                                )
                            }
                        )
                    }
                )
            ),
            status.HTTP_400_BAD_REQUEST: openapi.Response(
                description='Bad request',
                schema=openapi.Schema(
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
            )
        },
        tags=[DEF_TAG]
    )


class DocuConfigLogout(enum.Enum):
    """LogoutView's drf-yasg documentation configuration"""
    
    POST = swagger_auto_schema(
        operation_id='Login',
        request_body=None,
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example=(
                                'Neither cookies or blacklist are enabled, so the'
                                'token has not been deleted server side. Please make'
                                'sure the token is deleted client side.'
                            )
                        ),
                    }
                )
            )
        },
        tags=[DEF_TAG]
    )


class DocuConfigPasswordChange(enum.Enum):
    """PasswordChangeView's drf-yasg documentation configuration"""

    POST = swagger_auto_schema(
        operation_id='Change password',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['newPassword1', 'newPassword2'],
            properties={
                'newPassword1': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='New password',
                    format='password',
                    example='XXXXXXXXXXXXX'
                ),
                'newPassword2': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Confirm new password',
                    format='password',
                    example='XXXXXXXXXXXXX'
                )
            },
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={}
                )
            )
        },
        tags=[DEF_TAG]
    )


class DocuConfigPasswordReset(enum.Enum):
    """PasswordChangeView's drf-yasg documentation configuration"""

    POST = swagger_auto_schema(
        operation_id='Request to reset password',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email'],
            properties={
                'email': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Registered email',
                    format='email',
                    example='user@example.com'
                )
            },
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            example='Password reset e-mail has been sent.'
                        )
                    }
                )
            )
        },
        tags=[DEF_TAG]
    )


class DocuConfigTokenRefresh(enum.Enum):
    """TokenRefreshView's drf-yasg documentation configuration"""

    POST = swagger_auto_schema(
        operation_id='Refresh token',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['refresh'],
            properties={
                'refresh': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Refresh token',
                    example=(
                        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.'
                        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                    )
                )
            },
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'access': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Refreshed access token',
                            example=(
                                'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.'
                                'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                            )
                        ),
                    }
                )
            )
        },
        tags=[DEF_TAG]
    )


class DocuConfigTokenVerify(enum.Enum):
    """TokenVerifyView's drf-yasg documentation configuration"""

    POST = swagger_auto_schema(
        operation_id='Verify token',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['token'],
            properties={
                'token': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Access token',
                    example=(
                        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.'
                        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                    )
                )
            },
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={}
                )
            )
        },
        tags=[DEF_TAG]
    )


class DocuConfigVerifyEmail(enum.Enum):
    """VerifyEmailView's drf-yasg documentation configuration"""
    
    POST = {
        'request_body': openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['key', 'newPassword1', 'newPassword2'],
            properties={
                'key': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Key',
                    format='byte',
                    example='XXXXX.XXXXXXXXXXXX'
                ),
                'newPassword1': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='New password',
                    format='password',
                    example='XXXXXXXXXXXXX'
                ),
                'newPassword2': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Confirm new password',
                    format='password',
                    example='XXXXXXXXXXXXX'
                )
            },
        ),
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Return detail',
                examples={
                    'application/json': {
                        'detail': 'string'
                    }
                }
            )
        },
        'tags': [DEF_TAG]
    }
