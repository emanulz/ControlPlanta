from django.contrib.auth.decorators import login_required
from django.shortcuts import render, render_to_response
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from canales.filters import CanalFilter
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

class eliminarCanalView(TemplateView):
    template_name = 'eliminarCanal.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(eliminarCanalView, self).dispatch(*args, **kwargs)


from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
class CanalSerializer(serializers.ModelSerializer):
    partial=True
    class Meta:

        model = Canal
        fields =('id','date','consecutive','weight','qualification','preciokilo','fierro','isonlote','vendido','mediovendido','tipo')


# ViewSets define the view behavior.
class CanalViewSet(viewsets.ModelViewSet):

    serializer_class = CanalSerializer
    queryset = Canal.objects.all()
    lookup_field = 'id'
    filter_class=CanalFilter
