import enum

from rest_framework import status
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

# Constant
AUTH_TAG = 'Authentication'


class DocuConfigResidentCustomRegister(enum.Enum):
    """ResidentCustomRegisterView's drf-yasg documentation configuration"""
    
    POST = swagger_auto_schema(
        operation_id='Register resident account',
        operation_description='Register new account for a resident',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=[
                'username', 'name', 'title',
                'gender', 'nric', 'phoneNo'
            ],
            properties={
                'username': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='User\'s email',
                    format='email',
                    example='user@example.com'
                ),
                'name': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='User\'s full name',
                    example='John Doe'
                ),
                'title': openapi.Schema(
                    type=openapi.TYPE_INTEGER,
                    description='User\'s title',
                    example=1
                ),
                'gender': openapi.Schema(
                    type=openapi.TYPE_INTEGER,
                    description='User\'s gender',
                    example=1
                ),
                'nric': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='User\'s NRIC no.',
                    example='XXXXXX-XX-XXXX'
                ),
                'phoneNo': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='User\'s phone no.',
                    example='XXX-XXXXXXX'
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
