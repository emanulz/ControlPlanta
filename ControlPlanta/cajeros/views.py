from django.shortcuts import render

# Create your views here.
from django.utils.decorators import method_decorator
from django.views.generic.edit import CreateView
from cajeros.models import Cajero
from django.contrib.auth.decorators import login_required



class CajeroCreate(CreateView):

    @method_decorator(login_required(login_url='/admin/login/'))
    def dispatch(self, request, *args, **kwargs):
        return super(CajeroCreate, self).dispatch(request,*args,**kwargs)
    
    model = Cajero
    fields = ['name', 'last_name', 'identification', 'user']
    template_name = 'cajerocreate.html'
    success_url = '/admin/'


