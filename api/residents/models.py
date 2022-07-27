from __future__ import unicode_literals
from django.db import models
from users.models import CustomUser, UserType

from core.helpers import PathAndRename


class TitleType(models.IntegerChoices):
    MR = 1, 'Mr.'
    MRS = 2, 'Mrs.'
    MS = 3, 'Ms.'


class GenderType(models.IntegerChoices):
    FEMALE = 1, 'Female'
    MALE = 2, 'Male'


class Resident(models.Model):

    id = models.AutoField(primary_key=True, editable=False)
    resident_no = models.CharField(max_length=100, null=True)
    is_owner = models.BooleanField(default=False)

    title = models.IntegerField(choices=TitleType.choices, default=None, null=True)
    name = models.CharField(max_length=255, null=True)
    nric = models.CharField(max_length=255, null=True)

    gender = models.IntegerField(choices=GenderType.choices, default=None, null=True)
    phone_no = models.CharField(max_length=20, null=True)
    email = models.EmailField(max_length=100, null=True)
    
    # Log
    is_active = models.BooleanField(default=True)
    last_payment_at = models.DateTimeField(null=True)
    resident_user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'user_type': UserType.PUBLIC},
        related_name='user_of'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        CustomUser, 
        on_delete=models.SET_NULL,
        null=True,
        limit_choices_to={'user_type': UserType.ADMIN},
        related_name='residents_created'
    )
    last_modified_by = models.ForeignKey(
        CustomUser, 
        on_delete=models.SET_NULL,
        null=True,
        related_name='residents_last_modified'
    )

    def save(self, *args, **kwargs):
        if not self.resident_no:
            prefix = 'RSD'
            prev_instances = self.__class__.objects.filter(resident_no__contains=prefix)
            if prev_instances.exists():
                last_instance_id = prev_instances.first().resident_no[-5:]
                self.resident_no = prefix+'{0:05d}'.format(int(last_instance_id)+1)
            else:
                self.resident_no = prefix+'{0:05d}'.format(1)
            
        super().save(*args, **kwargs)
    
    class Meta:
        ordering = ['-resident_no']
    
    def __str__(self):
        return ('%s - %s'%(self.resident_no, self.name))