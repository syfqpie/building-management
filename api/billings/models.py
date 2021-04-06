# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from medias.models import Media
from units.models import Unit

class Billing(models.Model):

    id = models.AutoField(primary_key=True, editable=False)
    bill_no = models.CharField(max_length=100, null=True)
    unit = models.ForeignKey(
        Unit,
        on_delete=models.CASCADE,
        null=True,
        related_name='unit_billings'
    )

    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True)
    bill_attachment = models.ForeignKey(
        Media,
        on_delete=models.CASCADE,
        null=True
    )
    # receipt_attachment = modesl.ForeignKey(
    #     Media,
    #     on_delete=models.CASCADE,
    #     null=True
    # )

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def save(self,*args, **kwargs):
        timezone_ = pytz.timezone('Asia/Kuala_Lumpur')
        if not self.bill_no:
            prefix = 'BILL{}'.format(datetime.datetime.now(timezone_).strftime('%y%m'))
            prev_instances = self.__class__.objects.filter(bill_no__contains=prefix)
            if prev_instances.exists():
                last_instance_id = prev_instances.last().bill_no[-4:]
                self.bill_no = prefix+'{0:04d}'.format(int(last_instance_id)+1)
            else:
                self.bill_no = prefix+'{0:04d}'.format(1)
            
        super(Billing, self).save(*args, **kwargs)
    
    class meta:
        ordering = ['bill_no']
    
    def __str__(self):
        return ('%s - %s'%(self.bill_no, self.unit.unit_no))