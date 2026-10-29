/**
 * Rudra Kumar - Developer Portfolio Script
 * Pure Vanilla JavaScript (ES6+)
 * 
 * Features:
 * 1. Dark/Light theme toggle with localStorage persistence & system preference
 * 2. Mobile navigation drawer with accessibility and keyboard traps
 * 3. Active navigation link highlighting via IntersectionObserver
 * 4. Subtle, high-performance particle canvas background
 * 5. Dynamic year in footer
 * 6. Copy to clipboard utility with toast notifications
 * 7. Project details interactive modal
 * 8. Form validation and mailto / free-backend integration handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initTheme();
  initMobileNav();
  initScrollSpy();
  initDynamicYear();
  initBackgroundCanvas();
  initClipboardButtons();
  initProjectModal();
  initContactForm();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Retrieve stored theme or default to system preference, fallback to dark
  const storedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = storedTheme ? storedTheme : (prefersLight ? 'light' : 'dark');

  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
      themeToggleBtn.setAttribute(
        'title',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }

    // Notify canvas of theme change if canvas exists
    if (window.updateCanvasColors) {
      window.updateCanvasColors();
    }
  }
}

/* ==========================================================================
   2. Mobile Navigation Drawer & Hamburger Toggle
   ========================================================================== */
function initMobileNav() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  function toggleMenu(isOpen) {
    const shouldOpen = isOpen !== undefined ? isOpen : !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', shouldOpen);
    menuToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  }

  menuToggle.addEventListener('click', () => toggleMenu());

  // Close when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  });

  // Close when clicking outside of the navigation
  document.addEventListener('click', (event) => {
    if (
      navMenu.classList.contains('open') &&
      !navMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      toggleMenu(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
      menuToggle.focus();
    }
  });
}

/* ==========================================================================
   3. Active Navigation Highlighting on Scroll (IntersectionObserver)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. Dynamic Footer Year
   ========================================================================== */
function initDynamicYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ==========================================================================
   5. Interactive Particle & Mesh Background Canvas
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  // Honor prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let particles = [];
  const particleCount = 45; // lightweight, fast execution
  const maxDistance = 120;

  let mouse = {
    x: null,
    y: null,
    radius: 100
  };

  function getThemeColors() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return {
      particleColor: isLight ? 'rgba(2, 132, 199, 0.45)' : 'rgba(56, 189, 248, 0.45)',
      lineColor: isLight ? 'rgba(79, 70, 229, 0.12)' : 'rgba(99, 102, 241, 0.15)'
    };
  }

  let themeColors = getThemeColors();
  window.updateCanvasColors = () => {
    themeColors = getThemeColors();
  };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.size = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse gentle repulsion / interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = themeColors.particleColor;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(particleCount, Math.floor((width * height) / 25000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDistance) {
          const alpha = 1 - dist / maxDistance;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = themeColors.lineColor;
          ctx.lineWidth = alpha * 1.2;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connectParticles();

    animationFrameId = requestAnimationFrame(animate);
  }

  resize();
  initParticles();
  animate();
}

/* ==========================================================================
   6. Clipboard Copy & Toast Notifications
   ========================================================================== */
