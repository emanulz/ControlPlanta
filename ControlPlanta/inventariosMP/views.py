from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework import serializers, viewsets
from inventariosMP.models import ResumenInventarioMP, EntradasInventarioMP, SalidasInventarioMP

# Create your views here.

#INVENTARIOS TEMPLATE VIEW

class InventariosmpView(TemplateView):
    template_name = 'inventariosmp.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(InventariosmpView, self).dispatch(*args, **kwargs)

#RESUMEN INVENTARIO API

class InventarioResumenMPSerializer(serializers.ModelSerializer):

    class Meta:
        model = ResumenInventarioMP
        fields =('id','materiaprima','cantidad',)

class InventarioResumenMPViewSet(viewsets.ModelViewSet):

    serializer_class = InventarioResumenMPSerializer
    queryset = ResumenInventarioMP.objects.all()
    lookup_field = 'id'
    filter_fields=('id','materiaprima','cantidad',)


#ENTRADAS INVENTARIO API
class InventarioEntradasMPSerializer(serializers.ModelSerializer):

    class Meta:
        model = EntradasInventarioMP
        fields =('id','tipo','datos','materiaprima', 'peso','nuevopeso','date','time','usuario' )

class InventarioEntradasMPViewSet(viewsets.ModelViewSet):

    serializer_class = InventarioEntradasMPSerializer
    queryset = EntradasInventarioMP.objects.all()
    lookup_field = 'id'
    filter_fields=('id','tipo','datos','materiaprima', 'peso','date','time','usuario' )

#SALIDAS INVENTARIO API
class InventarioSalidasMPSerializer(serializers.ModelSerializer):

    class Meta:
        model = SalidasInventarioMP
        fields =('id','tipo','datos','materiaprima', 'peso','nuevopeso','date','time','usuario' )

class InventarioSalidasMPViewSet(viewsets.ModelViewSet):

    serializer_class = InventarioSalidasMPSerializer
    queryset = SalidasInventarioMP.objects.all()
    lookup_field = 'id'
    filter_fields=('id','tipo','datos','materiaprima', 'peso','date','time','usuario' )