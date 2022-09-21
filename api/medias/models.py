# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models

from core.helpers import PathAndRename

from users.models import CustomUser

class Media(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    filename = models.CharField(max_length=100, null=True)
    file_extension = models.CharField(max_length=10, null=True)
    attachment = models.FileField(null=True, upload_to=PathAndRename('medias'))

    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        CustomUser, 
        on_delete=models.SET_NULL,
        null=True,
        related_name='medias_created'
    )
    last_modified_by = models.ForeignKey(
        CustomUser, 
        on_delete=models.SET_NULL,
        null=True,
        related_name='medias_modified'
    )
    
    class Meta:
        ordering = ['filename']
    
    def __str__(self):
        return ('%s.%s'%(self.filename, self.file_extension))