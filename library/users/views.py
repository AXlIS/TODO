from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from library.users.serializers import UserModelSerializer
from library.users.models import User


# Create your views here.

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
