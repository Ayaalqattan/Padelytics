# Home/middleware.py

from django.utils.deprecation import MiddlewareMixin

class CheckCSRFMiddleware(MiddlewareMixin):
    def process_view(self, request, callback, callback_args, callback_kwargs):
        print("==== CSRF Token في الهيدر ====")
        print(request.headers.get('X-CSRFToken'))  # بيطبع قيمة الـ CSRF token في الهيدر لو موجودة
        
        print("==== CSRF Token في الكوكيز ====")
        print(request.COOKIES.get('csrftoken'))  # بيطبع قيمة الـ CSRF token في الكوكيز لو موجودة
        
        return None  # استمرار معالجة الطلب بشكل طبيعي
