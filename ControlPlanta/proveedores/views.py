from django.shortcuts import render

# Create your views here.
# Serializers define the API representation.
from rest_framework import serializers,viewsets
from proveedores.models import Proveedor


class CanalSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Proveedor
        fields = ('id','name', 'lastname', 'identification', 'provcode', 'fierro')


# ViewSets define the view behavior.
class ProveedorViewSet(viewsets.ModelViewSet):
    # model=Lote
    queryset = Proveedor.objects.all()
    serializer_class = CanalSerializer
    filter_fields=('id','name', 'lastname', 'identification', 'provcode', 'fierro')