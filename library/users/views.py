from rest_framework import status
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin
from .serializers import UserModelSerializer, UserModelBaseSerializer
from rest_framework.decorators import api_view, renderer_classes
from .models import User


# Create your views here.

class UserViewSet(RetrieveModelMixin, ListModelMixin, GenericViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserModelSerializer
        return UserModelBaseSerializer


@api_view(["GET"])
@renderer_classes([JSONRenderer])
def user(request):
    user = User.objects.get(username=request.user)
    serializer = UserModelSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)
