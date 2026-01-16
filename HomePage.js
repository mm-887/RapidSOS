let countdownValue = 5;
let countdownTimer;

const overlay = document.getElementById("emergencyOverlay");
const countdownText = document.getElementById("countdown");
const cancelButton = document.getElementById("cancelSOS");

function startEmergencyMode() {
  overlay.classList.remove("hidden");
  countdownValue = 5;
  countdownText.textContent = countdownValue;

  countdownTimer = setInterval(() => {
    countdownValue--;
    countdownText.textContent = countdownValue;

    if (countdownValue === 0) {
      clearInterval(countdownTimer);
      triggerSOS();
    }
  }, 1000);
}

cancelButton.addEventListener("click", () => {
  clearInterval(countdownTimer);
  overlay.classList.add("hidden");
});

function triggerSOS() {
  overlay.classList.add("hidden");

  navigator.geolocation.getCurrentPosition(
    position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      console.log("SOS sent with location:", lat, lon);
      alert("Emergency SOS sent successfully!");
    },
    () => {
      alert("Location access denied. SOS sent without location.");
    }
  );
}
