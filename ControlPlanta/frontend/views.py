from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, Http404
import os
import socket
from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class LandingView(TemplateView):
    template_name = 'landing.html'

class TrazabilidadView(TemplateView):
    template_name = 'trazabilidad.html'

@login_required(login_url='/admin/login/')
def backupdbmine(request):
    if request.is_ajax():
        if socket.gethostname().startswith('Mac'):
            BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            os.system(BASE_DIR+'/dbbackup/backupdb.sh')
            return JsonResponse({'status': 'success','system':'MAC','dir':BASE_DIR})
        else:
            #Aqui ejecuto .bat
            BASE_DIR = os.path.realpath(os.path.dirname(__file__))
            return JsonResponse({'status': 'Success','system':'Windows','dir':BASE_DIR})
    else:
        raise Http404  # raise Http404