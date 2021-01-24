from django.urls import path
from . import views

urlpatterns = [
    path('lobby', views.lobby, name='lobby'),
    path('sketch', views.sketch, name='sketch'),
    path('ketu', views.ketu, name='ketu'),
    path('', views.main, name='main'),
]
