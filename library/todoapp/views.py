from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectModelSerializer, TaskModelSerializer
from .models import Project, Task


# Create your views here.

class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskModelSerializer
