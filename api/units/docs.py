import enum

from rest_framework import status
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from residents.docs import RESIDENTS_EXT_OBJS, RESIDENTS_OBJS
from utils.helpers import DjangoFilterDescriptionInspector

# Constant
BLOCK_TAG = 'Blocks'
FLOOR_TAG = 'Floors'
UNIT_NUMBER_TAG = 'Unit numbers'
UNIT_TAG = 'Units'
BLOCK_OBJS = {
    'id': openapi.Schema(
        type=openapi.TYPE_NUMBER,
        description='Block ID',
        read_only=True,
        example=1
    ),
    'block': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Block',
        example='A'
    ),
    'isActive': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Is block active?',
        read_only=True,
        example=True
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
        description='Block entry created by',
        read_only=True,
        example=1
    ),
    'lastModifiedBy': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Block entry last modified by',
        read_only=True,
        example=1
    )
}
FLOOR_OBJS = {
    'id': openapi.Schema(
        type=openapi.TYPE_NUMBER,
        description='Floor ID',
        read_only=True,
        example=1
    ),
    'floor': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Floor',
        example='1'
    ),
    'isActive': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Is floor active?',
        read_only=True,
        example=True
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
        description='Floor entry created by',
        read_only=True,
        example=1
    ),
    'lastModifiedBy': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Floor entry last modified by',
        read_only=True,
        example=1
    )
}
UNIT_NUMBER_OBJS = {
    'id': openapi.Schema(
        type=openapi.TYPE_NUMBER,
        description='Unit number ID',
        read_only=True,
        example=1
    ),
    'unitNumber': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Unit number',
        example='1'
    ),
    'isActive': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Is unit number active?',
        read_only=True,
        example=True
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
        description='Unit number entry created by',
        read_only=True,
        example=1
    ),
    'lastModifiedBy': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Unit number entry last modified by',
        read_only=True,
        example=1
    )
}
UNIT_OBJS = {
    'id': openapi.Schema(
        type=openapi.TYPE_NUMBER,
        description='Unit ID',
        read_only=True,
        example=1
    ),
    'unitNo': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Unit no.',
        read_only=True,
        example='1'
    ),
    'squareFeet': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Unit size in square feet',
        example=1000
    ),
    'block': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Unit block',
        example=1
    ),
    'floor': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Unit floor',
        example=1
    ),
    'unitNumber': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Unit unit number',
        example=1
    ),
    'owner': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Unit owner',
        read_only=True,
        example=1
    ),
    'isActive': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Is unit active?',
        read_only=True,
        example=True
    ),
    'isMaintenance': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Is unit in maintenance?',
        read_only=True,
        example=True
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
        description='Unit entry created by',
        read_only=True,
        example=1
    ),
    'lastModifiedBy': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Unit entry last modified by',
        read_only=True,
        example=1
    )
}
UNIT_EXT_OBJS = {
    'owner': openapi.Schema(
        type=openapi.TYPE_OBJECT,
        description='Unit owner information',
        read_only=True,
        properties=RESIDENTS_OBJS | RESIDENTS_EXT_OBJS
    ),
}


class DocuConfigBlock(enum.Enum):
    """BlockView's drf-yasg documentation configuration"""

    LIST = swagger_auto_schema(
        operation_id='List all blocks',
        operation_description='List all blocks information',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=BLOCK_OBJS
                        )
                    ]
                )
            )
        },
        tags=[BLOCK_TAG]
    )
    RETRIEVE = swagger_auto_schema(
        operation_id='Retrieve a block',
        operation_description='Retrieve a block information',
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=BLOCK_OBJS
                )
            )
        },
        tags=[BLOCK_TAG]
    )
    CREATE = swagger_auto_schema(
        operation_id='Create block',
        operation_description='Create a new block entry',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=BLOCK_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=BLOCK_OBJS
                )
            )
        },
        tags=[BLOCK_TAG]
    )
    PARTIAL_UPDATE = swagger_auto_schema(
        operation_id='Patch block',
        operation_description='Partial update a block entry',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=BLOCK_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=BLOCK_OBJS
                )
            )
        },
        tags=[BLOCK_TAG]
    )
    ACTIVATE = {
        'operation_id': 'Activate block',
        'operation_description': 'Activate a block',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example='Block activated'
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
                            description='Message detail',
                            example='Block is already activated'
                        )
                    }
                )
            )
        },
        'tags': [BLOCK_TAG]
    }
    DEACTIVATE = {
        'operation_id': 'Deactivate block',
        'operation_description': 'Deactivate a block',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example='Block deactivated'
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
                            description='Message detail',
                            example='Block is already deactivated'
                        )
                    }
                )
            )
        },
        'tags': [BLOCK_TAG]
    }
    

