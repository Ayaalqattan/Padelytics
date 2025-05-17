# from django.urls import path
# #from .views import CustomLoginView

# from . import views
# from django.contrib.auth import views as auth_views
# from .views import SignupAPIView


# urlpatterns = [
#     path('',views.signup,name='signup'),
#     path('logout/',auth_views.LogoutView.as_view(),name='logout'),
#     #path('login/',auth_views.LoginView.as_view(template_name='Loginpage/login.html'),name='login'),
#     #path('login/', CustomLoginView.as_view(template_name='Loginpage/login.html'), name='login'),
#     path('api/signup/', SignupAPIView.as_view(), name='api-signup'),
#     #path('api/login/', CustomLoginAPIView.as_view(), name='api-login'),
#  ]
from django.urls import path

from . import views

urlpatterns = [
     path('api/signup/', views.signup, name='signup'),
   # path('signup/', SignUpAPIView.as_view(), name='signup_api'),
     path('api/login/', views.login_view, name='login'),
     path('api/me/',    views.me,         name='me'),
     
    path('logout/', views. logout_view, name='logout'),
]



