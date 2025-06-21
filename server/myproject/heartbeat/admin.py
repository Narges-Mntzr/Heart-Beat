from django.contrib import admin
from .models import User, Follow, HeartbeatLog

admin.site.register(User)
admin.site.register(Follow)
admin.site.register(HeartbeatLog)
