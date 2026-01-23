# RapidSOS
RapidSOS is a web-based emergency alert application that enables users to send an instant SOS with a single action. It shares real-time location and critical details with predefined contacts and nearby responders, reducing emergency response time and enhancing personal safety through fast, reliable communication.

## 💫 Project Overview
In emergency situations, people may panic or may not have enough time to make calls or type messages.
RapidSOS solves this problem by providing:
One-click SOS activation
Automatic location sharing
Pre-configured emergency messages
Countdown with cancel option to prevent false alerts

## ✨ Features
🆘 **Emergency SOS System**

- One-click Send SOS button

- 5-second countdown timer before sending

- Cancel SOS option during countdown

- Prevents accidental emergency alerts


📍 **Live Location Sharing**

- Automatically fetches user’s current location using Geolocation API

- Sends latitude & longitude with SOS message


📑 **Emergency Type Selection**

Users can choose the type of emergency:

- Medical

- Accident

- Fire

- Personal Threat

- Custom Emergency


📝 **Custom Emergency Message**

- Users can write or customize the SOS message

- Message is sent along with location


👥 **Emergency Contacts Management**

- Add emergency contacts

- View saved contacts

- Contacts receive SOS alert


⚡ **Quick Options Panel**

- Add Contact

- View Contacts

- Helpline

- Edit Emergency Message


🎨 **Clean & Responsive UI**

- Card-based emergency selection

- Modern UI with icons

- Works on desktop and mobile screens

## 🛠️ Tech Stack
**🖼️Frontend**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

**🧠Backend**

![Django](https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white)

##📂Project Architecture
User
 │
 │  (Clicks Emergency / SOS)
 ▼
Frontend (HTML + CSS + JavaScript)
 │
 ├── Home Page
 │     ├─ Emergency Mode Button
 │     ├─ How SOS Works Section
 │     ├─ Quick Options (Contacts, Helpline, Edit Message)
 │
 ├── Emergency Alert Setup Page
 │     ├─ Select Emergency Type
 │     ├─ Auto Message Generation
 │     ├─ Send SOS Button
 │     ├─ Countdown Timer (5s)
 │     └─ Cancel SOS Option
 │
 ├── Contacts Page
 │     ├─ Add Contact
 │     ├─ Validate Name & Phone
 │     └─ Save Contacts
 │
 ▼
Browser APIs
 │
 ├── Geolocation API
 │     └─ Fetch Live Latitude & Longitude
 │
 |
 │
 ▼
SOS Processing Logic (JavaScript)
 │
 ├── Countdown Handler
 │ ├── Cancel SOS Logic
 │ └── Final Trigger
 │
 ▼
SOS Sent
 │
 ├── Emergency Message
 ├── Live Location
 └── Saved Contacts / Helpline




