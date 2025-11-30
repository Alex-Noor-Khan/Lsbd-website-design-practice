// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initDropdown();
  initSearch();
  initLangToggle();
  initHeroSwiper();
  initProdDeskSwiper();
  initArticleSwiper();
  initCounterAnimation();
});

/* ===========================
   Platform Dropdown Logic
=========================== */
function initDropdown() {
  const toggleBtn = document.querySelector(".platform-toggle");
  const dropdownUp = document.getElementById("platformDropdownUp");
  const menuContainer = document.getElementById("menuButtons");

  if (!toggleBtn || !dropdownUp || !menuContainer) return;

  const menuData = {
    trade: [
      { label: "Fund Transfer", link: "fund-transfer.html" },
      { label: "TradeXpress", link: "tradexpress.html" },
      { label: "Investment Certificate", link: "certificate.html" },
    ],
    reports: [
      { label: "Portfolio", link: "portfolio.html" },
      { label: "Ledger Reports", link: "ledger.html" },
      { label: "Trade Confirmation", link: "confirmation.html" },
    ],
    ipo: [
      { label: "IPO Application", link: "ipo.html" },
      { label: "Online BO A/C", link: "bo-account.html" },
    ],
  };

  const platformIcons = {
    trade: "assets/logo/iBroker-1.png",
    reports: "assets/logo/TX.png",
    ipo: "assets/logo/fp-1.png",
  };

  const params = new URLSearchParams(window.location.search);
  const selectedPlatform = params.get("platform");

  const renderToggleIcon = (key) => {
    // Renders the icon and label in the platform toggle button
    toggleBtn.innerHTML = `
      <span style="display:flex;align-items:center;gap:8px;">
        <img src="${platformIcons[key]}" 
             alt="${key}" 
             class="dropdown-icon" /> <!-- Now uses CSS class for sizing -->
        <span class="platform-label text-capitalize">${key}</span>
      </span>
      <i class="bi bi-chevron-up"></i>
    `;
  };

  const renderMenu = (key) => {
    // Populates the menu button container with specific links
    menuContainer.innerHTML = "";
    (menuData[key] || []).forEach((item) => {
      const a = document.createElement("a");
      a.className = "menu-btn";
      a.href = item.link;
      a.textContent = item.label;
      menuContainer.appendChild(a);
    });
  };

  // --- Initial Load Logic (Executed on page load, especially index-2.html) ---
  if (selectedPlatform && menuData[selectedPlatform]) {
    // If a platform key is present in the URL (e.g., ?platform=trade),
    // this sets the icon and loads the menu links immediately.
    renderToggleIcon(selectedPlatform);
    renderMenu(selectedPlatform);
  } else {
    // Default display if no platform is selected in the URL
    toggleBtn.innerHTML = `
      <span class="platform-label">Select Platform</span>
      <i class="bi bi-chevron-up"></i>
    `;
  }

  // --- Click Handler for Dropdown Boxes (Redirects users) ---

  toggleBtn.addEventListener("click", function () {
    const open = dropdownUp.style.display === "flex";
    dropdownUp.style.display = open ? "none" : "flex";
    toggleBtn.setAttribute("aria-expanded", (!open).toString());
  });

  dropdownUp.querySelectorAll(".dropdown-box").forEach(function (box) {
    box.addEventListener("click", function () {
      const key = box.dataset.menu;

      // When clicked, redirect to index-2.html and pass the selected platform key
      window.location.href = `index-2.html?platform=${key}`;
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".platform-selector")) {
      dropdownUp.style.display = "none";
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

/* ===========================
   Search Bar Logic (optional)
=========================== */
function initSearch() {
  const searchBtn = document.querySelector(".search-btn");
  const searchInput = document.querySelector(".modern-search");
  if (searchBtn && searchInput) {
    // Replaced alert() with console log to prevent browser issue
    searchBtn.addEventListener("click", function () {
      console.log("Searching for: " + searchInput.value); 
      // Replace with your real search logic
    });
  }
}

/* ===========================
   Language Toggle Logic (optional)
=========================== */
function initLangToggle() {
  const langSwitch = document.getElementById("langSwitch");
  if (langSwitch) {
    langSwitch.addEventListener("change", function () {
      if (langSwitch.checked) {
        console.log("Language switched to BN");
      } else {
        console.log("Language switched to EN");
      }
    });
  }
}

/* ===========================
   Hero banner swiper
=========================== */
function initHeroSwiper() {
  if (document.querySelector(".hero-swiper")) {
    var heroSwiper = new Swiper(".hero-swiper", {
      loop: true,
      autoplay: {
        delay: 4000, // 4 seconds per slide
        disableOnInteraction: false,
      },
      speed: 800,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }
}

/* ===========================
   Custom swiper (desktop products)
=========================== */
function initProdDeskSwiper() {
  if (document.querySelector("#desktop-prod-swiper")) {
    var swiperProdDesk = new Swiper("#desktop-prod-swiper", {
      effect: "coverflow",
      centeredSlides: true,
      loop: true,
      slidesPerView: 4, // fixed number instead of "auto"
      speed: 1200,
      loopedSlides: 6, // oversupply clones

      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 10,
        modifier: 1,
        slideShadows: false,
        scale: 0.7,
      },
    });

    swiperProdDesk.update();
    swiperProdDesk.slideToLoop(2, 0, false);
  }
}

/* ===========================
   Article swiper
=========================== */
function initArticleSwiper() {
  if (document.querySelector(".article-swiper")) {
    new Swiper(".article-swiper", {
      loop: false,

      // Default (Desktop): Show 3 slides, move 1 slide per action
      slidesPerView: 3,
      slidesPerGroup: 1, // <<< THIS ENSURES ONLY ONE SLIDE MOVES PER PAGINATION CLICK
      spaceBetween: 24,

      // Responsive settings for different screen sizes
      breakpoints: {
        // 0px and up (mobile)
        0: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 16,
        },
        // 768px and up (tablet)
        768: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          spaceBetween: 20,
        },
        // 1024px and up (desktop)
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 1,
          spaceBetween: 24,
        },
      },

      pagination: {
        el: ".article-swiper .swiper-pagination",
        clickable: true,
      },
    });
  }
}

/* ===========================
   Highlight Boxes Counter Animation Logic
=========================== */
function initCounterAnimation() {
  // Select all elements with the class 'box-title' inside the 'highlight-boxes' section
  const counters = Array.from(document.querySelectorAll('.highlight-boxes .box-title')).map(element => ({
      element: element,
      // Get the number, remove commas (if any), and parse it as an integer for the target value
      target: parseInt(element.textContent.replace(/,/g, ''), 10) 
  }));

  // Stop if no counters are found
  if (!counters.some(c => c.element)) return; 

  const duration = 1500; // Animation duration in milliseconds
  let startTime = null;

  /**
   * Formats a number with commas for thousands (e.g., 68484 -> 68,484).
   * @param {number} number The number to format.
   * @returns {string} The formatted number string.
   */
  const formatNumber = (number) => {
      // Use Math.floor to ensure only whole numbers are displayed during count
      return Math.floor(number).toLocaleString('en-US'); 
  };

  /**
   * The main animation loop function.
   * @param {number} timestamp The current time provided by requestAnimationFrame.
   */
  const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      
      const progress = timestamp - startTime;
      // Calculate the ratio of progress over duration (0 to 1)
      const timeRatio = Math.min(progress / duration, 1); 

      let allFinished = true;

      counters.forEach(counter => {
          if (counter.element) {
              // Cubic easing function for smooth acceleration/deceleration
              const easedRatio = timeRatio < 0.5 ? 4 * timeRatio * timeRatio * timeRatio : 1 - Math.pow(-2 * timeRatio + 2, 3) / 2;

              // Current value is the target multiplied by the eased progress
              const currentValue = easedRatio * counter.target;
              
              // Update the text content with formatting
              counter.element.textContent = formatNumber(currentValue);

              // Check if this counter is finished
              if (timeRatio < 1) {
                  allFinished = false;
              } else {
                  // Ensure the final value is exactly the target number after animation ends
                  counter.element.textContent = formatNumber(counter.target);
              }
          }
      });

      // If not all counters are finished, request the next frame
      if (!allFinished) {
          window.requestAnimationFrame(animateCount);
      }
  };

  // Start the animation
  window.requestAnimationFrame(animateCount);
}