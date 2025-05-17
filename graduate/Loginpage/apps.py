from django.apps import AppConfig


class LoginpageConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Loginpage'
    def ready(self):
      import Loginpage.signals  # نفس الاسم هنا