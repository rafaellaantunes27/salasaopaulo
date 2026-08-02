(() => {
  const body = document.body;
  const menuButton = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-overlay');
  const links = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('.panel-section')];

  const setMenu = (open) => {
    body.classList.toggle('menu-open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
    if (overlay) overlay.hidden = !open;
  };

  menuButton?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  overlay?.addEventListener('click', () => setMenu(false));
  links.forEach((link) => link.addEventListener('click', () => setMenu(false)));

  const updateActiveLink = () => {
    const offset = window.innerHeight * 0.3;
    let current = sections[0]?.id;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= offset) current = section.id;
    });
    links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  };

  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink, { passive: true });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setMenu(false);
    updateActiveLink();
  });
})();
