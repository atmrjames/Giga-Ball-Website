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

})();

// The app icon leans towards the pointer. Small numbers on purpose: it should read as the
// icon noticing you rather than as a thing spinning about.
(function () {
  var icon = document.querySelector('.icon');
  if (!icon) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return;

  var TILT = 13, REACH = 460;
  window.addEventListener('mousemove', function (e) {
    var box = icon.getBoundingClientRect();
    var cx = box.left + box.width/2, cy = box.top + box.height/2;
    var dx = e.clientX - cx, dy = e.clientY - cy;
    if (Math.abs(dx) > REACH || Math.abs(dy) > REACH) {
      icon.classList.remove('tracking');
      icon.style.setProperty('--lean-x', '0deg');
      icon.style.setProperty('--lean-y', '0deg');
      return;
    }
    icon.classList.add('tracking');
    icon.style.setProperty('--lean-y', (dx/REACH*TILT).toFixed(2) + 'deg');
    icon.style.setProperty('--lean-x', (-dy/REACH*TILT).toFixed(2) + 'deg');
  }, { passive: true });
})();
