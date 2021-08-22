from django.db import models


# Create your models here.

class User(models.Model):
    ADMIN = 'AD'
    MANAGER = 'MG'
    DEVELOPER = 'DEV'

    STATUS_CHOICES = [
        (ADMIN, 'Administrator'),
        (MANAGER, 'Manager'),
        (DEVELOPER, 'Developer')
    ]

    name = models.CharField(max_length=64)
    surname = models.CharField(max_length=64)
    email = models.EmailField(max_length=128, unique=True)
    status = models.CharField(max_length=3, choices=STATUS_CHOICES)
    tasks = models.PositiveIntegerField()
