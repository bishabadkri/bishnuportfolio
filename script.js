// DOM Elements
const themeToggle = document.getElementById("theme-toggle")
const body = document.body
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav-links")
const filterBtns = document.querySelectorAll(".filter-btn")
const projectCards = document.querySelectorAll(".project-card")
const progressBars = document.querySelectorAll(".progress-line span")
const statNumbers = document.querySelectorAll(".number")
const animatedTexts = document.querySelectorAll(".animated-text")

// Theme Toggle
function initTheme() {
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    body.className = savedTheme
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    body.className = prefersDark ? "dark-mode" : "light-mode"
  }
}

themeToggle.addEventListener("click", () => {
  if (body.classList.contains("light-mode")) {
    body.classList.replace("light-mode", "dark-mode")
    localStorage.setItem("theme", "dark-mode")
  } else {
    body.classList.replace("dark-mode", "light-mode")
    localStorage.setItem("theme", "light-mode")
  }
})

// Mobile Navigation
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navLinks.classList.toggle("active")

  // Animate hamburger
  const spans = hamburger.querySelectorAll("span")
  if (hamburger.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks.classList.contains("active")) {
      hamburger.click()
    }
  })
})

// Project Filtering
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"))
    // Add active class to clicked button
    btn.classList.add("active")

    const filter = btn.dataset.filter

    projectCards.forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block"
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "scale(1)"
        }, 10)
      } else {
        card.style.opacity = "0"
        card.style.transform = "scale(0.8)"
        setTimeout(() => {
          card.style.display = "none"
        }, 300)
      }
    })
  })
})

// Animate progress bars when in viewport
function animateProgressBars() {
  progressBars.forEach((bar) => {
    const percent = bar.dataset.percent
    bar.style.width = percent
  })
}

// Animate stat numbers when in viewport
function animateNumbers() {
  statNumbers.forEach((number) => {
    const target = Number.parseInt(number.dataset.count)
    let count = 0
    const duration = 2000 // ms
    const increment = target / (duration / 16) // 60fps

    const timer = setInterval(() => {
      count += increment
      number.textContent = Math.floor(count)

      if (count >= target) {
        number.textContent = target
        clearInterval(timer)
      }
    }, 16)
  })
}

// Text animations
function animateText() {
  animatedTexts.forEach((text) => {
    if (isInViewport(text) && !text.classList.contains("visible")) {
      text.classList.add("visible")
    }
  })
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0
}

// Scroll animations
function handleScrollAnimations() {
  animateText()

  // Animate progress bars when skills section is in viewport
  const skillsSection = document.querySelector(".skills")
  if (skillsSection && isInViewport(skillsSection)) {
    animateProgressBars()
  }

  // Animate stat numbers when about section is in viewport
  const statsSection = document.querySelector(".stats")
  if (statsSection && isInViewport(statsSection) && !statsSection.classList.contains("animated")) {
    animateNumbers()
    statsSection.classList.add("animated")
  }
}

// Typing animation for hero section
function typeWriter(element, text, speed = 100, delay = 0) {
  let i = 0
  element.textContent = ""

  setTimeout(() => {
    const typing = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i)
        i++
      } else {
        clearInterval(typing)
      }
    }, speed)
  }, delay)
}

// Form submission
const contactForm = document.querySelector(".contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Here you would typically send the form data to a server
    console.log("Form submitted:", { name, email, subject, message })

    // Show success message (in a real app, you'd wait for server response)
    alert("Thank you for your message! I will get back to you soon.")

    // Reset form
    contactForm.reset()
  })
}

const titles = ["Designer र Developer", "Content Writer", "Student"];
const dynamicTitle = document.getElementById("dynamic-title");
let index = 0;

setInterval(() => {
  dynamicTitle.textContent = titles[index];
  index = (index + 1) % titles.length; // Cycle through the array
}, 1000); // 1000ms = 1 second
// Initialize
window.addEventListener("load", () => {
  initTheme()
  handleScrollAnimations()

  // Initial animation for hero section
  const heroTitle = document.querySelector(".hero h1 .title")
  if (heroTitle) {
    typeWriter(heroTitle, "Designer र Developer", 100, 500)
    
  }
})

window.addEventListener("scroll", handleScrollAnimations)
window.addEventListener("resize", handleScrollAnimations)
