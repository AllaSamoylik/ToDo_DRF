from django.contrib import admin
from django.urls import path, include
from graphene_django.views import GraphQLView
from rest_framework import permissions
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework.routers import DefaultRouter
from todoapp.views import ProjectModelViewSet, ToDoModelViewSet
from users.views import CustomUserCustomViewSet, CustomUserModelViewSet
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="TODO",
        default_version='0.2',
        description="Documentation to TODO project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

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
    path(
        'swagger<str:format>/',
        schema_view.without_ui(),
        name='schema-swagger-without-ui'
    ),
    path(
        'swagger/',
        schema_view.with_ui('swagger', cache_timeout=0),
        name='schema-swagger-ui'
    ),
    path(
        'redoc/',
        schema_view.with_ui('redoc', cache_timeout=0),
        name='schema-redoc'
    ),

    path("graphql/", GraphQLView.as_view(graphiql=True)),
]
