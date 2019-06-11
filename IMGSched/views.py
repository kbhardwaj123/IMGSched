from django.shortcuts import render,redirect
from django.contrib import messages
from .forms import UserRegistrationForm,EventForm,WannaBeAdminForm
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponse
from .models import People,Event
from django.contrib.auth.models import User


p_arr = ('iwanttobeadmin123','passpass123','hereistheadmin123',)
# Create your views here.
def home(request):
    return render(request, 'index.html')

def planner(request):
    if request.method =='POST':
        form = EventForm(request.POST)
        if form.is_valid():
            user = form.cleaned_data.get('user')
            date  = form.cleaned_data.get('date')
            venue  = form.cleaned_data.get('venue')
            manager  = form.cleaned_data.get('manager')
            description  = form.cleaned_data.get('description')
            return redirect('home')
    else:
        form = EventForm()
    return render(request, 'planner.html', {'form': form})    

def schedule(request):
    return render(request, 'schedule.html')

def signup(request):
    
    try:
        p = request.session['code']
        if p in p_arr:
            code = True
        else:
            code = False
        request.session['code']='0'
    except:
        code = False

    if request.method =='POST':
        form = UserCreationForm(request.POST)
        form2=UserRegistrationForm(request.POST)
        if form.is_valid() and form2.is_valid():
            user_name=form.cleaned_data.get('username')
            form.save()
            u = User.objects.get(username=user_name)
            p = People(user_name=u, admin_value=code, enroll=form2.cleaned_data.get('enroll'), email=form2.cleaned_data.get('email'))
            p.save()
            return redirect('home')     
    else:
        form  = UserCreationForm()
        form2 = UserRegistrationForm()
    return render(request, 'sign_up.html', {'form': form, 'form2': form2, 'code': code})


def isignup(request):
    if request.method =='POST':
        form = WannaBeAdminForm(request.POST)
        if form.is_valid():
            p = form.cleaned_data.get('password_for_admin')
            request.session['code'] = p
            return redirect('signup')
    else:
        form = WannaBeAdminForm()
        return render(request, 'isign_up.html', {'form': form})







