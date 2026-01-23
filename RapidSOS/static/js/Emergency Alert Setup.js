const cards = document.querySelectorAll(".card");
const messageBox = document.getElementById("emergency-text");
const customTypeInput = document.getElementById("customType");
const cancelBtn = document.getElementById('cancelBtn');

const sosBox = document.getElementById("sosBox");
const sendSOSBtn = document.getElementById("sendSOSBtn");
const countdownText = document.getElementById("countdownText");
const timerSpan = document.getElementById("timer");

let countdownInterval;

const templates = {
  medical: "I am facing a medical emergency and need immediate help. ",
  accident: "I have met with an accident and require urgent assistance.",
  fire: "There is a fire emergency at my location. Please contact emergency services immediately.",
  threat: "I feel unsafe and need immediate help. ",
};

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");

    const type = card.dataset.type;

    if (type === "custom") {
      customTypeInput.classList.remove("hidden");
      messageBox.value = "";
    } else {
      customTypeInput.classList.add("hidden");
      messageBox.value = templates[type];
    }

    sosBox.classList.remove("hidden");
    sendSOSBtn.disabled = false;
  });
});

sendSOSBtn.addEventListener("click", () => {
  sendSOSBtn.disabled = true;
  startCountdown();
});

function startCountdown() {
  let timeLeft = 5;
  countdownText.classList.remove("hidden");
  timerSpan.textContent = timeLeft;
  cancelBtn.classList.remove("hidden");

  countdownInterval = setInterval(() => {
    timeLeft--;
    timerSpan.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(countdownInterval);
      countdownText.textContent = "Sending SOS...";
      cancelBtn.classList.add("hidden");
      sendSOS();
    }
  }, 1000);
}
function cancelEmergency() {
    clearInterval(countdownInterval);
    window.location.href = SETUP_URL;
}

function sendSOS() {
    countdownText.textContent = "Locating you...";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            const activeCard = document.querySelector(".card.active");
            
            if (!activeCard) {
                alert("Please select an emergency type first!");
                countdownText.textContent = "Selection Required.";
                return;
            }

            const type = activeCard.dataset.type === "custom" 
                ? customTypeInput.value 
                : activeCard.dataset.type;

            fetch(SOS_TRIGGER_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: JSON.stringify({
                    latitude: lat,
                    longitude: lon,
                    emergency_type: type,
                    message: messageBox.value
                })
            })
            .then(response => {
                if (response.ok) {
                    countdownText.textContent = "SOS Sent Successfully!";
                  
                    setTimeout(() => {
                        window.location.href = HOME_URL;
                    }, 2000);
                } else {
                    countdownText.textContent = "Error sending SOS.";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                countdownText.textContent = "Network Error.";
            });

        }, (error) => {
            
            alert("Please enable location services to send an SOS.");
            countdownText.textContent = "Location Error.";
        },{ 
        enableHighAccuracy: true, 
        timeout: 5000,            
        maximumAge: 0             
});
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

