import enum
from urllib import request

from rest_framework import status
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from residents.models import TitleType, GenderType
from utils.helpers import DjangoFilterDescriptionInspector

# Constant
AUTH_TAG = 'Authentication'
RESIDENT_TAG = 'Residents'
RESIDENTS_OBJS = {
    'id': openapi.Schema(
        type=openapi.TYPE_NUMBER,
        description='Resident ID',
        read_only=True,
        example=1
    ),
    'residentNo': openapi.Schema(
        type=openapi.TYPE_NUMBER,
        description='Resident ID',
        read_only=True,
        example='RSDXXXXX'
    ),
    'isOwner': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Is resident an owner',
        read_only=True,
        example=False
    ),
    'name': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Resident name',
        example='John doe'
    ),
    'phoneNo': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Resident phone no.',
        example='XXX-XXXXXXX'
    ),
    'email': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Resident email',
        example='user@example.com'
    ),
    'isActive': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Is resident is active',
        read_only=True,
        example=False
    ),
    'createdAt': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Entry creation date and time',
        read_only=True,
        example='2019-08-24T14:15:22Z'
    )
}
RESIDENTS_EXT_OBJS = {
    'title': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Resident title',
        enum=TitleType.choices,
        example=1
    ),
    'nric': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Resident NRIC',
        example='XXXXXX-XX-XXXX'
    ),
    'gender': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Resident gender',
        enum=GenderType.choices,
        example=1
    ),
    'lastPaymentAt': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Entry last payment date and time',
        read_only=True,
        example='2019-08-24T14:15:22Z'
    ),
    'residentUser': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Resident user ID',
        read_only=True,
        example=1
    ),
    'createdBy': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Resident entry created by',
        read_only=True,
        example=1
    ),
    'lastModifiedAt': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Entry last modified date and time',
        read_only=True,
        example='2019-08-24T14:15:22Z'
    ),
    'lastModifiedBy': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Resident entry last modified by',
        read_only=True,
        example=1
    )
}


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


class DocuConfigResident(enum.Enum):
    """ResidentView's drf-yasg documentation configuration"""

    LIST = swagger_auto_schema(
        operation_id='Get all residents',
        operation_description='Retrieve all residents information',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=RESIDENTS_OBJS
                        )
                    ]
                )
            )
        },
        tags=[RESIDENT_TAG]
    )
    RETRIEVE = swagger_auto_schema(
        operation_id='Get resident',
        operation_description='Retrieve a resident information',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=RESIDENTS_OBJS | RESIDENTS_EXT_OBJS
                )
            )
        },
        tags=[RESIDENT_TAG]
    )
    PARTIAL_UPDATE = swagger_auto_schema(
        operation_id='Patch resident',
        operation_description='Partial update a resident information',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=RESIDENTS_OBJS | RESIDENTS_EXT_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=RESIDENTS_OBJS | RESIDENTS_EXT_OBJS
                )
            )
        },
        tags=[RESIDENT_TAG]
    )
    DESTROY = swagger_auto_schema(
        operation_id='Delete resident',
        operation_description='Delete a resident',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        tags=[RESIDENT_TAG]
    )
    ACTIVATE = {
        'operation_id': 'Activate resident',
        'operation_description': 'Activate a resident',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=RESIDENTS_OBJS | RESIDENTS_EXT_OBJS
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
                            example='Resident is already activated'
                        )
                    }
                )
            )
        },
        'tags': [RESIDENT_TAG]
    }
    DEACTIVATE = {
        'operation_id': 'Deactivate resident',
        'operation_description': 'Deactivate a resident',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=RESIDENTS_OBJS | RESIDENTS_EXT_OBJS
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
                            example='Resident is already deactivated'
                        )
                    }
                )
            )
        },
        'tags': [RESIDENT_TAG]
    }

    # Disabled
    CREATE = swagger_auto_schema(auto_schema=None)
