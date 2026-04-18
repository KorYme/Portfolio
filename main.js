document.addEventListener('DOMContentLoaded', () => {

  /* ---- Active nav link ---- */
  const file = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === file) a.classList.add('active');
  });

  /* ---- Back-to-top ---- */
  const top = document.querySelector('.back-top');
  if (top) {
    window.addEventListener('scroll', () => top.classList.toggle('show', scrollY > 500));
    top.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- Scroll reveal ---- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

});
