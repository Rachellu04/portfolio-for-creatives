document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".custom-cursor");
  let mouseX = 0,
    mouseY = 0,
    currentX = 0,
    currentY = 0;

  // Cursor movement
  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    const target = e.target;
    const isHoverable =
      ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT", "IMG"].includes(
        target.tagName
      ) || target.closest(".work-page-grid-item");
    cursor.classList.toggle("expand", isHoverable);
  });

  function animateCursor() {
    currentX += (mouseX - currentX) * 0.4;
    currentY += (mouseY - currentY) * 0.4;
    cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Position-aware buttons
  const posAwareBtns = document.querySelectorAll(".btn-primary.position-aware");
  posAwareBtns.forEach((btn) => {
    const span = btn.querySelector("span");
    btn.addEventListener("mouseenter", (e) => {
      const relX = e.offsetX;
      const relY = e.offsetY;
      const scale = Math.round(
        (Math.abs(relX - btn.offsetWidth / 2) / (btn.offsetWidth / 2) + 1) * 100
      );
      span.style.width = `calc(${scale}% + 1rem)`;
      span.style.top = `${relY}px`;
      span.style.left = `${relX}px`;
    });
    btn.addEventListener("mouseout", (e) => {
      const relX = e.offsetX;
      const relY = e.offsetY;
      span.style.width = "0%";
      span.style.top = `${relY}px`;
      span.style.left = `${relX}px`;
    });
  });

  // intersection observer elements
  const items = document.querySelectorAll(".work-page-grid-item");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.15}s`;
    observer.observe(item);
  });
  //Hero Headline Fade-In
  const headline = document.querySelector(".hero-headline");
  const subhead = document.querySelector(".hero-subhead");
  if (headline) setTimeout(() => headline.classList.add("show"), 300);
  if (subhead) setTimeout(() => subhead.classList.add("show"), 700);
  //Slide-Up Elements
  const slideUps = document.querySelectorAll(".slide-up");
  window.addEventListener("load", () => {
    slideUps.forEach((el, i) =>
      setTimeout(() => el.classList.add("show"), i * 150)
    );
  });
  //Menu Toggle (Vanilla JS)
  const menuLink = document.querySelector(".menu-link");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menu = document.querySelector(".menu");

  if (menuLink) {
    menuLink.addEventListener("click", (e) => {
      e.preventDefault();
      menuOverlay?.classList.toggle("open");
      menu?.classList.toggle("open");
    });
  }
  //PST clock
  function updatePSTTime() {
    const now = new Date();
    const options = {
      timeZone: "America/Los_Angeles",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    const el = document.getElementById("pst-time");
    if (el) el.textContent = now.toLocaleTimeString("en-US", options);
  }
  setInterval(updatePSTTime, 1000);
  updatePSTTime();
});
