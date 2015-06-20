from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.core.serializers import json
from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect, HttpResponse, Http404, JsonResponse

# Create your views here.
from django.template import RequestContext
from django.utils.decorators import method_decorator
from django.views.generic import CreateView, FormView, TemplateView
from rest_framework import viewsets, serializers
from canales.models import Canal
from lotes.forms import LoteFormView

from lotes.models import Lote


class LoteCreate(CreateView):
    @method_decorator(login_required(login_url='/admin/login/'))
    def dispatch(self, request, *args, **kwargs):
        return super(LoteCreate, self).dispatch(request, *args, **kwargs)

    model = Lote
    fields = ['lotenum', 'fierro', 'canalesqty', 'canales', 'totalweight']
    template_name = 'lotecreate.html'
    success_url = '/addlote/'


@login_required(login_url='/admin/login/')
def loteform2(request):
    canales = Canal.objects.filter(date=datetime.today(),isonlote=False)
    if request.method == 'POST':  # If the form has been submitted...
        form = LoteFormView(request.POST)  # A form bound to the POST data
        if form.is_valid():  # All validation rules pass
            model_instance = form.save(commit=False)
            model_instance.save()
            return HttpResponseRedirect('/admin/')  # Redirect after POST
    else:
        form = LoteFormView()  # An unbound form

    return render(request, 'lotecreate.html', {'form': form, 'canales': canales},
                  context_instance=RequestContext(request))




@login_required(login_url='/admin/login/')
def loteform(request):
    canales = Canal.objects.filter(date=datetime.today(),isonlote=False)
    return render_to_response('crearlote.html', {'canales': canales}, context_instance=RequestContext(request))

@login_required(login_url='/admin/login/')
def cargar_canal(request, id):
    canal = Canal.objects.get(pk=id)
    numerototal=Canal.objects.count()
    if request.is_ajax():
        return JsonResponse({'id': canal.id, 'peso': canal.weight,'total':numerototal})
    else:
        raise Http404  # raise Http404

@login_required(login_url='/admin/login/')
def totallotes(request):
    daylotes=Lote.objects.filter(date=datetime.today())
    numerototal=daylotes.count()
    if request.is_ajax():
        return JsonResponse({'total':numerototal})
    else:
        #return JsonResponse({'total':numerototal})
        raise Http404  # raise Http404

class LoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lote
        fields =('id','lotenum','fierro','canalesqty','canales','totalweight','date','tipo','isondeshuese')


# ViewroductSets define the view behavior.
class LoteViewSet(viewsets.ModelViewSet):

    serializer_class = LoteSerializer
    queryset = Lote.objects.all()
    lookup_field = 'id'
    filter_fields= ('id','lotenum','date','tipo','isondeshuese')


