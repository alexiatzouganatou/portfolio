"use strict";

// ===== MOBILE MENU =====

const menuButton = document.querySelector(".menu");
const navigation = document.querySelector("#navigation");

function closeMenu() {
  if (!menuButton || !navigation) return;

  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    navigation.classList.toggle("open", !isOpen);
    menuButton.setAttribute("aria-expanded", String(!isOpen));
  });

  // Close after choosing a navigation link.
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close when clicking outside the navigation.
  document.addEventListener("click", (event) => {
    if (
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Close with Escape and return focus to the menu button.
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
      menuButton.focus();
    }
  });

  // Reset the menu when switching to desktop layout.
  const desktopLayout = window.matchMedia("(min-width: 601px)");

  desktopLayout.addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}

// ===== PROJECT FILTERS =====

const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(
  ".work-card[data-kind]"
);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;

      filterButton.classList.toggle("selected", isSelected);
      filterButton.setAttribute(
        "aria-pressed",
        String(isSelected)
      );
    });

    projectCards.forEach((card) => {
      const matchesFilter =
        selectedFilter === "all" ||
        card.dataset.kind === selectedFilter;

      card.hidden = !matchesFilter;
    });
  });
});

// ===== SAVE SUMMARY AS PDF =====

const printButton = document.querySelector("#print-resume");

if (printButton) {
  printButton.addEventListener("click", () => {
    window.print();
  });
}

// ===== COPY EMAIL =====

const copyEmailButton = document.querySelector("#copy-email");
const copyStatus = document.querySelector("#copy-status");
const emailAddress = "alexiaatzouganatouuu@gmail.com";

if (copyEmailButton && copyStatus) {
  copyEmailButton.addEventListener("click", async () => {
    copyStatus.textContent = "";

    try {
      if (!navigator.clipboard || !window.isSecureContext) {
        throw new Error("Clipboard is unavailable.");
      }

      await navigator.clipboard.writeText(emailAddress);

      copyStatus.textContent = "Το email αντιγράφηκε!";
    } catch {
      // Show the address for manual copying if access is unavailable.
      copyStatus.textContent = `Email: ${emailAddress}`;
    }
  });
}