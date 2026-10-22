const menuToggle = document.querySelector(".menu-toggle"); const navLinks = document.querySelector(".nav-links");
if (menuToggle && navLinks) { menuToggle.addEventListener("click", () => { const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));

    menuToggle.setAttribute(
        "aria-label",
        isExpanded ? "Open navigation menu" : "Close navigation menu"
    );

    navLinks.classList.toggle("open", !isExpanded);
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
});
}
const yearElement = document.querySelector("#current-year");
if (yearElement) { yearElement.textContent = new Date().getFullYear(); }

