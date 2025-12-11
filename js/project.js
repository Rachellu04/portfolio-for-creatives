myID = document.getElementById("myID");

var myScrollFunc = function () {
  var y = window.scrollY;
  if (y >= 800) {
    myID.className = "bottomMenu show";
  } else {
    myID.className = "bottomMenu hide";
  }
};

window.addEventListener("scroll", myScrollFunc);

const cursor = document.querySelector(".custom-cursor");

window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  currentX += (mouseX - currentX) * 0.4; // easing
  currentY += (mouseY - currentY) * 0.4;
  cursor.style.top = `${currentY}px`;
  cursor.style.left = `${currentX}px`;
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("mouseover", (e) => {
  const target = e.target;

  // Check if target is interactive
  const isHoverable =
    target.tagName === "A" ||
    target.tagName === "BUTTON" ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT" ||
    target.closest(".arrow-left") ||
    target.closest(".arrow-right");

  window.getComputedStyle(target).cursor === "pointer";

  if (isHoverable) {
    cursor.classList.add("expand");
  } else {
    cursor.classList.remove("expand");
  }
});

window.addEventListener("mouseout", (e) => {
  cursor.classList.remove("expand");
});

const elements = document.querySelectorAll(".slide-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add a delay depending on the element's index
        const index = Array.from(elements).indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.02}s`; // 0.2s apart
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.1 }
);

elements.forEach((el) => observer.observe(el));

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".project-header.stagger");

  // Split headline into words
  const words = header.textContent.trim().split(/\s+/);

  // Wrap each word in its own overflow-hidden container
  header.innerHTML = words
    .map((word) => `<span class="word-wrapper"><span>${word}</span></span>`)
    .join(" ");

  const wordSpans = header.querySelectorAll(".word-wrapper span");

  // IntersectionObserver to trigger slide up/down on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        wordSpans.forEach((span, i) => {
          // stagger delay per word
          span.style.transitionDelay = `${i * 0.045}s`;
          if (entry.isIntersecting) {
            span.classList.add("show"); // scroll DOWN → slide up
          } else {
            span.classList.remove("show"); // scroll UP → slide down
          }
        });
      });
    },
    { threshold: 0.1 }
  ); // trigger when ~20% visible

  observer.observe(header);
});

$(function () {
  $(".menu-link").click(function (e) {
    e.preventDefault();

    $(".menu-overlay").toggleClass("open");
    $(".menu").toggleClass("open");
  });
});

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
