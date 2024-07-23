// Animated Skill Bars
document.addEventListener("DOMContentLoaded", function () {
  const skills = document.querySelectorAll(".skill-bar");

  function checkVisibility() {
    skills.forEach((skill) => {
      const rect = skill.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight && rect.bottom >= 0;

      if (inView) {
        const skillPercents = skill.querySelector(".skill-per");
        skillPercents.style.width = skillPercents.getAttribute("per");
        skillPercents.style.animation = "fillBars 2.5s forwards";
      }
    });
  }

  window.addEventListener("scroll", checkVisibility);
  checkVisibility();
});

// Projects && Image Gallery
document.addEventListener("DOMContentLoaded", () => {
  showCity("Project1"); // Show Project 1 content by default
});

let currentSlide = 0;
let currentProject = "";

function showCity(projectName) {
  // Hide all project content
  const projectContents = document.querySelectorAll(".city-content");
  projectContents.forEach((content) => (content.style.display = "none"));

  // Remove active class from all buttons
  const tabButtons = document.querySelectorAll(".tab-button");
  tabButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // Show the selected project content
  const selectedProjectContent = document.getElementById(projectName);
  if (selectedProjectContent) {
    selectedProjectContent.style.display = "flex";
  }

  // Add active class to the selected button
  const activeButton = [...tabButtons].find(
    (button) => button.dataset.project === projectName
  );
  if (activeButton) {
    activeButton.classList.add("active");
  } else {
    console.log("No active button found for:", projectName);
  }

  // Reset current slide index
  currentSlide = 0;
}

function openModal(projectName, slideIndex) {
  currentProject = projectName;
  currentSlide = slideIndex;

  // Get all images for the selected project
  const images = document.querySelectorAll(`#${projectName} .gallery img`);

  // Ensure only the current image is shown in the modal
  const modalImage = document.getElementById("modal-image");
  modalImage.src = images[slideIndex].src;

  // Show the modal
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function changeSlide(direction) {
  // Get all images for the current project
  const images = document.querySelectorAll(`#${currentProject} .gallery img`);

  // Update the current slide index
  currentSlide = (currentSlide + direction + images.length) % images.length;

  // Update the modal image source
  document.getElementById("modal-image").src = images[currentSlide].src;
}

// Function to open the image in a new tab
function openImageInNewTab() {
  const modalImage = document.getElementById("modal-image");
  if (modalImage && modalImage.src) {
    window.open(modalImage.src, "_blank");
  }
}

function redirectToLink(url) {
  window.location.href = url;
}

// Bind the openImageInNewTab function to the fullscreen button
document
  .getElementById("fullscreen-button")
  .addEventListener("click", openImageInNewTab);

// Function to open the resume modal
function openResumeModal() {
  document.getElementById("resume-modal").style.display = "block";
}

// Function to close the resume modal
function closeResumeModal() {
  document.getElementById("resume-modal").style.display = "none";
}

// Event listener to close the resume modal when clicking outside the modal content
window.onclick = function (event) {
  if (event.target == document.getElementById("resume-modal")) {
    closeResumeModal();
  }
};

// Function to open the PDF in a new tab
function openInNewTab() {
  const pdfUrl = document.getElementById("resume-iframe").src;
  if (pdfUrl) {
    window.open(pdfUrl, "_blank");
  }
}

// Blog
document.addEventListener("DOMContentLoaded", () => {
  const learnMoreButtons = document.querySelectorAll(".learn-more-btn");

  learnMoreButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// New Tab Redirection
function redirectToLink(url) {
  window.open(url, "_blank");
}

// Navbar
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const navMenu = document.getElementById("nav-menu");
  const closeBtn = document.querySelector(".close-btn");

  // Toggle navigation menu visibility
  menuIcon.addEventListener("click", function () {
    console.log("Menu icon clicked"); // For debugging
    navMenu.classList.add("active");
  });

  // Close the navigation menu
  closeBtn.addEventListener("click", function () {
    console.log("Close button clicked"); // For debugging
    navMenu.classList.remove("active");
  });

  // Optional: Close menu when clicking outside of it
  document.addEventListener("click", function (event) {
    if (!navMenu.contains(event.target) && !menuIcon.contains(event.target)) {
      navMenu.classList.remove("active");
    }
  });
});

// Scroll Transition
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");

  // Create an intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.1, // Adjust the threshold as needed
    }
  );

  // Observe each section
  sections.forEach((section) => {
    observer.observe(section);
  });
});

// Contact Form
document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          popupMessage.textContent = "Thank you for your message!";
          popup.style.display = "flex";
          form.reset();
        } else {
          popupMessage.textContent =
            "Oops! There was a problem submitting your form.";
          popup.style.display = "flex";
        }
      })
      .catch(() => {
        popupMessage.textContent =
          "Oops! There was a problem submitting your form.";
        popup.style.display = "flex";
      });

    document.getElementById("popupOk").addEventListener("click", function () {
      popup.style.display = "none";
    });
  });
