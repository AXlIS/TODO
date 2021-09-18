from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient

# Create your tests here.
from users.models import User
from users.views import UserViewSet


class TestUserViewSet(TestCase):

    def setUp(self):
        self.superuser = get_user_model().objects.create_superuser(
            username='arnold',
            email=f'email_arnold@mail.ru',
            first_name=f'name_arnold',
            password='arnold'
        )
        self.user = get_user_model().objects.create_user(
            username='arnoldo',
            email=f'email_arnoldo@mail.ru',
            first_name=f'name_arnoldo',
            password='arnoldo'
        )

    # 1 APIRequestFactory
    def test_get_list_guest(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_list_auth(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        force_authenticate(request, user=self.user)
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # 2 APIClient

    def test_get_detail_guest(self):
        user = User.objects.create(
            username='arnoldos',
            email=f'email_arnoldos@mail.ru',
            first_name=f'name_arnoldos',
            password='arnoldos'
        )
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_detail_user(self):
        user = User.objects.create(
            username='arnoldos',
            email=f'email_arnoldos@mail.ru',
            first_name=f'name_arnoldos',
            password='arnoldos'
        )
        client = APIClient()
        client.force_authenticate(user=self.superuser)
        response = client.get(f'/api/users/{user.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
