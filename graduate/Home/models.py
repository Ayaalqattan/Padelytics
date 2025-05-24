# from django.db import models
# from django.db import models
# from .validators import file_size

# # Create your models here.
# from django.db import models

# class Video(models.Model):
#     caption = models.CharField(max_length=100)
#     video = models.FileField(upload_to="video/%y")  # تمت إزالة validators غير الصحيح

#     def __str__(self):
#         return self.caption

from django.db import models
from django.core.exceptions import ValidationError

# دالة للتحقق من حجم الفيديو
def validate_video_size(value):
    max_size = 50 * 1024 * 1024  # 50MB
    if value.size > max_size:
        raise ValidationError("حجم الفيديو يجب ألا يتجاوز 50MB.")

class Video(models.Model):
    caption = models.CharField(max_length=100, verbose_name="عنوان الفيديو")
    video = models.FileField(upload_to="videos/%Y/%m/", validators=[validate_video_size])

    def __str__(self):
        return self.caption
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    # حقول إضافية لو موجودة
    matches = models.IntegerField(default=0)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    friends = models.ManyToManyField(User, related_name='friends', blank=True)