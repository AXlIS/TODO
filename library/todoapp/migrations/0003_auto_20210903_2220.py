# Generated by Django 3.2.6 on 2021-09-03 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0002_task_is_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='created_at',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='update_at',
            field=models.DateField(auto_now=True),
        ),
    ]
