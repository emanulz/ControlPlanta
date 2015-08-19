import django_filters
from .models import MateriaPrima

class MPFilter(django_filters.FilterSet):
    description=django_filters.CharFilter(lookup_type='icontains')
    #product_code=django_filters.CharFilter(lookup_type='icontains')
    class Meta:
        model=MateriaPrima
        fields=('id','product_code','bar_code','description','inventory','minimum','cost', 'category')