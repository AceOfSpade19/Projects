document.addEventListener("DOMContentLoaded", () => {
    // Elements to animate
    const animatedElements = [
      // Header and Hero
      document.querySelector("header"),
      ...document.querySelectorAll(".hero-content, .hero-image"),
      document.querySelector(".contact-section"),
      ...document.querySelectorAll(".contact-item"),
      
      
      // Services Section
      document.querySelector(".services-content"),
      ...document.querySelectorAll(".service-card"),
      document.querySelector(".geometric-sphere"),
      ...document.querySelectorAll(".features-list li"),
      ...document.querySelectorAll(".feature-card"),
      ...document.querySelectorAll(".stat-item, .section-title"),
      
      // Empower Section
      document.querySelector(".empower-title"),
      document.querySelector(".empower-description"),
      document.querySelector(".divider"),
      
      // Tech Partners
      document.querySelector(".partners-orbit"),
      ...document.querySelectorAll(".partner-logo"),
      
      // Footer
      document.querySelector(".site-footer"),
      document.querySelector(".footer-company"),
      ...document.querySelectorAll(".footer-links"),
      document.querySelector(".footer-contact"),
      document.querySelector(".footer-bottom"),
      
      // Generic animations
      ...document.querySelectorAll(".fade-in"),
      ...document.querySelectorAll(".slide-in-left"),
      ...document.querySelectorAll(".slide-in-right"),
      ...document.querySelectorAll(".scale-in"),
      ...document.querySelectorAll(".stagger-fade-in")
    ].filter(Boolean); // Filter out any null elements
  
    // Add floating animation to specific elements
    document.querySelectorAll(".geometric-sphere, .vr-image").forEach(el => {
      if (el) el.classList.add("float-animation");
    });
    
    // Add pulse animation to CTA buttons
    document.querySelectorAll(".cta-button").forEach(el => {
      if (el) el.classList.add("pulse-animation");
    });
  
    // Counter animation for stats
    const animateValue = (obj, start, end, duration) => {
      if (!obj) return;
      
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      }
      window.requestAnimationFrame(step);
    }
  
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animated class to trigger CSS transitions
            entry.target.classList.add("animated");
            
            // Handle stat counters
            if (entry.target.classList.contains("stat-item")) {
              const target = entry.target.querySelector(".number");
              if (target) {
                const endValue = parseInt(entry.target.dataset.value || target.textContent, 10);
                animateValue(target, 0, endValue, 2000);
              }
            }
            
            // Stop observing after animation is triggered
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
  
    // Start observing all animated elements
    animatedElements.forEach(element => {
      if (element) {
        observer.observe(element);
      }
    });
    
    // Animate elements that are already in view on page load
    setTimeout(() => {
      animatedElements.forEach(element => {
        if (element && isElementInViewport(element)) {
          element.classList.add("animated");
          
          if (element.classList.contains("stat-item")) {
            const target = element.querySelector(".number");
            if (target) {
              const endValue = parseInt(element.dataset.value || target.textContent, 10);
              animateValue(target, 0, endValue, 2000);
            }
          }
          
          observer.unobserve(element);
        }
      });
    }, 100);
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
        rect.right >= 0
      );
    }
    
  });
  document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const track = document.getElementById("testimonialTrack")
    const slides = track.querySelectorAll(".testimonial-slide")
    const dotsContainer = document.getElementById("testimonialDots")
    const prevBtn = document.getElementById("prevBtn")
    const nextBtn = document.getElementById("nextBtn")
  
    // Current slide index
    let currentIndex = 0
  
    // Total number of slides
    const slideCount = slides.length
  
    // Create dots
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement("div")
      dot.classList.add("dot")
      if (i === 0) dot.classList.add("active")
      dot.addEventListener("click", () => goToSlide(i))
      dotsContainer.appendChild(dot)
    }
  
    // Get all dots
    const dots = dotsContainer.querySelectorAll(".dot")
  
    // Function to go to a specific slide
    function goToSlide(index) {
      // Ensure index is within bounds
      if (index < 0) index = slideCount - 1
      if (index >= slideCount) index = 0
  
      // Update current index
      currentIndex = index
  
      // Move the track
      track.style.transform = `translateX(-${currentIndex * 100}%)`
  
      // Update active dot
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex)
      })
    }
  
    // Event listeners for buttons
    prevBtn.addEventListener("click", () => {
      goToSlide(currentIndex - 1)
    })
  
    nextBtn.addEventListener("click", () => {
      goToSlide(currentIndex + 1)
    })
  
    // Auto-play functionality
    let autoplayInterval
  
    function startAutoplay() {
      autoplayInterval = setInterval(() => {
        goToSlide(currentIndex + 1)
      }, 5000) // Change slide every 5 seconds
    }
  
    function stopAutoplay() {
      clearInterval(autoplayInterval)
    }
  
    // Start autoplay
    startAutoplay()
  
    // Pause autoplay on hover
    track.addEventListener("mouseenter", stopAutoplay)
    track.addEventListener("mouseleave", startAutoplay)
  
    // Touch events for mobile swipe
    let touchStartX = 0
    let touchEndX = 0
  
    track.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX
    })
  
    track.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    })
  
    function handleSwipe() {
      // Minimum swipe distance (in pixels)
      const swipeThreshold = 50
  
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left, go to next slide
        goToSlide(currentIndex + 1)
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right, go to previous slide
        goToSlide(currentIndex - 1)
      }
    }
  
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        goToSlide(currentIndex - 1)
      } else if (e.key === "ArrowRight") {
        goToSlide(currentIndex + 1)
      }
    })
  
    // Add a floating button to navigate to testimonials
    const floatingButton = document.createElement("div")
    floatingButton.className = "testimonial-button-container"
    floatingButton.innerHTML = `
          <a href="#testimonials" class="testimonial-button">
              <span class="button-icon">⭐</span>
              <span>Testimonials</span>
          </a>
      `
    document.body.appendChild(floatingButton)
  
    // Smooth scroll for testimonial button
    const testimonialButton = floatingButton.querySelector("a")
    testimonialButton.addEventListener("click", (e) => {
      e.preventDefault()
      const testimonialSection = document.getElementById("testimonials")
      testimonialSection.scrollIntoView({ behavior: "smooth" })
    })
  
    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        floatingButton.style.opacity = "1"
        floatingButton.style.transform = "translateY(0)"
      } else {
        floatingButton.style.opacity = "0"
        floatingButton.style.transform = "translateY(20px)"
      }
    })
  })
  
  document.addEventListener("DOMContentLoaded", () => {
    // Star Rating Functionality
    const stars = document.querySelectorAll(".star1")
    const ratingInput = document.getElementById("rating")
    const ratingText = document.querySelector(".rating-text")
  
    // Rating text options based on star value
    const ratingTexts = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    }
  
    stars.forEach((star) => {
      // Hover effect
      star.addEventListener("mouseenter", function () {
        const value = Number.parseInt(this.getAttribute("data-value"))
        highlightStars(value)
      })
  
      // Click to select
      star.addEventListener("click", function () {
        const value = Number.parseInt(this.getAttribute("data-value"))
        selectStars(value)
        ratingInput.value = value
        ratingText.textContent = ratingTexts[value]
      })
    })
  
    // Reset stars when mouse leaves the container
    document.querySelector(".star1").addEventListener("mouseleave", () => {
      const selectedRating = Number.parseInt(ratingInput.value)
      if (selectedRating > 0) {
        highlightStars(selectedRating)
      } else {
        resetStars()
      }
    })
  
    function highlightStars(count) {
      resetStars()
      for (let i = 0; i < count; i++) {
        stars[i].classList.add("selected")
      }
    }
  
    function selectStars(count) {
      resetStars()
      for (let i = 0; i < count; i++) {
        stars[i].classList.add("selected")
      }
    }
  
    function resetStars() {
      stars.forEach((star) => {
        star.classList.remove("selected")
      })
    }
  
    // File Upload Handling
    const fileInput = document.getElementById("photo")
    const fileName = document.querySelector(".file-name")
    const fileButton = document.querySelector(".file-input-button")
  
    fileButton.addEventListener("click", () => {
      fileInput.click()
    })
  
    fileInput.addEventListener("change", function () {
      if (this.files.length > 0) {
        fileName.textContent = this.files[0].name
      } else {
        fileName.textContent = "No file chosen"
      }
    })
  
    // Form Submission
    const testimonialForm = document.getElementById("testimonialForm")
    const formMessage = document.getElementById("formMessage")
  
    testimonialForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Basic validation
      if (!validateForm()) {
        return
      }
  
      // Simulate form submission (in a real implementation, this would send data to a server)
      formMessage.textContent = "Thank you for your testimonial! It has been submitted for review."
      formMessage.classList.add("success")
  
      // Reset form after submission
      setTimeout(() => {
        testimonialForm.reset()
        resetStars()
        ratingInput.value = 0
        ratingText.textContent = "Select your rating"
        fileName.textContent = "No file chosen"
        formMessage.style.display = "none"
      }, 5000)
    })
  
    function validateForm() {
      const name = document.getElementById("name").value.trim()
      const email = document.getElementById("email").value.trim()
      const testimonial = document.getElementById("testimonial").value.trim()
      const rating = Number.parseInt(ratingInput.value)
      const consent = document.getElementById("consent").checked
  
      if (!name) {
        showError("Please enter your name")
        return false
      }
  
      if (!email) {
        showError("Please enter your email")
        return false
      }
  
      if (!validateEmail(email)) {
        showError("Please enter a valid email address")
        return false
      }
  
      if (rating === 0) {
        showError("Please select a rating")
        return false
      }
  
      if (!testimonial) {
        showError("Please enter your testimonial")
        return false
      }
  
      if (!consent) {
        showError("Please provide consent to display your testimonial")
        return false
      }
  
      return true
    }
  
    function validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  
    function showError(message) {
      formMessage.textContent = message
      formMessage.classList.remove("success")
      formMessage.classList.add("error")
      formMessage.style.display = "block"
  
      // Auto-hide error after 3 seconds
      setTimeout(() => {
        formMessage.style.display = "none"
      }, 3000)
    }
  })
  // Add this to the existing testimonial-scroll.js file
