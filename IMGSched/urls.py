from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views
from . import  views


urlpatterns = [
    path('',views.home, name='home'),
    path('signup/' ,views.isignup, name='isignup'),
    path('fsignup/' ,views.signup, name='signup'),
    path('signin/', auth_views.LoginView.as_view(template_name='log_in.html'), name='login'),
    path('signout/', auth_views.LogoutView.as_view(template_name='log_out.html'), name='logout'),
    path('planner/',views.planner, name='planner'),
    path('schedule/',views.schedule, name='schedule'),
]