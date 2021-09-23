from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelBaseSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'email', 'status']


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'email', 'status', 'is_superuser', 'is_staff']

# data = {'name': 'Igor'}
# serializer = UserSerializer(data=data)
# serializer.is_valid()
# author = serializer.save()


# author = Author('igor')
# serializer = AuthorSerializer(author)
# print(serializer.data)
