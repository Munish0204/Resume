from django.contrib import admin
from .models import user, Resume, Notification

@admin.register(user)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'phone', 'stats_resumes_created', 'stats_ats_checks')
    search_fields = ('username', 'email', 'phone')

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'ats_score', 'file')
    search_fields = ('title', 'user__username')

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'message', 'created_at')
    search_fields = ('user__username', 'message')
