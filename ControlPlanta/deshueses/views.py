from django.shortcuts import render

from rest_framework import serializers, viewsets
from deshueses.models import Deshuese, DetalleDeshuese
from productos.models import Producto, FamiliaDelProducto
# Create your views here.


class DeshueseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Deshuese
        fields =('id','pesototal','mermakg','mermapor','productos','detalle',)


# ViewroductSets define the view behavior.
class DeshueseViewSet(viewsets.ModelViewSet):

    serializer_class = DeshueseSerializer
    queryset = Deshuese.objects.all()
    lookup_field = 'id'


class DetalleDeshueseSerializer(serializers.ModelSerializer):

    class Meta:
        model = DetalleDeshuese
        fields =('id','producto','peso','lote')


# ViewroductSets define the view behavior.
class DetalleDeshueseViewSet(viewsets.ModelViewSet):

    serializer_class = DetalleDeshueseSerializer
    queryset = DetalleDeshuese.objects.all()
    lookup_field = 'id'