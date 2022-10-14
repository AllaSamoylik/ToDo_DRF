from django.urls import path

from .apps import UsersConfig
from .views import CustomUserModelViewSet

app_name = UsersConfig.name

urlpatterns = [
    path('api/<str:version>/users/', CustomUserModelViewSet.as_view({'get': 'list'}))
]
