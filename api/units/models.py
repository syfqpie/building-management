from django.db import models
from rest_framework.exceptions import PermissionDenied

from residents.models import Resident, ResidentVehicle, VehicleType
from users.models import CustomUser, UserType


class ActivityType(models.IntegerChoices):
    """Activity type choices"""

    MOVE_IN = 1, 'Move in'
    MOVE_OUT = 2, 'Move out'
    ACTIVATE = 3, 'Activate'
    DEACTIVATE = 4, 'Deactivate'
    ENABLE_MAINTENANCE = 5, 'Enable maintenance'
    DISABLE_MAINTENANCE = 6, 'Disabled maintenance'


class Block(models.Model):
    """Block Model"""

    id = models.AutoField(primary_key=True, editable=False)
    block = models.CharField(
        max_length=10,
        unique=True,
        error_messages={
            'unique': 'Block already exists'
        }
    )

    # Logs
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True,
        related_name='blocks_created'
    )
    last_modified_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True,
        related_name='blocks_modified'
    )
    
    class Meta:
        ordering = ['block']
    
    def __str__(self):
        return ('%s'%(self.block))


class Floor(models.Model):
    """Floor model"""

    id = models.AutoField(primary_key=True, editable=False)
    floor = models.CharField(
        max_length=10,
        unique=True,
        error_messages={
            'unique': 'Floor already exists'
        }
    )

    # Logs
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True,
        related_name='floors_created'
    )
    last_modified_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True,
        related_name='floors_modified'
    )

    class Meta:
        ordering = ['floor']
    
    def __str__(self):
        return ('%s'%(self.floor))


class UnitNumber(models.Model):
    """Unit number model"""

    id = models.AutoField(primary_key=True, editable=False)
    unit_number = models.CharField(
        max_length=10,
        unique=True,
        error_messages={
            'unique': 'Unit number already exists'
        }
    )

    # Logs
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True,
        related_name='unit_numbers_created'
    )
    last_modified_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True,
        related_name='unit_numbers_modified'
    )
    
    class Meta:
        ordering = ['unit_number']
    
    def __str__(self):
        return ('%s'%(str(self.unit_number)))


class Unit(models.Model):
    """Unit model"""

    id = models.AutoField(primary_key=True, editable=False)
    unit_no = models.CharField(max_length=100, null=True)
    square_feet = models.IntegerField(default=0)

    block = models.ForeignKey(
        Block,
        on_delete=models.CASCADE
    )
    floor = models.ForeignKey(
        Floor,
        on_delete=models.CASCADE
    )
    unit_number = models.ForeignKey(
        UnitNumber,
        on_delete=models.CASCADE
    )
    owner = models.ForeignKey(
        Resident,
        on_delete=models.SET_NULL,
        null=True
    )

    # Logs
    is_active = models.BooleanField(default=True)
    is_maintenance = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True,
        related_name='units_created'
    )
    last_modified_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True,
        related_name='units_modified'
    )
        
    class Meta:
        ordering = ['-unit_no']
    
    def __str__(self):
        return ('%s'%(self.unit_no))

    def save(self, *args, **kwargs):
        """
        Generate unit_no

        Example: A-1-1
        """
        if not self.unit_no:
            self.unit_no = str(self.block.block) + '-' + str(self.floor.floor) + '-' + str(self.unit_number.unit_number)
        else:
            pass
            
        super().save(*args, **kwargs)


class UnitActivity(models.Model):
    """Unit activity model"""

    id = models.AutoField(primary_key=True, editable=False)
    unit = models.ForeignKey(
        Unit,
        on_delete=models.CASCADE,
        related_name='unit_activities'
    )
    current_owner = models.ForeignKey(
        Resident,
        on_delete=models.SET_NULL,
        null=True,
        related_name='owner_activities'
    )

    activity_type = models.IntegerField(
        choices=ActivityType.choices
    )
    notes = models.TextField(null=True)

    # Logs
    activity_at = models.DateTimeField(auto_now_add=True)
    activity_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True,
        related_name='activities'
    )
    
    class Meta:
        ordering = ['-id']
    
    def __str__(self):
        return f'[{ self.unit }] { self.moved_in_at }'


class ParkingLot(models.Model):
    """Parking lot model"""

    id = models.AutoField(primary_key=True, editable=False)
    lot_no = models.CharField(max_length=100, editable=False)

    block = models.ForeignKey(
        Block,
        on_delete=models.CASCADE,
        related_name='block_lots'
    )
    floor = models.ForeignKey(
        Floor,
        on_delete=models.CASCADE,
        related_name='floor_lots'
    )
    lot_type = models.IntegerField(
        choices=VehicleType.choices,
        default=VehicleType.CAR
    )

    # Logs
    is_occupied = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True,
        related_name='lots_created'
    )
    last_modified_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True,
        related_name='lots_modified'
    )

    class Meta:
        ordering = ['-lot_no']
    
    def __str__(self):
        return ('%s'%(self.lot_no))
    
    def save(self, *args, **kwargs):
        """
        Generate lot no

        Example: A3A01
        """
        if not self.lot_no:
            # Get lot block + floor count
            current_count = self.__class__.objects.filter(
                block=self.block,
                floor=self.floor
            ).count()

            if current_count < 99:
                # Generate and assign
                self.lot_no = str(self.block.block) + \
                    str(self.floor.floor) + \
                    '{0:02d}'.format(current_count + 1)
            else:
                # Permission denied when current_count 99
                raise PermissionDenied(detail='Lot limit reached')
            
        super().save(*args, **kwargs)


class ParkingLotPass(models.Model):
    """Parking lot pass model"""
    
    id = models.AutoField(primary_key=True, editable=False)
    access_card_no = models.CharField(max_length=25)

    resident = models.ForeignKey(
        Resident,
        on_delete=models.CASCADE,
        related_name='passes'
    )
    vehicle = models.OneToOneField(
        ResidentVehicle,
        on_delete=models.CASCADE
    )
    parking_lot = models.ForeignKey(
        ParkingLot,
        on_delete=models.CASCADE,
        related_name='lot_passes'
    )
    
    # Logs
    is_active = models.BooleanField(default=True)
    started_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True)
    last_modified_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True,
        related_name='passes_created'
    )
    last_modified_by = models.ForeignKey(
        CustomUser,
        on_delete=models.SET_NULL,
        limit_choices_to={
            'user_type': UserType.ADMIN
        },
        null=True,
        related_name='passes_modified'
    )

    class Meta:
        ordering = ['-started_at', 'parking_lot']
    
    def __str__(self):
        return ('%s - %s'%(self.resident, self.parking_lot))
        