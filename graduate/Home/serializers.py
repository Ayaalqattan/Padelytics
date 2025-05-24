# from rest_framework import serializers
# from .models import Video

# class VideoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Video
#         fields = '__all__'

from rest_framework import serializers
from .models import Video

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
import os

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['profile_picture']

    def validate_profile_picture(self, value):
        # التحقق من نوع الملف
        valid_extensions = ['.jpg', '.jpeg', '.png', '.gif']
        ext = os.path.splitext(value.name)[1].lower()
        if ext not in valid_extensions:
            raise serializers.ValidationError('فقط ملفات JPG، PNG، أو GIF مسموح بها')
        
        # التحقق من حجم الملف (اختياري)
        max_size = 5 * 1024 * 1024  # 5MB
        if value.size > max_size:
            raise serializers.ValidationError('حجم الملف كبير جدًا (الحد الأقصى 5 ميجا)')
        
        return value

class UserSerializer(serializers.ModelSerializer):
    profileImage = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'profileImage', 'matches', 'wins', 'losses', 'level', 'friends']

    def get_profileImage(self, obj):
        # جلب صورة البروفايل من موديل Profile
        try:
            profile = obj.profile
            if profile.profile_picture:
                return profile.profile_picture.url
            return None
        except Profile.DoesNotExist:
            return None
