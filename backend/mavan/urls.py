from . import views
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
path("checkAuth/", views.checkAuth, name="checkAuth"),
path("signup/", views.register, name="register"),
path("login/", views.CustomAuthToken.as_view(), name="login"),
path("logout/", views.logout, name="logout"),
path('uploadRes/', views.ResumeUploadView.as_view(), name='upload_resume'),
path('resumes/', views.UserResumesView.as_view(), name='view_resumes'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)