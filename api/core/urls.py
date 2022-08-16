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

from django.conf.urls import include
from django.contrib import admin
from django.urls import path, re_path
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

# Medias
from medias.views import (
    MediaViewSet
)
medias_router = router.register(
    r'medias', MediaViewSet
)

# Residents
from residents.views import (
    ResidentViewSet,
    ResidentCustomRegisterView
)
residents_router = router.register(
    r'residents', ResidentViewSet
)

# Tickets
from tickets.views import (
    TicketViewSet,
    TicketTagViewSet,
    TicketActivityViewSet,
    TicketCommentViewSet
)
tickets_router = router.register(
    r'tickets', TicketViewSet
).register(
    r'comments', TicketCommentViewSet,
    'ticket-comments', parents_query_lookups=['id']
)
ticket_tags_router = router.register(
    r'ticket-tags', TicketTagViewSet
)
ticket_activities_router = router.register(
    r'ticket-activities', TicketActivityViewSet
)

# Units
from units.views import (
    UnitViewSet,
    BlockViewSet,
    FloorViewSet,
    UnitNumberViewSet,
    UnitActivityViewSet
)
units_router = router.register(
    r'units', UnitViewSet
).register(
    r'activities', UnitActivityViewSet,
    'unit-activities', parents_query_lookups=['id']
)
blocks_router = router.register(
    r'blocks', BlockViewSet
)
floors_router = router.register(
    r'floors', FloorViewSet
)
unit_numbers_router = router.register(
    r'unit-numbers', UnitNumberViewSet
)
unit_activities_router = router.register(
    r'unit-activities', UnitActivityViewSet
)

# Users
from users.views import (
    CustomUserViewSet,
    AdminCustomRegisterView
)
users_router = router.register(
    r'users', CustomUserViewSet
)

schema_view = get_schema_view(
   openapi.Info(
      title="Building Management API",
      default_version='v1',
      description="Building Management API",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/registration/admin/', AdminCustomRegisterView.as_view(), name='admin_register'),
    path('auth/registration/resident/', ResidentCustomRegisterView.as_view(), name='resident_register'),
    path('auth/registration/verify-email/', MyVerifyEmailView.as_view(), name='account_email_verification_sent'),
    path('auth/registration/check-email-verification/', MyCheckEmailVerificationView.as_view(), name='check_verification'),
    path('auth/registration/resend-verification/', MyResendVerificationView.as_view(), name='resend_verification'),
    re_path(r'^auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$', TemplateView.as_view(),
        name='account_confirm_email'),
    path('auth/login/', MyLoginView.as_view(), name='rest_login'),
    path('auth/logout/', MyLogoutView.as_view(), name='rest_logout'),
    path('auth/password/change/', MyPasswordChangeView.as_view(), name='password_change'),
    path('auth/password/reset/', MyPasswordResetView.as_view(), name='rest_password_reset'),
    path(r'auth/password/reset/confirm/', MyPasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    re_path(r'v1/', include(router.urls)),
    # re_path(r'auth/', include('dj_rest_auth.urls')),
    re_path('auth/obtain/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path('auth/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    re_path('auth/verify/', MyTokenVerifyView.as_view(), name='token_verify'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc')
]