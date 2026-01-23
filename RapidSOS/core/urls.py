from django.urls import path
from .views import home, helpline

urlpatterns = [
    path("", home, name="home"),
    path("helpline/", helpline, name="helpline"),
]
