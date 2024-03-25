from django.db import models


class Selfie(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    image = models.URLField()

    def __str__(self):
        return self.title


class Vote(models.Model):
    selfie = models.ForeignKey('Selfie', on_delete=models.CASCADE, )
    rating = models.IntegerField(default=0)
