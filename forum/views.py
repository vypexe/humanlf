from django.http import HttpResponse
from django.http import JsonResponse

def index(request):
    if request.method == "GET":
        return JsonResponse({"message": "Welcome to the forum page"})

