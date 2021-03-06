# Generated by Django 3.1.5 on 2021-03-14 04:53

from django.db import migrations, models
import simple_history.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='HistoricalProprietor',
            fields=[
                ('id', models.IntegerField(blank=True, db_index=True, editable=False)),
                ('proprietor_no', models.CharField(max_length=100, null=True)),
                ('title', models.CharField(choices=[('MR', 'Mr.'), ('MRS', 'Mrs.'), ('MS', 'Ms.'), (None, '-')], default=None, max_length=3, null=True)),
                ('name', models.CharField(max_length=255, null=True)),
                ('nric', models.CharField(max_length=255, null=True)),
                ('gender', models.CharField(choices=[('F', 'Female'), ('M', 'Male'), (None, '-')], default=None, max_length=1, null=True)),
                ('phone_number', models.CharField(max_length=20, null=True)),
                ('email', models.EmailField(max_length=100, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('moved_in_at', models.DateTimeField(null=True)),
                ('moved_out_at', models.DateTimeField(null=True)),
                ('deactivated_at', models.DateTimeField(null=True)),
                ('last_payment_at', models.DateTimeField(null=True)),
                ('created_date', models.DateTimeField(blank=True, editable=False)),
                ('modified_date', models.DateTimeField(blank=True, editable=False)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
            ],
            options={
                'verbose_name': 'historical proprietor',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='Proprietor',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('proprietor_no', models.CharField(max_length=100, null=True)),
                ('title', models.CharField(choices=[('MR', 'Mr.'), ('MRS', 'Mrs.'), ('MS', 'Ms.'), (None, '-')], default=None, max_length=3, null=True)),
                ('name', models.CharField(max_length=255, null=True)),
                ('nric', models.CharField(max_length=255, null=True)),
                ('gender', models.CharField(choices=[('F', 'Female'), ('M', 'Male'), (None, '-')], default=None, max_length=1, null=True)),
                ('phone_number', models.CharField(max_length=20, null=True)),
                ('email', models.EmailField(max_length=100, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('moved_in_at', models.DateTimeField(null=True)),
                ('moved_out_at', models.DateTimeField(null=True)),
                ('deactivated_at', models.DateTimeField(null=True)),
                ('last_payment_at', models.DateTimeField(null=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('modified_date', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
