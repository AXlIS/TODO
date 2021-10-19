from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from .serializers import TaskModelSerializer, ProjectBaseModelSerializer, TaskPostModelSerializer
from .models import Project, Task
from todoapp.filters import ProjectFilter, TaskFilter


# Create your views here.

class ProjectLimitPagination(LimitOffsetPagination):
    default_limit = 10


class TaskLimitPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectBaseModelSerializer
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitPagination


class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskModelSerializer
    pagination_class = TaskLimitPagination
    filterset_class = TaskFilter

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TaskPostModelSerializer
        return TaskModelSerializer

    def destroy(self, request, *args, **kwargs):
        task = Task.objects.get(pk=kwargs.get('pk'))
        task.is_active = False
        task.save()
        return Response({"massage": "Task in not active"}, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@renderer_classes([JSONRenderer])
def clear_basket(request):
    project = Project.objects.get(id=request.GET["project"])
    tasks = Task.objects.filter(status='basket', project=project)
    tasks.delete()
    return Response({"massage": "Trash has been emptied"}, status=status.HTTP_200_OK)
