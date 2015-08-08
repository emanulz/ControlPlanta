from django.shortcuts import render
from rest_framework import serializers,viewsets
from cuentasCobrar.models import Abonos

# Create your views here.

##API

class AbonosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Abonos
        fields =('id','cliente','date', 'time', 'detalle','facturas' ,'monto', 'saldoant', 'saldoreal')


# ViewroductSets define the view behavior.
class DeshueseViewSet(viewsets.ModelViewSet):

    serializer_class = AbonosSerializer
    queryset = Abonos.objects.all()
    lookup_field = 'id'
    filter_fields=('id','cliente','date', 'time', 'detalle','facturas' ,'monto', 'saldoant', 'saldoreal')