// Общие части: шапка, футер, модалка, рендер разделов.
const S = window.SITE;

// Язык: ru / en, запоминаем выбор в браузере. Переводятся интерфейс и имя; контент пока на русском.
const LANG = (() => { try { return localStorage.getItem("lang") === "en" ? "en" : "ru"; } catch { return "ru"; } })();
document.documentElement.lang = LANG;
const T = {
  ru: { author: "Дмитрий Рындин", photo: "Фото", video: "Видео", projects: "Экспедиции", ai: "AI", about: "Об авторе",
        menu: "Меню", close: "Закрыть", reels: "Вертикальный контент", vertical: "Вертикальные", showreel: "Шоурил", soon: "скоро", myProjects: "Мои проекты",
        aboutExp: "Об экспедиции", route: "Маршрут", film: "Фильм", authorWord: "Слово автора", supported: "При поддержке", allProjects: "Все экспедиции", services: "Что я снимаю", places: "География моих проектов", clients: "С кем работал", gear: "Техника", contacts: "Контакты", barents: "Баренцево море", white: "Белое море" },
  en: { author: "Dmitry Ryndin", photo: "Photo", video: "Video", projects: "Expeditions", ai: "AI", about: "About",
        menu: "Menu", close: "Close", reels: "Vertical content", vertical: "Vertical", showreel: "Showreel", soon: "coming soon", myProjects: "My projects",
        aboutExp: "About the expedition", route: "Route", film: "Film", authorWord: "From the author", supported: "Supported by", allProjects: "All expeditions", services: "What I shoot", places: "Geography of my projects", clients: "Clients", gear: "Gear", contacts: "Contacts", barents: "Barents Sea", white: "White Sea" }
}[LANG];
const NAV = [
  ["index.html", T.photo],
  ["video.html", T.video],
  ["projects.html", T.projects],
  // ["ai.html", T.ai],   // раздел AI пока не публикуем — вернуть, когда будет готов
  ["about.html", T.about]
];
const here = location.pathname.split("/").pop() || "index.html";
// Заголовок вкладки статичных страниц — тоже на выбранном языке
if (LANG === "en") document.title = document.title.replace("Об авторе", T.about).replace("Экспедиции", T.projects).replace("Видео", T.video).replace("Фото", T.photo).replace("Дмитрий Рындин", T.author);

document.body.insertAdjacentHTML("afterbegin", `
  <header class="header">
    <a class="logo" href="index.html">${T.author}</a>
    <nav class="nav">${NAV.map(([h, t]) =>
      `<a href="${h}" class="${h === here || (here === "project.html" && h === "projects.html") ? "active" : ""}">${t}</a>`).join("")}</nav>
    <div class="tools">
      <div class="lang">${["ru", "en"].map(l => `<button data-lang="${l}" class="${l === LANG ? "active" : ""}">${l.toUpperCase()}</button>`).join("<span>/</span>")}</div>
      <button class="burger" aria-label="${T.menu}">☰</button>
    </div>
  </header>`);
document.body.insertAdjacentHTML("beforeend", `
  <footer class="footer"><span>© ${T.author}, ${new Date().getFullYear()}</span>
    <div class="footer-contacts"><a class="phone" href="tel:+79258103091">+7 925 810-30-91</a>
    <a class="tg" href="https://t.me/Vtorn1k" target="_blank" rel="noopener" aria-label="Telegram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.56 8.16-1.97 9.29c-.15.66-.54.82-1.09.51l-3-2.21-1.45 1.39c-.16.16-.3.3-.61.3l.21-3.05 5.56-5.02c.24-.21-.05-.33-.38-.12l-6.87 4.33-2.96-.92c-.64-.2-.66-.64.14-.95l11.57-4.46c.54-.2 1.01.13.85.91Z"/></svg></a></div></footer>
  <div class="modal"><button class="close" aria-label="${T.close}">×</button><div class="box"></div></div>`);
document.querySelectorAll(".lang button").forEach(b => b.onclick = () => {
  if (b.dataset.lang === LANG) return;
  try { localStorage.setItem("lang", b.dataset.lang); } catch {}
  location.reload();
});
document.querySelector(".burger").onclick = () => document.querySelector(".nav").classList.toggle("open");

