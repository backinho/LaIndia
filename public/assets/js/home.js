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

function handlePattern(event) {
  event.preventDefault();
  const modal = document.getElementById("pattern-modal");
  const modalClose = document.getElementById("pattern-close");
  const patternClearBtn = document.getElementById("clear-pattern-btn");
  const patternVerifyBtn = document.getElementById("verify-pattern-btn");

  if (!modal) return;

  modal.classList.add("show");

  modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
      }
    });
  }

  if (patternClearBtn) {
    patternClearBtn.addEventListener("click", () => clearPattern());
  }

  if (patternVerifyBtn) {
    patternVerifyBtn.onclick = async (e) => {
      e.preventDefault();
      const patternPassword = document.getElementById("recovery-email");

      const data = new FormData();

      data.append("patternPassword", patternPassword);

      const response = await fetch("pattern-recovery", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (result.status === "success") {
        showNotification("Correo confirmado");
      }
    };
  }
}

async function init() {
  initTheme();
  initNavigation();
  initializePatternGrid();

  document.getElementById("login").addEventListener("submit", handleLogin);
  document
    .getElementById("recovery-step1")
    .addEventListener("submit", handlePattern);

  showForm("login-form");
}

let methods = {
  pattern: {
    name: "Patrón de Desbloqueo",
    icon: "fa-draw-polygon",
    selectedDots: [],
  },
};

function initializePatternGrid() {
  const grid = document.getElementById("patternGrid");
  grid.innerHTML = "";

  for (let i = 1; i <= 9; i++) {
    const dot = document.createElement("div");
    dot.className = "pattern-dot";
    dot.dataset.id = i;
    dot.textContent = i;
    dot.addEventListener("click", () => selectDot(i));
    grid.appendChild(dot);
  }
}

function selectDot(dotId) {
  const dots = methods.pattern.selectedDots;
  if (!dots.includes(dotId)) {
    dots.push(dotId);
    document
      .querySelector(`.pattern-dot[data-id="${dotId}"]`)
      .classList.add("selected");
  }
  console.log(methods.pattern.selectedDots);
}

function clearPattern() {
  methods.pattern.selectedDots = [];
  document.querySelectorAll(".pattern-dot").forEach((dot) => {
    dot.classList.remove("selected");
  });
}

init();
