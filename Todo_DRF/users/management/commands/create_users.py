from django.core.management.base import BaseCommand
from users.models import CustomUser


class Command(BaseCommand):
    def handle(self, *args, **options):
        superuser = CustomUser.objects.create_superuser(
            username='test_admin',
            email='test_admin@admin.com',
            password='GfhjkmFlvbyf1'
        )
        test_user = CustomUser.objects.create_user(
            username='test_user',
            email='test_user@user.com',
            password='GfhjkmFlvbyf2'
        )
