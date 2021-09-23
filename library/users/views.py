from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin
from .serializers import UserModelSerializer, UserModelBaseSerializer
from .models import User


# Create your views here.

class UserViewSet(RetrieveModelMixin, ListModelMixin, GenericViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializer
        return UserModelBaseSerializer
