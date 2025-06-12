// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const nav = document.querySelector(".nav")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      nav.classList.toggle("active")
      mobileMenuBtn.classList.toggle("active")
    })
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Close mobile menu if open
        nav.classList.remove("active")
        mobileMenuBtn.classList.remove("active")
      }
    })
  })

  // Header scroll effect
  const header = document.querySelector(".header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.98)"
      header.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    } else {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
      header.style.boxShadow = "none"
    }
  })

  // Phone number click handlers
  const phoneButtons = document.querySelectorAll(".btn")

  phoneButtons.forEach((button) => {
    if (button.textContent.includes("+34 610 818 078")) {
      button.addEventListener("click", () => {
        // Replace with actual phone number
        window.location.href = "tel:+34610818078"
      })
    }

    if (button.textContent.includes("WhatsApp")) {
      button.addEventListener("click", () => {
        // Replace with actual WhatsApp number
        window.open("https://wa.me/34610818078", "_blank")
      })
    }
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe service cards for animation
  const serviceCards = document.querySelectorAll(".service-card")
  serviceCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })

  // Observe testimonial cards for animation
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  testimonialCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })

  // Add hover effects to service cards
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Counter animation for hero stats
  const statNumbers = document.querySelectorAll(".stat-number")

  const animateCounter = (element, target, suffix = "") => {
    let current = 0
    const increment = target / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }

      if (suffix === "%") {
        element.textContent = Math.floor(current) + suffix
      } else if (suffix === "+") {
        element.textContent = Math.floor(current) + suffix
      } else {
        element.textContent = Math.floor(current) + " " + suffix
      }
    }, 20)
  }

  // Observe hero stats for counter animation
  const heroStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const text = entry.target.textContent
        if (text.includes("150+")) {
          animateCounter(entry.target, 150, "+")
        } else if (text.includes("300%")) {
          animateCounter(entry.target, 300, "%")
        } else if (text.includes("5 años")) {
          animateCounter(entry.target, 5, "años")
        }
        heroStatsObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  statNumbers.forEach((stat) => {
    heroStatsObserver.observe(stat)
  })

  // Form validation and submission (if contact forms are added later)
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      // Add form submission logic here
      console.log("Form submitted")
    })
  })

  // Add loading states to buttons
  const ctaButtons = document.querySelectorAll(".btn")
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.textContent.includes("Llamar") || this.textContent.includes("WhatsApp")) {
        const originalText = this.innerHTML
        this.innerHTML =
          '<svg class="icon animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>Conectando...'
        this.disabled = true

        setTimeout(() => {
          this.innerHTML = originalText
          this.disabled = false
        }, 1500)
      }
    })
  })

  // Add CSS for spin animation
  const style = document.createElement("style")
  style.textContent = `
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        .nav.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border-radius: 0 0 0.5rem 0.5rem;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav {
                display: none;
            }
            
            .nav.active {
                display: flex;
            }
        }
    `
  document.head.appendChild(style)
})
