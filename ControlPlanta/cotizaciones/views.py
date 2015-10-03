from django.shortcuts import render

# Create your views here.

#DETALLES DE PRODUCTOS API

from rest_framework import serializers,viewsets
from cotizaciones.models import DetalleProductosCoti, Cotizacion


class DetalleProductosCotiSerializer(serializers.ModelSerializer):

    class Meta:
        model = DetalleProductosCoti
        fields =('id','producto','description','preciouni','cantidad','iv','total')

class DetalleProductosCotiViewSet(viewsets.ModelViewSet):

    serializer_class = DetalleProductosCotiSerializer
    queryset = DetalleProductosCoti.objects.all()
    lookup_field = 'id'
    filter_fields=('id','producto','description','preciouni','cantidad','iv','total')

#VENTA API

class CotizacionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cotizacion
        fields =('id','client','nombrecliente','cashier','date','time','totolkilogramos','cantidadarticulos','subtotal','iv','descopor','desctocol','total','detalleproductos')

class CotizacionViewSet(viewsets.ModelViewSet):

    serializer_class = CotizacionSerializer
    queryset = Cotizacion.objects.all()
    lookup_field = 'id'
    filter_fields=('id','client','nombrecliente','cashier','date','time','totolkilogramos','cantidadarticulos','subtotal','iv','descopor','desctocol','total','detalleproductos')

