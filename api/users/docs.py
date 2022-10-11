import enum

from rest_framework import status
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

# Constant
AUTH_TAG = 'Authentication'


class DocuConfigAdminCustomRegister(enum.Enum):
    """AdminCustomRegisterView's drf-yasg documentation configuration"""
    
    POST = swagger_auto_schema(
        operation_id='Register admin account',
        operation_description='Register new account for admin',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['username', 'fullName'],
            properties={
                'username': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='User\'s email',
                    format='email',
                    example='user@example.com'
                ),
                'fullName': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='User\'s full name',
                    example='John Doe'
                )
            },
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                examples={
                    'application/json': {
                        'detail': 'ok'
                    }
                }
            )
        },
        tags=[AUTH_TAG]
    )