const modal = document.querySelector(".modal");
const box = modal.querySelector(".box");
function openModal(html, cls = "") { box.className = "box " + cls; box.innerHTML = html; modal.classList.add("open"); }
function closeModal() { box.innerHTML = ""; modal.classList.remove("open"); gallery = null; }
// Просмотр фото со стрелками: ← → на клавиатуре, свайп на телефоне, кнопки по краям
let gallery = null;
function openGallery(srcs, i, count = true) {
  gallery = { srcs, i, count };
  openModal(`<img alt=""><button class="gnav prev" aria-label="←">‹</button><button class="gnav next" aria-label="→">›</button><div class="gcount"></div>`, "photo gallery");
  box.querySelector(".prev").onclick = e => { e.stopPropagation(); step(-1); };
  box.querySelector(".next").onclick = e => { e.stopPropagation(); step(1); };
  let x0 = null;
  box.ontouchstart = e => { x0 = e.touches[0].clientX; };
  box.ontouchend = e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1); };
  showSlide();
}
function step(d) { if (!gallery) return; const n = gallery.srcs.length; gallery.i = (gallery.i + d + n) % n; showSlide(); }
function showSlide() {
  const { srcs, i } = gallery, n = srcs.length;
  box.querySelector("img").src = srcs[i];
  box.querySelector(".gcount").textContent = gallery.count ? `${i + 1} / ${n}` : "";
  [srcs[(i + 1) % n], srcs[(i - 1 + n) % n]].forEach(s => { const im = new Image(); im.src = s; });   // соседние — заранее
}
modal.querySelector(".close").onclick = closeModal;
modal.onclick = e => { if (e.target === modal) closeModal(); };
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
  else if (gallery && e.key === "ArrowRight") step(1);
  else if (gallery && e.key === "ArrowLeft") step(-1);
});

