# Generated by Django 3.1.5 on 2021-04-09 11:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('billings', '0002_auto_20210316_1645'),
    ]

    operations = [
        migrations.CreateModel(
            name='MaintenanceBaseFee',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('year', models.CharField(max_length=100, null=True)),
                ('base_fee', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
