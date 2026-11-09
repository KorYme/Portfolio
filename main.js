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

/* ── zoomWrap ────────────────────────────────────────
   Wraps a media item so it can open in the lightbox.
   Disable per image with  "display": { "zoom": false }
   ─────────────────────────────────────────────────── */
function zoomWrap(item, style = '') {
    const src     = typeof item === 'string' ? item : item.src;
    const zoomOff = typeof item === 'object' && item.display && item.display.zoom === false;
    const media   = buildMediaElement(item);
    return zoomOff
        ? `<div style="${style}">${media}</div>`
        : `<div class="zoomable" data-src="${src}" style="${style}">${media}</div>`;
}

/* ── renderImgs ──────────────────────────────────────
   Handle 1, 2 or 3 assets with automatic layout.
   Each item can be a simple string (simple path)
   or an object { src, display } for advanced display modes.
   ─────────────────────────────────────────────────── */
function renderImgs(images) {
    const v = (images || []).filter(Boolean).slice(0, 3);
    if (!v.length) return '';
    const cls = ['', 'imgs-1', 'imgs-2', 'imgs-3'][v.length];
    return `<div class="proj-imgs ${cls}">
    ${v.map((item, i) => zoomWrap(item, (v.length === 3 && i === 0) ? 'grid-column:1/-1' : '')).join('')}
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

/* ── Lightbox ────────────────────────────────────────
   Click on a .zoomable → fullscreen viewer, navigation
   (buttons, arrow keys, swipe) within the same .proj-imgs group.
   ─────────────────────────────────────────────────── */
const Lightbox = (() => {
    let el, stage, counter, prevBtn, nextBtn;
    let items = [], index = 0, touchX = null;

    const chevron = d => `<svg viewBox="0 0 24 24"><path d="${d}"/></svg>`;

    function build() {
        el = document.createElement('div');
        el.className = 'lightbox';
        el.innerHTML = `
      <button class="lb-btn lb-close" aria-label="Close">${chevron('M6 6l12 12M18 6L6 18')}</button>
      <button class="lb-btn lb-prev" aria-label="Previous">${chevron('M15 5l-7 7 7 7')}</button>
      <div class="lb-stage"></div>
      <button class="lb-btn lb-next" aria-label="Next">${chevron('M9 5l7 7-7 7')}</button>
      <div class="lb-counter"></div>`;
        document.body.appendChild(el);

        stage   = el.querySelector('.lb-stage');
        counter = el.querySelector('.lb-counter');
        prevBtn = el.querySelector('.lb-prev');
        nextBtn = el.querySelector('.lb-next');

        el.querySelector('.lb-close').addEventListener('click', close);
        prevBtn.addEventListener('click', () => show(index - 1));
        nextBtn.addEventListener('click', () => show(index + 1));
        el.addEventListener('click', e => { if (e.target === el || e.target === stage) close(); });

        el.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
        el.addEventListener('touchend', e => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
            touchX = null;
        });

        document.addEventListener('keydown', e => {
            if (!el.classList.contains('open')) return;
            if (e.key === 'Escape')     close();
            if (e.key === 'ArrowLeft')  show(index - 1);
            if (e.key === 'ArrowRight') show(index + 1);
        });
    }

    function show(i) {
        index = (i + items.length) % items.length;
        const src = items[index];
        stage.innerHTML = src.match(/\.mp4$/i)
            ? `<video src="${src}" controls autoplay loop muted playsinline></video>`
            : `<img src="${src}" alt="">`;
        counter.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : '';
        prevBtn.style.display = nextBtn.style.display = items.length > 1 ? '' : 'none';
    }

    function open(srcList, startIndex) {
        if (!el) build();
        items = srcList;
        show(startIndex);
        el.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        el.classList.remove('open');
        stage.innerHTML = '';          // stops any playing video
        document.body.style.overflow = '';
    }

    return { open };
})();

document.addEventListener('click', e => {
    const z = e.target.closest('.zoomable');
    if (!z) return;
    const group = [...z.closest('.proj-imgs').querySelectorAll('.zoomable')];
    Lightbox.open(group.map(g => g.dataset.src), group.indexOf(z));
});