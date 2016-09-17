from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render
from rest_framework import serializers, viewsets
from django.views.generic.edit import CreateView
from django.contrib.messages.views import SuccessMessageMixin

# Create your views here.

#DEVOLUCION API
from gastos.filters import GastoFilter
from gastos.models import Gasto, TipoGasto, UnidadesGasto


class GastoCreate(SuccessMessageMixin, CreateView):

    model = Gasto
    fields = ['date', 'amount', 'tipo', 'proveedor', 'code', 'cantidad', 'unidad', 'factura', 'description']
    template_name = 'gastocreate.html'

    def get_success_url(self):

        objid = str(self.object.id)
        url = '/addgasto/?id='+objid

        return url

    success_message = "Gasto Creado correctamente"


class GastoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Gasto
        fields = ('id', 'date', 'amount', 'tipo', 'proveedor', 'code', 'cantidad', 'unidad', 'factura', 'description')


class GastoViewSet(viewsets.ModelViewSet):

    serializer_class = GastoSerializer
    queryset = Gasto.objects.all()
    lookup_field = 'id'
    filter_class = GastoFilter


class TipoGastoSerializer(serializers.ModelSerializer):

    class Meta:
        model = TipoGasto
        fields = ('id', 'name')


class TipoGastoViewSet(viewsets.ModelViewSet):

    serializer_class = TipoGastoSerializer
    queryset = TipoGasto.objects.all()
    lookup_field = 'id'
    filter_fields = ('id', 'name')


class UnidadesGastoSerializer(serializers.ModelSerializer):

    class Meta:
        model = UnidadesGasto
        fields = ('id', 'name')


class UnidadesGastoViewSet(viewsets.ModelViewSet):

    serializer_class = UnidadesGastoSerializer
    queryset = UnidadesGasto.objects.all()
    lookup_field = 'id'
    filter_fields = ('id', 'name')