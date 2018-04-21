from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import CreateAPIView
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

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


class UsersViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(methods=['get'], detail=False, url_path='im')
    def im(self, request, *args, **kwargs):
        return Response(data={'It': 'works!'})
