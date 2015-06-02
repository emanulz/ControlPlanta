from django import forms
from canales.models import Canal
from datetime import datetime
from django.forms.fields import DateField, ChoiceField, MultipleChoiceField
from django.forms.widgets import RadioSelect, CheckboxSelectMultiple
from django.forms.extras.widgets import SelectDateWidget
from lotes.models import Lote
from django.contrib.admin.widgets import FilteredSelectMultiple



class LoteForm2(forms.Form):
    #canalesdehoy=Canal.objects.all()

    #opciones=canalesdehoy

    lotenum=forms.CharField(max_length=255,)
    fierro=forms.CharField(max_length=255)
    canalesqty=forms.DecimalField()
    #canales=forms.MultipleChoiceField(queryset=Canal.objects.all())
    totalweight=forms.FloatField()

class LoteFormView(forms.ModelForm):

    #queryset=Canal.objects.filter(date=datetime.today()),
    canales2=forms.ModelMultipleChoiceField(queryset=Canal.objects.filter(date=datetime.today()),widget=forms.CheckboxSelectMultiple(),required=True)
    #canales3 = forms.ModelMultipleChoiceField(queryset=Canal.objects.all(),label=('Canales Selecionados'),required=False,widget=FilteredSelectMultiple(('Canales'),True,attrs={'class':'vSelectMultipleField'}))
    class Meta:
        model = Lote
        fields =('lotenum','fierro','canalesqty','canales2','totalweight')

    #class Media:
     #   css = {
      #      'all':['/static/admin/css/widgets.css',
           #        '/static/admin/css/uid-manage-form.css'],
       # }
        # Adding this javascript is crucial
        #js = ['/admin/jsi18n/']

