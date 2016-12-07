from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response
from django.template import RequestContext
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from django.shortcuts import redirect
from rest_framework import serializers, viewsets
from inventarios.models import InventarioTotal, ResumenInventario, EntradasInventario, SalidasInventario
from productos.models import Producto
# Create your views here.

#INVENTARIOS TEMPLATE VIEW

class InventariosView(TemplateView):
    template_name = 'inventarios.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(InventariosView, self).dispatch(*args, **kwargs)


class AlertasInventariosView(TemplateView):
    template_name = 'alertasinventarios.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(AlertasInventariosView, self).dispatch(*args, **kwargs)


def inventory_to_zero(request):

    if request.method == 'GET':
        return render_to_response('inventarioACero.html', RequestContext(request, {}))

    if request.method == 'POST':

        productos = Producto.objects.all()

        for producto in productos:
            producto.inventory = 0
            producto.inventoryplanta = 0
            producto.inventorypv = 0
            producto.inventory1 = 0
            producto.inventory2 = 0
            producto.inventory3 = 0

            producto.save()
            
        return JsonResponse({'status': True})



#INVENTARIO TOTAL API
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
        fields =('id','ainventario','tipo','datos','producto','pesoanterior', 'peso','nuevopeso','date','time','usuario', 'razon' )

class InventarioEntradasViewSet(viewsets.ModelViewSet):

    serializer_class = InventarioEntradasSerializer
    queryset = EntradasInventario.objects.all()
    lookup_field = 'id'
    filter_fields=('id','ainventario','tipo','datos','producto','pesoanterior', 'peso','date','time','usuario' )

#SALIDAS INVENTARIO API
class InventarioSalidasSerializer(serializers.ModelSerializer):

    class Meta:
        model = SalidasInventario
        fields =('id','ainventario','tipo','datos','producto', 'pesoanterior','peso','nuevopeso','date','time','usuario', 'razon' )

class InventarioSalidasViewSet(viewsets.ModelViewSet):

    serializer_class = InventarioSalidasSerializer
    queryset = SalidasInventario.objects.all()
    lookup_field = 'id'
    filter_fields=('id','ainventario','tipo','datos','producto', 'pesoanterior','peso','date','time','usuario' )