from django_filters import rest_framework as filters
from todoapp.models import Project, Task


class ProjectFilter(filters.FilterSet):
    title = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['title']


class TaskFilter(filters.FilterSet):
    min_date = filters.DateFilter(field_name='created_at', lookup_expr='gte')
    max_date = filters.DateFilter(field_name='created_at', lookup_expr='lte')

    class Meta:
        model = Task
        fields = ['created_at']
