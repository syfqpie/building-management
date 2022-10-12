from django.utils.decorators import method_decorator

from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from allauth.account.models import EmailAddress
from drf_yasg.utils import swagger_auto_schema
from dj_rest_auth.registration.views import RegisterView
from django_filters.rest_framework import DjangoFilterBackend

from utils.auth.permissions import (
    IsAdminStaff,
    IsSuperAdmin,
    IsCustomUserOwnerOrAdmin
) 
from utils.helpers import (
    NoUnderscoreBeforeNumberCamelCaseJSONParser
)

from .docs import DocuConfigAdminCustomRegister, DocuConfigUser
from .models import UserType, CustomUser
from .serializers import (
    CustomUserEmailSerializer,
    CustomUserSerializer,
    CustomUserNotSuperAdminSerializer,
    EmailVerificationSerializer,
    AdminCustomRegisterSerializer
)

@method_decorator(name='list', decorator=DocuConfigUser.LIST)
@method_decorator(name='retrieve', decorator=DocuConfigUser.RETRIEVE)
@method_decorator(name='create', decorator=DocuConfigUser.CREATE)
@method_decorator(name='partial_update', decorator=DocuConfigUser.PARTIAL_UPDATE)
@method_decorator(name='destroy', decorator=DocuConfigUser.DESTROY)
class CustomUserViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    """
    Viewset for CustomUser model
    """

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    serializer_class_by_action = {
        'update': CustomUserNotSuperAdminSerializer,
        'partial_update': CustomUserNotSuperAdminSerializer
    }
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = [
        'user_type',
        'is_active'
    ]
    http_method_names = [
        'get',
        'post',
        'patch',
        'delete',
        'head',
        'options',
        'trace',
    ]

    def get_permissions(self):
        permission_classes = [IsAuthenticated]

        if self.action == 'activate':
            permission_classes.append(IsAdminStaff)
        elif self.action == 'deactivate':
            permission_classes.append(IsAdminStaff)
        elif self.action == 'destroy':
            permission_classes.append(IsSuperAdmin)
        elif self.action == 'partial_update':
            permission_classes.append(IsCustomUserOwnerOrAdmin)
        elif self.action == 'get_users_verification':
            permission_classes.append(IsSuperAdmin)
        elif self.action == 'get_simplified':
            permission_classes.append(IsAdminStaff)

        return [permission() for permission in permission_classes]    
    
    def get_queryset(self):
        """Override get_queryset to filter results according to user_type"""

        user = self.request.user

        if user.is_anonymous:
            # For documentation
            queryset = self.queryset.none()
        elif user.user_type == UserType.PUBLIC:
            # Filter for public user
            queryset = self.queryset.filter(id=user.id)
        else:
            # Admin results
            queryset = self.queryset

        return queryset
    
    def get_serializer_class(self):
        """Override get_serializer_class for default action"""

        # Get request user
        user = self.request.user

        # Check serializer class by action and if user is not superuser
        if hasattr(self, 'serializer_class_by_action') and not user.is_superuser:
            return self.serializer_class_by_action.get(self.action, self.serializer_class)

        # Return original class
        return super().get_serializer_class()
    
    def create(self, request, *args, **kwargs):
        """Override to disable method"""

        response = {'message': 'Not allowed'}
        return Response(response, status=status.HTTP_403_FORBIDDEN)
    
    @action(methods=['GET'], detail=True)
    @swagger_auto_schema(**DocuConfigUser.ACTIVATE.value)
    def activate(self, request, *args, **kwargs):
        """
        Activate resident
        
        Return 403 if already activated
        """

        # Instantiate resident
        user = self.get_object()

        if user.is_active is True:
            raise PermissionDenied(detail='User account is already activated')
        
        # Update and save
        user.is_active = True
        user.save()

        serializer = self.get_serializer(user, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'User account activated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    @action(methods=['GET'], detail=True)
    @swagger_auto_schema(**DocuConfigUser.DEACTIVATE.value)
    def deactivate(self, request, *args, **kwargs):
        """
        Deactivate resident
        
        Return 403 if already deactivated
        """
        
        # Instantiate resident
        user = self.get_object()

        if user.is_active is False:
            raise PermissionDenied(detail='User account is already deactivated')
        
        # Update and save
        user.is_active = False
        user.save()

        serializer = self.get_serializer(user, many=False)
        headers = self.get_success_headers(serializer.data)
        return Response(
            { 'detail': 'User account deactivated' },
            status=status.HTTP_200_OK,
            headers=headers
        )

    @action(methods=['GET'], detail=False, url_path='get-account-info')
    @swagger_auto_schema(**DocuConfigUser.ACCOUNT_INFORMATION.value)
    def get_account_information(self, request, *args, **kwargs):
        """Get account information"""

        # Instantiate user
        user = request.user

        serializer = self.get_serializer(user, many=False)
        return Response(serializer.data)
    
    @action(methods=['GET'], detail=False, url_path='get-users-verification')
    @swagger_auto_schema(**DocuConfigUser.USER_VERIFICATIONS.value)
    def get_users_verification(self, request, *args, **kwargs):
        """Get all users with verification status"""

        # Query all email address
        email_address = EmailAddress.objects.all()

        serializer = EmailVerificationSerializer(email_address, many=True)
        return Response(serializer.data)

    @action(methods=['GET'], detail=False, url_path='get-simplified')
    @swagger_auto_schema(**DocuConfigUser.USER_SIMPLIFIED.value)
    def get_simplified(self, request, *args, **kwargs):
        """Get all users simplified"""

        # Get queryset
        users = self.filter_queryset(self.get_queryset())

        serializer = CustomUserEmailSerializer(users, many=True)
        return Response(serializer.data)


@method_decorator(name='post', decorator=DocuConfigAdminCustomRegister.POST)
class AdminCustomRegisterView(RegisterView):
    """Custom view for Admin registration"""

    parser_classes = [NoUnderscoreBeforeNumberCamelCaseJSONParser]
    serializer_class = AdminCustomRegisterSerializer

    def get_permissions(self):
        permission_classes = [
            IsAuthenticated,
            IsSuperAdmin
        ]

        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        """Append custom response message"""
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        admin_user = self.perform_create(serializer)
        response_msg = {
            'Success':  f'Admin user created, an email has been sent to {admin_user.email}'
        }
        return Response(
            response_msg,
            status=status.HTTP_201_CREATED
        )
