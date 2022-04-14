"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path
from django.urls.conf import re_path
from django.views.generic import TemplateView

from rest_framework import routers
from rest_framework_extensions.routers import NestedRouterMixin

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from users.auth import (
    MyCheckEmailVerificationView,
    MyLoginView,
    MyLogoutView,
    MyResendVerificationView,
    MyTokenObtainPairView,
    MyTokenRefreshView,
    MyTokenVerifyView,
    MyPasswordChangeView,
    MyPasswordResetView,
    MyPasswordResetConfirmView,
    MyVerifyEmailView
)

class NestedDefaultRouter(NestedRouterMixin, routers.DefaultRouter):
    pass


router = NestedDefaultRouter()

# Users
from users.views import (
    CustomUser
)
users_router = router.register(
    'users', CustomUser
)

schema_view = get_schema_view(
   openapi.Info(
      title="Paysuccess API",
      default_version='v1',
      description="Paysuccess API",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/registration/verify-email/', MyVerifyEmailView.as_view(), name='account_email_verification_sent'),
    path('auth/registration/check-email-verification/', MyCheckEmailVerificationView.as_view(), name='check_verification'),
    path('auth/registration/resend-verification/', MyResendVerificationView.as_view(), name='resend_verification'),
    re_path(r'^auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$', TemplateView.as_view(),
        name='account_confirm_email'),
    path('auth/login/', MyLoginView.as_view(), name='rest_login'),
    path('auth/logout/', MyLogoutView.as_view(), name='rest_logout'),
    path('auth/password/change/', MyPasswordChangeView.as_view(), name='password_change'),
    path('auth/password/reset/', MyPasswordResetView.as_view(), name='rest_password_reset'),
    path('auth/password/reset/confirm/', MyPasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    url(r'v1/', include(router.urls)),
    # url(r'auth/', include('dj_rest_auth.urls')),
    url('auth/obtain/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    url('auth/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    url('auth/verify/', MyTokenVerifyView.as_view(), name='token_verify'),
    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc')
]