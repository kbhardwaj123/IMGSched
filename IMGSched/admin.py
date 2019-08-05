from django.contrib import admin
from .models import People,Event,Comments,Invites

# Register your models here.
admin.site.register(People)
admin.site.register(Event)
admin.site.register(Comments)
admin.site.register(Invites)
