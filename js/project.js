


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