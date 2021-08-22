from django.core.management.base import BaseCommand, CommandError
from users.models import User


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('count', type=int)

    def handle(self, *args, **options):
        User.objects.all().delete()
        count = options['count']
        for i in range(count):
            user = User.objects.create(name=f'User{i + 1}',
                                       surname=f'Surname{i + 1}',
                                       email=f'email{i+1}@gmail.com',
                                       status='DEV',
                                       tasks=i)
            print(f'user {user} created')

