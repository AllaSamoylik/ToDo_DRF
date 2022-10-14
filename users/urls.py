from django.urls import path

from .apps import UsersConfig
from .views import CustomUserCustomViewSet

app_name = UsersConfig.name

urlpatterns = [
    # path('api/<str:version>/users/', CustomUserCustomViewSet.as_view({'get': 'list'})),
    path('', CustomUserCustomViewSet.as_view({'get': 'list'})),
]
