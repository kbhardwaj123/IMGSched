from django.contrib import admin
from django.urls import path,include
from django.contrib.auth import views as auth_views
from . import  views


urlpatterns = [
    path('',views.home, name='home'),
    path('signup/' ,views.isignup, name='isignup'),
    path('fsignup/' ,views.signup, name='signup'),
    path('signin/', auth_views.LoginView.as_view(template_name='log_in.html'), name='login'),
    path('signout/', auth_views.LogoutView.as_view(template_name='log_out.html'), name='logout'),
    path('planner/',views.planner, name='planner'),
    path('schedule2/', views.ListEvent.as_view(), name='schedule2'),
    path('schedule2/<int:pk>/', views.DetailEvent.as_view()),
    path('schedule/', views.schedule, name='schedule'),
    path('schedule/<int:pk>/', views.schedule_detail),
    path('comments/', views.ListComments.as_view(), name='comments'),
    path('comments_poster/<int:pk>/', views.comments_poster),
    path('people2/', views.ListPeople.as_view()),
    path('oauth/', include('social_django.urls', namespace="social")),
]