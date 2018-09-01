from django.contrib.auth import get_user_model
from jose import jwt
from rest_framework import exceptions
from rest_framework.authentication import BaseAuthentication
from rest_framework.authentication import get_authorization_header

from .token import parse as parse_token


class TokenAuthentication(BaseAuthentication):
    auth_header_prefix = 'JWT'
    www_authenticate_realm = 'api'

    def authenticate(self, request):
        token = self.get_token(request)

        if token is None:
            return None

        try:
            token_payload = parse_token(token)
        except jwt.JWTError as e:
            raise exceptions.AuthenticationFailed(str(e))
        except KeyError:
            raise exceptions.AuthenticationFailed('Invalid token payload.')

        return self.authenticate_credentials(token, token_payload)

    def authenticate_credentials(self, token, payload):
        user_model = get_user_model()

        try:
            user = user_model.objects.get(id=payload['id'], is_active=True)
        except user_model.DoesNotExist:
            raise exceptions.AuthenticationFailed('User does not exists.')

        if not user.is_active:
            raise exceptions.AuthenticationFailed('User is disabled.')

        return user, {
            **payload,
            'token': token,
        }

    def get_token(self, request):
        auth = get_authorization_header(request).split()

        if not auth or auth[0].decode('utf-8').lower() != self.auth_header_prefix.lower():
            return None

        if len(auth) == 1:
            raise exceptions.AuthenticationFailed('Invalid authorization header. No credentials provided.')
        elif len(auth) > 2:
            msg = 'Invalid Authorization header. Credentials string should not contain spaces.'

            raise exceptions.AuthenticationFailed(msg)

        return auth[1]

    def authenticate_header(self, request):
        return f'{self.auth_header_prefix} realm="{self.www_authenticate_realm}"'
