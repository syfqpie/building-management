from django.db import models
from django.contrib.auth.models import AbstractUser

class UserType(models.IntegerChoices):
    ADMIN = 1, 'Admin'
    PUBLIC = 2, 'Public'

class CustomUser(AbstractUser):
    
    # Account information
    id = models.AutoField(primary_key=True, editable=False)
    full_name = models.CharField(max_length=255, blank=True)

    user_type = models.IntegerField(choices=UserType.choices, default=UserType.PUBLIC)

    # Contact information
    email = models.EmailField(max_length=100)

    # Log
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)

    # history = HistoricalRecords()

    class Meta:
        ordering = ['full_name']

    def __str__(self):
        return ('%s'%(self.name))