    (function() {
      const btn = document.getElementById('hamburgerBtn');
      const nav = document.getElementById('navLinks');
      const icon = document.getElementById('hamburgerIcon');

      function toggleMenu(forceClose) {
        const isOpen = nav.classList.contains('open');
        if (forceClose === true && !isOpen) return;
        nav.classList.toggle('open');
        const nowOpen = nav.classList.contains('open');
        icon.className = nowOpen ? 'fas fa-times' : 'fas fa-bars';
        document.body.style.overflow = nowOpen ? 'hidden' : '';
      }

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
      });

      document.addEventListener('click', (e) => {
        const isNavOpen = nav.classList.contains('open');
        if (!isNavOpen) return;
        const target = e.target;
        if (!nav.contains(target) && target !== btn && !btn.contains(target)) {
          toggleMenu(true);
        }
      });

      nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          if (nav.classList.contains('open')) toggleMenu(true);
        });
      });

      // Optional: gallery button click handler (you can replace with your own logic)
      document.getElementById('galleryBtn')?.addEventListener('click', function(e) {
        e.preventDefault();
        alert('You can link this button to your gallery page later.');
      });
    })();