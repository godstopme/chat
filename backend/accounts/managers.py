from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, nickname, password=None):
        if not nickname:
            raise ValueError('Users must have a nickname')

        user = self.model(nickname=nickname)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, nickname, password):
        user = self.create_user(nickname, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user
