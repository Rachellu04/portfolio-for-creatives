document.addEventListener("DOMContentLoaded", () => {

  // =====================================================
  // 🖱 CUSTOM CURSOR
  // =====================================================
  const cursor = document.querySelector(".custom-cursor");

  if (cursor) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const isInteractive = e.target.closest(
        "a, button, input, textarea, select, .work-page-grid-item"
      );

      cursor.classList.toggle("expand", !!isInteractive);
    });

    function animateCursor() {
      currentX += (mouseX - currentX) * 0.4;
      currentY += (mouseY - currentY) * 0.4;

      cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }


  // =====================================================
  // 🔘 BUTTON EFFECT
  // =====================================================
  const buttons = document.querySelectorAll(".btn-primary.position-aware");

  buttons.forEach((button) => {
    const fill = button.querySelector("span");
    if (!fill) return;

    button.addEventListener("mouseenter", (e) => {
      const rect = button.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const scale = Math.round(
        (Math.abs(x - rect.width / 2) / (rect.width / 2) + 1) * 100
      );

      fill.style.width = `calc(${scale}% + 1rem)`;
      fill.style.top = `${y}px`;
      fill.style.left = `${x}px`;
    });

    button.addEventListener("mouseleave", () => {
      fill.style.width = "0%";
    });
  });


  // =====================================================
  // 📦 GRID REVEAL
  // =====================================================
  const gridItems = document.querySelectorAll(".work-page-grid-item");

  const gridObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.25
  });

  gridItems.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.03}s`;
    gridObserver.observe(item);
  });


  // =====================================================
  // ✨ HERO INTRO
  // =====================================================
  const heroItems = [
    { selector: ".hero-headline", delay: 300 },
    { selector: ".hero-subhead", delay: 700 },
    { selector: ".hero-subhead-work", delay: 1100 }
  ];

  heroItems.forEach(({ selector, delay }) => {
    const el = document.querySelector(selector);

    if (el) {
      setTimeout(() => el.classList.add("show"), delay);
    }
  });


  // =====================================================
  // 🔼 SLIDE-UP
  // =====================================================
  const slideUps = document.querySelectorAll(".slide-up");

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

  slideUps.forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.01}s`;
    slideObserver.observe(el);
  });


  // =====================================================
  // 🍔 MENU TOGGLE
  // =====================================================
  const menuButton = document.querySelector(".menu-link");
  const menuOverlay = document.querySelector(".menu-overlay");
  const menu = document.querySelector(".menu");

  if (menuButton && menuOverlay && menu) {
    menuButton.addEventListener("click", (e) => {
      e.preventDefault();
      menuOverlay.classList.toggle("open");
      menu.classList.toggle("open");
    });
  }


  // =====================================================
  // 🧠 STAGGERED HEADER
  // =====================================================
  const header = document.querySelector(".project-header.stagger");

  if (header) {
    const words = header.textContent.trim().split(/\s+/);

    header.innerHTML = words
      .map(word => `<span class="word-wrapper"><span>${word}</span></span>`)
      .join(" ");

    const wordSpans = header.querySelectorAll(".word-wrapper span");

    const textObserver = new IntersectionObserver((entries) => {
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
    }, {
      threshold: 0.1
    });

    textObserver.observe(header);
  }


  // =====================================================
  // © YEAR
  // =====================================================
  const yearEl = document.getElementById("copyright-years");

  if (yearEl) {
    yearEl.textContent += new Date().getFullYear();
  }

});
