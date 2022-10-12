import enum

from rest_framework import status
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from residents.models import VehicleType
from residents.docs import RESIDENTS_EXT_OBJS, RESIDENTS_OBJS
from utils.helpers import DjangoFilterDescriptionInspector

from .models import ActivityType

# Constant
BLOCK_TAG = 'Blocks'
FLOOR_TAG = 'Floors'
UNIT_NUMBER_TAG = 'Unit numbers'
UNIT_TAG = 'Units'
UNIT_ACTIVITY_TAG = 'Unit activities'
PARKING_LOT_TAG = 'Parking lots'
PARKING_LOT_PASS_TAG = 'Parking lot passes'
BLOCK_OBJS = {
    'id': openapi.Schema(
        type=openapi.TYPE_INTEGER,
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
        description='Block entry created by ID',
        read_only=True,
        example=1
    ),
    'lastModifiedBy': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Block entry last modified by ID',
        read_only=True,
        example=1
    )
}
FLOOR_OBJS = {
    'id': openapi.Schema(
        type=openapi.TYPE_INTEGER,
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
        description='Floor entry created by ID',
        read_only=True,
        example=1
    ),
    'lastModifiedBy': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Floor entry last modified by ID',
        read_only=True,
        example=1
    )
}
UNIT_NUMBER_OBJS = {
    'id': openapi.Schema(
        type=openapi.TYPE_INTEGER,
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
        description='Unit number entry created by ID',
        read_only=True,
        example=1
    ),
    'lastModifiedBy': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Unit number entry last modified by ID',
        read_only=True,
        example=1
    )
}
UNIT_OBJS = {
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
        example='1'
    ),
    'squareFeet': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Unit size in square feet',
        example=1000
    ),
    'block': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Unit block ID',
        example=1
    ),
    'floor': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Unit floor ID',
        example=1
    ),
    'unitNumber': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Unit unit number ID',
        example=1
    ),
    'owner': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Unit owner ID',
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
        description='Unit entry created by ID',
        read_only=True,
        example=1
    ),
    'lastModifiedBy': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Unit entry last modified by ID',
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
UNIT_ACTIVITY_OBJS = {
    'id': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Activity ID',
        read_only=True,
        example=1
    ),
    'unit': openapi.Schema(
        type=openapi.TYPE_OBJECT,
        description='Unit information',
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
    'activityBy': openapi.Schema(
        type=openapi.TYPE_OBJECT,
        description='Entry activity by',
        read_only=True,
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
    ),
    'activityType': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Activity type',
        enum=ActivityType.choices,
        read_only=True,
        example=ActivityType.ACTIVATE
    ),
    'notes': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Notes',
        read_only=True,
        example='Activated'
    ),
    'activityAt': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Entry activity date and time',
        read_only=True,
        example='2019-08-24T14:15:22Z'
    )
}
PARKING_LOT_OBJS = {
    'id': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Lot ID',
        read_only=True,
        example=1
    ),
    'lotNo': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Lot no.',
        read_only=True,
        example='XXXXX'
    ),
    'lotType': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Lot type',
        enum=VehicleType.choices,
        default=VehicleType.CAR,
        example=VehicleType.CAR
    ),
    'block': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Lot block ID',
        example=1
    ),
    'floor': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Lot floor',
        example=1
    ),
    'isOccupied': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Is lot occupied?',
        read_only=True,
        example=True
    ),
    'isActive': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Is lot active?',
        read_only=True,
        example=True
    ),
    'createdAt': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Lot creation date and time',
        read_only=True,
        example='2019-08-24T14:15:22Z'
    ),
    'lastModifiedAt': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Lot last modification date and time',
        read_only=True,
        example='2019-08-24T14:15:22Z'
    ),
    'createdBy': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Lot created by ID',
        read_only=True,
        example=1
    ),
    'lastModifiedBy': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Lot last modified by ID',
        read_only=True,
        example=1
    )
}
PARKING_LOT_EXT_OBJS = {
    'block': openapi.Schema(
        type=openapi.TYPE_OBJECT,
        description='Lot block information',
        properties={
            'id': openapi.Schema(
                type=openapi.TYPE_INTEGER,
                description='Block ID',
                read_only=True,
                example=1
            ),
            'block': openapi.Schema(
                type=openapi.TYPE_STRING,
                description='Block',
                read_only=True,
                example='A'
            ),
        }
    ),
    'floor': openapi.Schema(
        type=openapi.TYPE_OBJECT,
        description='Lot floor information',
        properties={
            'id': openapi.Schema(
                type=openapi.TYPE_INTEGER,
                description='Floor ID',
                read_only=True,
                example=1
            ),
            'floor': openapi.Schema(
                type=openapi.TYPE_STRING,
                description='Floor',
                read_only=True,
                example='1'
            ),
        }
    )
}
PARKING_LOT_PASS_OBJS = {
    'id': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Pass ID',
        read_only=True,
        example=1
    ),
    'accessCardNo': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Access card no.',
        read_only=True,
        example='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    ),
    'parkingLot': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Lot ID',
        read_only=True,
        example=1
    ),
    'resident': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Resident owner ID',
        read_only=True,
        example=1
    ),
    'vehicle': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Vehicle ID',
        read_only=True,
        example=1
    ),
    'isActive': openapi.Schema(
        type=openapi.TYPE_BOOLEAN,
        description='Is pass active?',
        read_only=True,
        example=True
    ),
    'startedAt': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Pass start date and time',
        read_only=True,
        example='2019-08-24T14:15:22Z'
    ),
    'endedAt': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Pass end date and time',
        read_only=True,
        example='2019-08-24T14:15:22Z'
    ),
    'lastModifiedAt': openapi.Schema(
        type=openapi.TYPE_STRING,
        description='Pass last modification date and time',
        read_only=True,
        example='2019-08-24T14:15:22Z'
    ),
    'createdBy': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Pass created by ID',
        read_only=True,
        example=1
    ),
    'lastModifiedBy': openapi.Schema(
        type=openapi.TYPE_INTEGER,
        description='Pass last modified by ID',
        read_only=True,
        example=1
    )
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
                    type=openapi.TYPE_INTEGER,
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


