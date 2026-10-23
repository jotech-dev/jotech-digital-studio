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
   JOTECH — EMAIL + WHATSAPP CONTACT FORM
========================================= */

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const clientName =
            document.querySelector("#client-name")?.value.trim();

        const clientEmail =
            document.querySelector("#client-email")?.value.trim();

        const projectType =
            document.querySelector("#project-type")?.value;

        const projectBudget =
            document.querySelector("#project-budget")?.value;

        const projectMessage =
            document.querySelector("#project-message")?.value.trim();

        if (
            !clientName ||
            !clientEmail ||
            !projectType ||
            !projectBudget ||
            !projectMessage
        ) {
            if (formStatus) {
                formStatus.textContent = "Please complete all fields.";
            }
            return;
        }

        const whatsappMessage = [
            "Hello JOTECH Digital Studio!",
            "",
            "I'd like to enquire about a website project.",
            "",
            `Name: ${clientName}`,
            `Email: ${clientEmail}`,
            `Project Type: ${projectType}`,
            `Estimated Budget: ${projectBudget}`,
            "",
            "Project Details:",
            projectMessage
        ].join("\n");

        const whatsappURL =
            "https://wa.me/2349162909940?text=" +
            encodeURIComponent(whatsappMessage);

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending Enquiry...";
        }

        if (formStatus) {
            formStatus.textContent = "Sending your enquiry...";
        }

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

            if (formStatus) {
                formStatus.textContent =
                    "Email enquiry sent successfully. Opening WhatsApp...";
            }

            contactForm.reset();

            window.location.href = whatsappURL;

        } catch (error) {
            console.error("Contact form error:", error);

            if (formStatus) {
                formStatus.textContent =
                    "We couldn't confirm email delivery. Please try again or contact us directly on WhatsApp.";
            }

            // Still allow the visitor to contact you through WhatsApp.
            const openWhatsApp = window.confirm(
                "We couldn't confirm that your email enquiry was sent. Would you like to continue with WhatsApp instead?"
            );

            if (openWhatsApp) {
                window.location.href = whatsappURL;
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Send Project Enquiry";
            }
        }
    });
}