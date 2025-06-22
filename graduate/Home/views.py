# from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .forms import Video_form
from .models import Video
# from .serializers import VideoSerializer
from django.shortcuts import render

# الصفحة الرئيسية (تتطلب تسجيل الدخول)
@login_required(login_url="login")
def home(request):
    all_video = Video.objects.all()  # تحميل جميع الفيديوهات من قاعدة البيانات
    form = Video_form()  # إنشاء نموذج رفع الفيديوهات
    return render(request, "home.html", {"form": form, "all_video": all_video})

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# import cloudinary
# import cloudinary.uploader
# import requests
# import logging

# logger = logging.getLogger(__name__)

# class VideoUploadView(APIView):
#     def post(self, request):
#         try:
#             # Check if a file is provided
#             if 'video' not in request.FILES:
#                 logger.error("No video file provided")
#                 return Response({"error": "No video file provided"}, status=status.HTTP_400_BAD_REQUEST)

#             video_file = request.FILES['video']
            
#             # Upload to Cloudinary
#             upload_result = cloudinary.uploader.upload(
#                 video_file,
#                 resource_type="video",
#                 folder="videos"
#             )
            
#             secure_url = upload_result.get("secure_url")
#             logger.info(f"Upload successful: {secure_url}")

#             # Prepare JSON payload for FastAPI
#             fastapi_payload = {
#                 "video_url": secure_url,
#                 "destination_dir": "Uploads/videos",
#                 "filename": "uploaded_video.mp4"
#             }

#             # Send request to FastAPI endpoint
#             fastapi_url = "http://35.225.232.204/input-video/"  # Adjust based on actual endpoint
#             try:
#                 fastapi_response = requests.post(fastapi_url, json=fastapi_payload, timeout=10)
#                 fastapi_response.raise_for_status()  # Raise exception for bad status codes
#                 fastapi_data = fastapi_response.json()
#                 logger.info(f"FastAPI response: {fastapi_data}")
                
#                 # Return combined response to frontend
#                 return Response({
#                     "message": "Success",
#                     "url": secure_url,
#                     "fastapi_response": fastapi_data
#                 }, status=status.HTTP_200_OK)
            
#             except requests.exceptions.RequestException as e:
#                 logger.error(f"FastAPI request failed: {str(e)}")
#                 return Response({
#                     "message": "Success",
#                     "url": secure_url,
#                     "fastapi_error": f"FastAPI processing failed: {str(e)}"
#                 }, status=status.HTTP_200_OK)

#         except Exception as e:
#             logger.error(f"Upload failed: {str(e)}")
#             return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import cloudinary
import cloudinary.uploader
import requests
import logging
from firebase_admin import firestore
import firebase_admin
from datetime import datetime
from firebase_config import db
logger = logging.getLogger(__name__)




# تهيئة Firebase (يجب أن تكون في مكان واحد في المشروع، مثل settings.py)
# from firebase_admin import credentials, initialize_app
# cred = credentials.Certificate("path/to/firebase-adminsdk.json")
# initialize_app(cred)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import cloudinary
import cloudinary.uploader
import requests
import logging
from firebase_admin import firestore
import firebase_admin
from datetime import datetime

logger = logging.getLogger(__name__)

# تأكد من تهيئة Firebase (يجب أن تتم مرة واحدة في إعدادات Django أو بداية التطبيق)
# from firebase_admin import credentials, initialize_app
# cred = credentials.Certificate("path/to/firebase-adminsdk.json")
# initialize_app(cred)

