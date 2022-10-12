import enum
from urllib import request

from rest_framework import status
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from utils.helpers import DjangoFilterDescriptionInspector

from .models import TicketStatus, TicketCategory, TicketPriority

# Constant
TICKET_TAG_TAG = 'Ticket tags'
TICKET_TAG = 'Tickets'
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
TICKET_OBJS = {
    'id': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Ticket ID',
        read_only=True,
        example=1
    ),
    'ticketNo': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Ticket reference no.',
        read_only=True,
        example='TICKET22080003'
    ),
    'title': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Ticket title',
        example='Example title'
    ),
    'description': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Ticket description',
        example='Description about ticket'
    ),
    'unit': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Related unit ID (if any)',
        example=1
    ),
    'tags': openapi.Schema(
        type=openapi.TYPE_ARRAY,
        description='Tags ID',
        items=[1, 2]
    ),
    'status': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Ticket current status',
        enum=TicketStatus.choices,
        default=TicketStatus.OPENED,
        example=TicketStatus.CLOSED
    ),
    'category': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Ticket category',
        enum=TicketCategory.choices,
        default=TicketCategory.SYS,
        example=TicketCategory.UNIT
    ),
    'assignee': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Ticket assigned to ID',
        example=1
    ),
    'priority': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Ticket priority',
        enum=TicketPriority.choices,
        default=TicketPriority.NORMAL,
        example=TicketPriority.HIGH
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
        description='Ticket entry created by ID',
        read_only=True,
        example=1
    ),
    'lastModifiedBy': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Ticket entry last modified by ID',
        read_only=True,
        example=1
    )
}
TICKET_EXT_OBJS = {
    'unit': openapi.Schema(
        description='Unit information',
        type=openapi.TYPE_OBJECT,
        read_only=True,
        properties={
            'id': openapi.Schema(
                type=openapi.TYPE_INTEGER,
                description='Unit ID',
                read_only=True,
                example=1
            ),
            'unitNo': openapi.Schema(
                type=openapi.TYPE_STRING,
                description='Unit no.',
                read_only=True,
                example='A-1-1'
            )
        }
    ),
    'assignee': openapi.Schema(
        description='Assignee information',
        type=openapi.TYPE_OBJECT,
        read_only=True,
        properties={
            'id': openapi.Schema(
                type=openapi.TYPE_INTEGER,
                description='Assignee ID',
                read_only=True,
                example=1
            ),
            'email': openapi.Schema(
                type=openapi.TYPE_STRING,
                description='Assignee email',
                read_only=True,
                example='user@example.com'
            )
        }
    )
}
OVERVIEW_OBJS = {
    'count': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        example=10
    ),
    'percentage': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        example=25
    )
}
MONTHLY_OVERVIEW_OBJS = {
    'name': openapi.Schema(
        type=openapi.TYPE_STRING,
        example='Jan'
    ),
    'value': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        example=25
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


class DocuConfigTicket(enum.Enum):
    """TicketView's drf-yasg documentation configuration"""

    LIST = swagger_auto_schema(
        operation_id='List tickets',
        operation_description='List all tickets',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=TICKET_OBJS
                        )
                    ]
                )
            )
        },
        tags=[TICKET_TAG], 
    )
    RETRIEVE = swagger_auto_schema(
        operation_id='Retrieve a ticket',
        operation_description='Retrieve a ticket information',
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=TICKET_OBJS
                )
            )
        },
        tags=[TICKET_TAG], 
    )
    CREATE = swagger_auto_schema(
        operation_id='Create a ticket',
        operation_description='Create a new ticket entry',
        request_body=openapi.Schema(
            required=['tag'],
            type=openapi.TYPE_OBJECT,
            properties=TICKET_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=TICKET_OBJS
                )
            )
        },
        tags=[TICKET_TAG], 
    )
    PARTIAL_UPDATE = swagger_auto_schema(
        operation_id='Patch ticket',
        operation_description='Partial update a ticket information',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=TICKET_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=TICKET_OBJS
                )
            )
        },
        tags=[TICKET_TAG], 
    )
    RETRIEVE_EXT = {
        'operation_id': 'Retrieve a ticket extended',
        'operation_description': 'Retrieve a ticket extended information',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=TICKET_OBJS | TICKET_EXT_OBJS
                )
            )
        },
        'tags': [TICKET_TAG]
    }
    UPDATE_STATUS = {
        'operation_id': 'Update ticket status',
        'operation_description': 'Update a ticket status',
        'request_body': openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'status': openapi.Schema(
                    type=openapi.TYPE_INTEGER,
                    description='Status to change',
                    enum=TicketStatus.choices,
                    example=TicketStatus.CLOSED
                ),
                'notes': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Notes to append',
                    example='Update note'
                )
            }
        ),
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            example='Ticket status updated to Closed'
                        )
                    }
                )
            ),
            status.HTTP_403_FORBIDDEN: openapi.Response(
                description='Forbidden',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            example='You have updated to this status already'
                        )
                    }
                )
            )
        },
        'tags': [TICKET_TAG]
    }
    OVERVIEW = {
        'operation_id': 'Get ticket overview',
        'operation_description': 'Get ticket overview information',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'tickets': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=OVERVIEW_OBJS
                        ),
                        'opened': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=OVERVIEW_OBJS
                        ),
                        'inProgress': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=OVERVIEW_OBJS
                        ),
                        'completed': openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=OVERVIEW_OBJS
                        )
                    }
                )
            )
        },
        'tags': [TICKET_TAG]
    }
    STATUS_OVERVIEW = {
        'operation_id': 'Get ticket status overview',
        'operation_description': 'Get ticket status overview information',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'name': openapi.Schema(
                                    type=openapi.TYPE_STRING,
                                    example='Opened'
                                ),
                                'series': openapi.Schema(
                                    type=openapi.TYPE_ARRAY,
                                    items=[
                                        openapi.Schema(
                                            type=openapi.TYPE_OBJECT,
                                            properties=MONTHLY_OVERVIEW_OBJS
                                        )
                                    ]
                                )
                            }
                        )
                    ]
                )
            )
        },
        'tags': [TICKET_TAG]
    }
    PRIORITY_OVERVIEW = {
        'operation_id': 'Get ticket priority overview',
        'operation_description': 'Get ticket priority overview information',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties={
                                'name': openapi.Schema(
                                    type=openapi.TYPE_STRING,
                                    example='Critical'
                                ),
                                'value': openapi.Schema(
                                    type=openapi.TYPE_INTEGER,
                                    example=2
                                )
                            }
                        )
                    ]
                )
            )
        },
        'tags': [TICKET_TAG]
    }
