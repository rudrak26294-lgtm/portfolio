# Rudra Kumar - Personal Developer Portfolio Website

Welcome to the source repository for **Rudra Kumar's Personal Developer Portfolio Website**.

This modern, responsive, and visually refined portfolio is tailored for a **Computer Science and Artificial Intelligence student** and aspiring software engineer. It emphasizes clean software engineering principles, algorithmic curiosity, embedded systems, and hands-on robotics prototypes.

---

## 🌟 Live Preview & Features

- **Dark Theme by Default:** Deep slate obsidian background (`#070a12`) with subtle neon cyan, indigo, and violet glowing accents.
- **Light / Dark Mode Toggle:** Seamless toggle with instant theme switching, system preference detection (`prefers-color-scheme`), and `localStorage` persistence.
- **Glassmorphism & Micro-Interactions:** Modern translucent panels with backdrop blur, polished hover lifts, glowing borders, and smooth transitions.
- **Interactive Background:** High-performance HTML5 canvas particle constellation effect that reacts gently to cursor movement and respects user accessibility preferences (`prefers-reduced-motion`).
- **Semantic & Accessible HTML5:** Full ARIA landmarks, keyboard-friendly navigation (`:focus-visible`), skip-to-content link, and accessible contrast ratios.
- **Mobile-First Responsive Design:** Looks stunning on all devices — desktops, laptops, tablets, and smartphones — with a mobile drawer hamburger menu.
- **Curated Projects Showcase:**
  - **Arduino LPG Gas Detection & Valve Control System** *(labeled as an educational prototype)*.
  - **Arduino-Based Garbage Collection Robot** *(robotics automation prototype)*.
  - **Programming and Algorithm Projects** *(C, C++, Python algorithmic problem-solving & data structures)*.
- **Interactive Project Modal:** Click *"View Details"* on any project card to inspect hardware components, algorithmic logic, and technical takeaways.
- **Reliable GitHub Section:** Displays key public repositories and profiles cleanly without failing if external GitHub APIs hit rate limits or are offline.
- **Zero-Backend Functional Contact Form:** Includes client-side input validation and opens pre-filled email drafts directly, with turnkey instructions for Formspree / Web3Forms integration.
- **SEO & Social Metadata:** Pre-configured Open Graph tags, Twitter cards, meta descriptions, and custom SVG favicon.

---

## 🛠️ Technology Stack

Designed to be lightweight, ultrafast, maintainable, and completely build-step-free:

- **HTML5:** Semantic document structure, accessible ARIA attributes, responsive metadata.
- **CSS3:** Custom properties (CSS variables), CSS Grid, Flexbox, glassmorphic filters, responsive typography with `clamp()`.
- **Vanilla JavaScript (ES6+):** Pure browser JavaScript with zero external frameworks or bulky dependencies.
- **Custom SVGs:** Scalable vector artwork for the developer avatar, project schematics, and favicon.

---

## 📁 Folder Structure

```
.
├── index.html                  # Main portfolio webpage (semantic HTML5)
├── style.css                   # Complete design system & responsive styling
├── script.js                   # Interactivity, theme toggle, particles, modal
├── README.md                   # Documentation, setup, and deployment guide
├── myself                      # Background notes & academic profile reference
└── assets/
    └── images/
        ├── favicon.svg         # Monogram developer icon
        ├── avatar.svg          # Stylized CS & AI developer portrait illustration
        ├── project-lpg.svg     # Schematic illustration for Arduino LPG project
        ├── project-robot.svg   # Illustration for Garbage Collection Robot
        └── project-dsa.svg     # Illustration for DSA & Algorithm projects
```

---

## 🚀 Local Setup with VS Code Live Server

You do not need to install Node.js, npm, or any build tools. You can run and edit this website directly in VS Code:

1. **Open the project folder:**
   - Launch **Visual Studio Code**.
   - Go to `File` > `Open Folder...` and select this project folder.
2. **Install Live Server (if not already installed):**
   - Click the **Extensions** icon in the left activity bar (or press `Ctrl+Shift+X` / `Cmd+Shift+X`).
   - Search for **Live Server** (by *Ritwick Dey*).
   - Click **Install**.
3. **Open `index.html`:**
   - In the VS Code file explorer, click on `index.html` to open it in the editor.
