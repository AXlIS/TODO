from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from users.serializers import UserModelSerializer
from users.models import User


# Create your views here.

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
