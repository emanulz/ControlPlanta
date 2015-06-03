from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponseRedirect

# Create your views here.
from django.utils.decorators import method_decorator
from django.views.generic import CreateView, FormView, TemplateView
from canales.models import Canal
from lotes.forms import  LoteFormView

from lotes.models import Lote


class LoteCreate(CreateView):

    @method_decorator(login_required(login_url='/admin/login/'))
    def dispatch(self, request, *args, **kwargs):
        return super(LoteCreate, self).dispatch(request,*args,**kwargs)


    model = Lote
    fields = ['lotenum', 'fierro', 'canalesqty', 'canales', 'totalweight']
    template_name = 'lotecreate.html'
    success_url = '/addlote/'


@login_required(login_url='/admin/login/')
def loteform(request):
    canales=Canal.objects.all()
    if request.method == 'POST': # If the form has been submitted...
        form = LoteFormView(request.POST) # A form bound to the POST data
        if form.is_valid(): # All validation rules pass
            model_instance = form.save(commit=False)
            model_instance.save()
            return HttpResponseRedirect('/admin/') # Redirect after POST
    else:
        form = LoteFormView() # An unbound form

    return render(request, 'lotecreate.html', {'form': form,'canales':canales})

class LandingView(TemplateView):
    template_name = "landing.html"
