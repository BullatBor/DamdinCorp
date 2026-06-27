// Переключение темы
var themeToggle = document.getElementById("themeToggle");
var themeIcon = document.getElementById("themeIcon");

function applyTheme(theme) {
  var isDark = theme === "dark";
  document.documentElement.setAttribute(
    "data-theme",
    isDark ? "dark" : "light"
  );
  themeIcon.textContent = isDark ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Включить светлую тему" : "Включить тёмную тему"
  );
  themeToggle.title = isDark ? "Светлая тема" : "Тёмная тема";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

applyTheme(
  document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light"
);

themeToggle.addEventListener("click", function () {
  var isDark =
    document.documentElement.getAttribute("data-theme") === "dark";
  applyTheme(isDark ? "light" : "dark");
});

// Модалка доната
var donateModal = document.getElementById("donateModal");
var donateToggle = document.getElementById("donateToggle");
var donateModalClose = document.getElementById("donateModalClose");
var donateForm = document.getElementById("donateForm");
var donateCustomAmount = document.getElementById("donateCustomAmount");
var donateError = document.getElementById("donateError");
var donateRejectModal = document.getElementById("donateRejectModal");
var donateRejectClose = document.getElementById("donateRejectClose");
var donateAmountButtons = document.querySelectorAll(".donate-amount");
var selectedDonateAmount = null;

function openDonateModal() {
  donateModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeDonateModal() {
  donateModal.style.display = "none";
  if (donateRejectModal.style.display !== "flex") {
    document.body.style.overflow = "auto";
  }
}

function openDonateRejectModal() {
  closeDonateModal();
  donateRejectModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeDonateRejectModal() {
  donateRejectModal.style.display = "none";
  document.body.style.overflow = "auto";
}

function resetDonateForm() {
  selectedDonateAmount = null;
  donateCustomAmount.value = "";
  donateError.hidden = true;
  donateAmountButtons.forEach(function (btn) {
    btn.classList.remove("is-active");
  });
}

donateToggle.addEventListener("click", function () {
  resetDonateForm();
  openDonateModal();
});

donateModalClose.addEventListener("click", closeDonateModal);

donateModal.addEventListener("click", function (e) {
  if (e.target === donateModal) {
    closeDonateModal();
  }
});

donateAmountButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    selectedDonateAmount = btn.getAttribute("data-amount");
    donateCustomAmount.value = selectedDonateAmount;
    donateError.hidden = true;
    donateAmountButtons.forEach(function (item) {
      item.classList.remove("is-active");
    });
    btn.classList.add("is-active");
  });
});

donateCustomAmount.addEventListener("input", function () {
  selectedDonateAmount = null;
  donateError.hidden = true;
  donateAmountButtons.forEach(function (btn) {
    btn.classList.remove("is-active");
    if (btn.getAttribute("data-amount") === donateCustomAmount.value) {
      btn.classList.add("is-active");
      selectedDonateAmount = donateCustomAmount.value;
    }
  });
});

donateForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var amount = parseInt(
    donateCustomAmount.value || selectedDonateAmount,
    10
  );

  if (!amount || amount < 1) {
    donateError.hidden = false;
    return;
  }

  openDonateRejectModal();
});

donateRejectClose.addEventListener("click", closeDonateRejectModal);

donateRejectModal.addEventListener("click", function (e) {
  if (e.target === donateRejectModal) {
    closeDonateRejectModal();
  }
});

// Получаем элементы модального окна
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");
var caption = document.getElementById("modalCaption");
var closeBtn = modal.querySelector(".modal-close");

// Клик по любой картинке в галерее (используем делегирование)
document.querySelector(".gallery").addEventListener("click", function (e) {
  var img = e.target.closest("img");
  if (!img) return;

  modal.style.display = "flex";
  modalImg.src = img.src;
  caption.textContent = img.alt || "Скриншот";
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key !== "Escape") return;

  if (modal.style.display === "flex") {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  if (donateModal.style.display === "flex") {
    closeDonateModal();
  }

  if (donateRejectModal.style.display === "flex") {
    closeDonateRejectModal();
  }
});
