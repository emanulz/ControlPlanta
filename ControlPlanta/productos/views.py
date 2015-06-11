from django.shortcuts import render

# Create your views here.
# Serializers define the API representation.
from rest_framework import serializers, viewsets
from productos.models import Producto, FamiliaDelProducto


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Producto
        fields =('id','product_code','bar_code','description','price','fractioned','taxes', 'taxes_amount', 'category')


# ViewroductSets define the view behavior.
class ProductViewSet(viewsets.ModelViewSet):

    serializer_class = ProductSerializer
    queryset = Producto.objects.all()
    lookup_field = 'id'


class FamiliaSerializer(serializers.ModelSerializer):

    class Meta:
        model = FamiliaDelProducto
        fields =('id','name')


# ViewroductSets define the view behavior.
class FamiliaViewSet(viewsets.ModelViewSet):

    serializer_class = FamiliaSerializer
    queryset = FamiliaDelProducto.objects.all()
    lookup_field = 'id'