const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function playVideo(v) {
  v = localize(v);
  if (!v.src) return openModal(`<p>${v.title} — ${T.soon}</p>`);
  const player = /\.(mp4|webm)$/i.test(v.src)
    ? `<video src="${v.src}" poster="${v.poster || ""}" controls autoplay playsinline></video>`
    : `<iframe src="${v.src}" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  openModal(player, v.vertical ? "vertical" : "");
}

// Первые ряды: в 1-м ряду ровно одно вертикальное фото (в случайной колонке),
// во 2-м ряду вертикальных нет — остальные вертикальные идут ниже.
// Фото с later: true (список «Не на первых рядах.txt») — не раньше 6-го ряда.
function firstRowsMix(list, cols) {
  const LATE_ROWS = 5;
  const isV = p => p.ratio < 0.95;
  const late = list.filter(p => p.later), pool = list.filter(p => !p.later);
  const vert = pool.filter(isV), rest = pool.filter(p => !isV(p));
  let out = pool;
  if (vert.length && rest.length >= cols * 2 - 1) {
    const top = rest.splice(0, cols * 2 - 1);
    top.splice(Math.random() * cols | 0, 0, vert.shift());
    out = [...top, ...shuffle([...rest, ...vert])];
  }
  // поздние фото вставляем случайно, но только после первых LATE_ROWS рядов
  const safe = cols * (LATE_ROWS + 1);
  late.forEach(p => out.splice(safe + (Math.random() * (out.length - safe + 1) | 0), 0, p));
  return out;
}

// Превью для сетки: рядом с фото лежит папка t/ (~900px, делает tools_thumbs.py); полное фото — по клику
const thumb = src => src.replace(/\/([^/]+)$/, "/t/$1");

// Masonry: раскладываем фото по колонкам, каждое — в самую короткую.
// Лента «бесконечная»: когда фото кончаются, перемешиваем заново и идём по кругу.
// Плитки проявляются (dissolve), когда доходят до экрана при прокрутке.
const reveal = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); }
}), { rootMargin: "0px 0px -8% 0px" });

function masonry(el, photos, { endless = false, maxCols = 4 } = {}) {
  const colsFor = () => Math.min(maxCols, innerWidth <= 900 ? 2 : innerWidth <= 1200 ? 3 : 4);   // на телефоне — плитка в 2 колонки
  let cols = [], heights = [], queue = [], shown = [];
  const next = () => {
    if (!queue.length) {
      if (!endless && shown.length >= photos.length) return null;
      queue = shuffle(photos);
      if (!shown.length) queue = firstRowsMix(queue, colsFor());
    }
    return queue.shift();
  };
  const place = (p, idx = shown.length - 1) => {
    const k = heights.indexOf(Math.min(...heights));
    cols[k].insertAdjacentHTML("beforeend",
      `<div class="item" data-i="${idx}" data-src="${p.src}" style="aspect-ratio:${p.ratio}"><img src="${thumb(p.src)}" loading="lazy" decoding="async" alt="" onload="this.classList.add('loaded')"></div>`);
    reveal.observe(cols[k].lastElementChild);
    heights[k] += 1 / p.ratio;
  };
  const build = () => {
    el.innerHTML = ""; cols = []; heights = [];
    for (let i = 0; i < colsFor(); i++) { const c = document.createElement("div"); c.className = "col"; el.append(c); cols.push(c); heights.push(0); }
    shown.forEach(place);
  };
  // 5 рядов ≈ 5 горизонтальных кадров 3:2 по высоте; «поздние» фото ставим только ниже
  const LATE_TOP = 5 / 1.5;
  const more = (n = 15) => {
    for (let i = 0, tries = 0; i < n && tries < n * 4; tries++) {
      const p = next(); if (!p) return false;
      if (p.later && Math.min(...heights) < LATE_TOP) { queue.splice(cols.length, 0, p); continue; }
      shown.push(p); place(p); i++;
    }
  };
  el.classList.add("masonry");
  el.onclick = e => { const it = e.target.closest(".item"); if (it) openGallery((endless ? shown : shown.concat(queue.length ? queue : shuffle(photos.filter(p => !shown.includes(p))))).map(p => p.src), +it.dataset.i, !endless); };   // в экспедиции листаются все фото, даже ещё не подгруженные
  build(); more(21);
  let n = colsFor();
  addEventListener("resize", () => { if (colsFor() !== n) { n = colsFor(); build(); } });
  const sentinel = document.createElement("div"); sentinel.className = "sentinel"; el.after(sentinel);
  // Догружаем, пока низ ленты ближе 1200px к экрану (observer сам не перезапускается, если sentinel остался видимым)
  const fill = () => { let guard = 10; while (guard-- && sentinel.getBoundingClientRect().top < innerHeight + 1200 && more() !== false); };
  new IntersectionObserver(([e]) => e.isIntersecting && fill(), { rootMargin: "1200px" }).observe(sentinel);
  addEventListener("scroll", fill, { passive: true });
}

// Галерея «парами»: по два кадра в ряд одной высоты (ширина — по пропорциям), средний размер.
function pairs(el, photos) {
  const draw = () => {
    const rows = [];
    for (let i = 0; i < photos.length; i += 2) rows.push(photos.slice(i, i + 2));
    el.innerHTML = rows.map((r, ri) => `<div class="prow">${r.map((p, pi) => `<div class="item reveal" data-i="${ri * 2 + pi}" data-src="${p.src}" style="flex:${p.ratio} 1 0;aspect-ratio:${p.ratio}">
      <img src="${thumb(p.src)}" loading="lazy" decoding="async" alt="" onload="this.classList.add('loaded')"></div>`).join("")}</div>`).join("");
    el.querySelectorAll(".item").forEach(it => reveal.observe(it));
  };
  el.classList.add("pairs");
  el.onclick = e => { const it = e.target.closest(".item"); if (it) openGallery(photos.map(p => p.src), +it.dataset.i); };
  draw();
}

// Версия картинок: меняется, когда переделываем обложки, чтобы браузер не показывал старые из кэша
const ASSET_V = 11;
function tiles(list, cls) {
  const vertical = cls === "rgrid";               // у вертикалок — без подписей, только Play
  return `<div class="${cls}">${list.map(localize).map((v, k) => `
    <div class="vtile reveal${v.pending ? " pending" : ""}" data-k="${k}" style="background-image:url('${v.poster}?v=${ASSET_V}');transition-delay:${(k % (vertical ? 6 : 4)) * 80}ms">
      <svg class="play" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="31" /><path d="M26 20 L46 32 L26 44 Z" /></svg>
      ${vertical ? "" : `<span><b>${v.title}</b>${v.sub ? `<i>${v.sub}</i>` : ""}</span>${v.dur ? `<em>${fmt(v.dur)}</em>` : ""}`}
    </div>`).join("")}</div>`;
}
function bindTiles(el, list) {
  el.querySelectorAll(".vtile").forEach(t => t.onclick = () => playVideo(list[t.dataset.k]));
}

// Схема маршрута: точки по реальным координатам (равнопромежуточная проекция), пунктир между ними
function routeMap(route, C) {
  if (!C) return "";                                  // берега (Natural Earth), та же проекция, что и точки
  const { W, H, k, lon0, lat1 } = C, cosL = Math.cos(C.cosLat * Math.PI / 180);
  const x = r => (r.lon - lon0) * cosL * k, y = r => (lat1 - r.lat) * k;
  const path = route.map((r, i) => `${i ? "L" : "M"}${x(r).toFixed(1)},${y(r).toFixed(1)}`).join(" ");
  const grid = [63, 64, 65, 66, 67, 68, 69, 70].map(l => { const yy = (lat1 - l) * k;
    return `<line x1="0" x2="${W}" y1="${yy}" y2="${yy}" class="g"/><text x="${W - 8}" y="${yy - 6}" class="gl" text-anchor="end">${l}°</text>`; }).join("");
  const stops = route.filter(r => !r.via);            // via — невидимые точки, чтобы маршрут обходил сушу
  const dots = stops.map((r, i) => {
    const left = x(r) > W * .55, below = r.main;
    let tx = below ? x(r) + 16 : x(r) + (left ? -14 : 14), ty = below ? y(r) - 10 : y(r) + 5;
    let anchor = below ? "start" : left ? "end" : "start";
    if (r.label) { tx = x(r) + r.label.dx; ty = y(r) + r.label.dy; anchor = r.label.anchor || "middle"; }   // ручное положение подписи
    return `<g class="pt${r.main ? " main" : ""}"><circle cx="${x(r)}" cy="${y(r)}" r="${r.main ? 7 : 5.5}"/>
      <text x="${tx}" y="${ty}" text-anchor="${anchor}">${i + 1}</text></g>`; }).join("");
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Карта маршрута экспедиции">
    <rect width="${W}" height="${H}" class="sea-bg"/>${grid}<path d="${C.d}" class="land"/>
    ${(C.labels || []).map(l => `<text x="${l.x}" y="${l.y}" class="sea" text-anchor="${l.anchor || "start"}">${l[LANG] || l.ru}</text>`).join("")}
    <path d="${path}" class="route"/>${dots}</svg>`;
}

