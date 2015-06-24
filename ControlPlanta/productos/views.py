from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, Http404
from django.shortcuts import render

# Create your views here.
# Serializers define the API representation.
from rest_framework import serializers, viewsets
from productos.filters import ProductFilter
from productos.models import Producto, FamiliaDelProducto


def ProdDeCerdo(request):
    Pcerdo=Producto.objects.filter(category__name="Carne de Cerdo")



    if request.is_ajax():
        return JsonResponse({'Cerdos':Pcerdo})
    else:
        return JsonResponse({'Cerdos':Pcerdo})
       # raise Http404  # raise Http404

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Producto
        fields =('id','product_code','bar_code','description','price','fractioned','taxes', 'taxes_amount', 'category')


# ViewroductSets define the view behavior.
class ProductViewSet(viewsets.ModelViewSet):

    serializer_class = ProductSerializer
    queryset = Producto.objects.all()
    lookup_field = 'id'
    #filter_fields= ('id','category','product_code','description')
    filter_class=ProductFilter

class FamiliaSerializer(serializers.ModelSerializer):

    class Meta:
        model = FamiliaDelProducto
        fields =('id','name')


# ViewroductSets define the view behavior.
class FamiliaViewSet(viewsets.ModelViewSet):

    serializer_class = FamiliaSerializer
    queryset = FamiliaDelProducto.objects.all()
    lookup_field = 'id'