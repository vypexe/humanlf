import uuid
import json

from django.http import JsonResponse
from django.contrib.auth.models import User
from forum.models import Thread

#GET: get user information logged in
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

#GET: list threads
# TODO: Paging, update threads, refresh?
def threads(request):
    if request.method == "GET":
        thread_list = Thread.objects.all().order_by("-popularity", "-created")
        data = []

        for thread in thread_list:
            data.append({
                "id": thread.id,
                "title": thread.title,
                "author": thread.author,
                "created": thread.created.isoformat(),
                "updated": thread.updated,
                "votes": thread.votes,
                "ai_indicator": thread.ai_indicator,
                "popularity": thread.popularity,
            })
        
        response = JsonResponse({"threads": data})
        return response
    
    elif request.method == "POST":
        user_id = request.COOKIES.get("user_id")
        if not user_id:
            return JsonResponse({"error": "not authenticated"}, status=401)
    
        body = json.loads(request.body)
        title = body.get(title, "").strip()
        if not title:
            return JsonResponse({"error": "title needed"}, status=400)
        
        user = User.objects.filter(id=user_id).first()
        thread = Thread.objects.create(title=title,author=user)
        
        return JsonResponse({"id": thread.id, "title": thread.title}, status=201)

