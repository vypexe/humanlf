import uuid

from django.http import JsonResponse
from django.contrib.auth.models import User


def index(request):
    user = None
    user_id = request.COOKIES.get("user_id")
    is_new_user = False

    if user_id:
        user = User.objects.filter(id=user_id).first()

    if user is None:
        user = User.objects.create(username=f"user_{uuid.uuid4().hex[:5]}")
        is_new_user = True

    response = JsonResponse({
        "new_user": is_new_user,
        "username": user.username,
    })
    
    response.set_cookie("user_id", user.id, max_age=604800, httponly=True, samesite="Lax")
    return response
