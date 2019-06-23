from django.shortcuts import render,redirect,get_object_or_404
from django.contrib import messages
from .forms import UserRegistrationForm,EventForm,WannaBeAdminForm,CommentsForm
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponse
from .models import People,Event,Comments
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import PeopleSerializer,EventSerializer,CommentsSerializer
from datetime import datetime


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

def schedule_detail(request, pk):
    form = CommentsForm()
    return render(request, 'schedule_detail.html', {'pk': pk, 'form': form})


class ListEvent(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class DetailEvent(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
        
class ListPeople(generics.ListCreateAPIView):
    queryset = People.objects.all()
    serializer_class = PeopleSerializer

class DetailPeople(generics.RetrieveUpdateDestroyAPIView):
    queryset = People.objects.all()
    serializer_class = PeopleSerializer

class ListComments(generics.ListCreateAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer

def comments_poster(request, pk):
    if request.method == 'POST':
        form = CommentsForm(request.POST)
        if form.is_valid():
            body1 = form.cleaned_data.get('body')
            event1 = Event.objects.get(id = pk)
            user_object1 = request.user
            date1 = datetime.now().date()
            if user_object1.is_authenticated:
                people_object1 = user_object1.people
                c = Comments.objects.create(body = body1, posted_by = people_object1, event_name = event1, posted_on = date1)
                c.save()
                form = CommentsForm()
                return render(request, 'schedule_detail.html', {'pk': pk, 'form': form})
    else:
        redirect('home')
                









