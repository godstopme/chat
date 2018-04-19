from django.shortcuts import redirect
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.response import Response

from .serializers import LoginSerializer
from .serializers import SignUpSerializer


def redirect_authenticated(func):
    def decorator(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('chat')
        return func(self, request, *args, **kwargs)

    return decorator


class SignUpView(CreateAPIView):
    serializer_class = SignUpSerializer


class LoginView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data)
