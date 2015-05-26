from django.db import models

# Create your models here.
class Prueba(models.Model):
    pregunta=models.CharField(max_length=255,verbose_name='pregunta')

    def __unicode__(self):
        return self.pk

    class Meta:
        ordering = ['id']
        verbose_name_plural = '1. Preguntas'