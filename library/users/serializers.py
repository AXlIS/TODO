from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'email', 'status', 'url']

# data = {'name': 'Igor'}
# serializer = UserSerializer(data=data)
# serializer.is_valid()
# author = serializer.save()


# author = Author('igor')
# serializer = AuthorSerializer(author)
# print(serializer.data)
