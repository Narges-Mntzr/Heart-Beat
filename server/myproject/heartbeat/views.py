# server/core/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Follow, HeartbeatLog
from datetime import date
import logging
import re

logger = logging.getLogger(__name__)

ALLOWED_USERNAME_PATTERN = re.compile(r'^[\w.@-]+$')

@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required.'}, status=400)

    if not ALLOWED_USERNAME_PATTERN.match(username):
        return Response({'error': 'Username contains invalid characters.'}, status=400)

    if User.objects.filter(username__iexact=username).exists():
        return Response({'error': 'Username already exists.'}, status=409)

    user = User.objects.create(username=username, password=password)
    return Response({'user_id': user.id}, status=201)

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        user = User.objects.get(username__iexact=username)
        if user.password != password:
            return Response({'error': 'Invalid password.'}, status=401)
        return Response({'user_id': user.id}, status=200)
    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=404)

@api_view(['POST'])
def follow_user(request):
    follower_id = request.data.get('follower_id')
    followed_username = request.data.get('followed_username')
    
    try:
        follower = User.objects.get(id=follower_id)
        print(1)
        followed = User.objects.get(username=followed_username)
        print(2)
        Follow.objects.get_or_create(follower=follower, followed=followed)
        return Response({'status': 'followed'}, status=200)
    except User.DoesNotExist:
        logger.warning("User not found during follow operation.")
        return Response({'error': 'User not found'}, status=404)

@api_view(['GET'])
def list_following(request, user_id):
    user = User.objects.get(id=user_id)
    following = user.following.all()
    today = date.today()
    data = []
    for f in following:
        target = f.followed
        heart_today = HeartbeatLog.objects.filter(user=target, date=today).exists()
        data.append({
            'username': target.username,
            'heartbeat': heart_today
        })
    return Response(data)

@api_view(['GET'])
def list_followers(request, user_id):
    user = User.objects.get(id=user_id)
    followers = user.followers.all()
    data = [{'username': f.follower.username} for f in followers]
    return Response(data)

@api_view(['POST'])
def send_heartbeat(request):
    user_id = request.data.get('user_id')
    user = User.objects.get(id=user_id)
    today = date.today()
    HeartbeatLog.objects.get_or_create(user=user, date=today)
    return Response({'status': 'heartbeat recorded'}, status=200)
