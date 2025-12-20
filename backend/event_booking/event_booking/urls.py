"""
URL configuration for event_booking project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from user.views import UserViewSet,RegisterView,LogoutView,CustomTokenObtainPairView, OTPRequestView, OTPVerifyView
from venue.views import VenueViewSet
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)
from events.views import EventViewSet
from bookings.views import BookingViewSet, VenueBookingViewSet
from feedback.views import FeedbackViewSet


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'venues', VenueViewSet)
router.register(r'events', EventViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'venue-bookings', VenueBookingViewSet)   
router.register(r'feedback', FeedbackViewSet, basename='feedback')   

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),

    #Auth Endpoints
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/logout/', LogoutView.as_view(), name='logout'),
    path('api/auth/otp/request/', OTPRequestView.as_view(), name='otp_request'),
    path('api/auth/otp/verify/', OTPVerifyView.as_view(), name='otp_verify'),
]

