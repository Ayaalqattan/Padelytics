# from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .forms import Video_form
from .models import Video
from .serializers import VideoSerializer
from django.shortcuts import render

# الصفحة الرئيسية (تتطلب تسجيل الدخول)
@login_required(login_url="login")
def home(request):
    all_video = Video.objects.all()  # تحميل جميع الفيديوهات من قاعدة البيانات
    form = Video_form()  # إنشاء نموذج رفع الفيديوهات
    return render(request, "home.html", {"form": form, "all_video": all_video})

# API لرفع الفيديوهات (مع إلغاء التحقق من CSRF)
@method_decorator(csrf_exempt, name='dispatch')
class VideoUploadView(APIView):
    def post(self, request, *args, **kwargs):
        form = Video_form(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return Response({"message": "تم رفع الفيديو بنجاح!"}, status=status.HTTP_201_CREATED)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

# API لاستعراض كل الفيديوهات
class VideoListAPIView(APIView):
    def get(self, request, *args, **kwargs):
        videos = Video.objects.all()
        serializer = VideoSerializer(videos, many=True)
        return Response(serializer.data)

# API لصفحة المتجر
class ShopView(APIView):
    def get(self, request, *args, **kwargs):
        data = {"message": "هذه صفحة المتجر"}
        return Response(data, status=status.HTTP_200_OK)

# API لصفحة التواصل
class ContactView(APIView):
    def get(self, request, *args, **kwargs):
        data = {"message": "هذه صفحة الاتصال"}
        return Response(data, status=status.HTTP_200_OK)

from rest_framework.decorators import api_view
from rest_framework.response import Response
from firebase_config import db
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
@csrf_exempt
@api_view(['GET'])
def profile(request):
    print("UID from session:", request.session.get('uid')),
    uid = request.session.get('uid')  # جلب الـ uid من الجلسة

    if not uid:
        return Response({"message": "غير مسجل الدخول"}, status=401)

    user_doc = db.collection('users').document(uid).get()
    if user_doc.exists:
        user_data = user_doc.to_dict()
        return Response({
            "username": user_data.get("username", ""),
            "name": user_data.get("name", ""),
            "level": user_data.get("level", "beginner"),
            "wins": user_data.get("wins", 0),
            "losses": user_data.get("losses", 0),
            "matches": user_data.get("matches", 0),
            "profileImage": user_data.get("profileImage", ""),
            "friends": user_data.get("friends", []),
        })
    else:
        return Response({"message": "المستخدم غير موجود"}, status=404)
from django.conf import settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from Loginpage.serializers import ProfileSerializer
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({'detail': 'CSRF cookie set'})

class ProfilePictureUpdateView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        profile = request.user.profile
        data = request.data.copy()
        if 'profile_picture' in request.FILES:
            data['profile_picture'] = request.FILES['profile_picture']

        serializer = ProfileSerializer(profile, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from django.http import JsonResponse
from .firebase_services import get_all_tournaments

def tournaments_list(request):
    if request.method == 'GET':
        tournaments = get_all_tournaments()
        return JsonResponse(tournaments, safe=False)
