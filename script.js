"use strict";

const navLinks = document.querySelectorAll(".nav-links a");
const sectionEls = document.querySelectorAll("main section[id]");
const mobileToggle = document.querySelector(".menu-toggle");
const navContainer = document.querySelector(".nav-links");

// Mobile menu toggle for small screens.
if (mobileToggle && navContainer) {
  mobileToggle.addEventListener("click", () => {
    const expanded = mobileToggle.getAttribute("aria-expanded") === "true";
    mobileToggle.setAttribute("aria-expanded", String(!expanded));
    navContainer.classList.toggle("open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navContainer.classList.remove("open");
      mobileToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Highlight the active nav link based on visible section.
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeId = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeId}`;
        link.classList.toggle("active", isActive);
      });
    });
  },
  {
    threshold: 0.35,
    rootMargin: "-22% 0px -45% 0px",
  }
);

sectionEls.forEach((section) => sectionObserver.observe(section));

// Lightweight fade-in on scroll for sections.
const fadeSections = document.querySelectorAll(".fade-section");
const fadeObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px",
  }
);

fadeSections.forEach((section) => fadeObserver.observe(section));
