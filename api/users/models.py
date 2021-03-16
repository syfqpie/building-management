from __future__ import unicode_literals
import json
import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.postgres.fields import ArrayField
from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

class CustomUser(AbstractUser):

    # Account information
    id = models.AutoField(primary_key=True, editable=False)
    full_name = models.CharField(max_length=255, blank=True)

    USER_TYPE = [
        ('AD', 'Admin'),
        ('PB', 'Public')      
    ]
    user_type = models.CharField(choices=USER_TYPE, max_length=2, default='PB')

    # Contact information
    email = models.EmailField(max_length=100, null=True)

    history = HistoricalRecords()

    class Meta:
        ordering = ['full_name']

    def __str__(self):
        return self.full_name

