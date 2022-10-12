import enum

from rest_framework import status
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from utils.helpers import DjangoFilterDescriptionInspector

from .models import UserType

# Constant
AUTH_TAG = 'Authentication'
USER_TAG = 'Users'
USERS_OBJS = {
    'id': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='User ID',
        read_only=True,
        example=1
    ),
    'fullName': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='User full name',
        example='John Doe'
    ),
    'userType': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='User type',
        read_only=True,
        enum=UserType.choices,
        default=UserType.PUBLIC,
        example=UserType.PUBLIC
    ),
    'email': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='User email',
        read_only=True,
        example='user@example.com'
    ),
    'isActive': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Is user active?',
        read_only=True,
        example=True
    ),
    'isStaff': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Is user staff?',
        read_only=True,
        example=False
    ),
    'isSuperuser': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Is user superuser?',
        read_only=True,
        example=False
    ),
    'lastLogin': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='User last login date and time',
        read_only=True,
        example='2019-08-24T14:15:22Z'
    ),
    'dateJoined': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='User join date and time',
        read_only=True,
        example='2019-08-24T14:15:22Z'
    ),
    'createdAt': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Entry creation date and time',
        read_only=True,
        example='2019-08-24T14:15:22Z'
    ),
    'lastModifiedAt': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Entry last modified date and time',
        read_only=True,
        example='2019-08-24T14:15:22Z'
    ),
}


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


class DocuConfigUser(enum.Enum):
    """CustomUserViewSet's drf-yasg documentation configuration"""

    LIST = swagger_auto_schema(
        operation_id='List all users',
        operation_description='List all users information',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=USERS_OBJS
                        )
                    ]
                )
            )
        },
        tags=[USER_TAG]
    )
    RETRIEVE = swagger_auto_schema(
        operation_id='Retrieve a user',
        operation_description='Retrieve a user information',
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=USERS_OBJS
                )
            )
        },
        tags=[USER_TAG]
    )
    PARTIAL_UPDATE = swagger_auto_schema(
        operation_id='Patch a user',
        operation_description='Partial update a user information',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=USERS_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=USERS_OBJS
                )
            )
        },
        tags=[USER_TAG]
    )
    DESTROY = swagger_auto_schema(
        operation_id='Remove a user',
        operation_description='Destroy a user entry',
        responses={
            status.HTTP_204_NO_CONTENT: openapi.Response(
                description='No content',
                schema=None
            )
        },
        tags=[USER_TAG]
    )
    ACTIVATE = {
        'operation_id': 'Activate user account',
        'operation_description': 'Activate a user account',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=USERS_OBJS
                )
            ),
            status.HTTP_403_FORBIDDEN: openapi.Response(
                description='Forbidden',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example='User account is already activated'
                        )
                    }
                )
            )
        },
        'tags': [USER_TAG]
    }
    DEACTIVATE = {
        'operation_id': 'Deactivate user account',
        'operation_description': 'Deactivate a user account',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=USERS_OBJS
                )
            ),
            status.HTTP_403_FORBIDDEN: openapi.Response(
                description='Forbidden',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example='User account is already deactivated'
                        )
                    }
                )
            )
        },
        'tags': [USER_TAG]
    }
    ACCOUNT_INFORMATION = {
        'operation_id': 'Retrieve self account information',
        'operation_description': 'Retrieve an extended self account information',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=USERS_OBJS
                )
            )
        },
        'tags': [USER_TAG]
    }
    USER_VERIFICATIONS = {
        'operation_id': 'List all users verification',
        'operation_description': 'List all users with verification',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'email': openapi.Schema(
                                    type=openapi.TYPE_STRING,
                                    description='User email',
                                    read_only=True,
                                    example='user@example.com'
                                ),
                                'verified': openapi.Schema(
                                    type=openapi.TYPE_BOOLEAN,
                                    description='Is account verified?',
                                    read_only=True,
                                    example=False
                                ),
                                'user': openapi.Schema(
                                    type=openapi.TYPE_OBJECT,
                                    description='User information',
                                    read_only=True,
                                    properties=USERS_OBJS
                                ),
                            }
                        )
                    ]
                )
            )
        },
        'tags': [USER_TAG]
    }
    USER_SIMPLIFIED = {
        'operation_id': 'List all users simplified',
        'operation_description': 'List all users simplified',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'id': openapi.Schema(
                                    type=openapi.TYPE_INTEGER,
                                    description='User ID',
                                    read_only=True,
                                    example=1
                                ),
                                'email': openapi.Schema(
                                    type=openapi.TYPE_STRING,
                                    description='User email',
                                    read_only=True,
                                    example='user@example.com'
                                )
                            }
                        )
                    ]
                )
            )
        },
        'tags': [USER_TAG]
    }


    # Disabled
    CREATE = swagger_auto_schema(auto_schema=None)