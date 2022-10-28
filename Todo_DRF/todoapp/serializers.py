from rest_framework.relations import StringRelatedField
from rest_framework.serializers import ModelSerializer

from users.serializers import CustomUserModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    # users = StringRelatedField(many=True)
    # users = CustomUserModelSerializer(many=True)

    # def to_internal_value(self, value):
    #     return value

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializerBase(ModelSerializer):
    class Meta:
        model = ToDo
        fields = [
            'id',
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
            'id',
            'project',
            'text',
            'user',
            'is_active',
        ]
