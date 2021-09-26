from graphene import Schema, ObjectType, List, Field, Int, Mutation, ID, String
from graphene_django import DjangoObjectType

from todoapp.models import Project, Task
from users.models import User


class UsersType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = '__all__'


class Query(ObjectType):
    users = List(UsersType)
    user = Field(UsersType, pk=Int(required=False))
    projects = List(ProjectType)
    project = Field(ProjectType, pk=Int(required=False))
    tasks = List(TaskType)
    task = Field(TaskType, pk=Int(required=False))

    def resolve_users(self, info):
        return User.objects.all()

    def resolve_user(self, info, pk):
        return User.objects.filter(pk=pk).first()

    def resolve_projects(self, info):
        return Project.objects.all()

    def resolve_project(self, info, pk):
        return Project.objects.filter(pk=pk).first()

    def resolve_tasks(self, info):
        return Task.objects.all()

    def resolve_task(self, info, pk):
        return Task.objects.filter(pk=pk).first()


class UserMutation(Mutation):
    class Arguments:
        pk = ID()
        first_name = String(required=False)

    user = Field(UsersType)

    @classmethod
    def mutate(cls, root, info, pk, first_name):
        user = User.objects.get(pk=pk)
        user.first_name = first_name
        user.save()
        return UserMutation(user=user)


class Mutation(ObjectType):
    update_user = UserMutation.Field()


schema = Schema(query=Query, mutation=Mutation)
