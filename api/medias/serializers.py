from django.utils.translation import gettext as _
from rest_framework import serializers

from .models import Media


class MediaSerializer(serializers.ModelSerializer):
    """
    Serializer for Media model
    """
    
    class Meta:
        model = Media
        fields = '__all__'
    