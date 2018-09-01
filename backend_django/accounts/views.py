from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import DestroyModelMixin
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.viewsets import GenericApiViewSet
from .models import User
from .serializers import LoginSerializer
from .serializers import RefreshLoginSerializer
from .serializers import SignUpSerializer
from .serializers import UserSerializer


class SignUpView(CreateAPIView):
    serializer_class = SignUpSerializer


class AuthUserView(GenericAPIView):
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data)


class LoginView(AuthUserView):
    serializer_class = LoginSerializer


class RefreshLoginView(AuthUserView):
    serializer_class = RefreshLoginSerializer


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.logout()
        response_data = {
            'detail': 'Logged out.',
        }

        return Response(data=response_data, status=status.HTTP_204_NO_CONTENT)


class UsersViewSet(GenericApiViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def update(self, request, *args, **kwargs):
        if request.user.is_staff:
            return super().update(request, *args, **kwargs)
        return Response(data={'Detail': 'Access denied.'}, status=status.HTTP_403_FORBIDDEN)


class MeAuthMixin:
    permission_classes = [IsAuthenticated]


class MeGenericAPIView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class MeViewSet(MeGenericAPIView, RetrieveModelMixin, MeAuthMixin):
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)


class RemoveAccountMeViewSet(MeGenericAPIView, DestroyModelMixin, MeAuthMixin):
    def post(self, request, *args, **kwargs):
        if request.user.is_staff:
            return Response(data={'Detail': "Can't remove staff user."}, status=status.HTTP_400_BAD_REQUEST)
        return self.destroy(request, *args, **kwargs)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
