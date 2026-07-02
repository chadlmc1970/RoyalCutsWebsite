(function () {
  "use strict";

  // Sticky header state
  var header = document.getElementById("site-header");
  function onScroll() {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("nav-toggle");
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll(".nav-links a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Current year
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Lightbox gallery
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var current = 0;

  function show(i) {
    current = (i + items.length) % items.length;
    var fig = items[current];
    lbImg.src = fig.getAttribute("data-full");
    var cap = fig.querySelector("img");
    lbImg.alt = cap ? cap.alt : "";
  }
  function open(i) { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; }
  function close() { lb.classList.remove("open"); document.body.style.overflow = ""; lbImg.src = ""; }

  items.forEach(function (fig, i) {
    fig.addEventListener("click", function () { open(i); });
    fig.setAttribute("tabindex", "0");
    fig.setAttribute("role", "button");
    fig.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
    });
  });
  document.getElementById("lb-close").addEventListener("click", close);
  document.getElementById("lb-prev").addEventListener("click", function () { show(current - 1); });
  document.getElementById("lb-next").addEventListener("click", function () { show(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
  });

  // Quote form -> Web3Forms (AJAX, no page reload)
  var form = document.getElementById("quote-form");
  var status = document.getElementById("form-status");

  function setStatus(type, msg) {
    status.className = "form-status show " + type;
    status.textContent = msg;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var key = form.querySelector('input[name="access_key"]').value;
    if (!key || key === "YOUR_WEB3FORMS_ACCESS_KEY") {
      setStatus("err", "The form isn't connected yet. Please call (225) 202-4029 or email randall@royalcutslc.com.");
      return;
    }
    var btn = form.querySelector('button[type="submit"]');
    var original = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending…";

    var data = new FormData(form);
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    })
      .then(function (r) { return r.json(); })
      .then(function (json) {
        if (json.success) {
          form.reset();
          setStatus("ok", "Thanks! Your request is on its way. We'll be in touch within one business day.");
        } else {
          setStatus("err", "Something went wrong. Please call (225) 202-4029 and we'll take care of you.");
        }
      })
      .catch(function () {
        setStatus("err", "Network error. Please call (225) 202-4029 or email randall@royalcutslc.com.");
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = original;
      });
  });
})();
