from django.urls import path

from .apps import UsersConfig
from .views import CustomUserCustomViewSet

app_name = UsersConfig.name

urlpatterns = [
    # ----------------------
    # Для UrlPathVersioning:
    # path('api/<str:version>/users/', CustomUserCustomViewSet.as_view({'get': 'list'})),
    # ----------------------
    # Для NamespaceVersioning:
    # path('', CustomUserCustomViewSet.as_view({'get': 'list'})),
    # ----------------------
]
