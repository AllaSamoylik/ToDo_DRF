from django.contrib import admin

from todoapp.models import Project, ToDo


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'link', 'get_users',)
    list_display_links = ('title',)
    ordering = ['id']

    def get_users(self, obj):
        return ", ".join([user.username for user in obj.users.all()])
    get_users.short_description = "Users"


@admin.register(ToDo)
class ToDoAdmin(admin.ModelAdmin):
    list_display = ('id', 'get_project', 'text', 'get_user',)
    ordering = ['id']

    def get_project(self, obj):
        return obj.project.title

    def get_user(self, obj):
        return obj.user.username
