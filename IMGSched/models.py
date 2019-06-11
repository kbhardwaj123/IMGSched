from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class People(models.Model):
    admin_value = models.BooleanField(default=False)
    user_name = models.OneToOneField(User, on_delete=models.CASCADE)
    enroll  = models.IntegerField()
    email = models.EmailField(max_length=100)



class Event(models.Model):
    def __str__(self):
        return self.name
    name = models.CharField(max_length=100)
    date = models.DateField()
    venue = models.CharField(max_length=100)
    manager = models.ForeignKey(People, on_delete=models.CASCADE)
    # manager = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
