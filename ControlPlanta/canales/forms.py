from django import forms
from canales.models import Canal
from datetime import datetime

class CanalFormView(forms.ModelForm):

    #queryset=Canal.objects.filter(date=datetime.today()),
    #canales2=forms.ModelMultipleChoiceField(queryset=Canal.objects.filter(date=datetime.today()),widget=forms.CheckboxSelectMultiple(),required=True)
    #canales3 = forms.ModelMultipleChoiceField(queryset=Canal.objects.all(),label=('Canales Selecionados'),required=False,widget=FilteredSelectMultiple(('Canales'),True,attrs={'class':'vSelectMultipleField'}))
    class Meta:
        model = Canal
        fields =('date','tipo','consecutive','weight','qualification','fierro')


