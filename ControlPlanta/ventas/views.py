from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response

# Create your views here.
from django.template import RequestContext
from django.views.generic import TemplateView
from lotes.models import Lote


@login_required(login_url='/admin/login/')
def Ventasform(request):
    lotes = Lote.objects.filter(date=datetime.today(),isondeshuese=False)
    return render_to_response('creardeshuese.html', {'lotes': lotes}, context_instance=RequestContext(request))

class VentasView(TemplateView):
    template_name = 'ventas.html'