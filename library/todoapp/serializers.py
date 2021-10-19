from rest_framework.serializers import HyperlinkedModelSerializer, SlugRelatedField, ModelSerializer
from users.serializers import UserModelSerializer
from .models import Project, Task


class TaskModelSerializer(HyperlinkedModelSerializer):
    creating_user = SlugRelatedField(
        read_only=True,
        slug_field='id'
    )

    class Meta:
        model = Task
        fields = ['id', 'text', 'status', 'created_at', 'creating_user']


class TaskPostModelSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ['text', 'creating_user', 'project', 'id', 'status']


class ProjectBaseModelSerializer(HyperlinkedModelSerializer):
    # tasks = RelatedField(read_only=True, many=True)
    # users = HyperlinkedRelatedField(many=True, read_only=True, view_name='user-detail')
    # users = UserModelSerializer(many=True)
    users = SlugRelatedField(
        read_only=True,
        slug_field='id',
        many=True
    )
    tasks = TaskModelSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'link', 'users', 'tasks']


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'title']
