from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response
from django.template import RequestContext
from rest_framework import serializers, viewsets
from inventarios.models import InventarioTotal, ResumenInventario, EntradasInventario, SalidasInventario

# Create your views here.

class InventarioTotalSerializer(serializers.ModelSerializer):

    class Meta:
        model = InventarioTotal
        fields =('id','producto','peso','lote','vencimiento','tipo')

class InventarioTotalViewSet(viewsets.ModelViewSet):

    serializer_class = InventarioTotalSerializer
    queryset = InventarioTotal.objects.all()
    lookup_field = 'id'
    filter_fields=('id','producto','peso','lote','vencimiento','tipo')

#RESUMEN INVENTARIO API

class InventarioResumenSerializer(serializers.ModelSerializer):

    class Meta:
        model = ResumenInventario
        fields =('id','producto','cantidad',)

class InventarioResumenViewSet(viewsets.ModelViewSet):

    serializer_class = InventarioResumenSerializer
    queryset = ResumenInventario.objects.all()
    lookup_field = 'id'
    filter_fields=('id','producto','cantidad',)


#ENTRADAS INVENTARIO API
class InventarioEntradasSerializer(serializers.ModelSerializer):

    class Meta:
        model = EntradasInventario
        fields =('id','tipo','datos','producto', 'peso','date','time' )

class InventarioEntradasViewSet(viewsets.ModelViewSet):

    serializer_class = InventarioEntradasSerializer
    queryset = EntradasInventario.objects.all()
    lookup_field = 'id'
    filter_fields=('id','tipo','datos','producto', 'peso','date','time' )

#SALIDAS INVENTARIO API
class InventarioSalidasSerializer(serializers.ModelSerializer):

    class Meta:
        model = SalidasInventario
        fields =('id','tipo','datos','producto', 'peso','date','time' )

class InventarioSalidasViewSet(viewsets.ModelViewSet):

    serializer_class = InventarioSalidasSerializer
    queryset = SalidasInventario.objects.all()
    lookup_field = 'id'
    filter_fields=('id','tipo','datos','producto', 'peso','date','time' )