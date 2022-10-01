from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.views import CustomUserCustomViewSet
from todoapp.views import ProjectModelViewSet, ToDoModelViewSet

router = DefaultRouter()
router.register('users', CustomUserCustomViewSet)
router.register('projects', ProjectModelViewSet)
router.register('todos', ToDoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls'))
]
