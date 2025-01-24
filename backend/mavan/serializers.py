from rest_framework import serializers
from . import models

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Resume
        fields = ['id', 'title', 'ats_score']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notification
        fields = ['id', 'message', 'created_at']
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Password field for writing only
    phone = serializers.CharField(required=False)
    resumes = ResumeSerializer(many=True, read_only=True)
    notifications = NotificationSerializer(many=True, read_only=True)

    class Meta:

        model = models.user
        fields = [
            'id', 'username', 'email', 'phone', 'password','stats_resumes_created','stats_ats_checks', 'resumes', 'notifications'
        ]

    def create(self, validated_data):
        user = models.user(email=validated_data["email"], username=validated_data["username"],phone=validated_data["phone"])
        if "pic" in validated_data:
            user.pic = validated_data["pic"]
        user.set_password(validated_data["password"])
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get("email", instance.email)
        instance.username = validated_data.get("username", instance.username)
        instance.phone = validated_data.get("phone", instance.phone)
        if "password" in validated_data:
            instance.set_password(validated_data["password"])        
        instance.save()
        return instance


class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Resume
        fields = ['id', 'user', 'resume']
        read_only_fields = ['id', 'user']