class DocuConfigUnitActivity(enum.Enum):
    """UnitActivityView's drf-yasg documentation configuration"""

    LIST = swagger_auto_schema(
        operation_id='List all units activities',
        operation_description='List all units activities information',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=UNIT_ACTIVITY_OBJS
                        )
                    ]
                )
            )
        },
        tags=[UNIT_ACTIVITY_TAG]
    )
    RETRIEVE = swagger_auto_schema(
        operation_id='Retrieve a unit activity',
        operation_description='Retrieve a unit activity information',
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=UNIT_ACTIVITY_OBJS
                )
            )
        },
        tags=[UNIT_ACTIVITY_TAG]
    )
    OVERVIEW = {
        'operation_id': 'Unit activity overview',
        'operation_description': 'Get unit activity overview',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'name': openapi.Schema(
                            description='Activity name',
                            type=openapi.TYPE_STRING,
                            example='Move in'
                        ),
                        'value': openapi.Schema(
                            description='Overview count',
                            type=openapi.TYPE_INTEGER,
                            example=4
                        )
                    }
                )
            )
        },
        'tags': [UNIT_ACTIVITY_TAG]
    }


class DocuConfigParkingLot(enum.Enum):
    """ParkingLotView's drf-yasg documentation configuration"""

    LIST = swagger_auto_schema(
        operation_id='List all lots',
        operation_description='List all lots information',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=PARKING_LOT_OBJS
                        )
                    ]
                )
            )
        },
        tags=[PARKING_LOT_TAG]
    )
    RETRIEVE = swagger_auto_schema(
        operation_id='Retrieve a lot',
        operation_description='Retrieve a lot information',
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=PARKING_LOT_OBJS
                )
            )
        },
        tags=[PARKING_LOT_TAG]
    )
    CREATE = swagger_auto_schema(
        operation_id='Create lot',
        operation_description='Create a new lot entry',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=PARKING_LOT_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=PARKING_LOT_OBJS
                )
            )
        },
        tags=[PARKING_LOT_TAG]
    )
    PARTIAL_UPDATE = swagger_auto_schema(
        operation_id='Patch lot',
        operation_description='Partial update a lot entry',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties=PARKING_LOT_OBJS
        ),
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=PARKING_LOT_OBJS
                )
            )
        },
        tags=[PARKING_LOT_TAG]
    )
    DESTROY = swagger_auto_schema(
        operation_id='Remove lot',
        operation_description='Destroy a lot entry',
        responses={
            status.HTTP_204_NO_CONTENT: openapi.Response(
                description='No content',
                schema=None
            )
        },
        tags=[PARKING_LOT_TAG]
    )
    ACTIVATE = {
        'operation_id': 'Activate lot',
        'operation_description': 'Activate a lot',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example='Lot activated'
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
                            example='Lot is already activated'
                        )
                    }
                )
            )
        },
        'tags': [PARKING_LOT_TAG]
    }
    DEACTIVATE = {
        'operation_id': 'Deactivate lot',
        'operation_description': 'Deactivate a lot',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example='Lot deactivated'
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
                            example='Lot is already deactivated'
                        )
                    }
                )
            )
        },
        'tags': [PARKING_LOT_TAG]
    }
    LIST_EXT = {
        'operation_id': 'List all lots extended',
        'operation_description': 'List all lots extended information',
        'filter_inspectors': [DjangoFilterDescriptionInspector],
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=PARKING_LOT_OBJS | PARKING_LOT_EXT_OBJS
                        )
                    ]
                )
            )
        },
        'tags': [PARKING_LOT_TAG]
    }
    RETRIEVE_EXT = {
        'operation_id': 'Retrieve a lot extended',
        'operation_description': 'Retrieve a lot extended information',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=PARKING_LOT_OBJS | PARKING_LOT_EXT_OBJS
                )
            )
        },
        'tags': [PARKING_LOT_TAG]
    }
    ASSIGN_RESIDENT = {
        'operation_id': 'Assign resident',
        'operation_description': 'Assign resident to lot',
        'request_body': openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['accessCardNo', 'resident', 'vehicle'],
            properties={
                'accessCardNo': openapi.Schema(
                    type=openapi.TYPE_STRING,
                    description='Access card no.',
                    example='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                ),
                'resident': openapi.Schema(
                    type=openapi.TYPE_INTEGER,
                    description='Resident ID',
                    example=1
                ),
                'vehicle': openapi.Schema(
                    type=openapi.TYPE_INTEGER,
                    description='Vehicle ID',
                    example=1
                ),
            }
        ),
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=PARKING_LOT_OBJS | PARKING_LOT_EXT_OBJS
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
                            example='Lot is occupied'
                        ),
                    }
                )
            )
        },
        'tags': [PARKING_LOT_TAG]
    }
    CHECKOUT_RESIDENT = {
        'operation_id': 'Checkout resident',
        'operation_description': 'Checkout resident from lot',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=PARKING_LOT_OBJS | PARKING_LOT_EXT_OBJS
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
                            example='Lot is not occupied'
                        ),
                    }
                )
            )
        },
        'tags': [PARKING_LOT_TAG]
    }
    CURRENT_PASS = {
        'operation_id': 'Current pass',
        'operation_description': 'Get current pass from lot',
        'responses': {
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=PARKING_LOT_OBJS | PARKING_LOT_EXT_OBJS
                )
            ),
            status.HTTP_404_NOT_FOUND: openapi.Response(
                description='Not found',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'detail': openapi.Schema(
                            type=openapi.TYPE_STRING,
                            description='Message detail',
                            example='No pass related'
                        ),
                    }
                )
            )
        },
        'tags': [PARKING_LOT_TAG]
    }


class DocuConfigParkingLotPass(enum.Enum):
    """ParkingLotPassView's drf-yasg documentation configuration"""

    LIST = swagger_auto_schema(
        operation_id='List all passes',
        operation_description='List all parking lot passes information',
        filter_inspectors=[DjangoFilterDescriptionInspector],
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=[
                        openapi.Schema(
                            type=openapi.TYPE_OBJECT,
                            properties=PARKING_LOT_PASS_OBJS
                        )
                    ]
                )
            )
        },
        tags=[PARKING_LOT_PASS_TAG]
    )
    RETRIEVE = swagger_auto_schema(
        operation_id='Retrieve a pass',
        operation_description='Retrieve a parking lot pass information',
        responses={
            status.HTTP_200_OK: openapi.Response(
                description='Ok',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties=PARKING_LOT_PASS_OBJS
                )
            )
        },
        tags=[PARKING_LOT_PASS_TAG]
    )
