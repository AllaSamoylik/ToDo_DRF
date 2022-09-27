from rest_framework.relations import StringRelatedField
from rest_framework.serializers import ModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    # users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):

    class Meta:
        model = ToDo
        fields = [
            'project',
            'text',
            'user',
            'is_active',
        ]
