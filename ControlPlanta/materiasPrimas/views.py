from django.shortcuts import render
from rest_framework import serializers, viewsets
from materiasPrimas.models import MateriaPrima, FamiliaDeLaMateria
from materiasPrimas.filters import  MPFilter

# Create your views here.
class MateriaPrimaSerializer(serializers.ModelSerializer):

    class Meta:
        model = MateriaPrima
        fields =('id','product_code','bar_code','description','inventory','minimum','cost', 'category')


# ViewroductSets define the view behavior.
class MateriaPrimaViewSet(viewsets.ModelViewSet):

    serializer_class = MateriaPrimaSerializer
    queryset = MateriaPrima.objects.all()
    lookup_field = 'id'
    #filter_fields= ('id','category','product_code','description')
    filter_class=MPFilter

class FamiliaMPSerializer(serializers.ModelSerializer):

    class Meta:
        model = FamiliaDeLaMateria
        fields =('id','name')

# ViewroductSets define the view behavior.
class FamiliaMPViewSet(viewsets.ModelViewSet):

    serializer_class = FamiliaMPSerializer
    queryset = FamiliaDeLaMateria.objects.all()
    lookup_field = 'id'
    filter_fields=('id','name')