from functools import partial

from django.contrib.auth import views
from django.urls import path

from .views import SignUpView, LoginView

login = partial(views.login, redirect_authenticated_user=True)

urlpatterns = [
    path('users/signup/', SignUpView.as_view(), name='signup'),
    path('user/login/', LoginView.as_view(), name='login'),
    path('user/logout/', views.logout, name='logout'),
]
