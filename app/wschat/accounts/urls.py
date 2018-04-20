from functools import partial

from django.contrib.auth import views
from django.urls import path
from rest_framework.routers import SimpleRouter

from .views import SignUpView
from .views import LoginView
from .views import UsersViewSet


router = SimpleRouter()
router.register('users', UsersViewSet)

urlpatterns = [
    # path('users/', UsersViewSet.as_view()),
    path('users/signup/', SignUpView.as_view(), name='signup'),
    path('user/login/', LoginView.as_view(), name='login'),
    path('user/logout/', views.logout, name='logout'),
]

urlpatterns += router.urls

