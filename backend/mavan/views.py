from icecream import ic
from . import models, serializers
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
from . import serializers
from google.oauth2 import id_token
from google.auth.transport import requests

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    if request.method == "POST":
        try:
            serializer = serializers.UserSerializer(data=request.data)
            if not request.data.get("email"):
                return Response(
                    {"email": "Please Provide your Mail Address"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if not request.data.get("username"):
                return Response(
                    {"username": "Please Provide your Username"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if serializer.is_valid():
                if models.user.objects.filter(username=request.data["username"]).exists():
                    return Response(
                        {"message": ["Phone Number Already Exists"]},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                if User.objects.filter(email=request.data["email"]).exists():
                    return Response(
                        {"message": ["Email Already Exists"]},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                if models.user.objects.filter(phone=request.data["phone"]).exists():
                    return Response(
                        {"message": ["Phone Number Already Exists"]},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                user = serializer.save()
                token, _ = Token.objects.get_or_create(user=user)
                group = Group.objects.get_or_create(name="user")[0]
                user.groups.add(group)
                cont = serializer.data
                cont["token"] = token.key
                cont["groups"] = [group.name]
                cont["message"] = "User Created Successfully"
                return Response(cont, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            ic(e)
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GoogleAuth(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get("token")
        if not token:
            return Response({"error": "Token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            CLIENT_ID = "692671428816-9nuh184hhkqkbtkfi57ihucla6ag5f2g.apps.googleusercontent.com"
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')

            email = idinfo['email']
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')

            user, created = User.objects.get_or_create(email=email, defaults={
                'username': email,
                'first_name': first_name,
                'last_name': last_name
            })

            if created:
                user.set_unusable_password()
                user.save()
                group = Group.objects.get_or_create(name="user")[0]
                user.groups.add(group)

            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "message": "User signed in successfully" if not created else "User signed up successfully"
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CustomAuthToken(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            identifier = request.data.get("identifier")  # Accepting 'username' or 'email' as 'identifier'.
            password = request.data.get("password")

            if identifier is None or password is None:
                raise ValueError("Please provide both fields (username/email) and password.")
        except ValueError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if the identifier is an email or username
        if "@" in identifier and "." in identifier:
            # Treat identifier as an email
            user = User.objects.filter(email=identifier).first()
            if user:
                user = authenticate(request, username=user.username, password=password)
            
        else:
            # Treat identifier as a username
            user = authenticate(request, username=identifier, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {
                    "token": token.key,
                    "username": user.username,
                    "email": user.email,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_400_BAD_REQUEST,
            )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    cont = {"user": request.user.username, "message": "Logout Successfully"}
    return Response(cont)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def checkAuth(request):
    return Response({"message": "Authenticated", "username": request.user.username})

class dashboard(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_serializer = serializers.UserSerializer(user)
        # resume_serializer = serializers.ResumeSerializer(user.Resume..all(), many=True)
        # notification_serializer = serializers.NotificationSerializer(user.notification_set.all(), many=True)
        
        data = {
            "user": user_serializer.data,
            # "resumes": resume_serializer.data,
            # "notifications": notification_serializer.data,
        }
        
        return Response(data)
        return Response(serializer.data)