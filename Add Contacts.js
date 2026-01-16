const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const relation = document.getElementById("relation").value.trim();

  if (!name || !phone || !relation) {
    alert("Please fill all fields");
    return;
  }

  let contacts = JSON.parse(localStorage.getItem("emergencyContacts")) || [];

  const newContact = {
    name: name,
    phone: phone,
    relation: relation
  };

  contacts.push(newContact);

  localStorage.setItem("emergencyContacts", JSON.stringify(contacts));

  alert("Contact saved successfully!");

  form.reset();
});
