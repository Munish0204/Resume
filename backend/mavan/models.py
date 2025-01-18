from django.db import models
from django.contrib.auth.models import User


class user(User):
    phone = models.CharField(max_length=15)