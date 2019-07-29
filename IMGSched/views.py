from django.shortcuts import render,redirect,get_object_or_404
from django.contrib import messages
from .forms import UserRegistrationForm,EventForm,WannaBeAdminForm,CommentsForm
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponse,JsonResponse
from .models import People,Event,Comments
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view,permission_classes
from .serializers import PeopleSerializer,EventSerializer,CommentsSerializer
from datetime import datetime
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_auth.registration.views import SocialLoginView
from django.conf import settings



p_arr = ('iwanttobeadmin123','paspas','hereistheadmin123',)
# Create your views here.

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
        p = request.sess237a06265bc5ea6ebda05732be38be2c
        if p in p_arr:
            code = True
        else:
            code = False237a06265bc5ea6ebda05732be38be2c
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


@csrf_exempt
def user_admin_creator(request):
    if request.method == 'POST':
        user_name = request.POST.get('username')
        admin_pass = request.POST.get('admin_password')
        enroll=request.POST.get('enroll')
        email=request.POST.get("email")
        user_object = User.objects.get(username=user_name)
        admin_pass = request.POST.get('admin_password')
        if admin_pass in p_arr:
            code = True
        else:
            code = False
        p = People(user_name=user_object, admin_value=code, enroll=request.POST.get("enroll"), email=request.POST.get("email"))
        p.save()
        message = "user created"
        data= {
            'username' : user_name,
            'pass': admin_pass,
            'enroll':  enroll,
            'email': email,
            'user_id': user_object.id,
            'message': message
        }
        return JsonResponse(data)

@csrf_exempt
def comment_creator(request):
    if request.method == 'POST':
            user_name = request.POST.get('username')
            user_object = User.objects.get(username=user_name)
            people_object = user_object.people
            eventID = request.POST.get('eventID')
            event_object = Event.objects.get(id = eventID)
            date1 = datetime.now().date()
            c = Comments.objects.create(body=request.POST.get('body'),posted_by = people_object, event_name = event_object, posted_on = date1)
            c.save()
            message = "comment created"
            return JsonResponse({
            'message': message
            })

@csrf_exempt
def schedule_creator(request):
    if request.method =='POST':
        name = request.POST.get('name')
        venue = request.POST.get('venue')
        description = request.POST.get('description')
        date = request.POST.get('date')
        manager_id = request.POST.get('manager')
        people_object = People.objects.get(id = manager_id)
        eve = Event.objects.create(name=name,venue=venue,description=description,date=date,manager=people_object)
        eve.save()
        return JsonResponse({
            'message': 'event created'
        })


class GithubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    callback_url = "http://127.0.0.1:8000/IMGSched/oauth/complete/github/"
    client_class = OAuth2Client


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
    client_class = OAuth2Client


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    callback_url = "http://localhost:3000"

    

