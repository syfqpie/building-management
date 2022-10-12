from django.db import models

from users.models import CustomUser
from utils.helpers import PathAndRename


class Media(models.Model):
    """Media model"""

    id = models.AutoField(primary_key=True, editable=False)
    filename = models.CharField(max_length=100, null=True)
    file_extension = models.CharField(max_length=10, null=True)
    attachment = models.FileField(null=True, upload_to=PathAndRename('medias'))

    # Log
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
