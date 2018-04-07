from django.shortcuts import redirect
from django.views.generic import TemplateView


class ChatView(TemplateView):
    template_name = 'chat.html'

    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated():
            return redirect('login')
        return super().get(request, *args, **kwargs)
