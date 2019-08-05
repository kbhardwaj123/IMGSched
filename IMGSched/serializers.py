from rest_framework import serializers
from .models import People,Event,Comments,Invites
from django.contrib.auth.models import User

class PeopleSerializer(serializers.ModelSerializer):
    class Meta:
        model = People
        fields = '__all__'
        depth = 2

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        depth=2
        

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'
        depth = 2      

class InvitesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invites
        fields= '__all__'
        depth = 3

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username')
        