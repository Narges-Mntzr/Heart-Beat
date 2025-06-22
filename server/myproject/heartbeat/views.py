# server/core/views.py
from django.utils.timezone import now
from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Follow, HeartbeatLog, Message
from .services import get_time_ago_str
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

    if len(username) < 6:
        return Response({"error": "Username must be at least 6 characters long."}, status=400)


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

        last_heartbeat_str = (
            get_time_ago_str(latest_heartbeat.date) if latest_heartbeat else None
        )

        unseen_messages = Message.objects.filter(
            sender=target, receiver=user, seen=False
        ).order_by("sent_at")

        has_unseen_message = unseen_messages.exists()
        unseen_message_id = unseen_messages.first().id if has_unseen_message else None

        data.append(
            {
                "username": target.username,
                "heartbeat": bool(last_heartbeat_str),
                "last_heartbeat": last_heartbeat_str,
                "unseen_message_id": unseen_message_id,
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

        last_heartbeat_str = (
            get_time_ago_str(latest_heartbeat.date) if latest_heartbeat else None
        )

        return Response(
            {
                "username": user.username,
                "date_joined": user.date_joined.strftime("%Y-%m-%d"),
                "last_heartbeat": last_heartbeat_str,
            }
        )
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)


@api_view(["GET"])
def search_users(request):
    query = request.GET.get("q", "")
    user_id = request.GET.get("user_id")
    if not query:
        return Response([])

    matches = User.objects.filter(Q(username__icontains=query) & ~Q(id=user_id))[:10]

    results = [{"username": u.username} for u in matches]
    return Response(results)


@api_view(["POST"])
def send_message(request):
    sender_id = request.data.get("sender_id")
    receiver_username = request.data.get("receiver_username")
    content = request.data.get("content")

    if not all([sender_id, receiver_username, content]):
        return Response({"error": "Missing fields."}, status=400)

    sender = User.objects.get(id=sender_id)
    receiver = User.objects.get(username=receiver_username)

    if not Follow.objects.filter(follower=receiver, followed=sender).exists():
        return Response(
            {"error": "You can only send messages to your followers."}, status=403
        )

    if len(content) > 100:
        return Response(
            {"error": "The message text must be a maximum of 100 characters."},
            status=403,
        )

    Message.objects.create(sender=sender, receiver=receiver, content=content)
    return Response({"status": "Message sent"})


@api_view(["GET"])
def get_message_content(request, message_id):
    try:
        message = Message.objects.get(id=message_id)
        message.seen = True
        message.save()

        return Response(
            {
                "id": message.id,
                "sender_username": message.sender.username,
                "content": message.content,
                "sent_at": get_time_ago_str(message.sent_at),
            }
        )
    except Message.DoesNotExist:
        return Response(
            {"error": "Message not found"}, status=status.HTTP_404_NOT_FOUND
        )
