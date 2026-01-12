from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

#subclass of a singular thread of the forum
class Thread(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    votes = models.IntegerField(default=1)
    ai_indicator = models.FloatField(
        default = 5.0,
        validators = [MinValueValidator(0.0), MaxValueValidator(10.0)]
    ) # 5 is default, toward 0 is less AI and toward 10 is more AI
    popularity =  models.FloatField(
        default = 0.0,
        validators= [MinValueValidator(0.0, MaxValueValidator(10.0))]
    ) # need to add subtraction if it's ai --> less popular

#subclass of a singular comment of the thread
class Comment(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(User, on_delete = models.CASCADE, related_name="comments")
    created = models.DateTimeField(auto_now_add=True, related_name="comments")
    updated = models.DateTimeField(auto_now=True, related_name="comments")
    mini_votes = models.IntegerField(default=1)
    




