const contactsContainer = document.getElementById("contactsContainer");
const noContactsText = document.getElementById("noContacts");

// Get contacts from localStorage
let contacts = JSON.parse(localStorage.getItem("emergencyContacts")) || [];

// If no contacts
if (contacts.length === 0) {
  noContactsText.classList.remove("hidden");
}

// Display contacts
contacts.forEach((contact, index) => {
  const card = document.createElement("div");
  card.classList.add("contact-card");

  card.innerHTML = `
    <h3>${contact.name}</h3>
    <p><strong>Phone:</strong> ${contact.phone}</p>
    <p><strong>Relation:</strong> ${contact.relation}</p>
    <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
  `;

  contactsContainer.appendChild(card);
});

// Delete contact
function deleteContact(index) {
  contacts.splice(index, 1);
  localStorage.setItem("emergencyContacts", JSON.stringify(contacts));
  location.reload();
}
