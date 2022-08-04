from django.utils.timezone import now
from django.utils.translation import gettext as _

from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from .models import (
    TicketStatus, TicketPriority, TicketCategory,
    TicketTag, Ticket, TicketActivity, TicketComment
)


class TicketTagSerializer(serializers.ModelSerializer):
    """
        Serializer for ticket tag
    """
    class Meta:
        model = TicketTag
        fields = '__all__'
        read_only_fields = ('id',)


class TicketSerializer(serializers.ModelSerializer):
    """
        Serializer for ticket
    """
    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ('id', 'ticket_no', 'status')


class TicketStatusSerializer(serializers.ModelSerializer):
    """
        Serializer for update status action
    """
    status = serializers.ChoiceField(required=True, choices=TicketStatus.choices, allow_null=False)
    notes = serializers.CharField(required=True, allow_null=False)
    
    class Meta:
        model = Ticket
        fields = ['status', 'notes']
        read_only_fields = ('id', 'ticket_no')


class TicketActivitySerializer(serializers.ModelSerializer):
    """
        Serializer for ticket activity
    """
    class Meta:
        model = TicketActivity
        fields = '__all__'
        read_only_fields = ('id', 'ticket')
        validators = [
            UniqueTogetherValidator(
                queryset=TicketActivity.objects.all(),
                fields=[
                    'ticket',
                    'status'
                ],
                message='Ticket already has that status'
            )
        ]


class TicketCommentSerializer(serializers.ModelSerializer):
    """
        Serializer for ticket comment
    """
    class Meta:
        model = TicketComment
        fields = '__all__'
        read_only_fields = ('id', 'reply_to')