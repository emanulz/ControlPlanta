from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response
from django.template import RequestContext
from rest_framework import serializers, viewsets
from inventarios.models import InventarioTotal

# Create your views here.

class InventarioTotalSerializer(serializers.ModelSerializer):

    class Meta:
        model = InventarioTotal
        fields =('id','producto','peso','lote','vencimiento','tipo')


# ViewroductSets define the view behavior.
class InventarioTotalViewSet(viewsets.ModelViewSet):

    serializer_class = InventarioTotalSerializer
    queryset = InventarioTotal.objects.all()
    lookup_field = 'id'
    filter_fields=('id','producto','peso','lote','vencimiento','tipo')