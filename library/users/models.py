from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class User(AbstractUser):
    ADMIN = 'AD'
    MANAGER = 'MG'
    DEVELOPER = 'DEV'

    STATUS_CHOICES = [
        (ADMIN, 'Administrator'),
        (MANAGER, 'Manager'),
        (DEVELOPER, 'Developer')
    ]

    email = models.EmailField(max_length=128, unique=True)
    status = models.CharField(max_length=3, choices=STATUS_CHOICES)
