# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from units.models import Unit

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

    STATUS = [
        ('OP', 'OPEN'),
        ('CL', 'CLOSED')
    ]
    status = models.CharField(choices=STATUS, max_length=2, default='OP')
    complaint = models.TextField()

    closed_at = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

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
    
    class meta:
        ordering = ['complaint_no']
    
    def __str__(self):
        return ('%s - %s'%(self.complaint_no, self.complainant))