document.addEventListener("DOMContentLoaded", () => {
  // Get all links that point to the testimonial form
  const formLinks = document.querySelectorAll('a[href="#submit-testimonial"]')

  // Add click event listener to each link
  formLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Get the target element
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Smooth scroll to the target
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Update URL without page reload
        history.pushState(null, null, targetId)
      }
    })
  })
})

document.addEventListener("DOMContentLoaded", () => {
  // Counter animation
  const counterElements = document.querySelectorAll(".counter")
  const statItems = document.querySelectorAll(".stat-item")

  // Function to animate counter
  function animateCounter(el, target, duration) {
    let start = 0
    const increment = target / (duration / 16) // 16ms per frame (approx 60fps)
    const timer = setInterval(() => {
      start += increment
      el.textContent = Math.floor(start)
      if (start >= target) {
        clearInterval(timer)
        el.textContent = target
      }
    }, 16)
  }

  // Intersection Observer to trigger counter when visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statItem = entry.target
          const counterElement = statItem.querySelector(".counter")
          const targetValue = Number.parseInt(statItem.getAttribute("data-value"))

          // Start counter animation
          animateCounter(counterElement, targetValue, 2000)

          // Unobserve after triggering
          observer.unobserve(statItem)
        }
      })
    },
    { threshold: 0.5 },
  )

  // Observe all stat items
  statItems.forEach((item) => {
    observer.observe(item)
  })

  // Parallax effect on about image
  const aboutImage = document.querySelector(".about-image img")

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY
    if (aboutImage) {
      aboutImage.style.transform = `translateY(${scrollPosition * 0.05}px)`
    }
  })
})

