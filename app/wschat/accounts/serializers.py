from datetime import datetime
from datetime import timedelta

from django.contrib.auth import authenticate
from jose import jwt
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from wschat.core.security.token import generate as generate_token
from wschat.core.security.token import parse as parse_token
from .models import User


class SignUpSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(
        min_length=3, max_length=255, required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(required=True, min_length=8, write_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'nickname', 'password',
        ]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    nickname = serializers.CharField(
        min_length=3, max_length=255
    )
    password = serializers.CharField(min_length=8, write_only=True)
    token = serializers.CharField(max_length=512, read_only=True)

    def validate_nickname(self, value):
        if not value:
            raise serializers.ValidationError('A nickname is required to login')
        return value

    def validate_password(self, value):
        if not value:
            raise serializers.ValidationError('A password is required to login')
        return value

    def validate(self, data):
        nickname = data.pop('nickname')
        password = data.pop('password')

        user = authenticate(username=nickname, password=password)

        if user is None or not user.is_active:
            raise serializers.ValidationError('A user with this nickname/password was not found')
        # user.login()
        token = generate_token(id=user.id, nickname=nickname, username_field=user.USERNAME_FIELD)

        return {
            'nickname': nickname,
            'password': password,
            'token': token,
        }


class RefreshLoginSerializer(serializers.Serializer):
    required_token_fields = ['nickname', 'iat']
    refresh_limit = timedelta(weeks=2)

    token = serializers.CharField(max_length=512)

    def validate_token_payload(self, token):
        try:
            payload = parse_token(token)

            if any(map(lambda x: x not in payload, self.required_token_fields)):
                raise KeyError
        except jwt.JWTError as e:
            raise serializers.ValidationError(str(e))
        except KeyError:
            raise serializers.ValidationError('Invalid token payload.')

        return payload

    def validate(self, data):
        token = data.pop('token')

        payload = self.validate_token_payload(token)

        try:
            user = User.objects.get(nickname=payload['nickname'])
        except User.DoesNotExist:
            raise serializers.ValidationError('User does not exist.')

        if not user.is_active:
            raise serializers.ValidationError('User is not active.')

        refresh_expiration_datetime = datetime.utcfromtimestamp(payload['iat']) + self.refresh_limit

        if refresh_expiration_datetime < datetime.utcnow():
            raise serializers.ValidationError('Token refresh has expired.')

        return {
            'token': generate_token(reset_iat=False, **payload),
        }


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = [
            'nickname', 'password', 'is_staff',
            'is_active', 'created_datetime', 'updated_datetime',
        ]

    def update(self, instance, validated_data):
        password = validated_data.pop('password')

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance
