from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectModelSerializer, TaskModelSerializer
from .models import Project, Task
from todoapp.filters import ProjectFilter, TaskFilter


# Create your views here.

class ProjectLimitPagination(LimitOffsetPagination):
    default_limit = 10


class TaskLimitPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitPagination


class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskModelSerializer
    pagination_class = TaskLimitPagination
    filterset_class = TaskFilter

    def destroy(self, request, *args, **kwargs):
        task = Task.objects.get(pk=kwargs.get('pk'))
        task.is_active = False
        task.save()
        return Response({"massage": "Task in not active"})
