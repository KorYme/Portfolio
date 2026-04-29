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
  'SFML':             'assets/_logos/sfml.png',
  'Steam':            'assets/_logos/steam_white.png',
  'PlayStore':        'assets/_logos/google_play.png',
  'AppStore':         'assets/_logos/apple_store.png',
  'Jira':             'assets/_logos/jira.png',
  'VR':               'assets/_logos/vr_white.png',
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

/* ── buildMediaElement ───────────────────────────────
   Generate HTML in a single asset (img/gif/mp4)
   with the chosen display method.
   ─────────────────────────────────────────────────── */
function buildMediaElement(item) {
  const src = typeof item === 'string' ? item : item.src;
  const d   = (typeof item === 'object' && item.display) ? item.display : {};
  const mode     = d.mode       || 'cover';
  const ratio    = d.ratio      || '16/9';
  const position = d.position   || 'center';
  const bg       = d.background || 'var(--surface)';
  const maxWidth = d.maxWidth   || '100%';
  const height   = d.height     || '400px';
  const overflow = d.overflow   || 'hidden';
  const isVideo  = src.match(/\.mp4$/i);

  switch (mode) {

    case 'cover':
      return `
        <div style="aspect-ratio:${ratio};overflow:hidden;background:var(--surface);position:relative;">
          <div style="position:absolute;inset:0;overflow:hidden;">
            ${isVideo
          ? `<video src="${src}" autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover;object-position:${position};display:block;"></video>`
          : `<img src="${src}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;object-position:${position};display:block;">`}
          </div>
        </div>`;

    case 'contain':
      return `
        <div style="aspect-ratio:${ratio};overflow:hidden;background:${bg};display:flex;align-items:center;justify-content:center;">
          ${isVideo
          ? `<video src="${src}" autoplay muted loop playsinline style="max-width:100%;max-height:100%;object-fit:contain;display:block;"></video>`
          : `<img src="${src}" alt="" loading="lazy" style="max-width:100%;max-height:100%;object-fit:contain;display:block;">`}
        </div>`;

    case 'stretch':
      return `
        <div style="aspect-ratio:${ratio};overflow:hidden;">
          ${isVideo
          ? `<video src="${src}" autoplay muted loop playsinline style="width:100%;height:100%;object-fit:fill;display:block;"></video>`
          : `<img src="${src}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:fill;display:block;">`}
        </div>`;

    case 'native':
      return `
        <div style="max-width:${maxWidth};margin:0 auto;">
          ${isVideo
          ? `<video src="${src}" autoplay muted loop playsinline style="width:100%;height:auto;display:block;"></video>`
          : `<img src="${src}" alt="" loading="lazy" style="width:100%;height:auto;display:block;">`}
        </div>`;

    case 'fixed-height':
      return `
        <div style="height:${height};overflow:${overflow};background:var(--surface);">
          ${isVideo
          ? `<video src="${src}" autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover;display:block;"></video>`
          : `<img src="${src}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;">`}
        </div>`;
      
    case 'fixed-width':
      return `
    <div style="width:${d.width || '100%'};margin:0 auto;overflow:${overflow};">
      ${isVideo
          ? `<video src="${src}" autoplay muted loop playsinline style="width:100%;height:auto;display:block;"></video>`
          : `<img src="${src}" alt="" loading="lazy" style="width:100%;height:auto;display:block;">`}
    </div>`;

    default:
      return `<img src="${src}" alt="" loading="lazy" style="width:100%;height:auto;display:block;">`;
  }
}

function buildThumb(p) {
    const thumb    = p.thumbnail;
    const thumbGif = p.thumbnailGif;

    const stillSrc    = thumb    ? thumb.src    : null;
    const stillDisplay = (thumb    && thumb.display    && Object.keys(thumb.display).length    > 0) ? thumb.display    : null;
    const gifSrc      = thumbGif ? thumbGif.src : null;
    const gifDisplay   = (thumbGif && thumbGif.display && Object.keys(thumbGif.display).length > 0) ? thumbGif.display : null;

    if (!stillSrc) return `<div class="thumb-ph">[ ${p.title} ]</div>`;

    function resolveStyles(display) {
        const mode     = display ? (display.mode     || 'cover')           : 'cover';
        const position = display ? (display.position || 'center')          : 'center';
        const bg       = display ? (display.background || 'var(--surface)'): 'var(--surface)';
        const maxWidth = display ? (display.maxWidth || '100%')            : '100%';

        let imgStyle  = '';
        let wrapStyle = 'position:absolute;inset:0;overflow:hidden;';

        switch (mode) {
            case 'cover':
                imgStyle = `width:100%;height:100%;object-fit:cover;object-position:${position};display:block;`;
                break;
            case 'contain':
                wrapStyle += `background:${bg};display:flex;align-items:center;justify-content:center;`;
                imgStyle   = `max-width:100%;max-height:100%;object-fit:contain;display:block;`;
                break;
            case 'stretch':
                imgStyle = `width:100%;height:100%;object-fit:fill;display:block;`;
                break;
            case 'native':
                wrapStyle += `display:flex;align-items:center;justify-content:center;`;
                imgStyle   = `max-width:${maxWidth};width:auto;height:auto;max-height:100%;display:block;`;
                break;
            default:
                imgStyle = `width:100%;height:100%;object-fit:cover;display:block;`;
        }

        return { imgStyle, wrapStyle };
    }

    const { imgStyle: stillImgStyle, wrapStyle } = resolveStyles(stillDisplay);

    if (gifSrc) {
        const { imgStyle: gifImgStyle } = resolveStyles(gifDisplay);
        return `
      <div style="${wrapStyle}">
        ${mediaTag(stillSrc, 'img-still', p.title, stillImgStyle)}
        ${mediaTag(gifSrc,   'img-gif',   p.title, gifImgStyle)}
      </div>`;
    }

    return `<div style="${wrapStyle}">${mediaTag(stillSrc, '', p.title, stillImgStyle)}</div>`;
}

function mediaTag(src, cls, alt, style) {
    return src.match(/\.mp4$/i)
        ? `<video ${cls ? `class="${cls}"` : ''} src="${src}" autoplay muted loop playsinline style="${style}"></video>`
        : `<img ${cls ? `class="${cls}"` : ''} src="${src}" alt="${alt}" loading="lazy" style="${style}">`;
}

/* ── renderImgs ──────────────────────────────────────
   Handle 1, 2 or 3 assets with automatic layout.
   Each item can be a simple string (simple path)
   or an object { src, display } for advanced display modes.
   ─────────────────────────────────────────────────── */
function renderImgs(images) {
  const v = (images || []).filter(Boolean).slice(0, 3);
  if (!v.length) return '';

  if (v.length === 1) {
    return `<div class="proj-imgs imgs-1">${buildMediaElement(v[0])}</div>`;
  }

  if (v.length === 2) {
    return `
      <div class="proj-imgs imgs-2">
        ${v.map(item => `<div>${buildMediaElement(item)}</div>`).join('')}
      </div>`;
  }

  // 3 elements
  return `
    <div class="proj-imgs imgs-3">
      ${v.map((item, i) => `<div style="${i===0 ? 'grid-column:1/-1' : ''}">${buildMediaElement(item)}</div>`).join('')}
    </div>`;
}

/* ── parseMarkdown ──────────────────────────────────────
   Handle markdown for some texts such as Discord.
   ─────────────────────────────────────────────────── */
function parseMarkdown(text) {
  return text
      // Italic bold : ***text***
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      // Bold : **text**
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic : *text* ou _text_
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      // Underlined : __text__
      .replace(/__(.*?)__/g, '<u>$1</u>')
      // Strikethrough  : ~~text~~
      .replace(/~~(.*?)~~/g, '<s>$1</s>');
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
