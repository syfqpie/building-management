# Generated by Django 4.0.4 on 2022-08-15 09:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('units', '0003_rename_moved_in_at_unitactivity_activity_at_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('ticket_no', models.CharField(editable=False, max_length=100, unique=True)),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=512)),
                ('status', models.IntegerField(choices=[(1, 'Opened'), (2, 'In progress'), (3, 'Resolved'), (4, 'Closed'), (5, 'Duplicated')], default=1)),
                ('category', models.IntegerField(choices=[(1, 'System'), (2, 'Unit'), (3, 'Facility')], default=1)),
                ('priority', models.IntegerField(choices=[(1, 'Critical'), (2, 'High'), (3, 'Normal'), (4, 'Low'), (5, 'Very Low')], default=3)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_modified_at', models.DateTimeField(auto_now=True)),
                ('assignee', models.ForeignKey(limit_choices_to={'user_type': 1}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tickets_assigned', to=settings.AUTH_USER_MODEL)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tickets_created', to=settings.AUTH_USER_MODEL)),
                ('last_modified_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tickets_modified', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-ticket_no'],
            },
        ),
        migrations.CreateModel(
            name='TicketTag',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('tag', models.CharField(max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('last_modified_at', models.DateTimeField(auto_now=True)),
                ('created_by', models.ForeignKey(limit_choices_to={'user_type': 1}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tags_created', to=settings.AUTH_USER_MODEL)),
                ('last_modified_by', models.ForeignKey(limit_choices_to={'user_type': 1}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tags_modified', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['tag'],
            },
        ),
        migrations.CreateModel(
            name='TicketComment',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('comment', models.TextField(max_length=512)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(limit_choices_to={'user_type': 1}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='comments', to=settings.AUTH_USER_MODEL)),
                ('reply_to', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reply_comments', to='tickets.ticketcomment')),
                ('ticket', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ticket_comments', to='tickets.ticket')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='TicketActivity',
            fields=[
                ('id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('status', models.IntegerField(choices=[(1, 'Opened'), (2, 'In progress'), (3, 'Resolved'), (4, 'Closed'), (5, 'Duplicated')], default=1)),
                ('notes', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tickets_activity_created', to=settings.AUTH_USER_MODEL)),
                ('ticket', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ticket_activities', to='tickets.ticket')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.AddField(
            model_name='ticket',
            name='tags',
            field=models.ManyToManyField(default=[], related_name='tag_tickets', to='tickets.tickettag'),
        ),
        migrations.AddField(
            model_name='ticket',
            name='unit',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='unit_tickets', to='units.unit'),
        ),
    ]
