from django.db import models
from django.contrib.auth.models import User

class SOSAlert(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    message_sent = models.TextField()

    def __str__(self):
        return f"Alert by {self.user.username} at {self.timestamp}"

class EmergencyProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    emergency_type = models.CharField(max_length=50)
    message = models.TextField()
