from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from rest_framework.routers import DefaultRouter

from todoapp.views import ProjectModelViewSet, ToDoModelViewSet
from users.views import CustomUserCustomViewSet

router = DefaultRouter()
# router.register('users', CustomUserModelViewSet)
# ----------------------
# Для QueryParameterVersioning:
router.register('users', CustomUserCustomViewSet)
# ----------------------
router.register('projects', ProjectModelViewSet)
router.register('todos', ToDoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('api-jwt-token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api-jwt-token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-jwt-token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # ----------------------
    # Для UrlPathVersioning:
    # path('', include('users.urls')),
    # ----------------------
    # Для NamespaceVersioning:
    # path('api/users/0.1', include('users.urls', namespace='0.1')),
    # path('api/users/0.2', include('users.urls', namespace='0.2')),
    # ----------------------
]
