// Main JavaScript file: handles navigation, UI interactions, and initializes 4 third-party libraries (AOS, Lightbox, Glide.js, Leaflet)
(function () {
  "use strict";

  // Navigation elements (header, menu, toggle button)
  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = nav ? nav.querySelectorAll("a[href^='#']") : [];

  // Function to open/close mobile navigation menu
  function setNavOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  // Toggle menu when button is clicked + close menu on link click (mobile)
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNavOpen(!nav.classList.contains("is-open"));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 767px)").matches) {
          setNavOpen(false);
        }
      });
    });
  }

  // Automatically update footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // AOS (Animate On Scroll) Library
  // Used to add scroll-based animations to elements
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches
    });
  }

  // Lightbox Library
  // Used for image gallery pop-up effect (Enlarge images when clicking)
  if (typeof lightbox !== "undefined") {
    lightbox.option({
      resizeDuration: 250,
      fadeDuration: 250,
      wrapAround: true,
      albumLabel: "Image %1 of %2",
      disableScrolling: true
    });
  }

  // Glide.js Library
  // Used to create image slider/carousel for featured destinations
  if (typeof Glide !== "undefined") {
    var glideRoot = document.querySelector(".glide");
    if (glideRoot) {
      new Glide(glideRoot, {
        type: "carousel",
        perView: 1,
        gap: 0,
        autoplay: 5000,
        hoverpause: true,
        animationDuration: 600,
        animationTimingFunc: "cubic-bezier(0.22, 1, 0.36, 1)"
      }).mount();
    }
  }

  // Leaflet Library
  // Used to create an interactive map with marker
  var mapElement = document.getElementById("map");

  if (mapElement && typeof L !== "undefined") {
    var bangkok = [13.75, 100.50];

    var map = L.map(mapElement).setView(bangkok, 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker(bangkok)
      .addTo(map)
      .bindPopup("<strong>Bangkok</strong><br>Thailand's exciting capital with temples, markets & street food!")
      .openPopup();

    // Make sure map size is correct after page loads or resize
    function fixMapSize() {
      map.invalidateSize();
    }

    window.addEventListener("load", fixMapSize);
    window.addEventListener("resize", fixMapSize);
  }

  // Contact/Booking Form Handling
  // Validates form and shows confirmation message
  var form = document.getElementById("booking-form");
  var feedback = document.getElementById("form-feedback");

  if (form && feedback) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      feedback.textContent =
        "Thanks — we received your request. We'll reply within two business days.";
      feedback.classList.add("is-visible");
      form.reset();
      feedback.focus();
    });
  }
})();
