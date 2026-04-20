/* ============================================================
   MAXIME CORBY — Shared JS
   ============================================================ */

/* ── Tech icon map (inline SVG paths, no CDN dependency) ─── */
const TECH_ICONS = {
  'Unity':            'assets/_logos/unity_white.png',
  'C#':               'assets/_logos/csharp_black.png',
  'Unreal Engine 5':  'assets/_logos/unreal_engine.png',
  'C++':              'assets/_logos/cpp_white.png',
  'Wwise':            'assets/_logos/wwise.png',
  'GitHub Actions':   'assets/_logos/github_white.png',
  'Blueprint':        'assets/_logos/pc_white.png',
  'HLSL':             'assets/_logos/hlsl.png',
  'Steam':            'assets/_logos/steam_white.png',
  'PlayStore':        'assets/_logos/google_play.png',
  'default':          'assets/_logos/pc_white.png'
};

function getTechIcon(name) {
  const src = TECH_ICONS[name] || TECH_ICONS['default'];
  return `<img src="${src}" alt="${name}" style="width:11px;height:11px;object-fit:contain;filter:brightness(0) invert(1);opacity:.7">`;
}

/* ── Tech badge HTML ──────────────────────────────── */
function techBadgeHTML(techs, cls = 'tech-tag') {
  return (techs || []).map(t =>
    `<span class="${cls}">${getTechIcon(t)}<span>${t}</span></span>`
  ).join('');
}

/* ── Image layout ────────────────────────────────── */
function renderImgs(images) {
  const v = (images || []).filter(Boolean).slice(0, 3);
  if (!v.length) return '';

  const cls = ['', 'imgs-1', 'imgs-2', 'imgs-3'][v.length];

  const items = v.map(src => {
    if (src.match(/\.mp4$/i)) {
      return `<video class="proj-img" src="${src}" autoplay muted loop playsinline></video>`;
    }
    return `<img class="proj-img" src="${src}" alt="" loading="lazy">`;
  }).join('');

  return `<div class="proj-imgs ${cls}">${items}</div>`;
}

/* ── Shared init ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  /* Active nav */
  const file = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === file) a.classList.add('active');
  });

  /* Back-to-top */
  const btn = document.querySelector('.back-top');
  if (btn) {
    window.addEventListener('scroll', () => btn.classList.toggle('show', scrollY > 400));
    btn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* Scroll reveal */
  revealAll(document);
});

function revealAll(root) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.07 });
  root.querySelectorAll('.reveal').forEach(el => io.observe(el));
}
