from django.urls import path
from . import views
from django.conf.urls import url

urlpatterns = [
    path('lobby', views.lobby, name='lobby'),
    path('sketch', views.sketch, name='sketch'),
    url(r'ketu/$', views.ketu, name='ketu'),
    url(r'^ajaxproject/$', views.ajaxproject, name='ajaxproject'),
    url(r'^ketu/searchData/$', views.searchData, name="searchData"),
    path('game', views.game, name='game'),
    path('', views.main, name='main'),
]