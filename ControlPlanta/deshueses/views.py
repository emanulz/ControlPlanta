
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response
from django.template import RequestContext
from datetime import datetime
from rest_framework import serializers, viewsets
from deshueses.models import Deshuese, DetalleDeshuese
from lotes.models import Lote
from productos.models import Producto, FamiliaDelProducto
# Create your views here.


@login_required(login_url='/admin/login/')
def deshueseform(request):
    lotes = Lote.objects.filter(date=datetime.today(), isondeshuese=False)
    return render_to_response('creardeshuese.html', {'lotes': lotes}, context_instance=RequestContext(request))

# API


class DeshueseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Deshuese
        fields = ('id', 'tipo', 'lote', 'peso_lote', 'date', 'ref_text', 'pesototal', 'mermakg', 'desechokg', 'mermapor', 'detalle',)


# ViewroductSets define the view behavior.
class DeshueseViewSet(viewsets.ModelViewSet):

    serializer_class = DeshueseSerializer
    queryset = Deshuese.objects.all()
    lookup_field = 'id'
    filter_fields = ('id', 'lote', 'date')


class DetalleDeshueseSerializer(serializers.ModelSerializer):

    class Meta:
        model = DetalleDeshuese
        fields = ('id', 'producto', 'peso', 'lote')


# ViewroductSets define the view behavior.
class DetalleDeshueseViewSet(viewsets.ModelViewSet):

    serializer_class = DetalleDeshueseSerializer
    queryset = DetalleDeshuese.objects.all()
    lookup_field = 'id'
    filter_fields = ('id', 'lote')
