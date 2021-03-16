from django.conf import settings
from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path

from datetime import datetime, timedelta

from rest_framework import routers
from rest_framework_extensions.routers import NestedRouterMixin

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from users.views import (
    MyTokenObtainPairView,
)

class NestedDefaultRouter(NestedRouterMixin, routers.DefaultRouter):
    pass

router = NestedDefaultRouter()

# Billings
from billings.views import (
    BillingViewSet
)
billings_router = router.register(
    'billings', BillingViewSet
)

# Complaints
from complaints.views import (
    ComplaintViewSet
)
complaints_router = router.register(
    'complaints', ComplaintViewSet
)

# Medias
from medias.views import (
    MediaViewSet
)
medias_router = router.register(
    'medias', MediaViewSet
)

# Proprietors
from proprietors.views import (
    ProprietorViewSet
)
proprietors_router = router.register(
    'proprietors', ProprietorViewSet
)

# Units
from units.views import (
    BlockViewSet,
    FloorViewSet,
    UnitNumberViewSet,
    UnitViewSet
)
blocks_router = router.register(
    'blocks', BlockViewSet
)
floors_router = router.register(
    'floors', FloorViewSet
)
unit_numbers_router = router.register(
    'unit-numbers', UnitNumberViewSet
)
units_router = router.register(
    'units', UnitViewSet
)

# Users
from users.views import (
    CustomUserViewSet
)
users_router = router.register(
    'users', CustomUserViewSet
)


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'v1/', include(router.urls)),
    url(r'auth/', include('dj_rest_auth.urls')),
    url(r'auth/registration', include('dj_rest_auth.registration.urls')),
    url('auth/obtain/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    url('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    url('auth/verify/', TokenVerifyView.as_view(), name='token_verify')
]
