from . import views
from django.urls import path

urlpatterns = [
path("checkAuth/", views.checkAuth, name="checkAuth"),
path("signup/", views.register, name="register"),
path("login/", views.CustomAuthToken.as_view(), name="login"),
path("logout/", views.logout, name="logout"),
]