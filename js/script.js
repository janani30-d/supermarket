// ========================================
// FRESHMART HEADER JS
// ========================================

// Elements
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

const rtlToggle = document.getElementById('rtl-toggle');
const rtlToggleMobile = document.getElementById('rtl-toggle-mobile');
/* ========================================
   MOBILE MENU TOGGLE
======================================== */

if (menuToggle && navMenu) {

    menuToggle.addEventListener('click', () => {

        menuToggle.classList.toggle('active');
navMenu.classList.toggle('active');

        const icon = menuToggle.querySelector('i');

        if (icon) {
            if (menuToggle.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }

    });

    /* Close menu when normal link is clicked */
    document.querySelectorAll('.nav-menu a').forEach(link => {

        link.addEventListener('click', function () {

            if (
                window.innerWidth <= 1024 &&
                this.parentElement.classList.contains('dropdown')
            ) {
                return;
            }

            if (window.innerWidth <= 1024) {

                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');

                const icon = menuToggle.querySelector('i');

                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }

                document.querySelectorAll('.dropdown').forEach(item => {
                    item.classList.remove('active');
                });
            }

        });

    });

}

// ========================================
// MOBILE DROPDOWN
// ========================================
document.querySelectorAll('.dropdown > a').forEach(dropdownLink => {

  dropdownLink.addEventListener('click', function (e) {

    if (window.innerWidth <= 1024) {

      e.preventDefault();

      const parent = this.parentElement;

      // Close other dropdowns
      document.querySelectorAll('.dropdown').forEach(item => {
        if (item !== parent) {
          item.classList.remove('active');
        }
      });

      // Toggle current dropdown
      parent.classList.toggle('active');
    }

  });

});

// ========================================
// DARK MODE
// ========================================
function toggleTheme() {

  document.body.classList.toggle('dark-mode');

  localStorage.setItem(
    'theme',
    document.body.classList.contains('dark-mode')
      ? 'dark'
      : 'light'
  );

}

themeToggle?.addEventListener('click', toggleTheme);
themeToggleMobile?.addEventListener('click', toggleTheme);

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}

// ========================================
// RTL MODE
// ========================================
function toggleRTL() {

  document.body.classList.toggle('rtl');

  localStorage.setItem(
    'rtl',
    document.body.classList.contains('rtl')
      ? 'enabled'
      : 'disabled'
  );

}

rtlToggle?.addEventListener('click', toggleRTL);
rtlToggleMobile?.addEventListener('click', toggleRTL);

// Load saved RTL
if (localStorage.getItem('rtl') === 'enabled') {
  document.body.classList.add('rtl');
}

// ========================================
// CLOSE MENU ON RESIZE
// ========================================
window.addEventListener('resize', () => {

  if (window.innerWidth > 1024) {

    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');

    document.querySelectorAll('.dropdown').forEach(item => {
      item.classList.remove('active');
    });

  }

});

// ========================================
// CLOSE MENU WHEN CLICKING OUTSIDE
// ========================================
document.addEventListener('click', (e) => {

  if (
    window.innerWidth <= 1024 &&
    navMenu.classList.contains('active') &&
    !navMenu.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {

    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');

    document.querySelectorAll('.dropdown').forEach(item => {
      item.classList.remove('active');
    });

  }

});





/*********HOME1********/

/******* HOME1 ********/

/* ========================================
   HERO SLIDER
======================================== */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev-slide");
const nextBtn = document.querySelector(".next-slide");

let currentSlide = 0;
let slideInterval;

/* Only run slider if Home 1 slider exists */
if (slides.length > 0) {

    // Show slide
    function showSlide(index) {

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        dots.forEach(dot => {
            dot.classList.remove("active");
        });

        slides[index].classList.add("active");

        if (dots[index]) {
            dots[index].classList.add("active");
        }
    }


    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }


    // Previous slide
    function prevSlide() {
        currentSlide =
            (currentSlide - 1 + slides.length) % slides.length;

        showSlide(currentSlide);
    }


    // Auto slide
    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }


    // Stop auto slide
    function stopSlider() {
        clearInterval(slideInterval);
    }


    // Arrow buttons
    nextBtn?.addEventListener("click", () => {
        nextSlide();
        stopSlider();
        startSlider();
    });


    prevBtn?.addEventListener("click", () => {
        prevSlide();
        stopSlider();
        startSlider();
    });


    // Dots
    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentSlide = index;

            showSlide(currentSlide);

            stopSlider();
            startSlider();

        });

    });


    // Pause on hover
    const heroSlider = document.querySelector(".hero-slider");

    heroSlider?.addEventListener("mouseenter", stopSlider);
    heroSlider?.addEventListener("mouseleave", startSlider);


    // Touch swipe
    let touchStartX = 0;
    let touchEndX = 0;

    heroSlider?.addEventListener("touchstart", e => {
        touchStartX = e.changedTouches[0].screenX;
    });


    heroSlider?.addEventListener("touchend", e => {

        touchEndX = e.changedTouches[0].screenX;

        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {

            if (document.body.classList.contains("rtl")) {

                if (diff > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }

            } else {

                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }

            }

            stopSlider();
            startSlider();
        }

    });


    // Initialize slider
    showSlide(currentSlide);
    startSlider();

}




/*******REWARD POINTS***********/


/* ========================================
   REWARDS FAQ ACCORDION
======================================== */

document.addEventListener('DOMContentLoaded', function () {

  const faqItems = document.querySelectorAll('.rewardfaq-item');

  faqItems.forEach(item => {

    const question = item.querySelector('.rewardfaq-question');

    question.addEventListener('click', function () {

      // Close all other FAQ items
      faqItems.forEach(faq => {
        if (faq !== item) {
          faq.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active');

    });

  });

});





/***********SCROLLL-TOP*******************/

/* ========================================
   SCROLL TO TOP
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (!scrollTopBtn) return;

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }

    });

    scrollTopBtn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});





/* ========================================
   REWARDS FAQ
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(".rewardfaq-item");

    faqItems.forEach(function (item) {

        const question = item.querySelector(".rewardfaq-question");
        const answer = item.querySelector(".rewardfaq-answer");
        const icon = question.querySelector("i");

        question.addEventListener("click", function () {

            const isOpen = item.classList.contains("active");

            // Close all FAQs
            faqItems.forEach(function (otherItem) {

                otherItem.classList.remove("active");

                const otherIcon =
                    otherItem.querySelector(".rewardfaq-question i");

                if (otherIcon) {
                    otherIcon.classList.remove("fa-minus");
                    otherIcon.classList.add("fa-plus");
                }

            });

            // Open clicked FAQ
            if (!isOpen) {

                item.classList.add("active");

                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");

            }

        });

    });

});