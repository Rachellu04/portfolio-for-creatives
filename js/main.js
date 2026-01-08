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
      ["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
      target.closest(".work-page-grid-item");

    cursor.classList.toggle("expand", isHoverable);
  });

  function animateCursor() {
    currentX += (mouseX - currentX) * 0.4;
    currentY += (mouseY - currentY) * 0.4;
    cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  //positon aware button
  var els = document.querySelectorAll(".btn-primary.position-aware");
  els.forEach(function (el) {
    el.addEventListener("mouseenter", function (e) {
      var rect = el.getBoundingClientRect();
      var relX = e.clientX - rect.left;
      var relY = e.clientY - rect.top;
      var scale = Math.round(
        (Math.abs(relX - el.offsetWidth / 2) / (el.offsetWidth / 2) + 1) * 100
      );
      el.querySelector("span").style.width = "calc(" + scale + "% + 1rem)";
      el.querySelector("span").style.top = relY + "px";
      el.querySelector("span").style.left = relX + "px";
    });
    el.addEventListener("mouseout", function (e) {
      var relX = e.pageX - el.offsetLeft;
      var relY = e.pageY - el.offsetTop;
      el.querySelector("span").style.width = "0%";
      el.querySelector("span").style.top = relY + "px";
      el.querySelector("span").style.left = relX + "px";
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
    item.style.transitionDelay = `${i * 0.03}s`;
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

//draggable

let drag = false;
let offsetX, offsetY, coordX, coordY, activeEl;

function startDrag(e) {
  e = e || window.event;
  if (e.preventDefault) e.preventDefault();

  const targ = e.target || e.srcElement;
  if (!targ.classList.contains("dragme")) return;

  activeEl = targ;
  offsetX = e.clientX;
  offsetY = e.clientY;

  coordX = parseInt(activeEl.style.left || 0);
  coordY = parseInt(activeEl.style.top || 0);
  drag = true;

  document.onmousemove = dragDiv;
  document.onmouseup = stopDrag;
}

function dragDiv(e) {
  if (!drag || !activeEl) return;
  e = e || window.event;

  // new proposed position
  let newX = coordX + e.clientX - offsetX;
  let newY = coordY + e.clientY - offsetY;

  // constrain inside sandbox
  const sandbox = document.querySelector(".sandbox");
  const bounds = sandbox.getBoundingClientRect();
  const elBounds = activeEl.getBoundingClientRect();

  // left limit
  if (newX < 0) newX = 0;
  // right limit
  if (newX + elBounds.width > bounds.width) {
    newX = bounds.width - elBounds.width;
  }
  // top limit
  if (newY < 0) newY = 0;
  // bottom limit
  if (newY + elBounds.height > bounds.height) {
    newY = bounds.height - elBounds.height;
  }

  // apply
  activeEl.style.left = newX + "px";
  activeEl.style.top = newY + "px";
}

function stopDrag() {
  drag = false;
  document.onmousemove = null;
  document.onmouseup = null;
}

window.onload = function () {
  document.onmousedown = startDrag;
};

//parallax
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".hero-image-wrapper");
  const image = document.querySelector(".hero-image");

  if (!wrapper || !image) {
    console.error("Hero image elements not found.");
    return;
  }

  wrapper.addEventListener("mousemove", (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;

    image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  document.querySelector(".hero-image").removeAttribute("title");
  wrapper.addEventListener("mouseleave", () => {
    image.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });
});

//get year

document.getElementById("copyright-years").textContent +=
  new Date().getFullYear();
