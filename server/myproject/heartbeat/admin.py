from django.contrib import admin
from .models import User, Follow, HeartbeatLog

@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ('follower', 'followed')

@admin.register(HeartbeatLog)
class HeartbeatLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'date')

admin.site.register(User)

