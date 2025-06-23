import jdatetime
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
        time_ago_str = _("{} mins ago".format(minutes))
    elif seconds < 86400:
        hours = int(seconds // 3600)
        time_ago_str = _(f"{hours} hours ago")
    else:
        days = int(seconds // 86400)
        time_ago_str = _(f"{days} days ago")

    return time_ago_str


def to_jalali(datetime_obj):
    if datetime_obj is None:
        return "-"
    return jdatetime.datetime.fromgregorian(datetime=datetime_obj).strftime('%Y/%m/%d')
