from django.shortcuts import render

# Create your views here.
from django.utils.decorators import method_decorator
from django.views.generic.edit import CreateView
from rest_framework import serializers, viewsets
from cajeros.models import Cajero, Vendedor
from django.contrib.auth.decorators import login_required



class CajeroCreate(CreateView):

    @method_decorator(login_required(login_url='/admin/login/'))
    def dispatch(self, request, *args, **kwargs):
        return super(CajeroCreate, self).dispatch(request,*args,**kwargs)
    
    model = Cajero
    fields = ['name', 'last_name', 'identification', 'user']
    template_name = 'cajerocreate.html'
    success_url = '/admin/'


# Serializers define the API representation.
class CajeroSerializer(serializers.ModelSerializer):
    partial=True
    class Meta:

        model = Cajero
        fields =('id','name','last_name','identification','user')


# ViewSets define the view behavior.
class CajeroViewSet(viewsets.ModelViewSet):

    serializer_class = CajeroSerializer
    queryset = Cajero.objects.all()
    lookup_field = 'id'
    filter_fields=('id','name','last_name','identification','user')


class VendedorSerializer(serializers.ModelSerializer):

    class Meta:

        model = Vendedor
        fields = ('id', 'name', 'last_name', 'identification')


class VendedorViewSet(viewsets.ModelViewSet):

    serializer_class = VendedorSerializer
    queryset = Vendedor.objects.all()
    lookup_field = 'id'
    filter_fields = ('id', 'name', 'last_name', 'identification')