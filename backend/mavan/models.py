from django.db import models
from django.contrib.auth.models import User as AuthUser

class user(AuthUser):
    phone = models.CharField(max_length=15)
    stats_resumes_created = models.PositiveIntegerField(default=0)
    stats_ats_checks = models.PositiveIntegerField(default=0)
    
    def save(self, *args, **kwargs):
        self.stats_resumes_created = self.resumes.count()
        self.stats_ats_checks = sum(resume.ats_score for resume in self.resumes.all())
        super().save(*args, **kwargs)

    def calculate_profile_completeness(self):
        fields = [self.username, self.email, self.phone]
        filled_fields = [field for field in fields if field]
        return int((len(filled_fields) / len(fields)) * 100)

    def __str__(self):
        return self.username

class Resume(models.Model):
    user = models.ForeignKey(user, on_delete=models.CASCADE, related_name="resumes")
    title = models.CharField(max_length=255)
    ats_score = models.PositiveIntegerField()
    file = models.FileField(upload_to='resumes/', null=True, blank=True)

    def __str__(self):
        return f"{self.title} - {self.user.username}"

class Notification(models.Model):
    user = models.ForeignKey(user, on_delete=models.CASCADE, related_name="notifications")
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user.username} - {self.message[:20]}"