// Английская версия: поля из .en поверх русских (route — по порядку точек)
function localize(o) {
  if (!o || LANG !== "en" || !o.en) return o;
  const r = { ...o, ...o.en };
  if (o.route && o.en.route) r.route = o.route.map((x, i) => ({ ...x, ...(o.en.route[i] || {}) }));
  if (o.author && o.en.author) r.author = { ...o.author, ...o.en.author };
  return r;
}

// Карта России для «Об авторе»: контур из maps.js, точки — коническая проекция Ламберта с теми же параметрами
function russiaMap(places, M) {
  if (!M) return "";
  const xy = (lon, lat) => {
    if (lon < 0) lon += 360;
    const r = M.F / Math.tan(Math.PI / 4 + lat * Math.PI / 360) ** M.n, t = M.n * (lon - M.lon0) * Math.PI / 180;
    return [(r * Math.sin(t) - M.x0) * M.k + M.pad, (r * Math.cos(t) - M.y0) * M.k + M.pad];
  };
  const name = p => LANG === "en" && p.en ? p.en : p.name;
  const pts = places.map((p, i) => { const [x, y] = xy(p.lon, p.lat); return { ...p, x, y, i }; });
  return `<div class="rmap"><svg viewBox="0 0 ${M.W} ${M.H}" role="img" aria-label="${T.places}">
      <defs><path id="ru-land" d="${M.d}" /></defs>
      <use href="#ru-land" class="land-edge" /><use href="#ru-land" class="land" />
      ${pts.map(p => { const g = `<g class="pt${p.home ? " home" : ""}${p.link ? " link" : ""}" data-name="${name(p)}${p.link ? " →" : ""}" transform="translate(${p.x.toFixed(1)},${p.y.toFixed(1)})">
        <circle class="halo" r="${p.home ? 14 : 11}" /><circle class="dot" r="${p.home ? 6.5 : 5}" /></g>`;
        return p.link ? `<a href="${p.link}" aria-label="${name(p)}">${g}</a>` : g; }).join("")}
    </svg><div class="rmap-tip"></div></div>`;
}
// Подсветка точки и подписи при наведении (карта ↔ список)
document.addEventListener("mouseover", e => {
  const t = e.target.closest(".rmap .pt");
  document.querySelectorAll(".rmap .on").forEach(x => x.classList.remove("on"));
  const tip = document.querySelector(".rmap-tip");
  if (!t) { if (tip) tip.classList.remove("show"); return; }
  const g = t; g.classList.add("on");
  const box = document.querySelector(".rmap").getBoundingClientRect(), r = g.getBoundingClientRect();
  tip.textContent = g.dataset.name; tip.style.left = (r.left + r.width / 2 - box.left) + "px"; tip.style.top = (r.top - box.top) + "px"; tip.classList.add("show");
});

