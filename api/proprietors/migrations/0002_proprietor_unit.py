# Generated by Django 3.1.5 on 2021-03-14 04:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('units', '0001_initial'),
        ('proprietors', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='proprietor',
            name='unit',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='units.unit'),
        ),
    ]
