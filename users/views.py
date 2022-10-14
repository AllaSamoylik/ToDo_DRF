from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin
from .models import CustomUser
from .serializers import CustomUserModelSerializer, CustomUserV2ModelSerializer


class CustomUserModelViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer


class CustomUserCustomViewSet(CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return CustomUserV2ModelSerializer
        return CustomUserModelSerializer
