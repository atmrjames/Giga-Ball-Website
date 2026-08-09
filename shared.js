// The two behaviours both pages share: things arriving as you reach them, and a thin
// bar showing how far down you are. Kept together so the sneak peek behaves exactly like
// the landing page rather than approximately like it.

(function () {
  var watched = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    watched.forEach(function (el) { el.classList.add('in'); });
  } else {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        seen.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    watched.forEach(function (el) { seen.observe(el); });
  }

  var bar = document.getElementById('progress');
  if (!bar) return;
  var ticking = false;
  function update() {
    var scrolled = window.scrollY;
    var total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();
})();
