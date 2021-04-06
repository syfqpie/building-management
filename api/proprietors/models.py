# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid
import pytz
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

class Proprietor(models.Model):

    id = models.AutoField(primary_key=True, editable=False)
    proprietor_no = models.CharField(max_length=100, null=True)

    TITLE = [
        ('MR', 'Mr.'),
        ('MRS', 'Mrs.'),
        ('MS', 'Ms.'),
        (None, '-')
    ]
    title = models.CharField(choices=TITLE, max_length=3, default=None, null=True)
    name = models.CharField(max_length=255, null=True)
    nric = models.CharField(max_length=255, null=True)

    GENDER = [
        ('F', 'Female'),
        ('M', 'Male'),
        (None, '-')
    ]
    gender = models.CharField(choices=GENDER, max_length=1, default=None, null=True)
    phone_number = models.CharField(max_length=20, null=True)
    email = models.EmailField(max_length=100, null=True)
    is_active = models.BooleanField(default=True)
    
    moved_in_at = models.DateTimeField(null=True)
    moved_out_at = models.DateTimeField(null=True)
    deactivated_at = models.DateTimeField(null=True)
    last_payment_at = models.DateTimeField(null=True)

    history = HistoricalRecords()

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def save(self,*args, **kwargs):
        timezone_ = pytz.timezone('Asia/Kuala_Lumpur')
        if not self.proprietor_no:
            prefix = 'PROPR'
            prev_instances = self.__class__.objects.filter(proprietor_no__contains=prefix)
            # print('Prev', prev_instances.first())
            if prev_instances.exists():
                last_instance_id = prev_instances.first().proprietor_no[-5:]
                self.proprietor_no = prefix+'{0:05d}'.format(int(last_instance_id)+1)
            else:
                self.proprietor_no = prefix+'{0:05d}'.format(1)
            
        super(Proprietor, self).save(*args, **kwargs)
    
    class meta:
        ordering = ['-proprietor_no']
    
    def __str__(self):
        return ('%s - %s'%(self.proprietor_no, self.name))