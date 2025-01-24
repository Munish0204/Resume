from . import views
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
path("checkAuth/", views.checkAuth, name="checkAuth"),
path("signup/", views.register, name="register"),
path("login/", views.CustomAuthToken.as_view(), name="login"),
path("logout/", views.logout, name="logout"),
path('dash/', views.dashboard.as_view(), name='user-data'),

]