# Generated by Django 4.0.4 on 2022-07-27 15:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('residents', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Block',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('block', models.CharField(error_messages={'unique': 'Block already exists'}, max_length=10, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_modified_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(limit_choices_to={'user_type': 1}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='blocks_created', to=settings.AUTH_USER_MODEL)),
                ('last_modified_by', models.ForeignKey(limit_choices_to={'user_type': 1}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='blocks_modified', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['block'],
            },
        ),
        migrations.CreateModel(
            name='Floor',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('floor', models.CharField(error_messages={'unique': 'Floor already exists'}, max_length=10, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_modified_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(limit_choices_to={'user_type': 1}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='floors_created', to=settings.AUTH_USER_MODEL)),
                ('last_modified_by', models.ForeignKey(limit_choices_to={'user_type': 1}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='floors_modified', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['floor'],
            },
        ),
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('unit_no', models.CharField(max_length=100, null=True)),
                ('square_feet', models.IntegerField(default=0)),
                ('is_maintenance', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_modified_at', models.DateTimeField(auto_now=True)),
                ('block', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='units.block')),
                ('created_by', models.ForeignKey(limit_choices_to={'user_type': 1}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='units_created', to=settings.AUTH_USER_MODEL)),
                ('floor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='units.floor')),
                ('last_modified_by', models.ForeignKey(limit_choices_to={'user_type': 1}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='units_modified', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='residents.resident')),
            ],
            options={
                'ordering': ['unit_no'],
            },
        ),
        migrations.CreateModel(
            name='UnitNumber',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('unit_number', models.CharField(error_messages={'unique': 'Unit number already exists'}, max_length=10, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_modified_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(limit_choices_to={'user_type': 1}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='unit_numbers_created', to=settings.AUTH_USER_MODEL)),
                ('last_modified_by', models.ForeignKey(limit_choices_to={'user_type': 1}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='unit_numbers_modified', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['unit_number'],
            },
        ),
        migrations.CreateModel(
            name='UnitActivity',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('notes', models.TextField(null=True)),
                ('moved_in_at', models.DateTimeField(auto_now_add=True)),
                ('moved_out_at', models.DateTimeField(null=True)),
                ('current_owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='owner_activities', to='residents.resident')),
                ('moved_in_by', models.ForeignKey(limit_choices_to={'user_type': 1}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='moved_ins', to=settings.AUTH_USER_MODEL)),
                ('moved_out_by', models.ForeignKey(limit_choices_to={'user_type': 1}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='moved_outs', to=settings.AUTH_USER_MODEL)),
                ('unit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='unit_activities', to='units.unit')),
            ],
            options={
                'ordering': ['-id'],
            },
        ),
        migrations.AddField(
            model_name='unit',
            name='unit_number',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='units.unitnumber'),
        ),
    ]
