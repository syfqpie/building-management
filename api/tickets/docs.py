import enum
from urllib import request

from rest_framework import status
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from utils.helpers import DjangoFilterDescriptionInspector

# Constant
TICKET_TAG_TAG = 'Ticket tags'
TICKET_TAG_OBJS = {
    'id': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Tag ID',
        read_only=True,
        example=1
    ),
    'tag': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Tag',
        example='Urgent'
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
    'createdBy': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Tag entry created by ID',
        read_only=True,
        example=1
    ),
    'lastModifiedBy': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Tag entry last modified by ID',
        read_only=True,
        example=1
    )
}

class DocuConfigTicketTag(enum.Enum):
    """TicketTagView's drf-yasg documentation configuration"""

    LIST = swagger_auto_schema(
        operation_id='List ticket tags',
        operation_description='List all ticket tags',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=TICKET_TAG_OBJS
                        )
                    ]
                )
            )
        },
        tags=[TICKET_TAG_TAG], 
    )
    RETRIEVE = swagger_auto_schema(
        operation_id='Retrieve a ticket tag',
        operation_description='Retrieve a ticket tag information',
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=TICKET_TAG_OBJS
                )
            )
        },
        tags=[TICKET_TAG_TAG], 
    )
    CREATE = swagger_auto_schema(
        operation_id='Create a ticket tag',
        operation_description='Create a new ticket tag entry',
        request_body=openapi.Schema(
            required=['tag'],
            type=openapi.TYPE_OBJECT,
            properties=TICKET_TAG_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=TICKET_TAG_OBJS
                )
            )
        },
        tags=[TICKET_TAG_TAG], 
    )
    PARTIAL_UPDATE = swagger_auto_schema(
        operation_id='Patch ticket tag',
        operation_description='Partial update a ticket tag information',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=TICKET_TAG_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=TICKET_TAG_OBJS
                )
            )
        },
        tags=[TICKET_TAG_TAG], 
    )
