# server/core/serializers.py
from rest_framework import serializers
from .models import User, Follow, HeartbeatLog


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ["follower", "followed"]


class HeartbeatLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeartbeatLog
        fields = ["user", "date"]