4. **Click "Go Live":**
   - In the bottom right status bar of VS Code, click the **Go Live** button.
   - Alternatively, right-click anywhere inside `index.html` and select **"Open with Live Server"**.
5. **View the website:**
   - Your default web browser will automatically open to `http://127.0.0.1:5500/index.html`.
6. **Editing and Auto-Refresh:**
   - Make any edits in `index.html`, `style.css`, or `script.js`.
   - Save the file (`Ctrl+S` / `Cmd+S`).
   - Live Server will instantly refresh the page in your browser so you can preview changes in real time.

---

## 📦 Git & GitHub Setup Instructions

Follow these steps to initialize Git and upload your portfolio to GitHub:

### 1. Initialize Git in the project folder
Open your terminal (or the integrated terminal in VS Code: `Ctrl+\`` or `Cmd+\``) and run:

```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
```

### 2. Create a repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Choose a repository name (e.g. `portfolio` or `rudrakumar.github.io`).
3. Set the repository to **Public**.
4. Leave *"Add a README file"* unchecked (you already have this one).
5. Click **Create repository**.

### 3. Connect and push your code
Replace `YOUR_GITHUB_REPOSITORY_URL` below with your actual repository URL (e.g. `https://github.com/your-username/portfolio.git`):

```bash
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

> **Note:** If prompted, authenticate with your GitHub credentials or Personal Access Token.

---

## 🌐 Free Deployment via GitHub Pages

You can host this website completely free with an SSL certificate using GitHub Pages:

1. Open your repository on [GitHub](https://github.com).
2. Click the **Settings** tab near the top right of the repository.
3. In the left navigation menu, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and leave the folder set to `/ (root)`.
5. Click **Save**.
6. Wait 1 to 2 minutes for GitHub to build and publish your site.
7. Refresh the Pages settings tab. You will see a banner:
   > *"Your site is live at `https://<your-username>.github.io/<repository-name>/`"*
8. Click the link to open your live portfolio website!

*All relative paths in this project (`./style.css`, `./script.js`, `./assets/...`) are built to work seamlessly with both root domains and GitHub Pages subpaths.*

---

## ✏️ Personalization Checklist (Placeholders to Replace)

Before publishing, search for the placeholders below in `index.html` and replace them with your actual details:

| Placeholder | Where it appears | What to replace it with |
| :--- | :--- | :--- |
| `YOUR_GITHUB_USERNAME` | `index.html` (Header, Hero, GitHub Section, Contact, Footer) | Your GitHub handle (e.g. `rudrakumar`) |
| `YOUR_EMAIL@example.com` | `index.html` (Contact section, mailto links, copy buttons) | Your real email address |
| `YOUR_LINKEDIN_USERNAME` | `index.html` (Contact section & Footer) | Your LinkedIn handle or profile URL slug |
| `YOUR_GITHUB_REPOSITORY_URL` | `README.md` and Git instructions | The remote Git URL of your repository |
| College Name / Year | `index.html` (Education section) | Optional: Add your specific institution name and expected graduation year |

---

## 📬 Free Contact Form Setup (Optional Backend)

Out of the box, submitting the contact form validates the inputs and opens the user's default email client (`mailto:`) with their name, subject, and message pre-filled.

If you would like to receive contact form submissions directly in your email inbox without opening the user's email client, you can use a free service like **Formspree** or **Web3Forms** in under 2 minutes:

### Option A: Using Web3Forms (No registration required)
1. Go to [web3forms.com](https://web3forms.com) and enter your email to receive a free Access Key.
2. In `index.html`, find `<form id="contact-form" class="contact-form" novalidate>` and change it to:
   ```html
   <form action="https://api.web3forms.com/submit" method="POST" id="contact-form" class="contact-form">
     <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
     <!-- Rest of inputs remain identical -->
   ```
3. In `script.js`, comment out `initContactForm()` or let it handle client-side validation before sending the POST request.

### Option B: Using Formspree
1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form and copy your unique form endpoint URL (e.g. `https://formspree.io/f/xbjwpkzl`).
3. Set the form's `action` attribute to your Formspree URL and `method="POST"`.

---

## 📄 License & Credits

- Designed and engineered for **Rudra Kumar**.
- Built with vanilla web standards (HTML5, CSS3, JavaScript).
- Open for educational use, adaptation, and continuous enhancement.

