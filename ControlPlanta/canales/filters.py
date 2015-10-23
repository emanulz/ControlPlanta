import django_filters
from .models import Canal


class CanalFilter(django_filters.FilterSet):
    min_date=django_filters.DateFilter(name='date',lookup_type='gte')
    max_date=django_filters.DateFilter(name='date',lookup_type='lte')
    #product_code=django_filters.CharFilter(lookup_type='icontains')
    class Meta:
        model=Canal
        fields=('id','date','consecutive','weight','qualification','preciokilo','fierro','isonlote','vendido','mediovendido','tipo','min_date','max_date')

