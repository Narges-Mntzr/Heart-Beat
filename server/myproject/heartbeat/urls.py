# server/core/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("follow/", views.follow_user),
    path("following/<int:user_id>/", views.list_following),
    path("followers/<int:user_id>/", views.list_followers),
    path("heartbeat/", views.send_heartbeat),
    path("login/", views.login_user),
    path("register/", views.register_user),
    path("search_users/", views.search_users),
    path('seen-message/<int:message_id>/', views.get_message_content),
    path('send-message/', views.send_message),
    path("user/<int:user_id>/", views.get_user_info),
]
