from django.db import models
from django.contrib.auth.models import User as AuthUser

class user(AuthUser):
    phone = models.CharField(max_length=15)