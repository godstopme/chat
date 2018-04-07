from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import redirect
from django.views.generic import CreateView


def redirect_authenticated(func):
    def decorator(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('chat')
        return func(self, request, *args, **kwargs)

    return decorator


class SignUpView(CreateView):
    form_class = UserCreationForm
    template_name = 'registration/signup.html'

    @redirect_authenticated
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @redirect_authenticated
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)

    def form_valid(self, form):
        self.object = form.save()

        data = form.cleaned_data

        username = data.get('username')
        password = data.get('password1')

        self.login_user(username, password)

        return redirect('chat')

    def login_user(self, username, password):
        user = authenticate(username=username, password=password)
        login(self.request, user)