class VideoUploadView(APIView):
    def post(self, request):
        try:
            # تهيئة عميل Firestore في البداية
            db = firestore.client()

            # التحقق من وجود ملف فيديو
            if 'video' not in request.FILES:
                logger.error("لم يتم توفير ملف فيديو")
                return Response({"error": "لم يتم توفير ملف فيديو"}, status=status.HTTP_400_BAD_REQUEST)

            # سجل لتتبع البيانات المستلمة
            logger.debug(f"البيانات المستلمة: {dict(request.data)}")

            # استقبال الـ court والـ players من الطلب
            court_id = request.data.get('court', None)
            import json
            players_raw = request.data.get('players', '[]')
            try:
              players = json.loads(players_raw)
            except json.JSONDecodeError:
              logger.error("خطأ في تنسيق بيانات اللاعبين")
              players = []


            # التعامل مع الـ court
            if not court_id:
                logger.warning("لم يتم توفير الملعب في الطلب")
                court_name = "ملعب غير معروف"
            else:
                court_doc = db.collection('courts').document(court_id).get()
                if not court_doc.exists:
                    logger.warning(f"الملعب بمعرف '{court_id}' غير موجود في Firestore")
                    court_name = "ملعب غير معروف"
                else:
                    court_data = court_doc.to_dict()
                    court_name = court_data.get('courtName', 'ملعب غير معروف')

            if not players:
                logger.warning("لم يتم توفير لاعبين في الطلب")

            video_file = request.FILES['video']
            
            # رفع الفيديو إلى Cloudinary
            upload_result = cloudinary.uploader.upload(
                video_file,
                resource_type="video",
                folder="videos"
            )
            
            secure_url = upload_result.get("secure_url")
            logger.info(f"تم الرفع بنجاح: {secure_url}")

            # إعداد البيانات لإرسالها إلى FastAPI
            fastapi_payload = {
                "video_url": secure_url,
                "destination_dir": "Uploads/videos",
                "filename": "uploaded_video.mp4",
                "players": players,
                "court": court_id
            }

            # إرسال طلب إلى FastAPI
            fastapi_url = "http://34.44.128.145/input-video/"
            try:
                fastapi_response = requests.post(fastapi_url, json=fastapi_payload )
                fastapi_response.raise_for_status()
                fastapi_data = fastapi_response.json()
                logger.info(f"استجابة FastAPI: {fastapi_data}")

                # تهيئة بيانات للحفظ في Firestore
                user_id = request.user.id
                user_ref = db.collection('users').document(str(user_id))
                match_ref = user_ref.collection('uploadedMatches').document(fastapi_data.get("matchID", secure_url.split("/")[-1]))

                try:
                    formatted_time = fastapi_data.get("formattedTime", datetime.now().strftime("%d-%m-%Y %H:%M"))
                except UnicodeEncodeError:
                    logger.error("خطأ في ترميز formattedTime، باستخدام التنسيق الافتراضي")
                    formatted_time = datetime.now().strftime("%d-%m-%Y %H:%M")

                match_data = {
                    "court": court_name,
                    "formattedTime": formatted_time,
                    "matchID": fastapi_data.get("matchID", secure_url.split("/")[-1]),
                    "matchUrl": secure_url,
                    "players": players,
                    "timestamp": fastapi_data.get("timestamp", int(datetime.now().timestamp()))
                }
                
                match_ref.set(match_data)
                logger.info(f"تم حفظ البيانات في Firestore للمستخدم {user_id}")

                return Response({
                    "message": "نجاح",
                    "url": secure_url,
                    "fastapi_response": fastapi_data,
                    "firestore_status": "تم حفظ البيانات بنجاح"
                }, status=status.HTTP_200_OK)
            
            except requests.exceptions.Timeout:
                logger.error("انتهت مهلة طلب FastAPI بعد 60 دقيقة")
                user_id = request.user.id
                user_ref = db.collection('users').document(str(user_id))
                match_ref = user_ref.collection('uploadedMatches').document(secure_url.split("/")[-1])
                
                formatted_time = datetime.now().strftime("%d-%m-%Y %H:%M")
                match_data = {
                    "court": court_name,
                    "formattedTime": formatted_time,
                    "matchID": secure_url.split("/")[-1],
                    "matchUrl": secure_url,
                    "players": players,
                    "timestamp": int(datetime.now().timestamp()),
                    "error": "انتهت مهلة طلب FastAPI بعد 60 دقيقة"
                }
                match_ref.set(match_data)
                logger.info(f"تم حفظ البيانات (مع خطأ المهلة) في Firestore للمستخدم {user_id}")

                return Response({
                    "message": "نجاح",
                    "url": secure_url,
                    "fastapi_error": "انتهت مهلة طلب FastAPI بعد 60 دقيقة",
                    "firestore_status": "تم حفظ البيانات مع خطأ المهلة"
                }, status=status.HTTP_200_OK)

            except requests.exceptions.RequestException as e:
                logger.error(f"فشل طلب FastAPI: {str(e)}")
                user_id = request.user.id
                user_ref = db.collection('users').document(str(user_id))
                match_ref = user_ref.collection('uploadedMatches').document(secure_url.split("/")[-1])
                
                formatted_time = datetime.now().strftime("%d-%m-%Y %H:%M")
                match_data = {
                    "court": court_name,
                    "formattedTime": formatted_time,
                    "matchID": secure_url.split("/")[-1],
                    "matchUrl": secure_url,
                    "players": players,
                    "timestamp": int(datetime.now().timestamp()),
                    "error": f"فشل معالجة FastAPI: {str(e)}"
                }
                match_ref.set(match_data)
                logger.info(f"تم حفظ البيانات (مع خطأ) في Firestore للمستخدم {user_id}")

                return Response({
                    "message": "نجاح",
                    "url": secure_url,
                    "fastapi_error": f"فشل معالجة FastAPI: {str(e)}",
                    "firestore_status": "تم حفظ البيانات مع خطأ"
                }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"فشل الرفع: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
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
    
    uid = request.session.get('uid')  # جلب الـ uid من الجلسة

    if not uid:
        return Response({"message": "غير مسجل الدخول"}, status=401)

    user_doc = db.collection('users').document(uid).get()
    if user_doc.exists:
        user_data = user_doc.to_dict()
        return Response({
            "userName": user_data.get("userName", ""),
            "name": user_data.get("name", ""),
            "level": user_data.get("level",""),
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
#from Loginpage.serializers import ProfileSerializer
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from firebase_admin import auth as firebase_auth


from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Profile
from .serializers import ProfileSerializer, UserSerializer  # افترضت إن ProfileSerializer موجود في serializers.py

# View لإرجاع CSRF token
@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({'detail': 'CSRF cookie set'})

# View لتحديث صورة البروفايل
class ProfilePictureUpdateView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            profile = request.user.profile  # جلب موديل Profile المرتبط بالمستخدم
        except Profile.DoesNotExist:
            return Response(
                {'error': 'لم يتم العثور على ملف تعريف للمستخدم'},
                status=status.HTTP_404_NOT_FOUND
            )

        data = request.data.copy()
        if 'profile_picture' in request.FILES:
            data['profile_picture'] = request.FILES['profile_picture']
        else:
            return Response(
                {'error': 'لم يتم إرسال صورة بروفايل'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ProfileSerializer(profile, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            # إرجاع بيانات المستخدم كاملة باستخدام UserSerializer
            user_serializer = UserSerializer(request.user)
            return Response(
                {
                    'message': 'تم رفع صورة البروفايل بنجاح',
                    'data': user_serializer.data
                },
                status=status.HTTP_200_OK
            )
        return Response(
            {
                'error': 'خطأ في البيانات',
                'details': serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )
from django.http import JsonResponse
from .firebase_services import get_all_tournaments

def tournaments_list(request):
    if request.method == 'GET':
        tournaments = get_all_tournaments()
        return JsonResponse(tournaments, safe=False)
@api_view(['POST'])
@csrf_exempt
def update_profile(request):
    uid = request.session.get('uid')
    if not uid:
        return Response({"message": "غير مسجل الدخول"}, status=401)

    userName = request.data.get('userName')
    email = request.data.get('email')
    level = request.data.get('level')

    try:
        user_ref = db.collection('users').document(uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            return Response({"message": "المستخدم غير موجود"}, status=404)

        current_data = user_doc.to_dict()

        # ✅ تحقق من تكرار الاسم (إن وجد وتم تغييره)
        if userName and userName != current_data.get('userName'):
            existing_userName = db.collection('users').where('userName', '==', userName).stream()
            if any(existing_userName):
                return Response({"message": "اسم المستخدم مستخدم بالفعل"}, status=400)

        # ✅ تحقق من تكرار الإيميل (إن وجد وتم تغييره)
        if email and email != current_data.get('email'):
            existing_email = db.collection('users').where('email', '==', email).stream()
            if any(existing_email):
                return Response({"message": "البريد الإلكتروني مستخدم بالفعل"}, status=400)

        # تحديث البيانات
        updates = {}
        if userName: updates['userName'] = userName
        if email: updates['email'] = email
        if level: updates['level'] = level

        user_ref.update(updates)
        updated_doc = user_ref.get().to_dict()

        # تحديث البريد الإلكتروني في Firebase Auth
        if email and email != current_data.get('email'):
            firebase_auth.update_user(uid, email=email)

        return Response({"message": "تم تحديث البيانات بنجاح" ,"userName": updated_doc.get('userName')}, status=200)

    except Exception as e:
        return Response({"message": f"حدث خطأ أثناء التحديث: {str(e)}"}, status=400)
@api_view(['POST'])
def add_friend(request):
    uid = request.session.get('uid')
    if not uid:
        return Response({"message": "غير مسجل الدخول"}, status=401)

    friend_userName = request.data.get('userName')  # نستقبل username بدل friend_uid
    if not friend_userName:
        return Response({"message": "لم يتم تحديد اسم المستخدم المراد إضافته"}, status=400)

    try:
        user_ref = db.collection('users').document(uid)
        user_doc = user_ref.get()
        if not user_doc.exists:
            return Response({"message": "المستخدم غير موجود"}, status=404)

        # البحث عن المستخدم بواسطة username
        friend_query = db.collection('users').where('userName', '==', friend_userName).stream()
        friend_docs = list(friend_query)

        if not friend_docs:
            return Response({"message": "المستخدم المراد إضافته غير موجود"}, status=404)

        friend_doc = friend_docs[0]
        friend_uid = friend_doc.id

        if uid == friend_uid:
            return Response({"message": "لا يمكنك إضافة نفسك كصديق"}, status=400)

        user_data = user_doc.to_dict()
        current_friends = user_data.get('friends', [])

        if friend_uid in current_friends:
            return Response({"message": "هذا المستخدم مضاف بالفعل كصديق"}, status=400)

        current_friends.append(friend_uid)
        user_ref.update({'friends': current_friends})

        return Response({"message": "تمت إضافة الصديق بنجاح"}, status=200)

    except Exception as e:
        print("Error adding friend:", e)
        return Response({"message": "حدث خطأ أثناء الإضافة. حاول مرة أخرى لاحقًا."}, status=400)
@api_view(['GET'])
def get_friends(request):
    uid = request.session.get('uid')
    if not uid:
        return Response({"message": "غير مسجل الدخول"}, status=401)

    try:
        user_ref = db.collection('users').document(uid)
        user_doc = user_ref.get()

        if not user_doc.exists:
            return Response({"message": "المستخدم غير موجود"}, status=404)

        user_data = user_doc.to_dict()
        friend_uids = user_data.get('friends', [])

        friends_list = []
        for friend_uid in friend_uids:
            friend_doc = db.collection('users').document(friend_uid).get()
            if friend_doc.exists:
                friend_data = friend_doc.to_dict()
                friend_data['uid'] = friend_uid
                friends_list.append(friend_data)

        return Response({"friends": friends_list}, status=200)

    except Exception as e:
        print("Error fetching friends:", e)
        return Response({"message": "حدث خطأ أثناء تحميل الأصدقاء"}, status=400)
@api_view(['GET'])
def get_courts(request):
    try:
        courts_ref = db.collection('courts').stream()

        court_names = []
        for doc in courts_ref:
            court = doc.to_dict()
            court_name = court.get('courtName', 'اسم غير معروف')
            court_id = doc.id  # Get the Firestore doc ID
            court_names.append({
                "id": court_id,
                "name": court_name
            })

        return Response({"court_names": court_names}, status=200)
    except Exception as e:
        print("Error fetching courts:", e)
        return Response({"message": "فشل في تحميل الملاعب"}, status=500)
from rest_framework.decorators import api_view
from rest_framework.response import Response

# @api_view(['GET'])
# def suggest_usernames(request):
#     query = request.GET.get('q', '').strip().lower()
#     if not query:
#         return Response({"usernames": []})

#     try:
#         users_ref = db.collection('users').stream()
#         suggestions = []
#         for doc in users_ref:
#             data = doc.to_dict()
#             username = data.get('username', '').lower()
#             if query in username:
#                 suggestions.append(data['username'])
#             if len(suggestions) >= 10:
#                 break

#         return Response({"usernames": suggestions})
#     except Exception as e:
#         print("Error fetching username suggestions:", e)
#         return Response({"usernames": []})


