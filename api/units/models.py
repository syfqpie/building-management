# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.contrib.gis.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

from proprietors.models import Proprietor

class Block(models.Model):

    id = models.AutoField(primary_key=True, editable=False)
    block = models.CharField(max_length=10, null=True)

    is_active = models.BooleanField(default=True)
    history = HistoricalRecords()

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    class meta:
        ordering = ['-block']
    
    def __str__(self):
        return self.block

class Floor(models.Model):

    id = models.AutoField(primary_key=True, editable=False)
    floor = models.CharField(max_length=10, null=True)

    is_active = models.BooleanField(default=True)
    history = HistoricalRecords()

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    class meta:
        ordering = ['-floor']
    
    def __str__(self):
        return self.floor

class UnitNumber(models.Model):

    id = models.AutoField(primary_key=True, editable=False)
    unit_number = models.IntegerField(default=0)

    is_active = models.BooleanField(default=True)
    history = HistoricalRecords()

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    class meta:
        ordering = ['-unit_number']
    
    def __str__(self):
        return self.unit_number

class Unit(models.Model):

    id = models.AutoField(primary_key=True, editable=False)
    unit_no = models.CharField(max_length=100, null=True)
    
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
    unit_number = models.ForeignKey(
        UnitNumber,
        on_delete=models.CASCADE,
        null=True
    )
    proprietor = models.ForeignKey(
        Proprietor,
        on_delete=models.CASCADE,
        null=True
    )

    is_active = models.BooleanField(default=True)
    is_maintenance = models.BooleanField(default=False)

    history = HistoricalRecords()

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def save(self,*args, **kwargs):
        if not self.unit_no:
            self.unit_no = str(self.block.block) + '-' + str(self.floor.floor) + '-' + str(self.unit_number.unit_number)
        else:
            pass
            
        super(Unit, self).save(*args, **kwargs)
    
    class meta:
        ordering = ['-unit_no']
    
    def __str__(self):
        return self.unit_no