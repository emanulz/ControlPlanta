from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework import serializers,viewsets
from devoluciones.models import DetalleDev, Devolucion

# Create your views here.

class DevolucionesView(TemplateView):
    template_name = 'devoluciones.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(DevolucionesView, self).dispatch(*args, **kwargs)

#DEVOLUCION API

class DevolucionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Devolucion
        fields =('id','venta','detalledevolucion','totalcolones','cliente')

class DevolucionViewSet(viewsets.ModelViewSet):

    serializer_class = DevolucionSerializer
    queryset = Devolucion.objects.all()
    lookup_field = 'id'
    filter_fields=('id','venta','detalledevolucion','totalcolones','cliente')

#DETALLES DE DEV API


class DetalleDevSerializer(serializers.ModelSerializer):

    class Meta:
        model = DetalleDev
        fields =('id','producto','peso','colones')

class DetalleDevViewSet(viewsets.ModelViewSet):

    serializer_class = DetalleDevSerializer
    queryset = DetalleDev.objects.all()
    lookup_field = 'id'
    filter_fields=('id','producto','peso','colones')