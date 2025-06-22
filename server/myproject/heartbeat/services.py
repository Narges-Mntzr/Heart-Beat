from datetime import datetime, timezone


def get_time_ago_str(dt):
    now = datetime.now(timezone.utc)
    diff = now - dt
    seconds = diff.total_seconds()
    time_ago_str = None

    if seconds < 60:
        time_ago_str = "Just now"
    elif seconds < 3600:
        minutes = int(seconds // 60)
        time_ago_str = f"{minutes} min{'s' if minutes != 1 else ''} ago"
    elif seconds < 86400:  # کمتر از یک روز
        hours = int(seconds // 3600)
        time_ago_str = f"{hours} hour{'s' if hours != 1 else ''} ago"
    else:
        days = int(seconds // 86400)
        time_ago_str = f"{days} day{'s' if days != 1 else ''} ago"

    return time_ago_str
