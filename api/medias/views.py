from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework import viewsets
from rest_framework_extensions.mixins import NestedViewSetMixin

from django_filters.rest_framework import DjangoFilterBackend

from .docs import DocuConfigMedia
from .models import Media
from .serializers import MediaSerializer


@method_decorator(name='list', decorator=DocuConfigMedia.LIST)
@method_decorator(name='retrieve', decorator=DocuConfigMedia.RETRIEVE)
@method_decorator(name='create', decorator=DocuConfigMedia.CREATE)
@method_decorator(name='partial_update', decorator=DocuConfigMedia.PARTIAL_UPDATE)
@method_decorator(name='destroy', decorator=DocuConfigMedia.DESTROY)
class MediaViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    """Viewset for Media model"""

    queryset = Media.objects.all()
    serializer_class = MediaSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
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

        return [permission() for permission in permission_classes]    

    def get_queryset(self):
        queryset = self.queryset
        return queryset
    
    def perform_create(self, serializer):
        """Override perform_create to update created_by"""

        request = serializer.context['request']
        serializer.save(created_by=request.user)

    def perform_update(self, serializer):
        """Override perform_update to update last_modified_by"""

        request = serializer.context['request']
        serializer.save(last_modified_by=request.user)
    