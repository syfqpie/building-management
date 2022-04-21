from django.utils.translation import gettext as _
from rest_framework import serializers

from .models import (
    Complaint
)

class ComplaintSerializer(serializers.ModelSerializer):

    class Meta:
        model = Complaint
        fields = '__all__'


class ComplaintPublicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Complaint
        exclude = [
            'last_modified_by'
        ]
