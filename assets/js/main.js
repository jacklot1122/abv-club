(function () {
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.mobile-menu');
  const menuButton = document.querySelector('.menu-button');
  const closeButton = document.querySelector('.menu-close');

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }

  function setMenu(open) {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    if (open) closeButton.focus();
  }

  menuButton.addEventListener('click', function () { setMenu(true); });
  closeButton.addEventListener('click', function () { setMenu(false); });
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
  });

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (element) { observer.observe(element); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (element) { element.classList.add('in-view'); });
  }

  const form = document.querySelector('.apply-form');
  if (form) {
    form.addEventListener('submit', function () {
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.textContent = 'Sending application…';
    });
  }
}());
