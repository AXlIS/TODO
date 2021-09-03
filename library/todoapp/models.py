from django.db import models
from users.models import User


# Create your models here.

class Project(models.Model):
    title = models.CharField(max_length=64)
    link = models.URLField(blank=True)
    users = models.ManyToManyField(User, related_name='projects')

    def __str__(self):
        return self.title


class Task(models.Model):
    BACKLOG = 'BK'
    PROCESSING = 'PC'
    DONE = 'DN'
    BASKET = 'BT'

    STATUS_CHOICES = [
        (BACKLOG, 'Backlog'),
        (PROCESSING, 'Processing'),
        (DONE, 'Done'),
        (BASKET, 'Basket')
    ]

    text = models.CharField(max_length=256)
    project = models.ForeignKey(Project, related_name='tasks', on_delete=models.CASCADE)
    creating_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    created_at = models.DateField(auto_now_add=True)
    update_at = models.DateField(auto_now=True)
    status = models.CharField(max_length=4, default=BACKLOG, choices=STATUS_CHOICES)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.text
