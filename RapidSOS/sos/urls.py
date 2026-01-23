from django.urls import path
from . import views 

urlpatterns = [
    path('setup/', views.alert_setup, name='alert_setup'),
    path('trigger/', views.trigger_sos, name='trigger_sos'),
]