class DocuConfigFloor(enum.Enum):
    """FloorView's drf-yasg documentation configuration"""

    LIST = swagger_auto_schema(
        operation_id='List all floors',
        operation_description='List all floors information',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=FLOOR_OBJS
                        )
                    ]
                )
            )
        },
        tags=[FLOOR_TAG]
    )
    RETRIEVE = swagger_auto_schema(
        operation_id='Retrieve a floor',
        operation_description='Retrieve a floor information',
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=FLOOR_OBJS
                )
            )
        },
        tags=[FLOOR_TAG]
    )
    CREATE = swagger_auto_schema(
        operation_id='Create floor',
        operation_description='Create a new floor entry',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=FLOOR_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=FLOOR_OBJS
                )
            )
        },
        tags=[FLOOR_TAG]
    )
    PARTIAL_UPDATE = swagger_auto_schema(
        operation_id='Patch floor',
        operation_description='Partial update a floor entry',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=FLOOR_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=FLOOR_OBJS
                )
            )
        },
        tags=[FLOOR_TAG]
    )
    ACTIVATE = {
        'operation_id': 'Activate floor',
        'operation_description': 'Activate a floor',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example='Floor activated'
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
                            description='Message detail',
                            example='Floor is already activated'
                        )
                    }
                )
            )
        },
        'tags': [FLOOR_TAG]
    }
    DEACTIVATE = {
        'operation_id': 'Deactivate floor',
        'operation_description': 'Deactivate a floor',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example='Floor deactivated'
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
                            description='Message detail',
                            example='Floor is already deactivated'
                        )
                    }
                )
            )
        },
        'tags': [FLOOR_TAG]
    }
    

class DocuConfigUnitNumber(enum.Enum):
    """UnitNumberView's drf-yasg documentation configuration"""

    LIST = swagger_auto_schema(
        operation_id='List all unit numbers',
        operation_description='List all unit numbers information',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=UNIT_NUMBER_OBJS
                        )
                    ]
                )
            )
        },
        tags=[UNIT_NUMBER_TAG]
    )
    RETRIEVE = swagger_auto_schema(
        operation_id='Retrieve a unit number',
        operation_description='Retrieve a unit number information',
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=UNIT_NUMBER_OBJS
                )
            )
        },
        tags=[UNIT_NUMBER_TAG]
    )
    CREATE = swagger_auto_schema(
        operation_id='Create unit number',
        operation_description='Create a new unit number entry',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=UNIT_NUMBER_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=UNIT_NUMBER_OBJS
                )
            )
        },
        tags=[UNIT_NUMBER_TAG]
    )
    PARTIAL_UPDATE = swagger_auto_schema(
        operation_id='Patch unit number',
        operation_description='Partial update a unit number entry',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=UNIT_NUMBER_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=UNIT_NUMBER_OBJS
                )
            )
        },
        tags=[UNIT_NUMBER_TAG]
    )
    ACTIVATE = {
        'operation_id': 'Activate unit number',
        'operation_description': 'Activate a unit number',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example='Unit number activated'
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
                            description='Message detail',
                            example='Unit number is already activated'
                        )
                    }
                )
            )
        },
        'tags': [UNIT_NUMBER_TAG]
    }
    DEACTIVATE = {
        'operation_id': 'Deactivate unit number',
        'operation_description': 'Deactivate a unit number',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example='Unit number deactivated'
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
                            description='Message detail',
                            example='Unit number is already deactivated'
                        )
                    }
                )
            )
        },
        'tags': [UNIT_NUMBER_TAG]
    }


