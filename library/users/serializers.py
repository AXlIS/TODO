from rest_framework.relations import SlugRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelBaseSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'email', 'status']


class UserModelSerializer(HyperlinkedModelSerializer):
    projects = SlugRelatedField(
        read_only=True,
        slug_field='id',
        many=True
    )

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
