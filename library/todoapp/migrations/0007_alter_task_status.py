# Generated by Django 3.2.6 on 2021-10-19 12:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0006_alter_task_project'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('backlog', 'Backlog'), ('processing', 'Processing'), ('done', 'Done'), ('basket', 'Basket')], default='backlog', max_length=16),
        ),
    ]
