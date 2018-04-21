from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import LoginView
from .views import LogoutView
from .views import SignUpView
from .views import UsersViewSet

router = SimpleRouter()
router.register('users', UsersViewSet)

urlpatterns = [
    path('users/signup/', SignUpView.as_view(), name='signup'),
    path('user/login/', LoginView.as_view(), name='login'),
    # path('user/login/refresh/', RefreshLoginView.as_view(), name='login-refresh'),
    path('user/logout/', LogoutView.as_view(), name='logout'),
]

urlpatterns += router.urls
