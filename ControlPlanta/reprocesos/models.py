from django.db import models

# Create your models here.
from inventarios.models import EntradasInventario, SalidasInventario


class Reproceso(models.Model):
    entrada=models.ForeignKey(EntradasInventario,verbose_name='Entrada de inventario relacionada')
    salida=models.ForeignKey(SalidasInventario,verbose_name='Entrada de inventario relacionada')
    cortesusados=models.FloatField(default=1,verbose_name='Cantidad de cortes Usados')
    cortesusadoskg=models.FloatField(default=1,verbose_name='Cantidad de cortes Usados Kg')
    prodcreados=models.FloatField(default=1,verbose_name='Cantidad de productos creados')
    prodcreadoskg=models.FloatField(default=1,verbose_name='Cantidad de productos creados Kg')

    def __unicode__(self):
        ret = str(self.id)
        return ret
    class Meta:
        ordering=['id']
        verbose_name='Reproceso'
        verbose_name_plural='1. Reprocesos'
