from django.urls import path
from . import views
from .views import VideoUploadView  # استيراد الـ API لرفع الفيديوهات

# urlpatterns = [
#     path('home/', views.home, name='home'),  # تأكد من إضافة الفاصلة '/' في النهاية
#     path('shop/', views.shop, name='shop'),
#     path('contact/', views.contact, name='contact'),
#     path('profile/', views.profile, name='profile'),
    
#     # إضافة المسار الخاص بـ API لرفع الفيديوهات
#     path('upload-api/', VideoUploadView.as_view(), name='video-upload'),  # API لرفع الفيديوهات
# ]
from django.urls import path
from .views import ShopView, ContactView, VideoUploadView,profile,ProfilePictureUpdateView, csrf, tournaments_list, update_profile,add_friend,get_friends,get_courts
from .views import VideoUploadView
urlpatterns = [
    path('profile/', profile, name='profile'),
    path('home/', views.home, name='home'),
    path('shop-api/', ShopView.as_view(), name='shop-api'),  # API للـ shop
    path('contact-api/', ContactView.as_view(), name='contact-api'),  # API للـ contact
   # path('profile-api/', ProfileView.as_view(), name='profile-api'),  # API للـ profile
   path('api/upload-video/', VideoUploadView.as_view(), name='upload-video'),
    path('profile/picture/', ProfilePictureUpdateView .as_view(), name='profile_picture_upload'),
    path('csrf/',  csrf),
    path('tournaments/', tournaments_list, name='tournaments-list'),
    path('profile/update/', update_profile, name='update-profile'),
    path('api/add_friend/', add_friend, name='add_friend'),
    path('api/get_friends/', get_friends, name='get_friends'),
    path('api/courts/',get_courts,name='get_courts'),
    # path('api/suggest_usernames/', suggest_usernames, name='suggest_usernames'),

   
]
