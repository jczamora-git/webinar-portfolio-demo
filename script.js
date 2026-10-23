/**
 * Angel Aciel Magboo — Personal Portfolio
 * Vanilla JavaScript Implementation
 * Handles:
 * 1. Adaptive theme toggle (light/dark) with localStorage and system preference sync
 * 2. Responsive mobile navigation drawer with accessible ARIA management
 * 3. IntersectionObserver active navigation highlighting
 * 4. Technical skills category filtering
 * 5. One-click copy email utility with clipboard feedback
 * 6. Dynamic copyright year
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Adaptive Theme Switcher (Light / Dark)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const THEME_STORAGE_KEY = 'portfolio_theme';

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    // Fall back to system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
      themeToggleBtn.setAttribute(
        'title',
        theme === 'dark' ? 'Activate light theme' : 'Activate dark theme'
      );
    }
  }

  // Initialize theme immediately
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch (e) {
        console.warn('Unable to persist theme to localStorage', e);
      }
    });
  }

  // Listen for OS system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // Only auto-switch if user hasn't explicitly set a preference
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Hamburger Navigation
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  function openMobileNav() {
    if (!mobileNav || !mobileMenuBtn) return;
    mobileNav.removeAttribute('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileNav() {
    if (!mobileNav || !mobileMenuBtn) return;
    mobileNav.setAttribute('hidden', '');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    // Close on navigation link click
    const mobileLinks = mobileNav.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });

    // Close on click outside
    document.addEventListener('click', (event) => {
      if (
        !mobileNav.contains(event.target) &&
        !mobileMenuBtn.contains(event.target) &&
        !mobileNav.hasAttribute('hidden')
      ) {
        closeMobileNav();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !mobileNav.hasAttribute('hidden')) {
        closeMobileNav();
        mobileMenuBtn.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Active Nav Highlighting via IntersectionObserver
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-desktop .nav-link');

  if ('IntersectionObserver' in window && sections.length > 0 && desktopNavLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          desktopNavLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // --------------------------------------------------------------------------
  // 4. Skills Category Filtering
  // --------------------------------------------------------------------------
  const filterChips = document.querySelectorAll('.filter-chip');
  const skillCards = document.querySelectorAll('.skill-card');

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filterValue = chip.getAttribute('data-filter');

      // Update active chip state and ARIA pressed
      filterChips.forEach((c) => {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-pressed', 'true');

      // Filter skill cards
      skillCards.forEach((card) => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. One-Click Email Copy Utility
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('email-address-text');
  const copyBtnText = document.getElementById('copy-btn-text');

  if (copyEmailBtn && emailTextEl && copyBtnText) {
    copyEmailBtn.addEventListener('click', async () => {
      const emailToCopy = emailTextEl.textContent.trim();

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Fallback for non-https or older environments
          const textArea = document.createElement('textarea');
          textArea.value = emailToCopy;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        const originalText = copyBtnText.textContent;
        copyBtnText.textContent = 'Copied!';
        copyEmailBtn.style.borderColor = 'var(--color-primary)';

        setTimeout(() => {
          copyBtnText.textContent = originalText;
          copyEmailBtn.style.borderColor = '';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. Dynamic Copyright Year
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
})();
