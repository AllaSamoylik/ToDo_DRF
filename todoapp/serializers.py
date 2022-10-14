from rest_framework.relations import StringRelatedField
from rest_framework.serializers import ModelSerializer

from users.serializers import CustomUserModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializerBase(ModelSerializer):
    class Meta:
        model = ToDo
        fields = [
            'project',
            'text',
            'user',
            'is_active',
        ]


class ToDoModelSerializer(ModelSerializer):
    project = ProjectModelSerializer()
    user = CustomUserModelSerializer()

    class Meta:
        model = ToDo
        fields = [
            'project',
            'text',
            'user',
            'is_active',
        ]
