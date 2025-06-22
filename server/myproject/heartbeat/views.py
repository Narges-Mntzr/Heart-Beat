# server/core/views.py
from django.utils.timezone import now
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Follow, HeartbeatLog
from datetime import date
from datetime import timedelta
import logging
import re

logger = logging.getLogger(__name__)

ALLOWED_USERNAME_PATTERN = re.compile(r"^[\w.@-]+$")


@api_view(["POST"])
def register_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Username and password are required."}, status=400)

    if not ALLOWED_USERNAME_PATTERN.match(username):
        return Response({"error": "Username contains invalid characters."}, status=400)

    if User.objects.filter(username__iexact=username).exists():
        return Response({"error": "Username already exists."}, status=409)

    user = User.objects.create(username=username, password=password)
    return Response({"user_id": user.id}, status=201)


@api_view(["POST"])
def login_user(request):
    username = request.data.get("username")
    password = request.data.get("password")

    try:
        user = User.objects.get(username__iexact=username)
        if user.password != password:
            return Response({"error": "Invalid password."}, status=401)
        return Response({"user_id": user.id}, status=200)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)


@api_view(["POST"])
def follow_user(request):
    follower_id = request.data.get("follower_id")
    followed_username = request.data.get("followed_username")
    if not followed_username:
        return Response({"error": "Username is necessary."}, status=409)

    try:
        follower = User.objects.get(id=follower_id)
        followed = User.objects.get(username__iexact=followed_username)

        existing = Follow.objects.filter(follower=follower, followed=followed).exists()
        if existing:
            return Response(
                {"error": "You are already following this user."}, status=409
            )

        Follow.objects.create(follower=follower, followed=followed)
        return Response({"status": "followed"}, status=200)

    except User.DoesNotExist:
        logger.warning("User not found during follow operation.")
        return Response({"error": "User not found"}, status=404)


@api_view(["GET"])
def list_following(request, user_id):
    user = User.objects.get(id=user_id)
    following = user.following.all()
    today_start = now().replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = today_start + timedelta(days=1)
    data = []

    for f in following:
        target = f.followed
        latest_heartbeat = (
            HeartbeatLog.objects.filter(
                user=target, date__gte=today_start, date__lt=today_end
            )
            .order_by("-date")
            .first()
        )
        last_heartbeat_str = None

        if latest_heartbeat:
            diff = now() - latest_heartbeat.date
            seconds = diff.total_seconds()

            if seconds < 60:
                last_heartbeat_str = "Just now"
            elif seconds < 3600:
                minutes = int(seconds // 60)
                last_heartbeat_str = (
                    f"{minutes} minute{'s' if minutes != 1 else ''} ago"
                )
            else:
                hours = int(seconds // 3600)
                last_heartbeat_str = f"{hours} hour{'s' if hours != 1 else ''} ago"

        data.append(
            {
                "username": target.username,
                "heartbeat": bool(last_heartbeat_str),
                "last_heartbeat": last_heartbeat_str,
            }
        )

    sorted_data = sorted(data, key=lambda x: not x["heartbeat"])
    return Response(sorted_data)


@api_view(["GET"])
def list_followers(request, user_id):
    user = User.objects.get(id=user_id)
    followers = user.followers.all()
    data = [{"username": f.follower.username} for f in followers]

    return Response(data)


@api_view(["POST"])
def send_heartbeat(request):
    user_id = request.data.get("user_id")
    user = User.objects.get(id=user_id)
    now_time = now()
    HeartbeatLog.objects.get_or_create(user=user, date=now_time)
    return Response({"status": "heartbeat recorded"}, status=200)


@api_view(["GET"])
def get_user_info(request, user_id):
    today_start = now().replace(hour=0, minute=0, second=0, microsecond=0)
    today_end = today_start + timedelta(days=1)

    try:
        user = User.objects.get(id=user_id)
        latest_heartbeat = (
            HeartbeatLog.objects.filter(
                user=user, date__gte=today_start, date__lt=today_end
            )
            .order_by("-date")
            .first()
        )

        if latest_heartbeat:
            diff = now() - latest_heartbeat.date
            seconds = diff.total_seconds()

            if seconds < 60:
                last_heartbeat_str = "Just now"
            elif seconds < 3600:
                minutes = int(seconds // 60)
                last_heartbeat_str = (
                    f"{minutes} minute{'s' if minutes != 1 else ''} ago"
                )
            else:
                hours = int(seconds // 3600)
                last_heartbeat_str = f"{hours} hour{'s' if hours != 1 else ''} ago"

        else:
            last_heartbeat_str = None

        return Response(
            {
                "username": user.username,
                "date_joined": user.date_joined.strftime("%Y-%m-%d"),
                "last_heartbeat": last_heartbeat_str,
            }
        )
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
