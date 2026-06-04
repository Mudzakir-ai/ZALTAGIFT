document.addEventListener("DOMContentLoaded", function () {
  // Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".produk-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");

      cards.forEach((card) => {
        const matches = filter === "all" || card.classList.contains(filter);
        if (matches) {
          card.classList.remove("hidden");
          requestAnimationFrame(() => card.classList.remove("fade-out"));
        } else {
          card.classList.add("fade-out");
          card.addEventListener("transitionend", () => {
            if (card.classList.contains("fade-out")) {
              card.classList.add("hidden");
            }
          }, { once: true });
        }
      });
    });
  });

  // Scroll reveal for [data-aos] elements
  const aosEls = document.querySelectorAll("[data-aos]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  aosEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    observer.observe(el);
  });

  // Sticky header shadow on scroll
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 8) {
      header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
    } else {
      header.style.boxShadow = "";
    }
  }, { passive: true });
});
