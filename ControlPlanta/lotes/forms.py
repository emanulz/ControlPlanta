from django import forms
from canales.models import Canal
from datetime import datetime
from django.forms.fields import DateField, ChoiceField, MultipleChoiceField
from django.forms.widgets import RadioSelect, CheckboxSelectMultiple
from django.forms.extras.widgets import SelectDateWidget
from lotes.models import Lote


class LoteForm2(forms.Form):
    #canalesdehoy=Canal.objects.all()

    #opciones=canalesdehoy

    lotenum=forms.CharField(max_length=255,)
    fierro=forms.CharField(max_length=255)
    canalesqty=forms.DecimalField()
    #canales=forms.MultipleChoiceField(queryset=Canal.objects.all())
    totalweight=forms.FloatField()

class LoteFormView(forms.ModelForm):


    canales2=forms.ModelMultipleChoiceField(queryset=Canal.objects.filter(date=datetime.today()),widget=forms.CheckboxSelectMultiple,required=True)


    class Meta:
        model = Lote
        fields =('lotenum','fierro','canalesqty','canales2','totalweight')


