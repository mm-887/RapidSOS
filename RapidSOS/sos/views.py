from twilio.rest import Client
import json
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import SOSAlert, EmergencyProfile
from contacts.models import Contact  
@login_required
def alert_setup(request):
    """View to render the SOS activation page."""
    return render(request, 'sos/alert_setup.html')
@login_required
def trigger_sos(request):
    if request.method == "POST":
        data = json.loads(request.body)
        lat, lon = data.get("latitude"), data.get("longitude")
        e_type = data.get("emergency_type","custom")
        maps_link = f"https://www.google.com/maps?q={lat},{lon}"
        user_msg = data.get("message", "")

        templates = {
            "medical": "I am facing a medical emergency and need immediate help.",
            "accident": "I have met with an accident and require urgent assistance.",
            "fire": "There is a fire emergency at my location. Please contact emergency services immediately.",
            "threat": "I feel unsafe and need immediate help."
        }

        full_msg = f"🚨 EMERGENCY: {e_type}.{templates.get(e_type, user_msg)} I need help! My Location: {maps_link}"
        account_sid="AC1b60a7ed0c703f046c6f33177e70c41a"
        auth_token="71941e1f7938d0db1ed61a37d383e1ee"
        client = Client(account_sid, auth_token)
        user_contacts = Contact.objects.filter(user=request.user)
        for contact in user_contacts:
            print(f"Attempting to send to: {contact.phone}")
            try:
                # Send the WhatsApp message
                message = client.messages.create(
                    from_='whatsapp:+14155238886', # Twilio Sandbox Number
                    body=full_msg,
                    to=f'whatsapp:{contact.phone}' # Ensure phone includes country code
                )
                print(f"Success! SID: {message.sid}")
                print(f"Sent to {contact.phone}: {message.sid}")
            except Exception as e:
                print(f"Failed to send to {contact.phone}: {e}")

        return JsonResponse({"status": "success"})
    return render(request, 'sos/alert_setup.html')