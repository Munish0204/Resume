from django.db import models
from django.contrib.auth.models import User


class user(User):
    phone = models.CharField(max_length=15)

class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resume = models.FileField(upload_to='resumes/')
    
    def __str__(self):
        return f"{self.user.username}'s Resume"