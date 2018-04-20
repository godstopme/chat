import uuid

from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    USERNAME_FIELD = 'nickname'

    objects = UserManager()

    nickname = models.CharField(db_index=True, max_length=255, unique=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    created_datetime = models.DateTimeField(auto_now_add=True)
    updated_datetime = models.DateTimeField(auto_now=True)

    secret_key = models.UUIDField(primary_key=False, default=uuid.uuid4, editable=False)

    def get_secret_key(self):
        return self.secret_key

    def regenerate_user_secret(self):
        self.secret_key = uuid.uuid4()

        self.save()

    def login(self):
        self.regenerate_user_secret()

    def logout(self):
        self.regenerate_user_secret()

    def get_full_name(self):
        return self.nickname

    def get_short_name(self):
        return self.nickname

    def __str__(self):
        return self.nickname
