// Project data - easily editable
let projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and PostgreSQL",
    image: "/modern-ecommerce-interface.png",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    githubUrl: "https://github.com/username/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    image: "/task-management-dashboard.png",
    tags: ["Vue.js", "Firebase", "Tailwind CSS"],
    githubUrl: "https://github.com/username/taskapp",
    liveUrl: "https://taskapp-demo.com",
    featured: false,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A responsive weather dashboard with location-based forecasts",
    image: "/preview/project4.png",
    tags: ["JavaScript", "API Integration", "Chart.js"],
    githubUrl: "https://github.com/username/weather",
    liveUrl: "https://weather-demo.com",
    featured: false,
  },
]

let isEditMode = false

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target

      if (target.classList.contains("hero-title")) {
        animateHeroElements()
      } else if (target.classList.contains("projects-title")) {
        animateProjectsSection()
      } else if (target.classList.contains("about-title")) {
        animateAboutSection()
      } else if (target.classList.contains("contact-title")) {
        animateContactSection()
      }
    }
  })
}, observerOptions)

// Animation functions
function animateHeroElements() {
  const title = document.querySelector(".hero-title")
  const subtitle = document.querySelector(".hero-subtitle")
  const description = document.querySelector(".hero-description")
  const buttons = document.querySelector(".hero-buttons")

  setTimeout(() => title.classList.add("animate-fade-in-up"), 0)
  setTimeout(() => subtitle.classList.add("animate-fade-in-up"), 200)
  setTimeout(() => description.classList.add("animate-fade-in-up"), 400)
  setTimeout(() => buttons.classList.add("animate-fade-in-up"), 600)
}

function animateProjectsSection() {
  const title = document.querySelector(".projects-title")
  const subtitle = document.querySelector(".projects-subtitle")
  const cards = document.querySelectorAll(".card")

  title.classList.add("animate-fade-in-up")
  setTimeout(() => subtitle.classList.add("animate-slide-in-left"), 200)

  cards.forEach((card, index) => {
    setTimeout(
      () => {
        card.classList.add("animate-scale-in")
      },
      400 + index * 150,
    )
  })
}

function animateAboutSection() {
  const title = document.querySelector(".about-title")
  const description = document.querySelector(".about-description")
  const skills = document.querySelectorAll(".skill-item")

  title.classList.add("animate-fade-in-up")
  setTimeout(() => description.classList.add("animate-slide-in-right"), 200)

  skills.forEach((skill, index) => {
    setTimeout(
      () => {
        skill.classList.add("animate-fade-in-up")
      },
      400 + index * 200,
    )
  })
}

function animateContactSection() {
  const title = document.querySelector(".contact-title")
  const description = document.querySelector(".contact-description")
  const buttons = document.querySelector(".contact-buttons")

  title.classList.add("animate-fade-in-up")
  setTimeout(() => description.classList.add("animate-slide-in-left"), 200)
  setTimeout(() => buttons.classList.add("animate-fade-in-up"), 400)
}

// Render projects
function renderProjects() {
  const grid = document.getElementById("projects-grid")
  grid.innerHTML = ""

  projects.forEach((project, index) => {
    const projectCard = document.createElement("div")
    projectCard.className = "card"
    projectCard.style.animationDelay = `${index * 0.15 + 0.4}s`

    projectCard.innerHTML = `
            <div style="position: relative; overflow: hidden;">
                <img src="${project.image}" alt="${project.title}" />
                ${project.featured ? '<div class="featured-badge">Featured</div>' : ""}
                ${isEditMode ? `<button class="delete-btn" onclick="deleteProject(${project.id})">🗑️</button>` : ""}
            </div>
            <div class="card-content">
                <h3 class="font-serif card-title">${project.title}</h3>
                <p class="card-description">${project.description}</p>
                <div style="margin-bottom: 1rem;">
                    ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <a href="${project.githubUrl}" class="btn btn-outline btn-sm">🐙 Code</a>
                    <a href="${project.liveUrl}" class="btn btn-outline btn-sm">🔗 Live Demo</a>
                </div>
            </div>
        `

    grid.appendChild(projectCard)
  })
}

// Edit mode functions
function toggleEditMode() {
  isEditMode = !isEditMode
  const editText = document.getElementById("edit-text")
  const addBtn = document.getElementById("add-project-btn")

  editText.textContent = isEditMode ? "Done" : "Edit"
  addBtn.classList.toggle("hidden", !isEditMode)

  renderProjects()
}

function addProject() {
  const newProject = {
    id: Date.now(),
    title: "New Project",
    description: "Click edit to add your project description",
    image: "/placeholder-r5ydy.png",
    tags: ["Add", "Your", "Tags"],
    githubUrl: "https://github.com/username/project",
    liveUrl: "https://project-demo.com",
    featured: false,
  }

  projects.push(newProject)
  renderProjects()
}

function deleteProject(id) {
  projects = projects.filter((project) => project.id !== id)
  renderProjects()
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderProjects()

  // Set up observers
  observer.observe(document.querySelector(".hero-title"))
  observer.observe(document.querySelector(".projects-title"))
  observer.observe(document.querySelector(".about-title"))
  observer.observe(document.querySelector(".contact-title"))
})
