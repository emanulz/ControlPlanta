from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import render
from rest_framework import serializers,viewsets

# Create your views here.

#DEVOLUCION API
from gastos.filters import GastoFilter
from gastos.forms import GastoFormView
from gastos.models import Gasto, TipoGasto


@login_required(login_url='/admin/login/')
def gastoform(request):

    if request.method == 'POST': # If the form has been submitted...
        form = GastoFormView(request.POST) # A form bound to the POST data
        if form.is_valid(): # All validation rules pass
            model_instance = form.save(commit=False)
            model_instance.save()
            return HttpResponseRedirect('/addgasto/') # Redirect after POST
    else:
        form = GastoFormView() # An unbound form

    return render(request, 'gastocreate.html', {'form': form,})


class GastoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Gasto
        fields =('id', 'date','amount', 'tipo','factura', 'description')

class GastoViewSet(viewsets.ModelViewSet):

    serializer_class = GastoSerializer
    queryset = Gasto.objects.all()
    lookup_field = 'id'
    filter_class=GastoFilter

class TipoGastoSerializer(serializers.ModelSerializer):

    class Meta:
        model = TipoGasto
        fields =('id', 'name')

class TipoGastoViewSet(viewsets.ModelViewSet):

    serializer_class = TipoGastoSerializer
    queryset = TipoGasto.objects.all()
    lookup_field = 'id'
    filter_fields=('id', 'name')