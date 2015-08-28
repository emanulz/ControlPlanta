from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework import serializers,viewsets
from cuentasCobrar.models import Abono,DetalleCuenta, NotaDeCredito

# Create your views here.

class cuentasCobrarView(TemplateView):
    template_name = 'cuentasCobrar.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(cuentasCobrarView, self).dispatch(*args, **kwargs)

class saldosClienteView(TemplateView):
    template_name = 'SaldosCliente.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(saldosClienteView, self).dispatch(*args, **kwargs)

class recuperacionView(TemplateView):
    template_name = 'recuperacion.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(recuperacionView, self).dispatch(*args, **kwargs)

class reporteCuentasCobrarView(TemplateView):
    template_name = 'reportecuentascobrar.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(reporteCuentasCobrarView, self).dispatch(*args, **kwargs)
##API

class AbonosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Abono
        fields =('id','date', 'time', 'detalle','facturas' ,'moneda','montocol','montodolar','tipopago','tipotarjeta','digitos','autorizacion','transfnum','bancotransf', 'chequenum','bancocheque','saldoant', 'saldoactual')


# ViewroductSets define the view behavior.
class AbonosViewSet(viewsets.ModelViewSet):

    serializer_class = AbonosSerializer
    queryset = Abono.objects.all()
    lookup_field = 'id'
    filter_fields=('id','date', 'time', 'detalle','facturas' ,'moneda','montocol','montodolar','tipopago','tipotarjeta','digitos','autorizacion','transfnum','bancotransf', 'chequenum','bancocheque','saldoant', 'saldoactual')

class DetalleCuentaSerializer(serializers.ModelSerializer):

    class Meta:
        model = DetalleCuenta
        fields =('id','cliente','total', 'pending', 'abonos','notasdecredito')


# ViewroductSets define the view behavior.
class DetalleCuentaViewSet(viewsets.ModelViewSet):

    serializer_class = DetalleCuentaSerializer
    queryset = DetalleCuenta.objects.all()
    lookup_field = 'id'
    filter_fields=('id','cliente','total', 'pending', 'abonos','notasdecredito')
    ordering_fields = '__all__'

class NotaDeCreditoSerializer(serializers.ModelSerializer):

    class Meta:
        model = NotaDeCredito
        fields =('id','date','time','monto','saldoanteriorfact','saldoactualfact','saldoanterior','saldoactual','venta','detalle')


# ViewroductSets define the view behavior.
class NotaDeCreditoViewSet(viewsets.ModelViewSet):

    serializer_class = NotaDeCreditoSerializer
    queryset = NotaDeCredito.objects.all()
    lookup_field = 'id'
    filter_fields=('id','date','time','monto','saldoanteriorfact','saldoactualfact','saldoanterior','saldoactual','venta','detalle')