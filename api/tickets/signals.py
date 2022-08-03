from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Ticket, TicketActivity, TicketStatus


@receiver(post_save, sender=Ticket, dispatch_uid='create_ticket_activity')
def create_ticket_activity(sender, created, **kwargs):
    update_fields = kwargs.get('update_fields', None)
    instance = kwargs.get('instance', None)
    activity_setup = getattr(instance, '_activity_setup', None)

    if created:
        TicketActivity.objects.create(
            ticket=instance,
            status=TicketStatus.OPENED,
            notes='Ticket opened',
            created_by=instance.created_by
        )

    # if update_fields and activity_setup:
    #     TicketActivity.objects.create(
    #         ticket=instance,
    #         current_owner=activity_setup['current_owner'],
    #         activity_type=activity_setup['activity_type'],
    #         notes=activity_setup['notes'],
    #         activity_by=activity_setup['activity_by']
    #     )
