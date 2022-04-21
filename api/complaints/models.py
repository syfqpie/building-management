# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import pytz
import datetime

from django.db import models

from units.models import Unit
from users.models import CustomUser, UserType


class ComplaintStatus(models.IntegerChoices):
    OPENED = 1, 'Opened'
    CLOSED = 2, 'Closed'


class Complaint(models.Model):

    id = models.AutoField(primary_key=True, editable=False)
    complaint_no = models.CharField(max_length=100, null=True)
    complainant = models.CharField(max_length=100, null=True)
    contact_number = models.CharField(max_length=100, null=True)
    unit = models.ForeignKey(
        Unit,
        on_delete=models.CASCADE,
        null=True, 
        related_name='unit_complaints'
    )

    status = models.IntegerField(choices=ComplaintStatus.choices, default=ComplaintStatus.OPENED)
    complaint = models.TextField()

    closed_at = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        CustomUser, 
        on_delete=models.SET_NULL,
        null=True,
        related_name='complaints_created'
    )
    last_modified_by = models.ForeignKey(
        CustomUser, 
        on_delete=models.SET_NULL,
        null=True,
        limit_choices_to={'user_type': UserType.ADMIN},
        related_name='complaints_modified'
    )

    def save(self,*args, **kwargs):
        timezone_ = pytz.timezone('Asia/Kuala_Lumpur')
        if not self.complaint_no:
            prefix = 'COMPL{}'.format(datetime.datetime.now(timezone_).strftime('%y%m'))
            prev_instances = self.__class__.objects.filter(complaint_no__contains=prefix)
            if prev_instances.exists():
                last_instance_id = prev_instances.last().complaint_no[-4:]
                self.complaint_no = prefix+'{0:04d}'.format(int(last_instance_id)+1)
            else:
                self.complaint_no = prefix+'{0:04d}'.format(1)
            
        super(Complaint, self).save(*args, **kwargs)
    
    class Meta:
        ordering = ['complaint_no']
    
    def __str__(self):
        return ('%s - %s'%(self.complaint_no, self.complainant))
