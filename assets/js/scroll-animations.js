(function () {
  if (!('IntersectionObserver' in window)) {
    // fallback: just make everything visible
    document.querySelectorAll('.animate-in').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.animate-in').forEach(function (el) {
    observer.observe(el);
  });
})();