class DocuConfigUnit(enum.Enum):
    """UnitView's drf-yasg documentation configuration"""

    LIST = swagger_auto_schema(
        operation_id='List all units',
        operation_description='List all units information',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=UNIT_OBJS
                        )
                    ]
                )
            )
        },
        tags=[UNIT_TAG]
    )
    RETRIEVE = swagger_auto_schema(
        operation_id='Retrieve a unit',
        operation_description='Retrieve a unit information',
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=UNIT_OBJS
                )
            )
        },
        tags=[UNIT_TAG]
    )
    CREATE = swagger_auto_schema(
        operation_id='Create unit',
        operation_description='Create a new unit entry',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=UNIT_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=UNIT_OBJS
                )
            )
        },
        tags=[UNIT_TAG]
    )
    PARTIAL_UPDATE = swagger_auto_schema(
        operation_id='Patch unit',
        operation_description='Partial update a unit entry',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=UNIT_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=UNIT_OBJS
                )
            )
        },
        tags=[UNIT_TAG]
    )
    DESTROY = swagger_auto_schema(
        operation_id='Remove a unit',
        operation_description='Destroy a unit entry',
        responses={
            status.HTTP_204_NO_CONTENT: openapi.Response(
                description='No content',
                schema=None
            )
        },
        tags=[UNIT_TAG]
    )
    ACTIVATE = {
        'operation_id': 'Activate unit',
        'operation_description': 'Activate a unit',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example='Unit activated'
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
                            description='Message detail',
                            example='Unit is already activated'
                        )
                    }
                )
            )
        },
        'tags': [UNIT_TAG]
    }
    DEACTIVATE = {
        'operation_id': 'Deactivate unit',
        'operation_description': 'Deactivate a unit',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example='Unit deactivated'
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
                            description='Message detail',
                            example='Unit is already deactivated'
                        )
                    }
                )
            )
        },
        'tags': [UNIT_TAG]
    }
    ENABLE_MAINTENANCE = {
        'operation_id': 'Enable maintenance unit',
        'operation_description': 'Enable maintenance a unit',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example='Unit maintenance enabled'
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
                            description='Message detail',
                            example='Unit maintenance is already enabled'
                        )
                    }
                )
            )
        },
        'tags': [UNIT_TAG]
    }
    DISABLE_MAINTENANCE = {
        'operation_id': 'Disable maintenance unit',
        'operation_description': 'Disable maintenance a unit',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example='Unit maintenance disabled'
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
                            description='Message detail',
                            example='Unit maintenance is already disabled'
                        )
                    }
                )
            )
        },
        'tags': [UNIT_TAG]
    }
    LIST_EXT = {
        'operation_id': 'List all units extended',
        'operation_description': 'List all units extended information',
        'filter_inspectors': [DjangoFilterDescriptionInspector],
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=UNIT_OBJS | UNIT_EXT_OBJS
                        )
                    ]
                )
            )
        },
        'tags': [UNIT_TAG]
    }
    RETRIEVE_EXT = {
        'operation_id': 'Retrieve a unit extended',
        'operation_description': 'Retrieve a unit extended information',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=UNIT_OBJS | UNIT_EXT_OBJS
                )
            )
        },
        'tags': [UNIT_TAG]
    }
    ASSIGN_OWNER = {
        'operation_id': 'Assign owner',
        'operation_description': 'Assign an owner to a unit',
        'request_body': openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['resident'],
            properties={
                'resident': openapi.Schema(
                    type=openapi.TYPE_NUMBER,
                    description='Resident ID',
                    example=1
                ),
                'notes': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Action notes',
                    example='Notes goes here'
                )
            }
        ),
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=UNIT_OBJS | UNIT_EXT_OBJS
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
                            example='Unit already have a owner. You should check out last owner first instead'
                        )
                    }
                )
            )
        },
        'tags': [UNIT_TAG]
    }
    OWNERSHIP_COUNT = {
        'operation_id': 'Ownership count',
        'operation_description': 'Get ownership count',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'labels': openapi.Schema(
                            description='Data labels',
                            type=openapi.TYPE_ARRAY,
                            items=[
                                openapi.Schema(
                                    type=openapi.TYPE_STRING,
                                    example='Owned'
                                ),
                                openapi.Schema(
                                    type=openapi.TYPE_STRING,
                                    example='Available'
                                )
                            ]
                        ),
                        'datas': openapi.Schema(
                            description='Data',
                            type=openapi.TYPE_ARRAY,
                            items=[
                                openapi.Schema(
                                    type=openapi.TYPE_INTEGER,
                                    example=4
                                ),
                                openapi.Schema(
                                    type=openapi.TYPE_INTEGER,
                                    example=1
                                )
                            ]
                        )
                    }
                )
            )
        },
        'tags': [UNIT_TAG]
    }
