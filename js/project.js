// -----------------------------
// SLIDE UP ANIMATION
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const slideElements = document.querySelectorAll(".slide-up");

  const slideObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  slideElements.forEach(el => slideObserver.observe(el));
});


// -----------------------------
// STAGGERED HEADER ANIMATION
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".project-header.stagger");
  if (!header) return;

  const words = header.textContent.trim().split(/\s+/);

  header.innerHTML = words
    .map((word) => `<span class="word-wrapper"><span>${word}</span></span>`)
    .join(" ");

  const wordSpans = header.querySelectorAll(".word-wrapper span");

  const textObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        wordSpans.forEach((span, i) => {
          span.style.transitionDelay = `${i * 0.045}s`;

          if (entry.isIntersecting) {
            span.classList.add("show");
          } else {
            span.classList.remove("show");
          }
        });
      });
    },
    { threshold: 0.1 }
  );

  textObserver.observe(header);
});


// -----------------------------
// MENU TOGGLE (NO JQUERY)
// -----------------------------
const menuBtn = document.querySelector(".menu-link");
const menuOverlay = document.querySelector(".menu-overlay");
const menu = document.querySelector(".menu");

if (menuBtn) {
  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();

    menuOverlay.classList.toggle("open");
    menu.classList.toggle("open");

    // accessibility improvement
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", !expanded);
  });
}


// -----------------------------
// BUTTON HOVER EFFECT
// -----------------------------
const buttons = document.querySelectorAll(".btn-primary.position-aware");

buttons.forEach((el) => {
  const span = el.querySelector("span");
  if (!span) return;

  el.addEventListener("mouseenter", (e) => {
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const scale = Math.round(
      (Math.abs(relX - el.offsetWidth / 2) / (el.offsetWidth / 2) + 1) * 100
    );

    span.style.width = `calc(${scale}% + 1rem)`;
    span.style.top = `${relY}px`;
    span.style.left = `${relX}px`;
  });

  el.addEventListener("mouseleave", (e) => {
    span.style.width = "0%";
  });
});


// -----------------------------
// COPYRIGHT YEAR
// -----------------------------
const yearEl = document.getElementById("copyright-years");
if (yearEl) {
  yearEl.textContent += new Date().getFullYear();
}