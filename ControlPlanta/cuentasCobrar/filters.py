import django_filters
from .models import Abono

class AbonoFilter(django_filters.FilterSet):
    min_date=django_filters.DateFilter(name='date',lookup_type='gte')
    max_date=django_filters.DateFilter(name='date',lookup_type='lte')
    #product_code=django_filters.CharFilter(lookup_type='icontains')
    class Meta:
        model=Abono
        fields=('id','date', 'time', 'detalle','facturas' ,'moneda','montocol','montodolar','tipopago','tipotarjeta','digitos','autorizacion','transfnum','bancotransf', 'chequenum','bancocheque','saldoant', 'saldoactual','min_date','max_date')
