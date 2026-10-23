# Angel Aciel Magboo — Personal Portfolio

A modern, accessible, high-performance personal portfolio website built with pure semantic HTML5, Vanilla CSS3, and modern vanilla JavaScript.

## 🚀 Key Features

- **Strict User Profile Accuracy**: Highlights authentic credentials, verified academic timeline, tutoring experience, and featured projects.
- **Emerald Design System**: Clean typography, high contrast, elegant spacing, and cohesive emerald green theme palette (`#10b981`).
- **Adaptive Theme**: Smooth toggle between Light and Dark modes with `localStorage` persistence and automatic system preference detection.
- **Accessibility & Standards**:
  - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  - WCAG AA compliant contrast ratios.
  - Skip-to-content accessible link.
  - Touch targets meeting or exceeding 44×44px.
  - Visible focus rings (`:focus-visible`).
  - Reduced-motion accessibility overrides.
- **Interactive Enhancements**:
  - Mobile hamburger drawer navigation.
  - Active section indicator on scroll via `IntersectionObserver`.
  - Dynamic skill category filter chips.
  - One-click copy email clipboard utility.
- **100% Static & Subpath Compatible**: Zero build steps or npm runtime dependencies required. Ready for GitHub Pages hosting on either root domains or subdirectories.

---

## 💻 Local Testing & Preview Instructions

### Option 1: VS Code Live Server (Recommended)
1. Open the project folder in **Visual Studio Code**.
2. If you don't already have it, install the **Live Server** extension (by *Ritwick Dey*) from the VS Code Extensions Marketplace (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Right-click on [`index.html`](./index.html) in the file explorer.
4. Select **"Open with Live Server"** (or click **"Go Live"** in the VS Code status bar at the bottom right).
5. Your browser will automatically launch and display the portfolio at `http://127.0.0.1:5500/index.html`.

### Option 2: Direct Browser Preview
Double-click [`index.html`](./index.html) in your Windows File Explorer, or open your web browser and press `Ctrl + O` to open [`index.html`](./index.html).

---

## 🌐 GitHub Pages Deployment Guide

Because all asset links and scripts use relative paths (`./styles.css`, `./script.js`), this site works seamlessly both on custom domains and default GitHub Pages subpaths (`https://<username>.github.io/<repo-name>/`).

### Step-by-Step Publishing Steps:
1. **Initialize Git & Commit**:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit for Angel Aciel Magboo portfolio"
   ```
2. **Create a GitHub Repository**:
   - Go to [GitHub.com](https://github.com/new) and create a new repository (e.g. `portfolio` or `webinar-demo`).
3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub: **Settings** > **Pages** (under the "Code and automation" section).
   - Under **Build and deployment**:
     - **Source**: `Deploy from a branch`
     - **Branch**: `main`
     - **Folder**: `/ (root)`
   - Click **Save**.
5. **View Your Live Site**:
   - Within 1–2 minutes, GitHub Pages will deploy your site at:
     `https://<your-username>.github.io/<your-repo-name>/`
