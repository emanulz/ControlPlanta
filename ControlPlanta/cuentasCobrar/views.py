from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework import serializers,viewsets
from cuentasCobrar.models import Abonos,DetalleCuenta

# Create your views here.

class cuentasCobrarView(TemplateView):
    template_name = 'cuentasCobrar.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(cuentasCobrarView, self).dispatch(*args, **kwargs)

##API

class AbonosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Abonos
        fields =('id','date', 'time', 'detalle','facturas' ,'monto', 'saldoant', 'saldoreal')


# ViewroductSets define the view behavior.
class AbonosViewSet(viewsets.ModelViewSet):

    serializer_class = AbonosSerializer
    queryset = Abonos.objects.all()
    lookup_field = 'id'
    filter_fields=('id','date', 'time', 'detalle','facturas' ,'monto', 'saldoant', 'saldoreal')

class DetalleCuentaSerializer(serializers.ModelSerializer):

    class Meta:
        model = DetalleCuenta
        fields =('id','cliente','total', 'pending', 'abonos')


# ViewroductSets define the view behavior.
class DetalleCuentaViewSet(viewsets.ModelViewSet):

    serializer_class = DetalleCuentaSerializer
    queryset = DetalleCuenta.objects.all()
    lookup_field = 'id'
    filter_fields=('id','cliente','total', 'pending', 'abonos')