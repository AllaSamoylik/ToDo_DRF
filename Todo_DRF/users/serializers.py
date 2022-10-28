from rest_framework.serializers import ModelSerializer
from .models import CustomUser


class CustomUserModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
        ]


class CustomUserV2ModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_superuser',
            'is_staff',
        ]
