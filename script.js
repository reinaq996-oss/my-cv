// script.js — CV site behavior

// --- Dark / light mode toggle ---
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Respect a saved preference, otherwise fall back to system preference
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// --- Fade-in sections as they scroll into view ---
const fadeEls = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeEls.forEach((el) => observer.observe(el));

// --- Download as PDF (opens browser print dialog) ---
const pdfLink = document.getElementById("download-pdf");

pdfLink.addEventListener("click", (e) => {
  e.preventDefault();
  window.print();
});