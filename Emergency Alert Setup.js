const cards = document.querySelectorAll(".card");
const messageBox = document.getElementById("emergency-text");
const customTypeInput = document.getElementById("customType");

const sosBox = document.getElementById("sosBox");
const sendSOSBtn = document.getElementById("sendSOSBtn");
const countdownText = document.getElementById("countdownText");
const timerSpan = document.getElementById("timer");

let countdownInterval;

const templates = {
  medical:
    "I am facing a medical emergency and need immediate help. My location is [Auto Location].",
  accident:
    "I have met with an accident and require urgent assistance. My location is [Auto Location].",
  fire:
    "There is a fire emergency at my location. Please contact emergency services immediately.",
  threat:
    "I feel unsafe and need immediate help. My location is [Auto Location].",
};

/* CARD SELECTION */
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

    // Show SOS box
    sosBox.classList.remove("hidden");
    sendSOSBtn.disabled = false;
  });
});

/* SEND SOS CLICK */
sendSOSBtn.addEventListener("click", () => {
  sendSOSBtn.disabled = true;
  startCountdown();
});

/* COUNTDOWN FUNCTION */
function startCountdown() {
  let timeLeft = 5;
  countdownText.classList.remove("hidden");
  timerSpan.textContent = timeLeft;

  countdownInterval = setInterval(() => {
    timeLeft--;
    timerSpan.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(countdownInterval);
      countdownText.textContent = "Sending SOS...";
      sendSOS();
    }
  }, 1000);
}

/* SEND SOS */
function sendSOS() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const location = `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`;

      const finalMessage = messageBox.value.replace(
        "[Auto Location]",
        location
      );

      // 🔥 SEND TO CONTACTS (mock)
      console.log("SOS SENT!");
      console.log("Message:", finalMessage);
      console.log("Location:", location);

      alert("🚨 SOS Sent Successfully!");
      resetSOS();
    },
    () => {
      alert("Location access denied");
      resetSOS();
    }
  );
}

/* RESET */
function resetSOS() {
  countdownText.classList.add("hidden");
  sendSOSBtn.disabled = false;
}
