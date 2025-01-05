document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const createMobileMenu = () => {
    const header = document.querySelector(".nba-header");
    const nav = document.querySelector("nav");

    // Create mobile menu button
    const menuButton = document.createElement("button");
    menuButton.className = "mobile-menu-button";
    menuButton.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        `;

    // Insert button before nav
    header.insertBefore(menuButton, nav);

    // Toggle menu
    menuButton.addEventListener("click", () => {
      nav.classList.toggle("active");
      menuButton.setAttribute("aria-expanded", nav.classList.contains("active"));
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
        nav.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  };

  // Favorite functionality
  const favoriteTag = document.querySelector(".favorite-tag");
  let isFavorite = false;

  favoriteTag.addEventListener("click", () => {
    isFavorite = !isFavorite;
    const starIcon = favoriteTag.querySelector(".icon");

    if (isFavorite) {
      starIcon.style.color = "#ffd700";
      favoriteTag.style.background = "#fff3d4";
    } else {
      starIcon.style.color = "inherit";
      favoriteTag.style.background = window.matchMedia("(prefers-color-scheme: dark)").matches ? "#2a2a2a" : "#f0f0f0";
    }
  });

  // Animate stats
  const animateStats = () => {
    const statValues = document.querySelectorAll(".stat-value");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stat = entry.target;
            const finalValue = parseFloat(stat.textContent);
            let currentValue = 0;
            const duration = 1000;
            const steps = 60;
            const increment = finalValue / steps;

            const animate = () => {
              currentValue += increment;
              if (currentValue <= finalValue) {
                stat.textContent = currentValue.toFixed(1);
                requestAnimationFrame(animate);
              } else {
                stat.textContent = finalValue.toFixed(1);
              }
            };

            animate();
            observer.unobserve(stat);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    statValues.forEach((stat) => observer.observe(stat));
  };

  // Initialize all features
  createMobileMenu();
  animateStats();
});
