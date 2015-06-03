from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response
from canales.forms import CanalFormView

# Create your views here.
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.template import RequestContext

from canales.models import Canal


@login_required(login_url='/admin/login/')
def canalform(request):

    if request.method == 'POST': # If the form has been submitted...
        form = CanalFormView(request.POST) # A form bound to the POST data
        if form.is_valid(): # All validation rules pass
            model_instance = form.save(commit=False)
            model_instance.save()
            return HttpResponseRedirect('/addcanal/') # Redirect after POST
    else:
        form = CanalFormView() # An unbound form

    return render(request, 'canalcreate.html', {'form': form,})

