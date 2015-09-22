from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import serializers,viewsets
from devoluciones.models import DetalleDev, Devolucion

# Create your views here.

#DEVOLUCION API

class DevolucionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Devolucion
        fields =('id','venta','detalledevolucion','notacredito')

class DevolucionViewSet(viewsets.ModelViewSet):

    serializer_class = DevolucionSerializer
    queryset = Devolucion.objects.all()
    lookup_field = 'id'
    filter_fields=('id','venta','detalledevolucion','notacredito')

#DETALLES DE DEV API


class DetalleDevSerializer(serializers.ModelSerializer):

    class Meta:
        model = DetalleDev
        fields =('id','producto','peso','colones')

class DetallePagoViewSet(viewsets.ModelViewSet):

    serializer_class = DetalleDevSerializer
    queryset = DetalleDev.objects.all()
    lookup_field = 'id'
    filter_fields=('id','producto','peso','colones')