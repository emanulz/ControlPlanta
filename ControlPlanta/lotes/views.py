from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.core.serializers import json
from django.shortcuts import render, render_to_response
from django.http import HttpResponseRedirect, HttpResponse, Http404, JsonResponse

# Create your views here.
from django.template import RequestContext
from django.utils.decorators import method_decorator
from django.views.generic import CreateView, FormView, TemplateView
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
def loteform(request):
    canales = Canal.objects.all()
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


class LandingView(TemplateView):
    template_name = "landing.html"


def loteform2(request):
    canales = Canal.objects.filter(date=datetime.today())
    return render_to_response('crearlote.html', {'canales': canales}, context_instance=RequestContext(request))


def cargar_canal(request, id):
    canal = Canal.objects.get(pk=id)
    if request.is_ajax():
        return JsonResponse({'id': canal.id, 'peso': canal.weight})
    else:
        raise Http404  # raise Http404


def guardar_lote(request):
    #if request.is_ajax():
    #try:
    lotenum=request.POST['numlote']
    fierro=request.POST['fierronum']
    canalesqty=request.POST['cantcanales']
    canales=request.POST['canaleslist']
    #totalweight=request.POST['pesototal']
    #nuevo=Lote.objects.create(lotenum=lotenum,fierro=fierro,canalesqty=canalesqty,canales=canales,totalweight=totalweight)
    #nuevo.save()
    return JsonResponse({'test1': lotenum, 'test2': fierro, 'test3': canalesqty, 'test4': canales})
    #except Exception as e:
     #   return e
    #Lote.objects.create(id=65,lotenum=request.POST['lotenum'],fierro=request.POST['fierronum'],canalesqty=request.POST['cantcanales'],canales=request.POST['canaleslist'],totalweight=request.POST['pesototal'])
    #lote = Lote(lotenum=request.POST['lotenum'],fierro=request.POST['fierronum'],canalesqty=request.POST['cantcanales'],canales=request.POST['canaleslist'],totalweight=request.POST['pesototal'])
    #lote.save()



    #if request.POST['numlote']:



    #else:
     #   raise Http404  # raise Http404
def test_lote(request):
    a=Lote.objects.get(pk=1)
    return JsonResponse({'test1':a.canales})

