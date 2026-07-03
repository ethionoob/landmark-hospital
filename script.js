(function () {
  'use strict';

  // Navigation DOM Nodes
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinksMenu = document.getElementById('navLinks');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const structuralLinks = document.querySelectorAll('.nav-links a');

  /**
   * Orchestrates the opening/closing mechanics of the responsive Mobile Drawer.
   * @param {boolean|null} forceStateClose Explicit status declaration override.
   */
  function toggleMobileMenu(forceStateClose = null) {
    const isCurrentlyOpen = navLinksMenu.classList.contains('open');
    const targetState = (forceStateClose !== null) ? !forceStateClose : !isCurrentlyOpen;

    if (targetState) {
      navLinksMenu.classList.add('open');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      hamburgerIcon.className = 'fas fa-times';
      document.body.style.overflow = 'hidden'; // Prevents background body scrolling layout bleed
    } else {
      navLinksMenu.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerIcon.className = 'fas fa-bars';
      document.body.style.overflow = '';
    }
  }

  // Hamburger Button Explicit Bound Trigger
  hamburgerBtn.addEventListener('click', function (event) {
    event.stopPropagation();
    toggleMobileMenu();
  });

  // Global Context Click Catcher to close Drawer when clicking outside area
  document.addEventListener('click', function (event) {
    if (navLinksMenu.classList.contains('open')) {
      const isClickInsideMenu = navLinksMenu.contains(event.target);
      const isClickInsideBtn = hamburgerBtn.contains(event.target);

      if (!isClickInsideMenu && !isClickInsideBtn) {
        toggleMobileMenu(true);
      }
    }
  });

  // Structural links integration layer for seamless page jump actions
  structuralLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Clean mobile state configuration matrix post-click
      toggleMobileMenu(true);

      // Mutate visual tracking selection coordinates
      structuralLinks.forEach(el => el.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Intersection Observer for active dynamic state menu link highlighting
  const sectionTrackingElements = document.querySelectorAll('section, header');
  const intersectionConfiguration = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Exact middle focal screen evaluation
    threshold: 0
  };

  const linkStateObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const structuralId = entry.target.getAttribute('id');
        if (!structuralId) return;

        structuralLinks.forEach(link => {
          if (link.getAttribute('href') === `#${structuralId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, intersectionConfiguration);

  sectionTrackingElements.forEach(section => {
    if (section.getAttribute('id')) {
      linkStateObserver.observe(section);
    }
  });

})();
