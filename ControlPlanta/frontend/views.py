from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class LandingView(TemplateView):
    template_name = 'landing.html'

class TrazabilidadView(TemplateView):
    template_name = 'trazabilidad.html'