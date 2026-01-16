const cards = document.querySelectorAll(".card");
const messageBox = document.getElementById("emergency-text");
const customTypeInput = document.getElementById("customType");

const templates = {
  medical: "I am facing a medical emergency and need immediate help. My location is [Auto Location].",
  accident: "I have met with an accident and require urgent assistance. My location is [Auto Location].",
  fire: "There is a fire emergency at my location. Please contact emergency services immediately.",
  threat: "I feel unsafe and need immediate help. My location is [Auto Location]."
};

cards.forEach(card => {
  card.addEventListener("click", () => {

    // Remove active state from all cards
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");

    const type = card.dataset.type;

    if (type === "custom") {
      customTypeInput.classList.remove("hidden");
      messageBox.value = "";
    } else {
      customTypeInput.classList.add("hidden");
      messageBox.value = templates[type];
    }
  });
});
