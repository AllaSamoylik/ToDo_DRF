from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from .models import CustomUser
from .serializers import CustomUserModelSerializer


class CustomUserCustomViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer
