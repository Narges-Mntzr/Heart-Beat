from django.contrib import admin
from .models import User, Follow, HeartbeatLog, Message


@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ("follower", "followed")


@admin.register(HeartbeatLog)
class HeartbeatLogAdmin(admin.ModelAdmin):
    list_display = ("user", "date")


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("sender", "receiver", "content", "seen")
    list_editable = ("seen",)


admin.site.register(User)
