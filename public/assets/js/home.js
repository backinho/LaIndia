function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = `notification show ${type}`;

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

function showForm(formId) {
  document.querySelectorAll(".form-container").forEach((form) => {
    form.classList.remove("active");
  });
  document.getElementById(formId).classList.add("active");
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
}

function initNavigation() {
  document.getElementById("show-recovery").addEventListener("click", (e) => {
    e.preventDefault();
    showForm("recovery-form");
    showRecoveryStep(1);
  });

  document.getElementById("back-to-login-2").addEventListener("click", (e) => {
    e.preventDefault();
    showForm("login-form");
  });

  document
    .getElementById("back-to-recovery-1")
    .addEventListener("click", (e) => {
      e.preventDefault();
      showRecoveryStep(1);
    });

  document.getElementById("logout-btn").addEventListener("click", () => {
    currentUser = null;
    showForm("login-form");
    showNotification("Sesión cerrada exitosamente", "success");
  });
}

function showRecoveryStep(step) {
  document.querySelectorAll(".recovery-step").forEach((s) => {
    s.classList.remove("active");
  });
  document.getElementById(`recovery-step${step}`).classList.add("active");
}

async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  console.log("Attempting login with:", email);

  const data = new FormData();
  data.append("login-email", email);
  data.append("login-password", password);

  const response = await fetch("login", {
    method: "POST",
    body: data,
  });

  const result = await response.json();

  if (result.status === "success") {
    showNotification("Inicio de sesión exitoso", "success");
    setTimeout(() => {
      window.location.href = "/LaIndia/dashboard";
    }, 1000);
  } else {
    showNotification(result.message, "error");
  }
}

async function init() {
  initTheme();
  initNavigation();

  document.getElementById("login").addEventListener("submit", handleLogin);

  showForm("login-form");
}

init();
