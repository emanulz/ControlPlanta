from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.core.serializers import json
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, render_to_response

# Create your views here.
from django.core import serializers
from django.http import JsonResponse
from django.template import RequestContext
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework import serializers, viewsets
from lotes.models import Lote
from ventas.filters import VentaFilter
from ventas.models import DetallesPago, DetalleProductos, Venta


@login_required(login_url='/admin/login/')
def Ventasform(request):
    lotes = Lote.objects.filter(date=datetime.today(),isondeshuese=False)
    return render_to_response('creardeshuese.html', {'lotes': lotes}, context_instance=RequestContext(request))



class VentasView(TemplateView):
    template_name = 'ventas.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(VentasView, self).dispatch(*args, **kwargs)

class VentasEditView(TemplateView):
    template_name = 'ventasEdit.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(VentasEditView, self).dispatch(*args, **kwargs)

class CierreView(TemplateView):
    template_name = 'cierrediario.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(CierreView, self).dispatch(*args, **kwargs)

class DevproformaView(TemplateView):
    template_name = 'devolverProforma.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(DevproformaView, self).dispatch(*args, **kwargs)

#DETALLES DE PAGO API

class DetallePagoSerializer(serializers.ModelSerializer):

    class Meta:
        model = DetallesPago
        fields =('id','tipopago','montoefectivo','vuelto','tarjeta','digitos','autorizacion','transfnum','bancotransf','chequenum','bancocheque','saldoant','saldoactual')

class DetallePagoViewSet(viewsets.ModelViewSet):

    serializer_class = DetallePagoSerializer
    queryset = DetallesPago.objects.all()
    lookup_field = 'id'
    filter_fields=('id','tipopago','montoefectivo','vuelto','tarjeta','digitos','autorizacion','transfnum','bancotransf','chequenum','bancocheque','saldoant','saldoactual')

#DETALLES DE PRODUCTOS API

class DetalleProductosSerializer(serializers.ModelSerializer):

    class Meta:
        model = DetalleProductos
        fields =('id','producto','description','preciouni','cantidad','iv','total')

class DetalleProductosViewSet(viewsets.ModelViewSet):

    serializer_class = DetalleProductosSerializer
    queryset = DetalleProductos.objects.all()
    lookup_field = 'id'
    filter_fields=('id','producto','description','preciouni','cantidad','iv','total')

#VENTA API

class VentaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Venta
        fields =('id','client','nombrecliente','cashier', 'vendedor', 'date','time','totolkilogramos',
                 'cantidadarticulos','subtotal','iv','descopor','desctocol','total','detalleproductos','datosdelpago',
                 'saldo','anulada','devuelto','connotacredito','conabono', 'cpnval')

class VentaViewSet(viewsets.ModelViewSet):

    serializer_class = VentaSerializer
    queryset = Venta.objects.all()
    lookup_field = 'id'
    filter_class = VentaFilter
    #filter_fields=('id','client','nombrecliente','cashier','date','time','totolkilogramos','cantidadarticulos','subtotal','iv','descopor','desctocol','total','detalleproductos','datosdelpago','saldo','anulada','devuelto','connotacredito','conabono')





