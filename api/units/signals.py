from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Unit, UnitActivity


@receiver(post_save, sender=Unit, dispatch_uid='create_unit_activity')
def create_unit_activity(sender, created, **kwargs):
    """Create unit activity signal"""

    # Append values
    update_fields = kwargs.get('update_fields', None)
    instance = kwargs.get('instance', None)
    activity_setup = getattr(instance, '_activity_setup', None)

    if update_fields and activity_setup:
        UnitActivity.objects.create(
            unit=instance,
            current_owner=activity_setup['current_owner'],
            activity_type=activity_setup['activity_type'],
            notes=activity_setup['notes'],
            activity_by=activity_setup['activity_by']
        )
