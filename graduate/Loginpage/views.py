
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .serializers import UserSerializer

# class SignupAPIView(APIView):
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"message": "تم إنشاء الحساب بنجاح"}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
from django.contrib.auth import authenticate, login
# from django.contrib.auth.models import User
from .serializers import  UserSerializer
from rest_framework.views import APIView


# View لتسجيل المستخدم
# class SignUpAPIView(APIView):
#     def post(self, request):
#         serializer = SignUpSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# views.py
# from rest_framework import status
# from rest_framework.response import Response
# from .serializers import UserSerializer,LoginSerializer
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
# from django.contrib.auth.models import User



# @api_view(['POST'])
# @permission_classes([AllowAny])  # السماح لأي حد بالدخول بدون تسجيل دخول
# def signup(request):
#     data = request.data
#     username = data.get("username")
#     email = data.get("email")

#     if User.objects.filter(username=username).exists():
#         return Response(
#             {"message": "اسم المستخدم مستخدم بالفعل"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     if User.objects.filter(email=email).exists():
#         return Response(
#             {"message": "البريد الإلكتروني مستخدم بالفعل"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

#     serializer = UserSerializer(data=data)
#     if serializer.is_valid():
#         user = serializer.save()
#         return Response(
#             {"message": "تم التسجيل بنجاح!", "user_id": user.id},
#             status=status.HTTP_201_CREATED
#         )
#     else:
#         return Response(
#             {"message": "حدث خطأ أثناء التسجيل", "errors": serializer.errors},
#             status=status.HTTP_400_BAD_REQUEST
#         )


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def login_view(request):
#     # استخدام LoginSerializer للتحقق من البيانات
#     serializer = LoginSerializer(data=request.data)
    
#     if serializer.is_valid():
#         username = serializer.validated_data['username']
#         password = serializer.validated_data['password']
#         remember_me = serializer.validated_data.get('remember_me', False)

#         # التحقق من اسم المستخدم وكلمة المرور
#         user = authenticate(request, username=username, password=password)

#         if user is not None:
#             login(request, user)  # تسجيل الدخول وإعداد الجلسة

#             # تعيين مدة الجلسة بناءً على "تذكرني"
#             if remember_me:
#                 request.session.set_expiry(1209600)  # 2 أسابيع
#             else:
#                 request.session.set_expiry(0)  # الجلسة تنتهي عند غلق المتصفح

#             return Response({"message": "تم تسجيل الدخول بنجاح!"})
#         else:
#             return Response({"message": "اسم المستخدم أو كلمة المرور غير صحيحة"}, status=status.HTTP_401_UNAUTHORIZED)
#     else:
#         return Response({"message": "البيانات غير صحيحة", "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

import requests

from firebase_admin import auth as firebase_auth
from firebase_config import db

 # تأكدي أن المسار صحيح

# مفتاح Web API الخاص بمشروعك (من firebaseConfig.apiKey)
FIREBASE_WEB_API_KEY = "AIzaSyBlWYhG8sSKRCqn4t6Qp_T30xhf-gvwLwI"





@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def signup(request):
    username = request.data.get("username")
    email    = request.data.get("email")
    password = request.data.get("password")
    level    = request.data.get("level")  # ← إضافة هذا السطر
    birthday = request.data.get("birthday")

    governorate = request.data.get("governorate")
    gender = request.data.get("gender")
    # if not username or not email or not password or not level or not Birthday:
    #    return Response({"message": "الرجاء إدخال جميع الحقول"}, status=status.HTTP_400_BAD_REQUEST)

       
    # تحقق من عدم وجود اسم المستخدم مسبقًا
    users_ref = db.collection('users')
    existing_user_query = users_ref.where('username', '==', username).stream()
    if any(existing_user_query):
        return Response({"message": "اسم المستخدم مستخدم بالفعل"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # إنشاء المستخدم في Firebase Auth
        user = firebase_auth.create_user(email=email, password=password)

        # حفظ بيانات المستخدم في جدول users
        users_ref.document(user.uid).set({
            'email': email,
            'username': username,
            'uid': user.uid,
            'level': level,  
            'gender': gender,
            'birthday' :birthday,
            'governorate': governorate ,
            'wins': 0,
            'losses': 0,
            'matches': 0,
            'profileImage': '',
            'friends': []
        })

        # إنشاء جلسة
        request.session['uid'] = user.uid

        return Response({"message": "تم إنشاء الحساب بنجاح", "uid": user.uid}, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"message": f"حدث خطأ أثناء التسجيل: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def login_view(request):
    email       = request.data.get("email")
    password    = request.data.get("password")
    remember_me = request.data.get("remember_me", False)

    if not email or not password:
        return Response({"message": "يرجى إدخال البريد الإلكتروني وكلمة المرور"}, status=status.HTTP_400_BAD_REQUEST)

    # البحث عن uid في Firestore عبر البريد الإلكتروني
    users = db.collection('users').where('email', '==', email).get()
    if not users:
        return Response({"message": "البريد الإلكتروني غير موجود"}, status=status.HTTP_401_UNAUTHORIZED)

    user_doc = users[0]
    uid = user_doc.id

    # تسجيل الدخول باستخدام Firebase
    url = (
        "https://identitytoolkit.googleapis.com/"
        f"v1/accounts:signInWithPassword?key={settings.FIREBASE_API_KEY}"
    )
    payload = {"email": email, "password": password, "returnSecureToken": True}
    res = requests.post(url, json=payload)
    res_data = res.json()

    if res.status_code == 200:
        request.session['uid'] = uid
        request.session.set_expiry(1209600 if remember_me else 0)
        return Response({"message": "تم تسجيل الدخول", "uid": uid})

    firebase_error = res_data.get('error', {}).get('message', '')
    return Response(
        {"message": "بيانات خاطئة", "firebase_error": firebase_error},
        status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(['GET'])
def me(request):
    uid = request.session.get('uid')
    if not uid:
        return Response({"error": "غير مصرح. الرجاء تسجيل الدخول."}, status=status.HTTP_401_UNAUTHORIZED)

    doc = db.collection('users').document(uid).get()
    if not doc.exists:
        return Response({"error": "المستخدم غير موجود."}, status=status.HTTP_404_NOT_FOUND)

    return Response({"user": doc.to_dict()})

@api_view(['POST'])
def logout_view(request):
    try:
        request.session.flush()  # حذف كل بيانات الجلسة
        return Response({"message": "تم تسجيل الخروج بنجاح"})
    except Exception as e:
        return Response({"error": f"حدث خطأ أثناء تسجيل الخروج: {str(e)}"}, status=500)