from rest_framework.viewsets import ModelViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from .models import CustomUser
from .serializers import CustomUserModelSerializer, CustomUserV2ModelSerializer


# class CustomUserCustomViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
class CustomUserModelViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return CustomUserV2ModelSerializer
        return CustomUserModelSerializer
