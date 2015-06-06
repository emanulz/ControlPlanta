"""ControlPlanta URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from api.views import LoteApiView
from cajeros.views import CajeroCreate
from canales.views import CanalViewSet
from lotes.views import LoteCreate, LandingView
from rest_framework import routers

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'canales', CanalViewSet)


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'addlote/', 'lotes.views.loteform', name='lotes'),
    url(r'addcanal/', 'canales.views.canalform', name='canales'),
    url(r'addlote2/', 'lotes.views.loteform2', name='lotes2'),
    url(r'^getcanal/(?P<id>\d+)$', 'lotes.views.cargar_canal', name='cargar_canal'),
    url(r'^savelote/$', 'lotes.views.guardar_lote', name='guardar_lote'),
    url(r'^consulta/$', 'lotes.views.test_lote', name='test'),
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^lotes/', LoteApiView,name='lotes'),
    url(r'^', LandingView.as_view()),




]
