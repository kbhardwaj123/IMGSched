from django.contrib import admin
from django.urls import path,include
from django.contrib.auth import views as auth_views
from . import  views
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('signup/' ,views.isignup, name='isignup'),
    path('fsignup/' ,views.signup, name='signup'),
    path('signin/', auth_views.LoginView.as_view(template_name='log_in.html'), name='login'),
    path('signout/', auth_views.LogoutView.as_view(template_name='log_out.html'), name='logout'),
    path('planner/',views.planner, name='planner'),
    path('schedule2/', views.ListEvent.as_view(), name='schedule2'),
    path('schedule3/', views.schedule_creator),
    path('schedule2/<int:pk>/', views.DetailEvent.as_view()),
    path('schedule/', views.schedule, name='schedule'),
    path('schedule/<int:pk>/', views.schedule_detail),
    path('comments/', views.ListComments.as_view(), name='comments'),
    path('comments_poster/<int:pk>/', views.comments_poster),
    path('people2/', views.ListPeople.as_view()),
    path('oauth/', include('social_django.urls', namespace="social")),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('token-auth/', obtain_jwt_token),
    path('creator/', views.user_admin_creator),
    path('comment_creator/', views.comment_creator),
    path('rest-auth/github/', views.GithubLogin.as_view()),
    path('rest-auth/facebook/', views.FacebookLogin.as_view()),
    path('auth/', include('rest_framework_social_oauth2.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/google/', views.GoogleLogin.as_view()),
    path('api/login/', include('rest_social_auth.urls_token')),
]