from django import forms 
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

class UserRegistrationForm(forms.Form):
    enroll = forms.IntegerField(label='Enrollment no.')
    email = forms.EmailField(label='Email Address:')

    class Meta:
        model = User
        fields = ['username', 'email', 'enroll', 'password1', 'password2', ]



class EventForm(forms.Form):
    name = forms.CharField(label='Event Name',max_length=100)
    date = forms.DateField()
    venue = forms.CharField(label='Venue', max_length=100)
    manager = forms.CharField(label='Manager', max_length=100)
    description = forms.CharField(label='Description', max_length=255)


class WannaBeAdminForm(forms.Form):
    password_for_admin = forms.CharField(label='Admin Creation Password', max_length=16)

        