function initClipboardButtons() {
  const copyButtons = document.querySelectorAll('[data-clipboard]');

  copyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = button.getAttribute('data-clipboard');

      if (!textToCopy) return;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    });
  });

  function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied: ${text}`);
    } catch (err) {
      showToast('Could not copy automatically. Please select text manually.');
    }
    document.body.removeChild(textArea);
  }
}

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   7. Project Details Interactive Modal
   ========================================================================== */
function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close-btn');
  const dismissBtn = document.getElementById('modal-dismiss-btn');
  const overlay = modal ? modal.querySelector('.modal-overlay') : null;
  const triggerButtons = document.querySelectorAll('.project-details-btn');

  if (!modal || !modalTitle || !modalContent) return;

  // Project knowledge base for modal
  const projectDetails = {
    lpg: {
      title: "Arduino LPG Gas Detection & Valve Control System",
      html: `
        <p><strong>Overview:</strong> An educational safety prototype engineered using microcontroller technology to detect combustible gas concentrations (LPG/butane) and trigger preventive shutdown measures in domestic or educational settings.</p>
        
        <h4>Key Hardware Components</h4>
        <ul>
          <li><strong>MQ-6 Semiconductor Sensor:</strong> Calibrated for liquefied petroleum gas and propane sensitivity with analog threshold detection.</li>
          <li><strong>Arduino Microcontroller (ATmega328P):</strong> Polling ADC channels, executing threshold comparison logic, and debouncing false spikes.</li>
          <li><strong>High-Torque Servo Motor (Actuator):</strong> Mechanically coupled to a quarter-turn gas valve simulator to simulate automatic shut-off.</li>
          <li><strong>Piezo Buzzer & Indicator LEDs:</strong> Multi-frequency audible and visual hazard notification.</li>
        </ul>

        <h4>System Logic & Firmware</h4>
        <p>The firmware samples sensor inputs continuously over rolling averages to eliminate ambient atmospheric noise. When levels exceed a set safety threshold, the MCU executes an immediate emergency interrupt: actuating the servo to 90 degrees (shut-off position), activating the continuous buzzer warning tone, and logging telemetry.</p>
        
        <p><em>*Educational Notice: Built for learning embedded systems, sensor calibration, and physical computing concepts. Not certified for hazardous industrial installations.</em></p>
      `
    },
    robot: {
      title: "Arduino-Based Garbage Collection Robot",
      html: `
        <p><strong>Overview:</strong> An autonomous educational mobile robot exploring practical automation in ground waste collection, obstacle negotiation, and embedded motor driving.</p>

        <h4>Hardware & Electronics</h4>
        <ul>
          <li><strong>Arduino Microcontroller:</strong> Central control board directing navigational loops and mechanical collection sweeps.</li>
          <li><strong>Ultrasonic Distance Sensors (HC-SR04):</strong> Emitting ultrasonic pulses to calculate obstacle proximity and plot collision-free vectors.</li>
          <li><strong>L298N Dual H-Bridge Motor Driver:</strong> Regulating high-current DC gear motors for differential drive locomotion.</li>
          <li><strong>Mechanized Collector Intake & Chassis:</strong> Front-mounted intake flippers funneling lightweight waste into a rear containment hopper.</li>
        </ul>

        <h4>Software & Engineering Highlights</h4>
        <p>Implements reactive navigation algorithms: surveying front clearance, executing turn maneuvers when obstacles appear within 20cm, and driving continuous collection intake cycles.</p>
      `
    },
    dsa: {
      title: "Programming and Algorithm Projects",
      html: `
        <p><strong>Overview:</strong> A structured, modular repository of core algorithms, competitive programming solutions, and data structure implementations authored primarily in C, C++, and Python.</p>

        <h4>Focus Domains</h4>
        <ul>
          <li><strong>Data Structures:</strong> Linked lists, doubly linked lists, binary search trees (BST), balanced trees, min/max heaps, and graph adjacency lists.</li>
          <li><strong>Algorithmic Paradigms:</strong> Two-pointer techniques, sliding window patterns, divide-and-conquer, graph traversals (BFS & DFS), and shortest-path solvers (Dijkstra).</li>
          <li><strong>Complexity & Optimization:</strong> Rigorous Big-O time and space complexity evaluations to ensure code executes well within contest time limits.</li>
          <li><strong>Problem-Solving Practice:</strong> Targeted solutions to challenges from competitive programming platforms like LeetCode and Codeforces.</li>
        </ul>

        <p>The repository emphasizes readable code, explicit edge-case handling, and modular test drivers for each data structure.</p>
      `
    }
  };

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalContent.innerHTML = data.html;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scrolling

    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. Contact Form Client-side Validation & Submission Handler
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('user-name');
  const emailInput = document.getElementById('user-email');
  const subjectInput = document.getElementById('user-subject');
  const messageInput = document.getElementById('user-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function clearErrors() {
    [nameError, emailError, subjectError, messageError].forEach(el => {
      if (el) el.textContent = '';
    });
    [nameInput, emailInput, subjectInput, messageInput].forEach(el => {
      if (el) el.classList.remove('invalid');
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      nameInput.classList.add('invalid');
      isValid = false;
    }

    // Validate Email
    if (!emailInput.value.trim()) {
      emailError.textContent = 'Please enter your email address.';
      emailInput.classList.add('invalid');
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      emailInput.classList.add('invalid');
      isValid = false;
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      subjectError.textContent = 'Please provide a subject.';
      subjectInput.classList.add('invalid');
      isValid = false;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      messageError.textContent = 'Please write a message.';
      messageInput.classList.add('invalid');
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      messageError.textContent = 'Message should be at least 10 characters.';
      messageInput.classList.add('invalid');
      isValid = false;
    }

    if (!isValid) {
      showToast('Please fix the errors in the form.');
      return;
    }

    // If valid:
    // Build mailto link so the message is directly functional without an external backend
    const recipient = 'YOUR_EMAIL@example.com';
    const subject = encodeURIComponent(`[Portfolio] ${subjectInput.value.trim()} - from ${nameInput.value.trim()}`);
    const body = encodeURIComponent(
      `Hello Rudra,\n\n${messageInput.value.trim()}\n\n---\nFrom: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}`
    );
    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

    showToast('Opening your default email client with your message...');

    // Attempt to open mailto
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 400);

    // Provide friendly in-page feedback
    setTimeout(() => {
      alert(
        "Thank you! Your default email client has been opened with your pre-filled message.\n\n" +
        "Tip for Rudra: You can connect this form directly to Formspree.io or Web3Forms without running any backend servers. Check the README.md for 1-minute setup instructions!"
      );
      form.reset();
      clearErrors();
    }, 800);
  });
}

