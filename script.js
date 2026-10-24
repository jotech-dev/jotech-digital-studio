/* =========================================
   JOTECH DIGITAL STUDIO — NAVIGATION
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isExpanded =
            menuToggle.getAttribute("aria-expanded") === "true";

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


/* =========================================
   JOTECH — AUTOMATIC FOOTER YEAR
========================================= */

const yearElement = document.querySelector("#current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================
   JOTECH — PROJECT ENQUIRY FORM
========================================= */

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalButtonHTML = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.textContent = "Sending Enquiry...";

        formStatus.textContent = "Sending your enquiry...";
        formStatus.style.color = "#bac5d8";

        try {
            const formData = new FormData(contactForm);

            const response = await fetch(
                "https://formsubmit.co/ajax/talktojotech24@gmail.com",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json"
                    },
                    body: formData
                }
            );

            const result = await response.json();

            if (!response.ok || result.success !== "true") {
                throw new Error("Email submission was unsuccessful.");
            }

            contactForm.reset();

            formStatus.textContent =
                "Thank you! Your project enquiry has been submitted successfully. We'll be in touch soon.";

            formStatus.style.color = "#86efac";

        } catch (error) {
            console.error("Contact form error:", error);

            formStatus.textContent =
                "Sorry, we couldn't submit your enquiry. Please try again or contact us directly through WhatsApp.";

            formStatus.style.color = "#fca5a5";

        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonHTML;
        }
    });
}