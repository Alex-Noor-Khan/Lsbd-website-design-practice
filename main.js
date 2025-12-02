// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initDropdown();
  initSearch();
  initLangToggle();
  initHeroSwiper();
  initProdDeskSwiper();
  initArticleSwiper();
  initCounterAnimation();
  initMenuInteraction();
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
  menuContainer.innerHTML = "";
  (menuData[key] || []).forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "menu-btn";
    btn.textContent = item.label;
    btn.dataset.label = item.label; // store label for interaction
    menuContainer.appendChild(btn);
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

/* ===========================
   Menu Button Arc + Bounce + Highlight
=========================== */
function initMenuInteraction() {
  const menuContainer = document.getElementById("menuButtons");
  const rightPanel = document.querySelector(".right-visuals");

  if (!menuContainer || !rightPanel) return;

  const buttons = Array.from(menuContainer.children);
  const buttonHeight = 60; // height + spacing

  // Initial layout
  buttons.forEach((btn, i) => {
    btn.style.position = "absolute";
    btn.style.top = `${i * buttonHeight}px`;
    btn.style.transform = "translateX(0)";
    btn.style.opacity = 1;
  });

  menuContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".menu-btn");
    if (!clicked) return;

    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove("active"));

    // Reorder array: move clicked to front
    const newOrder = [clicked, ...buttons.filter(b => b !== clicked)];

    // Animate each button to its new position
    newOrder.forEach((btn, i) => {
      btn.style.top = `${i * buttonHeight}px`;

      if (btn === clicked) {
        // Arc + bounce + highlight ONLY for the clicked button
        btn.classList.add("active");
        btn.style.transform = "translateX(-25px)";
        btn.style.opacity = 0.9;

        setTimeout(() => {
          btn.style.transform = "translateX(0)";
          btn.style.opacity = 1;
        }, 700); // match transition duration
      } else {
        // Other buttons just slide vertically
        btn.style.transform = "translateX(0)";
        btn.style.opacity = 1;
      }
    });

    // Right panel fade swap
    rightPanel.style.opacity = 0;
    setTimeout(() => {
      rightPanel.innerHTML = getVisualContent(clicked.textContent.trim());
      rightPanel.style.opacity = 1;
    }, 400);
  });
}







/* ===========================
   Right Panel Content Templates
=========================== */
function getVisualContent(label) {
  switch (label) {
    case "Fund Transfer":
      return `
        <div class="visual-placeholder">
          <div class="tab-bar">
            <button class="tab-btn">Fund Deposit</button>
            <button class="tab-btn">Fund Withdrawal</button>
            <button class="tab-btn">Videos</button>
          </div>
          <div class="tab-content">
            <p>Interactive Fund Transfer screen with deposit/withdrawal options.</p>
          </div>
        </div>
      `;

    case "TradeXpress":
      return `
        <div class="visual-placeholder">
          <div class="tab-bar">
            <button class="tab-btn">Market</button>
            <button class="tab-btn">Orders</button>
            <button class="tab-btn">Portfolio</button>
          </div>
          <div class="tab-content">
            <p>Live trading interface with charts and order book.</p>
          </div>
        </div>
      `;

    case "Investment Certificate":
      return `
        <div class="visual-placeholder">
          <h2>Investment Certificate</h2>
          <p>Static panel showing certificate details and download options.</p>
        </div>
      `;

    case "Portfolio":
      return `
        <div class="visual-placeholder">
          <div class="tab-bar">
            <button class="tab-btn">Holdings</button>
            <button class="tab-btn">Performance</button>
          </div>
          <div class="tab-content">
            <p>Interactive portfolio dashboard with charts and metrics.</p>
          </div>
        </div>
      `;

    case "Ledger Reports":
      return `
        <div class="visual-placeholder">
          <h2>Ledger Reports</h2>
          <p>Static panel with downloadable PDF/Excel reports.</p>
        </div>
      `;

    case "Trade Confirmation":
      return `
        <div class="visual-placeholder">
          <h2>Trade Confirmation</h2>
          <p>Static panel showing confirmation slips and transaction history.</p>
        </div>
      `;

    case "IPO Application":
      return `
        <div class="visual-placeholder">
          <div class="tab-bar">
            <button class="tab-btn">Step 1</button>
            <button class="tab-btn">Step 2</button>
            <button class="tab-btn">Step 3</button>
            <button class="tab-btn">Step 4</button>
          </div>
          <div class="tab-content">
            <p>Interactive IPO application guide with eligibility and steps.</p>
          </div>
        </div>
      `;

    case "Online BO A/C":
      return `
        <div class="visual-placeholder">
          <h2>Online BO Account</h2>
          <p>Static panel with account creation form and instructions.</p>
        </div>
      `;

    default:
      return `
        <div class="visual-placeholder">
          <p>Content for ${label} will appear here.</p>
        </div>
      `;
  }
}
