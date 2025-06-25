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
        time_ago_str = _("{minutes} mins ago").format(minutes=en_to_fa_digits(minutes))
    elif seconds < 86400:
        hours = int(seconds // 3600)
        time_ago_str = _("{hours} hours ago").format(hours=en_to_fa_digits(hours))
    else:
        days = int(seconds // 86400)
        time_ago_str = _("{days} days ago").format(days=en_to_fa_digits(days))

    return time_ago_str


def en_to_fa_digits(text):
    en_to_fa = str.maketrans("0123456789", "۰۱۲۳۴۵۶۷۸۹")
    return str(text).translate(en_to_fa)


def to_jalali(datetime_obj):
    if datetime_obj is None:
        return "-"
    jalali_str = jdatetime.datetime.fromgregorian(datetime=datetime_obj).strftime(
        "%Y/%m/%d"
    )
    return en_to_fa_digits(jalali_str)
