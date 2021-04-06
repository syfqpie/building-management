# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

class Tenant(models.Model):

    id = models.AutoField(primary_key=True, editable=False)
    tenant_no = models.CharField(max_length=100, null=True)

    TITLE = [
        ('MR', 'Mr.'),
        ('MRS', 'Mrs.'),
        ('MS', 'Ms.')
    ]
    title = models.CharField(choices=TITLE, max_length=3, default='MR')
    name = models.CharField(max_length=255, null=True)

    GENDER = [
        ('F', 'Female'),
        ('M', 'Male')
    ]
    gender = models.CharField(choices=GENDER, max_length=1, default='A')
    phone_number = models.CharField(max_length=20)

    history = HistoricalRecords()

    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def save(self,*args, **kwargs):
        timezone_ = pytz.timezone('Asia/Kuala_Lumpur')
        if not self.tenant_no:
            prefix = 'TENANT'
            prev_instances = self.__class__.objects.filter(tenant_no__contains=prefix)
            # print('Prev', prev_instances.first())
            if prev_instances.exists():
                last_instance_id = prev_instances.first().tenant_no[-5:]
                self.tenant_no = prefix+'{0:05d}'.format(int(last_instance_id)+1)
            else:
                self.tenant_no = prefix+'{0:05d}'.format(1)

        if not self.duration_days:
            delta_duration = self.end_date - self.start_date
            self.duration_days = delta_duration.days
            
        super(Training, self).save(*args, **kwargs)
    
    class meta:
        ordering = ['-tenant_no']
    
    def __str__(self):
        return ('%s - %s'%(self.tenant_no, self.name))