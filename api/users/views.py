from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets, status
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend
from core.settings import DEBUG

from users.models import (
    CustomUser
)

from users.serializers import (
    CustomUserSerializer
)

class CustomUserViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    filterset_fields = [
        'user_type',
        'is_active'
    ]

    def get_permissions(self):
        if DEBUG:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        # if self.action == 'list':
        #     permission_classes = [AllowAny]
        # else:
        #     permission_classes = [AllowAny]

        return [permission() for permission in permission_classes]    

    
    def get_queryset(self):
        queryset = CustomUser.objects.all()

        """
        if self.request.user.is_anonymous:
            queryset = Company.objects.none()

        else:
            user = self.request.user
            company_employee = CompanyEmployee.objects.filter(employee=user)
            company = company_employee[0].company
            
            if company.company_type == 'AD':
                queryset = User.objects.all()
            else:
                queryset = User.objects.filter(company=company.id)
        """
        return queryset
    
    # Activate account
    @action(methods=['GET'], detail=True)
    def activate(self, request, *args, **kwargs):
        user = self.get_object()
        user.is_active = True
        user.save()

        serializer = CustomUserSerializer(user, many=False)
        return Response(serializer.data)

    # Deactivate account
    @action(methods=['GET'], detail=True)
    def deactivate(self, request, *args, **kwargs):
        user = self.get_object()
        user.is_active = False
        user.save()
        
        serializer = CustomUserSerializer(user, many=False)
        return Response(serializer.data)

    