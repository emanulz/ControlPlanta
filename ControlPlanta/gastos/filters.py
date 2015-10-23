import django_filters
from .models import Gasto


class GastoFilter(django_filters.FilterSet):
    min_date=django_filters.DateFilter(name='date',lookup_type='gte')
    max_date=django_filters.DateFilter(name='date',lookup_type='lte')
    #product_code=django_filters.CharFilter(lookup_type='icontains')
    class Meta:
        model=Gasto
        fields=('id', 'date','amount', 'tipo','factura', 'description','min_date','max_date')
