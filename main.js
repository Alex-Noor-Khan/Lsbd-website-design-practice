// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initDropdown();
  initSearch();
  initLangToggle();
  initHeroSwiper();
  initProdDeskSwiper();
  initArticleSwiper();
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
    trade: "images/mobile.png",
    reports: "images/web.png",
    ipo: "images/desktop.png",
  };

  const params = new URLSearchParams(window.location.search);
  const selectedPlatform = params.get("platform");

  const renderToggleIcon = (key) => {
    toggleBtn.innerHTML = `
      <span style="display:flex;align-items:center;gap:8px;">
        <img src="${platformIcons[key]}" 
             alt="${key}" 
             class="dropdown-icon" style="height:20px;width:auto;" />
      </span>
      <i class="bi bi-chevron-up"></i>
    `;
  };

  const renderMenu = (key) => {
    menuContainer.innerHTML = "";
    (menuData[key] || []).forEach((item) => {
      const a = document.createElement("a");
      a.className = "menu-btn";
      a.href = item.link;
      a.textContent = item.label;
      menuContainer.appendChild(a);
    });
  };

  if (selectedPlatform && menuData[selectedPlatform]) {
    renderToggleIcon(selectedPlatform);
    renderMenu(selectedPlatform);
  } else {
    toggleBtn.innerHTML = `
      <span class="platform-label">Select Platform</span>
      <i class="bi bi-chevron-up"></i>
    `;
  }

  toggleBtn.addEventListener("click", function () {
    const open = dropdownUp.style.display === "flex";
    dropdownUp.style.display = open ? "none" : "flex";
    toggleBtn.setAttribute("aria-expanded", (!open).toString());
  });

  dropdownUp.querySelectorAll(".dropdown-box").forEach(function (box) {
    box.addEventListener("click", function () {
      const key = box.dataset.menu;
      if (platformIcons[key]) renderToggleIcon(key);
      renderMenu(key);
      dropdownUp.style.display = "none";
      toggleBtn.setAttribute("aria-expanded", "false");
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
    searchBtn.addEventListener("click", function () {
      alert("Searching for: " + searchInput.value);
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
      pagination: { el: ".article-swiper .swiper-pagination", clickable: true },
    });
  }
}
