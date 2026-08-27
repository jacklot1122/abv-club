(function () {
  var header = document.querySelector('.site-header');
  var menu = document.querySelector('.mobile-menu');
  var menuButton = document.querySelector('.menu-button');
  var closeButton = document.querySelector('.menu-close');

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  function setMenu(open) {
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuButton.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    if (open && closeButton) closeButton.focus();
  }
  if (menuButton && menu) {
    menuButton.addEventListener('click', function () { setMenu(true); });
    closeButton.addEventListener('click', function () { setMenu(false); });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
    });
  }

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

    // statement lines light up one by one as they cross the viewport centre
    var lines = Array.prototype.slice.call(document.querySelectorAll('.statement p'));
    var lineObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var i = lines.indexOf(entry.target);
          setTimeout(function () { entry.target.classList.add('lit'); }, i * 140);
          lineObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -30% 0px', threshold: 0.6 });
    lines.forEach(function (line) { lineObserver.observe(line); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in-view'); });
    document.querySelectorAll('.statement p').forEach(function (el) { el.classList.add('lit'); });
  }

  var player = document.querySelector('.player');
  if (player) {
    var video = player.querySelector('video');
    var cover = player.querySelector('.player-cover');
    cover.addEventListener('click', function () {
      cover.classList.add('hidden');
      video.setAttribute('controls', '');
      video.play();
    });
    video.addEventListener('ended', function () {
      video.removeAttribute('controls');
      cover.classList.remove('hidden');
    });
  }

  var form = document.querySelector('.apply-form');
  if (form) {
    form.addEventListener('submit', function () {
      var button = form.querySelector('button[type="submit"]');
      if (button) {
        button.disabled = true;
        button.querySelector('em').textContent = 'Sending…';
      }
    });
  }
}());
