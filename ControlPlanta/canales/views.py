from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response

# Create your views here.
from django.http import HttpResponse, Http404
from django.template import RequestContext

from canales.models import Canal

@login_required(login_url='/admin/login/')
def canales(request):
	canales = Canal.objects.all()
	return render_to_response('canales.html', {'canales':canales}, context_instance=RequestContext(request))



