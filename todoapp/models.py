from django.db import models
from users.models import CustomUser
NULLABLE = {'null': True, 'blank': True}


class Project(models.Model):
    title = models.CharField(max_length=100, verbose_name="Title")
    link = models.URLField(**NULLABLE, verbose_name="Repo Link")
    users = models.ManyToManyField(CustomUser, verbose_name="Users")

    def __str__(self):
        return self.title


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, verbose_name="Project")
    text = models.CharField(max_length=300, verbose_name="ToDo Text")
    created = models.DateTimeField(auto_now_add=True, editable=False, verbose_name="Created")
    updated = models.DateTimeField(auto_now=True, editable=False, verbose_name="Edited")
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="User")

    is_active = models.BooleanField(default=False, verbose_name="ToDo Status")

    def __str__(self):
        return f"{self.text}, {self.user}"
