from rest_framework.serializers import HyperlinkedModelSerializer, SlugRelatedField
from users.serializers import UserModelSerializer
from .models import Project, Task


class TaskModelSerializer(HyperlinkedModelSerializer):
    creating_user = SlugRelatedField(
        read_only=True,
        slug_field='id'
    )

    class Meta:
        model = Task
        fields = ['text', 'status', 'created_at', 'creating_user']


class ProjectModelSerializer(HyperlinkedModelSerializer):
    # tasks = RelatedField(read_only=True, many=True)
    # users = HyperlinkedRelatedField(many=True, read_only=True, view_name='user-detail')
    users = UserModelSerializer(many=True)
    tasks = TaskModelSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
