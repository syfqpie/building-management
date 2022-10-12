import enum

from rest_framework import status
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from utils.helpers import DjangoFilterDescriptionInspector

# Constant
MEDIA_TAG = 'Medias'
MEDIA_OBJS = {
    'id': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Media ID',
        read_only=True,
        example=1
    ),
    'filename': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Media filename',
        example='Example_File'
    ),
    'file_extension': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='File extension type',
        example='pdf'
    ),
    'attachment': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Path to file',
        example='/medias/Example_File.pdf'
    ),
    'createdAt': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Entry creation date and time',
        read_only=True,
        example='2019-08-24T14:15:22Z'
    ),
    'createdAt': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Entry last modified date and time',
        read_only=True,
        example='2019-08-24T14:15:22Z'
    )
}


class DocuConfigMedia(enum.Enum):
    """MediaView's drf-yasg documentation configuration"""

    CREATE = swagger_auto_schema(
        operation_id='Create media',
        operation_description='Create a new media entry',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=MEDIA_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=MEDIA_OBJS
                )
            )
        },
        tags=[MEDIA_TAG]
    )
    LIST = swagger_auto_schema(
        operation_id='List all medias',
        operation_description='List all medias information',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=MEDIA_OBJS
                        )
                    ]
                )
            )
        },
        tags=[MEDIA_TAG]
    )
    RETRIEVE = swagger_auto_schema(
        operation_id='Retrieve media',
        operation_description='Retrieve a media information',
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=MEDIA_OBJS
                )
            )
        },
        tags=[MEDIA_TAG]
    )
    PARTIAL_UPDATE = swagger_auto_schema(
        operation_id='Patch media',
        operation_description='Partial update a media information',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=MEDIA_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=MEDIA_OBJS
                )
            )
        },
        tags=[MEDIA_TAG]
    )
    DESTROY = swagger_auto_schema(
        operation_id='Delete media',
        operation_description='Delete a media',
        tags=[MEDIA_TAG]
    )
