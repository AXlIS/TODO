from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase


# Create your tests here.

class TestProjectViewSet(APITestCase):
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

    def test_get_list(self):
        self.client.force_login(user=self.user)
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
