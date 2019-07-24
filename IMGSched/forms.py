from django import forms 
from django.contrib.auth.models import User
from .models import Event,Comments
from django.contrib.auth.forms import UserCreationForm

class UserRegistrationForm(forms.Form):
    enroll = forms.IntegerField(label='Enrollment no.')
    email = forms.EmailField(label='Email Address:')

    class Meta:
        model = User
        fields = ['username', 'email', 'enroll', 'password1', 'password2', ]

class DateInput(forms.DateInput):
    input_type = 'date'

class EventForm(forms.ModelForm):
    # name = forms.CharField(label='Event Name',max_length=100)
    # date = forms.DateField()
    # venue = forms.CharField(label='Venue', max_length=100)
    # manager = forms.CharField(label='Manager', max_length=100)
    # description = forms.CharField(label='Description', max_length=255)
    class Meta:
        model = Event
        fields  = "__all__"
        widgets = {
            'date': DateInput(),
        }


class CommentsForm(forms.Form):
    body = forms.CharField(max_length=200)
    eventID = forms.IntegerField()
    username = forms.CharField(max_length=30)

        


class WannaBeAdminForm(forms.Form):
    password_for_admin = forms.CharField(label='Admin Creation Password', max_length=16)

        