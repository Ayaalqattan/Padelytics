import os
import firebase_admin
from firebase_admin import credentials, firestore, auth
from django.conf import settings

# مسار ملف الخدمة (Service Account) بالنسبة لجذر المشروع
SERVICE_ACCOUNT_PATH = os.path.join(
    settings.BASE_DIR,
    'padelytics-a587d-firebase-adminsdk-fbsvc-52d874cb74.json'
    
)

# تهيئة Firebase Admin SDK
cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)
firebase_admin.initialize_app(cred)

# إنشاء عميل Firestore
db = firestore.client()
