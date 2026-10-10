document.addEventListener('DOMContentLoaded', function () {
  // KaTeX
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false
    });
  }

  // Tabs (re-trigger bar animation on switch)
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = group.querySelectorAll('.tab');
    var panels = group.querySelectorAll('.tab-panel');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.toggle('active', t === tab); });
        panels.forEach(function (p) {
          var on = p.dataset.panel === tab.dataset.tab;
          p.classList.toggle('active', on);
          if (on) {
            p.classList.add('pre-anim');
            requestAnimationFrame(function () {
              requestAnimationFrame(function () { p.classList.remove('pre-anim'); });
            });
          }
        });
      });
    });
  });

  // Sticky nav border + active section
  var nav = document.getElementById('topnav');
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 8);
    var y = window.scrollY + 90, current = -1;
    sections.forEach(function (s, i) { if (s && s.offsetTop <= y) current = i; });
    links.forEach(function (a, i) { a.classList.toggle('active', i === current); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Animate bars when they scroll into view
  var groups = document.querySelectorAll('.rw-bars, .ood-cards');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.remove('pre-anim');
        io.unobserve(e.target);
      });
    }, { threshold: 0.2 });
    groups.forEach(function (el) { el.classList.add('pre-anim'); io.observe(el); });
  }

  // Lightbox for figures
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<img alt="">';
  document.body.appendChild(box);
  box.addEventListener('click', function () { box.classList.remove('open'); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') box.classList.remove('open'); });
  document.querySelectorAll('.gallery img, .figure img, .rw-media img, .showcase-item img').forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      box.querySelector('img').src = img.src;
      box.classList.add('open');
    });
  });

  // Copy BibTeX
  var btn = document.getElementById('copy-bib');
  if (btn) {
    btn.addEventListener('click', function () {
      var text = document.getElementById('bib-text').innerText;
      var done = function () {
        btn.querySelector('span').textContent = 'Copied!';
        setTimeout(function () { btn.querySelector('span').textContent = 'Copy'; }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
    });
  }
});
