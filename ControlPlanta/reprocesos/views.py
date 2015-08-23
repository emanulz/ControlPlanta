from django.contrib.auth.decorators import login_required
from django.shortcuts import render

# Create your views here.
#INVENTARIO TOTAL API
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from rest_framework import serializers,viewsets
from reprocesos.models import Reproceso

#TEMPLATE VIEW
class ReprocesosView(TemplateView):
    template_name = 'reproceso.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(ReprocesosView, self).dispatch(*args, **kwargs)
#API

class ReprocesoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reproceso
        fields =('id','entrada','salida','cortesusados','cortesusadoskg','prodcreados','prodcreadoskg')

class ReprocesoViewSet(viewsets.ModelViewSet):

    serializer_class = ReprocesoSerializer
    queryset = Reproceso.objects.all()
    lookup_field = 'id'
    filter_fields=('id','entrada','salida','cortesusados','cortesusadoskg','prodcreados','prodcreadoskg')