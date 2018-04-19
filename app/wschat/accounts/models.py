from datetime import datetime
from datetime import timedelta

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from jose import jwt

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    USERNAME_FIELD = 'nickname'

    objects = UserManager()

    nickname = models.CharField(db_index=True, max_length=255, unique=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    created_datetime = models.DateTimeField(auto_now_add=True)
    updated_datetime = models.DateTimeField(auto_now=True)

    @property
    def token(self):
        dt = datetime.now() + timedelta(days=60)
        payload = {
            'id': self.pk,
            'expires': int(dt.timestamp()),
        }

        return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

    def get_full_name(self):
        return self.nickname

    def get_short_name(self):
        return self.nickname

    def __str__(self):
        return self.nickname
