from django.db import models
from django.utils.timezone import now

from units.models import Unit
from users.models import CustomUser, UserType


class TicketStatus(models.IntegerChoices):
    """Ticket status choices"""

    OPENED = 1, 'Opened'
    IN_PROGRESS = 2, 'In progress'
    RESOLVED = 3, 'Resolved'
    CLOSED = 4, 'Closed'
    DUPLICATED = 5, 'Duplicated'


class TicketPriority(models.IntegerChoices):
    """Ticket priority choices"""

    CRIT = 1, 'Critical'
    HIGH = 2, 'High'
    NORMAL = 3, 'Normal'
    LOW = 4, 'Low'
    VLOW = 5, 'Very Low'


class TicketCategory(models.IntegerChoices):
    """Ticket category choices"""

    SYS = 1, 'System'
    UNIT = 2, 'Unit'
    FACI = 3, 'Facility'


class TicketTag(models.Model):
    """TicketTag model"""

    id = models.AutoField(primary_key=True, editable=False)
    tag = models.CharField(max_length=20)

    # Log
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True, related_name='tags_created'
    )
    last_modified_by = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True, related_name='tags_modified'
    )

    class Meta:
        ordering = ['tag']
    
    def __str__(self):
        return self.tag


class Ticket(models.Model):
    """Ticket model"""

    id = models.AutoField(primary_key=True, editable=False)
    ticket_no = models.CharField(max_length=100, unique=True, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=512)

    unit = models.ForeignKey(
        Unit, on_delete=models.CASCADE,
        null=True, related_name='unit_tickets'
    )
    tags = models.ManyToManyField(
        TicketTag,
        related_name='tag_tickets',
        default=[]
    )
    status = models.IntegerField(
        choices=TicketStatus.choices,
        default=TicketStatus.OPENED
    )
    category = models.IntegerField(
        choices=TicketCategory.choices,
        default=TicketCategory.SYS
    )
    assignee = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True, related_name='tickets_assigned'
    )
    
    # Log
    priority = models.IntegerField(
        choices=TicketPriority.choices,
        default=TicketPriority.NORMAL
    )
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL,
        null=True, related_name='tickets_created'
    )
    last_modified_by = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL,
        null=True, related_name='tickets_modified'
    )

    class Meta:
        ordering = ['-ticket_no']
    
    def __str__(self):
        return self.ticket_no

    def save(self, *args, **kwargs):
        """
        Generate ticket no
        Example: TICKET22080003
        """
        if not self.ticket_no:
            prefix = 'TICKET{}'.format(now().strftime('%y%m'))
            prev_instances = self.__class__.objects.filter(ticket_no__contains=prefix)
            if prev_instances.exists():
                first_instance_id = prev_instances.first().ticket_no[-4:]
                self.ticket_no = prefix+'{0:04d}'.format(int(first_instance_id)+1)
            else:
                self.ticket_no = prefix+'{0:04d}'.format(1)
            
        super().save(*args, **kwargs)
    

class TicketActivity(models.Model):
    """TicketActivity model"""

    id = models.AutoField(primary_key=True, editable=False)
    ticket = models.ForeignKey(
        Ticket,
        on_delete=models.CASCADE,
        related_name='ticket_activities'
    )
    status = models.IntegerField(
        choices=TicketStatus.choices,
        default=TicketStatus.OPENED
    )
    notes = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL,
        null=True, related_name='tickets_activity_created'
    )

    class Meta:
        ordering = ['-created_at']


class TicketComment(models.Model):
    """TicketComment model"""
    
    id = models.AutoField(primary_key=True, editable=False)
    ticket = models.ForeignKey(
        Ticket, on_delete=models.CASCADE,
        related_name='ticket_comments'
    )
    
    reply_to = models.ForeignKey(
        'self', on_delete=models.SET_NULL,
        null=True, related_name='reply_comments'
    )

    comment = models.TextField(max_length=512)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        }, null=True,
        related_name='comments'
    )

    class Meta:
        ordering = ['-created_at']

