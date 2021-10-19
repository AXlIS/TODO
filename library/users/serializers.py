from rest_framework.relations import SlugRelatedField, StringRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer

from todoapp.models import Project
from .models import User


class ProjectModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Project
        fields = ['id', 'title']


class UserModelBaseSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'email', 'status']


class UserModelSerializer(HyperlinkedModelSerializer):
    projects = ProjectModelSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'email', 'projects']

# data = {'name': 'Igor'}
# serializer = UserSerializer(data=data)
# serializer.is_valid()
# author = serializer.save()


# author = Author('igor')
# serializer = AuthorSerializer(author)
# print(serializer.data)
