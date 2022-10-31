import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer
from users.models import CustomUser
from users.views import CustomUserModelViewSet
from .models import Project, ToDo
from .views import ToDoModelViewSet


class TestAllViewSet(TestCase):
    def setUp(self):
        self.admin = CustomUser.objects.create_superuser(
            username='test_admin',
            email='test_admin@admin.com',
            password='GfhjkmFlvbyf1'
        )
        self.user = CustomUser.objects.create_user(
            username='test_user',
            email='test_user@user.com',
            password='GfhjkmFlvbyf2'
        )
        self.project = Project.objects.create(
            title='test_title',
            link='https://github.com/test'
        )
        self.todo = ToDo.objects.create(
            project=self.project,
            text='test_text',
            user=self.user
        )

    def test_get_list_users(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = CustomUserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest_todo(self):
        factory = APIRequestFactory()
        request = factory.post(
            '/api/todos/',
            {'project': self.project.id, 'text': 'test', 'user': self.user.id},
            format='json'
        )
        view = ToDoModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin_todo(self):
        factory = APIRequestFactory()
        request = factory.post(
            '/api/todos/',
            {'project': self.project.id, 'text': 'test', 'user': self.user.id},
            format='json'
        )
        force_authenticate(request, self.admin)
        view = ToDoModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail_project(self):
        client = APIClient()
        response = client.get(f'/api/projects/{self.project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest_todo(self):
        client = APIClient()
        response = client.put(
            f'/api/todos/{self.todo.id}/',
            {'text': 'new_text'}
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin_todo(self):
        client = APIClient()
        client.login(username='test_admin', password='GfhjkmFlvbyf1')
        response = client.put(
            f'/api/todos/{self.todo.id}/',
            {'project': self.project.id, 'text': 'new_text', 'user': self.user.id}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo = ToDo.objects.get(id=self.todo.id)
        self.assertEqual(self.todo.text, 'new_text')
        client.logout()


class APITestAllViewSet(APITestCase):
    def test_get_list_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_mixer(self):
        admin = CustomUser.objects.create_superuser(
            username='test_admin',
            email='test_admin@admin.com',
            password='GfhjkmFlvbyf1'
        )
        user = mixer.blend(CustomUser)
        project = mixer.blend(Project)
        todo = mixer.blend(ToDo)
        self.client.login(username='test_admin', password='GfhjkmFlvbyf1')
        response = self.client.put(
            f'/api/todos/{todo.id}/',
            {'project': project.id, 'text': 'add_text', 'user': user.id}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(todo.text, 'add_text')

    def test_get_detail_author(self):
        admin = CustomUser.objects.create_superuser(
            username='test_admin',
            email='test_admin@admin.com',
            password='GfhjkmFlvbyf1'
        )
        todo = mixer.blend(ToDo, project__title='peace')
        self.client.login(username='test_admin', password='GfhjkmFlvbyf1')
        response = self.client.get(f'/api/todos/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_book = json.loads(response.content)
        self.assertEqual(response_book['project']['title'], 'peace')
