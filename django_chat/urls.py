from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('chat.urls')),
    path('', include('chat.urls')),
    path('', include('chat.urls')),
]