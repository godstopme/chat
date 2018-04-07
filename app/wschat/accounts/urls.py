from functools import partial

from django.contrib.auth import views
from django.urls import path

from .views import SignUpView

login = partial(views.login, redirect_authenticated_user=True)

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', login, name='login'),
    path('logout/', views.logout, name='logout'),
]
