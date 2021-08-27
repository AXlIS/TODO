from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import UserModelSerializer
from .models import User


# Create your views here.

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
