from django.shortcuts import render

# Create your views here.

#DETALLES DE PAGO API
from rest_framework import serializers,viewsets
from variablesGlobales.models import VariableGlobal


class VariableGlobalSerializer(serializers.ModelSerializer):

    class Meta:
        model = VariableGlobal
        fields =('id','nombre','descripcion','valornum','valortext','valoremail')

class VariableGlobalViewSet(viewsets.ModelViewSet):
    serializer_class = VariableGlobalSerializer
    queryset = VariableGlobal.objects.all()
    lookup_field = 'id'
    filter_fields=('id','nombre','descripcion','valornum','valortext','valoremail')
