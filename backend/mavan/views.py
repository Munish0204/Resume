from icecream import ic
from . import models, serializers
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token

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
                token, created = Token.objects.get_or_create(user=user)
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


class CustomAuthToken(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            username = request.data.get("username")
            password = request.data.get("password")
            if username is None or password is None:
                raise Exception
        except:
            return Response(
                {"error": "Please Provide Username and Password"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(request, username=username, password=password)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {"token": token.key, "username": user.username, "email": user.email},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST
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
