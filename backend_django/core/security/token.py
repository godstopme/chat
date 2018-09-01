from copy import copy
from datetime import datetime
from datetime import timedelta

from django.contrib.auth import get_user_model
from jose import jwt

JWT_EXP_DURATION = timedelta(days=1)


def get_user_key(payload):
    user = get_user_model().objects.get(pk=payload['id'])

    return user.get_secret_key()


def generate(expiration_duration=JWT_EXP_DURATION, id=None, reset_iat=True, **kwargs):
    assert id is not None, 'required argument: id'

    payload = copy(kwargs)

    utcnow = datetime.utcnow()

    payload['id'] = id

    if reset_iat:
        payload['iat'] = utcnow
    payload['exp'] = utcnow + expiration_duration

    user_secret_key = get_user_key(payload)

    return jwt.encode(payload, user_secret_key, algorithm='HS256')


def parse(token):
    unverified_payload = jwt.get_unverified_claims(token)
    user_secret_key = get_user_key(unverified_payload)

    return jwt.decode(token, user_secret_key, algorithms='HS256')


__all__ = ['parse', 'generate']
