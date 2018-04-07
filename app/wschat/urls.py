from django.contrib import admin
from django.urls import include
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('wschat.accounts.urls')),
    path('', include('wschat.chat.urls'), name='home'),
]
