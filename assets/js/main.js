(function() {
  'use strict';

  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function openMenu() {
    navbar.classList.add('open');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    navbar.classList.remove('open');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
    dropdowns.forEach((dd) => dd.classList.remove('dropdown-open'));
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navbar.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  overlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.nav-menu a:not(.dropdown-toggle)').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector('a');
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      dd.classList.toggle('dropdown-open');
    });
  });

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.pageYOffset > 50);
  }, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '#!') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('[data-category]');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      filterItems.forEach((item) => {
        item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
      });
    });
  });

  const yearEl = document.querySelector('[data-current-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
