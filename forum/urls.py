from django.urls import path

from . import views

urlpatterns = [
    path('api/forum/', views.index)
]