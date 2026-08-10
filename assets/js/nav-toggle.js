(function () {
  var nav = document.getElementById('site-nav');
  var btn = nav && nav.querySelector('.nav-toggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // close nav when a link is clicked (mobile)
  nav.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () {
      nav.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();
