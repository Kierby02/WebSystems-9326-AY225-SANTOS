// ---------------- DATA ----------------

const departments = [
  "Mayor’s Office",
  "City Health Office",
  "Engineering Department",
  "Social Welfare Office",
  "Business Permit Office",
  "Disaster Risk Reduction Office"
];

const services = [
  "Business Permit Application",
  "Barangay Clearance",
  "Health Certificate",
  "Building Permit",
  "Community Programs Registration",
  "Senior Citizen Support"
];

const news = [
  {
    title: "City Vaccination Drive",
    body: "Free vaccination available this Saturday at City Hall."
  },
  {
    title: "Road Repair Advisory",
    body: "Main Avenue closed for repair from Feb 5–8."
  },
  {
    title: "Job Fair Event",
    body: "Local job fair scheduled next week."
  }
];

// ---------------- RENDER LISTS ----------------

function renderList(data, elementId) {
  const ul = document.getElementById(elementId);
  ul.innerHTML = "";

  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.onclick = () => openModal("Details", item);
    ul.appendChild(li);
  });
}

renderList(departments, "deptList");
renderList(services, "serviceList");

// ---------------- SEARCH FILTER ----------------

function setupSearch(inputId, source, targetId) {
  document.getElementById(inputId).addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    const filtered = source.filter(x => x.toLowerCase().includes(q));
    renderList(filtered, targetId);
  });
}

setupSearch("deptSearch", departments, "deptList");
setupSearch("serviceSearch", services, "serviceList");

// ---------------- NEWS FEED ----------------

const newsContainer = document.getElementById("newsContainer");

news.forEach((n, i) => {
  const div = document.createElement("div");
  div.className = "card";
  div.textContent = n.title;
  div.onclick = () => openModal(n.title, n.body);
  newsContainer.appendChild(div);
});

// ---------------- MODAL ----------------

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

function openModal(title, body) {
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modal.style.display = "block";
}

document.getElementById("closeModal").onclick = () =>
  modal.style.display = "none";

window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

// ---------------- FORM VALIDATION ----------------

document.getElementById("inquiryForm").addEventListener("submit", e => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const msg = message.value.trim();

  if (!name || !email || !msg) {
    formMsg.textContent = "Please fill all fields.";
    return;
  }

  if (!email.includes("@")) {
    formMsg.textContent = "Invalid email.";
    return;
  }

  formMsg.textContent = "Inquiry submitted successfully.";

  // save preference
  localStorage.setItem("lastUser", name);
});

// ---------------- LOCAL STORAGE PREF ----------------

const savedUser = localStorage.getItem("lastUser");
if (savedUser) {
  document.querySelector("#home p").innerHTML +=
    "<br><b>Welcome back, " + savedUser + "!</b>";
}