const render = {
  feed(el) { masonry(el, S.photos, { endless: true }); },
  videos(el) {
    el.innerHTML = `
      ${S.showreel.src ? `<div class="showreel" style="background-image:url('${S.showreel.poster}')">${S.showreel.loop ? `<video src="${S.showreel.loop}" muted autoplay loop playsinline></video>` : ""}<span>▶ ${T.showreel}</span></div>` : ""}
      <h2 class="section-title reveal">${T.myProjects}</h2>
      ${tiles(S.videos, "vgrid")}
      <h2 class="section-title reveal">${T.reels}</h2>
      ${tiles(S.reels, "rgrid")}`;
    if (S.showreel.src) el.querySelector(".showreel").onclick = () => playVideo(S.showreel);
    bindTiles(el.querySelector(".vgrid"), S.videos);
    bindTiles(el.querySelector(".rgrid"), S.reels);
  },
  projects(el) {
    el.innerHTML = S.projects.map(localize).map(p => `
      <a class="pcard reveal" href="project.html?id=${p.id}" style="background-image:url('${p.cover}')">
        <div><h2>${p.title}${p.subtitle ? `<span>${p.subtitle}</span>` : ""}</h2><p>${p.lead}</p></div></a>`).join("");
  },
  project(el) {
    const p = localize(S.projects.find(x => x.id === new URLSearchParams(location.search).get("id")) || S.projects[0]);
    const pg = localize((window.PROJECT_PAGES || {})[p.id]);
    document.title = `${p.title}${p.subtitle ? ", " + p.subtitle : ""} — ${T.author}`;
    if (!pg) {   // простая страница, пока нет подробной
      el.innerHTML = `<div class="project-head"><h1>${p.title}</h1><p>${p.lead}</p></div><div class="pfeed"></div>`;
      return masonry(el.querySelector(".pfeed"), p.photos.length ? p.photos : S.photos.slice(0, 12));
    }
    const next = localize(S.projects.find(x => x.id === pg.next));
    const paras = list => list.map(t => `<p>${t}</p>`).join("");
    el.innerHTML = `
      <section class="pj-hero${pg.heroAlign ? " " + pg.heroAlign : ""}" style="background-image:url('${pg.hero}?v=${ASSET_V}')${pg.heroPos ? `;background-position:${pg.heroPos}` : ""}">
        <div class="pj-hero-in">
          <h1>${pg.title}<span>${pg.subtitle}</span></h1>
          <p class="pj-lead">${pg.lead}</p>
          ${pg.heroText ? `<p class="pj-hero-text">${pg.heroText}</p>` : ""}
        </div>
      </section>
      <dl class="pj-meta reveal">${pg.meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
      ${pg.partners ? `<div class="pj-partners reveal"><span>${pg.partnersLabel || T.supported}</span><ul>${pg.partners.map(x => typeof x === "string" ? `<li>${x}</li>`
        : `<li class="logo" title="${x.name}"><img src="${x.logo}" alt="${x.name}" loading="lazy"></li>`).join("")}</ul></div>` : ""}
      <section class="pj-text reveal"><h2 class="section-title">${T.aboutExp}</h2>${paras(pg.about)}</section>
      <div class="pj-facts reveal">${pg.facts.map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join("")}</div>
      ${pg.route ? `<section class="pj-route reveal"><div class="pj-map">${routeMap(pg.route, (window.MAPS || {})[p.id])}</div>
        <div class="pj-stops"><h2>${T.route}</h2><ol>${pg.route.filter(r => !r.via).map(r => `<li class="${r.main ? "main" : ""}"><b>${r.name}</b><span>${r.text}</span></li>`).join("")}</ol></div></section>` : ""}
      <div class="pj-break reveal" style="background-image:url('${pg.breaks[0]}?v=${ASSET_V}')${pg.breaksPos ? `;background-position:${pg.breaksPos[0]}` : ""}"></div>
      ${pg.film ? `<section class="pj-film reveal">
        <h2 class="section-title">${T.film}</h2>
        <div class="pj-player" style="background-image:url('${pg.film.poster}')">
          <svg class="play" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="31" /><path d="M26 20 L46 32 L26 44 Z" /></svg>
        </div>
      </section>` : ""}
      ${pg.breaks[1] ? `<div class="pj-break pj-break-wide reveal" style="background-image:url('${pg.breaks[1]}?v=${ASSET_V}')"></div>` : ""}
      ${pg.author ? `<section class="pj-author reveal">
        <div class="pj-author-photo" style="background-image:url('${pg.author.photo}?v=${ASSET_V}')${pg.author.pos ? `;background-position:${pg.author.pos}` : ""}"></div>
        <div class="pj-author-text"><h2>${T.authorWord}</h2>${paras(pg.author.text)}<em>— ${pg.author.sign}</em></div>
      </section>` : ""}
      <section class="pj-gallery"><div class="pfeed"></div></section>
      <nav class="pj-nav">
        <a href="projects.html">← ${T.allProjects}</a>
        ${next ? `<a href="project.html?id=${next.id}">${next.title}${next.subtitle ? ", " + next.subtitle : ""} →</a>` : ""}
      </nav>`;
    const player = el.querySelector(".pj-player");
    if (player) player.onclick = () => {
      player.innerHTML = /\.(mp4|webm)$/i.test(pg.film.src) ? `<video src="${pg.film.src}" controls autoplay playsinline></video>`
        : `<iframe src="${pg.film.src}" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
      player.classList.add("on"); player.onclick = null;
    };
    if (pg.galleryLayout === "pairs") pairs(el.querySelector(".pfeed"), pg.photos);
    else masonry(el.querySelector(".pfeed"), pg.photos, { maxCols: pg.galleryCols || 4 });   // плитка как на главной
  },
  about(el) {
    const a = localize(S.about), list = xs => `<ul>${xs.map(x => `<li>${x}</li>`).join("")}</ul>`;
    el.innerHTML = `
      <section class="about">
        <div class="about-photo" style="background-image:url('${a.photo}?v=${ASSET_V}');background-position:${a.photoPos || "center"}"></div>
        <div class="about-text">
          <h1>${T.author}<span>${a.role}</span></h1>
          <p class="about-lead">${a.lead}</p>
          ${a.text.map(t => `<p>${t}</p>`).join("")}
          <div class="about-facts">${a.facts.map(([n, l]) => `<div><b>${n}</b><span>${l}</span></div>`).join("")}</div>
        </div>
      </section>
      <section class="about-cols reveal">
        <div class="about-services"><h2>${T.services}</h2>${list(a.services)}</div>
        <div><h2>${T.contacts}</h2><dl>${a.contacts.map(([k, v, href]) => `<div><dt>${k}</dt><dd>${href ? `<a href="${href}" target="_blank" rel="noopener">${v}</a>` : v}</dd></div>`).join("")}</dl></div>
      </section>
      <section class="about-clients reveal"><h2 class="section-title">${T.clients}</h2>
        <ul>${a.clients.map((c, i) => {
          // одинаковая «визуальная площадь»: широкие логотипы ниже, компактные выше; второй ряд — с середины списка
          const h = (c.ar ? Math.min(76, Math.max(28, Math.sqrt(11000 / c.ar))) : 40) * (c.k || 1);   // k — поправка на «вес» начертания
          return (i === Math.ceil(a.clients.length / 2) ? `<li class="row-break"></li>` : "") +
            `<li title="${c.name}" style="--h:${h.toFixed(0)}px">${c.logo ? `<img src="${c.logo}" alt="${c.name}" loading="lazy">` : `<span>${c.name}</span>`}</li>`;
        }).join("")}</ul></section>
      <section class="about-places reveal"><h2 class="section-title">${T.places}</h2>${russiaMap(S.about.places, (window.MAPS || {})[LANG === "en" ? "russiaEn" : "russia"])}</section>`;
  },
  ai(el) {
    const h = S.ai.filter(v => !v.vertical), v = S.ai.filter(v => v.vertical);
    el.innerHTML = `${tiles(h, "vgrid")}<h2 class="section-title reveal">${T.vertical}</h2>${tiles(v, "rgrid")}`;
    bindTiles(el.querySelector(".vgrid"), h);
    bindTiles(el.querySelector(".rgrid"), v);
  }
};
document.querySelectorAll("[data-render]").forEach(el => render[el.dataset.render](el));
// Высота шапки → CSS (чтобы шоурил ровно влезал в первый экран)
const setHH = () => document.documentElement.style.setProperty("--hh", document.querySelector(".header").offsetHeight + "px");
setHH(); addEventListener("resize", setHH);
// Появление при прокрутке для заголовков и плиток видео
document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));
