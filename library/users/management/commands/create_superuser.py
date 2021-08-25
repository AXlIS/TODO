from django.core.management.base import BaseCommand
from users.models import User


class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('username', type=str)

    def handle(self, *args, **options):
        username = options['username']
        user = User.objects.create_superuser(username=username,
                                             email=f'email_{username}@mail.ru',
                                             first_name=f'name_{username}',
                                             password=username)
