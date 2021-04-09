# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid
import pytz
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from units.models import Block, Floor, Unit

class ParkingUnit(models.Model):

    id = models.AutoField(primary_key=True, editable=False)
    unit_number = models.CharField(max_length=100, null=True)

    is_active = models.BooleanField(default=True)

    class meta:
        ordering = ['-unit_number']
    
    def __str__(self):
        return ('%s'%(str(self.unit_number)))

class ParkingLot(models.Model):

    id = models.AutoField(primary_key=True, editable=False)
    parking_lot = models.CharField(max_length=100, null=True)
    
    block = models.ForeignKey(
        Block,
        on_delete=models.CASCADE,
        null=True
    )
    floor = models.ForeignKey(
        Floor,
        on_delete=models.CASCADE,
        null=True
    )
    parking_unit = models.ForeignKey(
        ParkingUnit,
        on_delete=models.CASCADE,
        null=True
    )

    is_active = models.BooleanField(default=True)
    is_maintenance = models.BooleanField(default=False)

    history = HistoricalRecords()

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def save(self,*args, **kwargs):
        if not self.parking_lot:
            self.parking_lot = str(self.block.block) + '-' + str(self.floor.floor) + '-' + str(self.parking_unit.unit_number)
        else:
            pass
            
        super(ParkingLot, self).save(*args, **kwargs)
    
    class meta:
        ordering = ['-parking_lot ']
    
    def __str__(self):
        return self.parking_lot

class ParkingOwner(models.Model):

    id = models.AutoField(primary_key=True, editable=False)

    name = models.CharField(max_length=100, null=True)
    phone_number = models.CharField(max_length=100, null=True)

    VEHICLE_TYPE = [
        ('CR', 'CAR'),
        ('MT', 'MOTORCYCLE')
    ]
    vehicle_type = models.CharField(max_length=2, choices=VEHICLE_TYPE, default='CR')
    vehicle_registration_number = models.CharField(max_length=100, null=True)

    is_active = models.BooleanField(default=True)

    unit = models.ForeignKey(
        Unit,
        on_delete=models.CASCADE,
        null=True,
        related_name='owner_parking_unit'
    )

    lot = models.ForeignKey(
        ParkingLot,
        on_delete=models.CASCADE,
        null=True,
        related_name='owner_parking_lot'
    )

    deactivated_at = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['-parking_lot']
    
    def __str__(self):
        return self.parking_lot
