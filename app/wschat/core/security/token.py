from copy import copy
from datetime import datetime

from django.contrib.auth import get_user_model
from jose import jwt

JWT_EXP_DURATION = 1 * 60 * 60


def get_user_key(payload):
    user = get_user_model().objects.get(id=payload['id'])

    return user.get_secret_key()


def generate(expiration_duration=JWT_EXP_DURATION, id=None, **kwargs):
    assert id is not None, 'required argument: id'

    utcnow = datetime.utcnow().timestamp()

    payload = copy(kwargs)
    payload['iat'] = utcnow
    payload['exp'] = utcnow + expiration_duration
    user_secret_key = get_user_key(payload)

    return jwt.encode(payload, user_secret_key, algorithm='HS256')


def parse(token):
    unverified_payload = jwt.get_unverified_claims(token)
    user_secret_key = get_user_key(unverified_payload)

    return jwt.decode(token, user_secret_key, algorithms=['HS256'])


__all__ = ['parse', 'generate']