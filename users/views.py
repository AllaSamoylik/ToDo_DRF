from rest_framework.viewsets import GenericViewSet
from rest_framework.viewsets import ModelViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from .models import CustomUser
from .serializers import CustomUserModelSerializer


# class CustomUserCustomViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
class CustomUserModelViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