// about html //
document.addEventListener("DOMContentLoaded", () => {
  // Counter Animation
  const counters = document.querySelectorAll(".counter-new")

  // Intersection Observer to trigger counter animation when visible
  const statsSection = document.querySelector(".stats-bar-new")

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start counter animations
          counters.forEach((counter) => {
            const target = +counter.getAttribute("data-target")
            const duration = 2000 // 2 seconds
            const increment = target / (duration / 16) // 60fps

            let currentValue = 0
            const updateCounter = () => {
              currentValue += increment
              if (currentValue < target) {
                counter.textContent = Math.ceil(currentValue)
                requestAnimationFrame(updateCounter)
              } else {
                counter.textContent = target
              }
            }

            updateCounter()
          })

          // Unobserve after triggering
          counterObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  if (statsSection) {
    counterObserver.observe(statsSection)
  }

  // Parallax effect for the VR image
  const aboutImage = document.querySelector(".about-image-new img")

  window.addEventListener("scroll", () => {
    if (aboutImage) {
      const scrollPosition = window.pageYOffset
      const parallaxSpeed = 0.05
      aboutImage.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`
    }
  })

  // Highlight text animation
  const highlights = document.querySelectorAll(".highlight-new")

  highlights.forEach((highlight) => {
    highlight.addEventListener("mouseover", () => {
      highlight.style.textShadow = "0 0 10px rgba(250, 204, 21, 0.7)"
    })

    highlight.addEventListener("mouseout", () => {
      highlight.style.textShadow = "none"
    })
  })

  // Animate elements when they come into view
  const animatedElements = document.querySelectorAll(
    ".about-info-box-new, .about-image-new, .stat-item-new, .bottom-content-new, .circuit-image-new",
  )

  const elementObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
          elementObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedElements.forEach((element) => {
    // Reset the animation that might have been applied by CSS
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease"

    elementObserver.observe(element)
  })

  // Circuit image glow effect
  const circuitImage = document.querySelector(".circuit-image-new")

  if (circuitImage) {
    // Add random glowing dots to the circuit image
    for (let i = 0; i < 10; i++) {
      const dot = document.createElement("div")
      dot.classList.add("circuit-dot")
      dot.style.position = "absolute"
      dot.style.width = "4px"
      dot.style.height = "4px"
      dot.style.borderRadius = "50%"
      dot.style.backgroundColor = "#0ff"
      dot.style.boxShadow = "0 0 10px #0ff"

      // Random position
      dot.style.left = `${Math.random() * 100}%`
      dot.style.top = `${Math.random() * 100}%`

      // Random animation delay
      dot.style.animation = `pulse ${2 + Math.random() * 3}s infinite alternate`
      dot.style.animationDelay = `${Math.random() * 2}s`

      circuitImage.appendChild(dot)
    }
  }
})



  