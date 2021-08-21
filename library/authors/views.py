from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from authors.serializers import AuthorModelSerializer
from authors.models import Author


class AuthorsViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer
