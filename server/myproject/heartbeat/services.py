from datetime import datetime, timezone
from django.utils.translation import gettext as _


def get_time_ago_str(dt):
    now = datetime.now(timezone.utc)
    diff = now - dt
    seconds = diff.total_seconds()
    time_ago_str = None

    if seconds < 60:
        time_ago_str = _("Just now")
    elif seconds < 3600:
        minutes = int(seconds // 60)
        time_ago_str = _(f"{minutes} min{'s' if minutes != 1 else ''} ago")
    elif seconds < 86400:
        hours = int(seconds // 3600)
        time_ago_str = _(f"{hours} hour{'s' if hours != 1 else ''} ago")
    else:
        days = int(seconds // 86400)
        time_ago_str = _(f"{days} day{'s' if days != 1 else ''} ago")

    return time_ago_str
