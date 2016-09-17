from django import forms

from gastos.models import Gasto


class GastoFormView(forms.ModelForm):

    class Meta:
        model = Gasto
        fields = ('id', 'date', 'amount', 'tipo', 'proveedor', 'cantidad', 'unidad', 'factura', 'description')

