document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile nav
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }

  // Quick donate buttons on home
  const quickDonateButtons = document.querySelectorAll(".js-quick-donate");
  const donateModal = document.getElementById("donateModal");
  const donateAmountLabel = document.getElementById("donateAmountLabel");
  const donateConfirmLink = document.getElementById("donateConfirmLink");

  if (quickDonateButtons && donateModal && donateAmountLabel && donateConfirmLink) {
    quickDonateButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const amount = btn.getAttribute("data-amount") || "0";
        donateAmountLabel.textContent = `$${amount}`;
        const url = new URL("donate.html", window.location.origin);
        url.searchParams.set("amount", amount);
        donateConfirmLink.href = url.toString();
        donateModal.setAttribute("aria-hidden", "false");
      });
    });

    donateModal.querySelectorAll(".js-close-modal").forEach((el) => {
      el.addEventListener("click", () => {
        donateModal.setAttribute("aria-hidden", "true");
      });
    });
  }

  // Donation page amount prefill
  const donationAmountInput = document.getElementById("donationAmount");
  if (donationAmountInput) {
    const params = new URLSearchParams(window.location.search);
    const amount = params.get("amount");
    if (amount) {
      donationAmountInput.value = amount;
    }

    document.querySelectorAll(".js-set-amount").forEach((btn) => {
      btn.addEventListener("click", () => {
        const val = btn.getAttribute("data-amount");
        if (val) donationAmountInput.value = val;
      });
    });
  }

  // Request service form
  const requestForm = document.getElementById("requestForm");
  if (requestForm) {
    const statusEl = document.getElementById("requestStatus");
    requestForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (statusEl) statusEl.textContent = "Submitting your request...";
      const formData = new FormData(requestForm);

      try {
        const res = await fetch("/api/request-service", {
          method: "POST",
          body: formData
        });

        if (!res.ok) throw new Error("Request failed");

        if (statusEl) statusEl.textContent = "Request submitted. We’ll review and send a quote soon.";
        requestForm.reset();
      } catch (err) {
        if (statusEl) statusEl.textContent = "Something went wrong. Please try again or contact us directly.";
      }
    });
  }

  // Donation form
  const donationForm = document.getElementById("donationForm");
  if (donationForm) {
    const statusEl = document.getElementById("donationStatus");
    donationForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (statusEl) statusEl.textContent = "Processing donation (placeholder)...";

      const formData = new FormData(donationForm);

      try {
        const res = await fetch("/api/donate", {
          method: "POST",
          body: formData
        });

        if (!res.ok) throw new Error("Donation failed");

        if (statusEl) statusEl.textContent = "Thank you for your support! A receipt will be emailed to you.";
        donationForm.reset();
      } catch (err) {
        if (statusEl) statusEl.textContent = "Unable to process donation right now. Please try again later.";
      }
    });
  }

  // Contact form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const statusEl = document.getElementById("contactStatus");
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (statusEl) statusEl.textContent = "Sending your message...";

      const formData = new FormData(contactForm);

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          body: formData
        });

        if (!res.ok) throw new Error("Contact failed");

        if (statusEl) statusEl.textContent = "Message sent. We’ll get back to you soon.";
        contactForm.reset();
      } catch (err) {
        if (statusEl) statusEl.textContent = "Unable to send message right now. Please try again later.";
      }
    });
  }
});
