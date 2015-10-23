from django.contrib.auth.decorators import login_required
from django.shortcuts import render

# Create your views here.
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView


class ReportesView(TemplateView):
    template_name = 'reporte.html'
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(ReportesView, self).dispatch(*args, **kwargs)