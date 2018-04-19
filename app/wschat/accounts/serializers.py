from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import User


class SignupSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(
        min_length=3, max_length=255, required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(required=True, min_length=8, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = [
            'id', 'nickname', 'password',
            'token',
        ]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
