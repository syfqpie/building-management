# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

from simple_history.models import HistoricalRecords

from core.helpers import PathAndRename

class Media(models.Model):

    id = models.AutoField(primary_key=True, editable=False)
    filename = models.CharField(max_length=100, null=True)
    file_extension = models.CharField(max_length=10, null=True)
    attachment = models.FileField(null=True, upload_to=PathAndRename('medias'))

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    class meta:
        ordering = ['filename']
    
    def __str__(self):
        return ('%s.%s'%(self.filename, self.file_extension))