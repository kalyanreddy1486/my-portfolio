import { get, set } from "./store";

type Kind = "type" | "pop" | "wipe";
type Role = "measure" | "check";
type Bot = {
  el: HTMLElement;
  st: HTMLElement | null;
  role: Role;
  x: number;
  y: number;
  tx: number;
  ty: number;
  job: Job | null;
  aux: Aux | null;
  next: number;
};
type Job = {
  el: HTMLElement;
  kind: Kind;
  bot: Bot;
  t: number;
  dur: number;
  go: boolean;
  wait: number;
  wire: HTMLDivElement;
  txt: string;
  a?: HTMLSpanElement;
  b?: HTMLSpanElement;
  c?: HTMLSpanElement;
};
type Aux = { el: HTMLElement; bot: Bot; v: boolean; t: number; dur: number; go: boolean; wait: number; ov: HTMLDivElement };
type Tour = { run: boolean; pos: number; v: number; hold: number };

let max = 6;
const ACC = 90;
const keys = new Set(["Escape", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);
const verb: Record<Kind, string> = { type: "typing", pop: "placing", wipe: "painting" };
const measurers = /^(Layout|Grid|Kern|Spacing|Format|Polish|Typeset|Palette|Motion|Render|Bundle|Cache)$/;

let els: HTMLElement[] = [];
let secOf = new Map<HTMLElement, Element | null>();
let open = new Set<Element>();
let claimed = new Set<HTMLElement>();
let jobs: Job[] = [];
let aux: Aux[] = [];
let seen = new WeakMap<HTMLElement, number>();
let bots: Bot[] = [];
let layer: HTMLElement | null = null;
let raf = 0;
let last = 0;
let clock = 0;
let frame = 0;
let tour: Tour | null = null;
let io: IntersectionObserver | null = null;
let seer: IntersectionObserver | null = null;
let vis = new Set<HTMLElement>();
let past: HTMLElement[] = [];

const root = () => document.documentElement;
const isDone = (el: HTMLElement) => el.dataset.s === "done";
const tag = (el: HTMLElement) => {
  if (el.querySelector("img")) return "portrait";
  const t = (el.textContent ?? "").replace(/\s+/g, " ").trim();
  if (t) return `“${t.length > 18 ? `${t.slice(0, 17).trim()}…` : t}”`;
  return el.tagName.toLowerCase();
};

type Rect = { x: number; y: number; w: number; h: number; top: number; bottom: number };

let cache = new Map<Element, Rect>();
const prev = new WeakMap<HTMLElement, string>();

const docRect = (el: Element) => {
  const c = cache.get(el);
  if (c) return c;
  const r = el.getBoundingClientRect();
  const v = { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height, top: r.top, bottom: r.bottom };
  cache.set(el, v);
  return v;
};

const css = (el: HTMLElement, t: string, w: string, h: string) => {
  const k = `${t}|${w}|${h}`;
  if (prev.get(el) === k) return;
  prev.set(el, k);
  el.style.transform = t;
  if (w) el.style.width = w;
  if (h) el.style.height = h;
};

const place = (w: HTMLElement, r: { x: number; y: number; w: number; h: number }) =>
  css(w, `translate(${Math.round(r.x - 3)}px, ${Math.round(r.y - 3)}px)`, `${Math.round(r.w + 6)}px`, `${Math.round(r.h + 6)}px`);

const ease = (p: number) => (p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2);

const say = (b: Bot, s: string) => {
  if (b.st && b.st.dataset.st !== s) b.st.dataset.st = s;
};

const stripParam = () => {
  const u = new URL(location.href);
  u.searchParams.delete("agents");
  history.replaceState(null, "", u);
};

const store = (k: "local" | "session", key: string, v: string | null) => {
  try {
    const s = k === "local" ? localStorage : sessionStorage;
    if (v === null) s.removeItem(key);
    else s.setItem(key, v);
  } catch {}
};

function fade(o: HTMLElement) {
  o.classList.add("out");
  setTimeout(() => o.remove(), 400);
}

function finish(j: Job) {
  if (j.kind === "type") j.el.textContent = j.txt;
  j.el.dataset.s = "done";
  fade(j.wire);
  j.bot.job = null;
  j.bot.next = clock + 150 + Math.random() * 350;
  say(j.bot, "");
  claimed.delete(j.el);
  jobs = jobs.filter((x) => x !== j);
}

function begin(j: Job) {
  j.go = false;
  j.t = 0;
  j.el.dataset.s = "run";
  say(j.bot, `${verb[j.kind]} ${j.kind === "type" ? `“${j.txt.replace(/\s+/g, " ").trim().slice(0, 17)}${j.txt.length > 17 ? "…" : ""}”` : tag(j.el)}`);
  if (j.kind !== "type") return;
  j.a = document.createElement("span");
  j.c = document.createElement("span");
  j.b = document.createElement("span");
  j.c.className = "caret";
  j.b.className = "ghost";
  j.b.textContent = j.txt;
  j.el.textContent = "";
  j.el.append(j.a, j.c, j.b);
}

function claim(el: HTMLElement, bot: Bot) {
  if (bot.aux) endAux(bot.aux);
  const kind = (el.dataset.build as Kind) || "pop";
  const r = docRect(el);
  wake(bot, r.x, r.y);
  const wire = document.createElement("div");
  wire.className = "wire";
  wire.dataset.l = `${el.tagName.toLowerCase()} · ${kind}`;
  place(wire, r);
  layer?.appendChild(wire);
  const txt = el.textContent ?? "";
  const dur = kind === "type" ? Math.min(2000, Math.max(380, txt.length * 13)) : kind === "wipe" ? 750 : 450;
  const j: Job = { el, kind, bot, t: 0, dur, go: true, wait: 0, wire, txt };
  bot.job = j;
  claimed.add(el);
  jobs.push(j);
  say(bot, `→ ${tag(el)}`);
  const s = spot(j, 0);
  bot.tx = s.x;
  bot.ty = s.y;
}

function spot(j: Job, p: number) {
  const r = docRect(j.el);
  if (j.kind === "type") {
    if (j.c && !j.go && cache.has(j.c)) {
      const c = docRect(j.c);
      return { x: c.x + 2, y: c.y + c.h * 0.8 };
    }
    return { x: r.x, y: r.y + Math.min(r.h, 30) * 0.8 };
  }
  if (j.kind === "wipe") return { x: r.x + r.w * ease(p), y: r.y + Math.min(r.h / 2, 60) };
  const a = clock / 120;
  return { x: r.x + r.w / 2 + Math.cos(a) * 4, y: r.y + r.h / 2 + Math.sin(a) * 4 };
}

function wake(b: Bot, x: number, y: number) {
  if (!b.el.classList.contains("gone")) return;
  b.el.classList.remove("gone");
  b.x = x - scrollX < innerWidth / 2 ? scrollX - 40 : scrollX + innerWidth + 10;
  b.y = y;
}

function startAux(b: Bot, el: HTMLElement) {
  const r = docRect(el);
  wake(b, r.x, r.y);
  const v = b.role === "measure" && r.h > 60 && r.h > r.w * 0.6;
  const ov = document.createElement("div");
  if (b.role === "measure") {
    ov.className = v ? "meas v" : "meas";
    const l = document.createElement("span");
    l.textContent = `${Math.round(v ? r.h : r.w)}px`;
    ov.append(l);
  } else {
    ov.className = "chk";
    ov.dataset.l = "✓ pass";
  }
  layer?.appendChild(ov);
  const a: Aux = { el, bot: b, v, t: 0, dur: 900 + Math.random() * 700, go: true, wait: 0, ov };
  placeAux(a);
  b.aux = a;
  aux.push(a);
  seen.set(el, clock);
  say(b, `${b.role === "measure" ? "measuring" : "checking"} ${tag(el)}`);
}

function placeAux(a: Aux) {
  const r = docRect(a.el);
  if (a.bot.role === "check") return place(a.ov, r);
  if (a.v) return css(a.ov, `translate(${Math.round(r.x + r.w + 10)}px, ${Math.round(r.y)}px)`, "", `${Math.round(r.h)}px`);
  css(a.ov, `translate(${Math.round(r.x)}px, ${Math.round(r.y + r.h + 8)}px)`, `${Math.round(r.w)}px`, "");
}

function auxSpot(a: Aux, p: number) {
  const r = docRect(a.el);
  if (a.bot.role === "measure") return a.v ? { x: r.x + r.w + 10, y: r.y + r.h * p } : { x: r.x + r.w * p, y: r.y + r.h + 8 };
  let d = 2 * (r.w + r.h) * p;
  if (d < r.w) return { x: r.x + d, y: r.y };
  d -= r.w;
  if (d < r.h) return { x: r.x + r.w, y: r.y + d };
  d -= r.h;
  if (d < r.w) return { x: r.x + r.w - d, y: r.y + r.h };
  return { x: r.x, y: r.y + r.h - (d - r.w) };
}

function endAux(a: Aux) {
  fade(a.ov);
  a.bot.aux = null;
  a.bot.next = clock + 250 + Math.random() * 600;
  say(a.bot, "");
  aux = aux.filter((x) => x !== a);
}

function review(dt: number) {
  for (const a of [...aux]) {
    const r = docRect(a.el);
    if (r.bottom < 0 || r.top > innerHeight) {
      endAux(a);
      continue;
    }
    placeAux(a);
    if (a.go) {
      a.wait += dt;
      const s = auxSpot(a, 0);
      a.bot.tx = s.x;
      a.bot.ty = s.y;
      if (Math.hypot(a.bot.x - s.x, a.bot.y - s.y) < 8 || a.wait > 1000) {
        a.go = false;
        a.ov.classList.add("on");
      }
      continue;
    }
    a.t += dt;
    const p = ease(Math.min(1, a.t / a.dur));
    a.ov.style.setProperty("--p", p.toFixed(2));
    const s = auxSpot(a, p);
    a.bot.tx = s.x;
    a.bot.ty = s.y;
    if (a.t >= a.dur) a.ov.classList.add("ok");
    if (a.t >= a.dur + 500) endAux(a);
  }
}

function idle(acts: (() => void)[], taken: Set<Bot>) {
  if (get().built) return;
  const vh = innerHeight;
  let pool: HTMLElement[] | null = null;
  let q: HTMLElement | null | undefined;
  let slot = 0;
  let busy = aux.length;
  for (const b of bots) {
    if (b.job || b.aux || taken.has(b) || clock < b.next) continue;
    b.next = clock + 500 + Math.random() * 400;
    if (busy >= 8) {
      acts.push(() => {
        say(b, "");
        b.el.classList.add("gone");
      });
      continue;
    }
    if (!pool) {
      const held = new Set(aux.map((a) => a.el));
      pool = [...vis].filter((el) => {
        if (!isDone(el) || held.has(el) || clock - (seen.get(el) ?? -1e9) < 4000) return false;
        const r = docRect(el);
        return r.w > 24 && r.h > 10 && r.w < innerWidth * 0.7 && r.h < vh * 0.45 && r.top > 4 && r.bottom < vh - 4;
      });
    }
    if (pool.length) {
      let bi = 0;
      let bd = Infinity;
      pool.forEach((el, i) => {
        const r = docRect(el);
        const d = Math.hypot(r.x - b.x, r.y - b.y) * (0.6 + Math.random() * 0.8);
        if (d < bd) {
          bd = d;
          bi = i;
        }
      });
      const el = pool.splice(bi, 1)[0];
      taken.add(b);
      busy++;
      acts.push(() => startAux(b, el));
      continue;
    }
    if (q === undefined) {
      q =
        els.find((el) => {
          if (!vis.has(el) || isDone(el) || claimed.has(el)) return false;
          const r = docRect(el);
          return r.w > 0 && r.top > 40 && r.top < vh - 60;
        }) ?? null;
    }
    if (q && slot < 6) {
      const r = docRect(q);
      const n = slot++;
      acts.push(() => {
        wake(b, r.x, r.y);
        b.tx = Math.max(scrollX + 8, r.x - 34 - (n % 3) * 30);
        b.ty = r.y + 6 + Math.floor(n / 3) * 24;
        say(b, "queued");
      });
    } else {
      acts.push(() => {
        say(b, "");
        b.el.classList.add("gone");
      });
    }
  }
}

function sweep(acts: (() => void)[], taken: Set<Bot>) {
  const vh = innerHeight;
  let left = 0;
  let open2 = jobs.length;
  for (const el of past.splice(0)) if (!isDone(el) && !claimed.has(el)) acts.push(() => (el.dataset.s = "done"));
  for (const el of els) {
    if (isDone(el)) continue;
    left++;
    if (claimed.has(el) || !vis.has(el)) continue;
    const r = docRect(el);
    if (r.bottom < 0) {
      acts.push(() => (el.dataset.s = "done"));
      left--;
      continue;
    }
    if (open2 >= max) continue;
    const s = secOf.get(el);
    if (!s || !open.has(s) || r.top > vh * 1.02) continue;
    const free = bots.filter((b) => !b.job && !taken.has(b));
    if (!free.length) continue;
    let best = free[0];
    let bd = Infinity;
    for (const b of free) {
      const d = Math.hypot(b.x - r.x, b.y - r.y) + (b.aux ? 120 : 0);
      if (d < bd) {
        bd = d;
        best = b;
      }
    }
    taken.add(best);
    claimed.add(el);
    open2++;
    const b = best;
    acts.push(() => claim(el, b));
  }
  for (const j of jobs) if (docRect(j.el).bottom < 0) acts.push(() => jobs.includes(j) && finish(j));
  if (left === 0 && !jobs.length && !get().built) {
    set({ built: true });
    setTimeout(() => {
      [...aux].forEach(endAux);
      bots.forEach((b) => b.el.classList.add("gone"));
    }, 1500);
  }
}

function work(dt: number) {
  for (const j of [...jobs]) {
    place(j.wire, docRect(j.el));
    if (j.go) {
      j.wait += dt;
      const s = spot(j, 0);
      j.bot.tx = s.x;
      j.bot.ty = s.y;
      if (Math.hypot(j.bot.x - s.x, j.bot.y - s.y) < 8 || j.wait > 900) begin(j);
      continue;
    }
    j.t += dt;
    const p = Math.min(1, j.t / j.dur);
    if (j.kind === "type" && j.a && j.b) {
      const n = Math.round(j.txt.length * p);
      j.a.textContent = j.txt.slice(0, n);
      j.b.textContent = j.txt.slice(n);
    }
    const s = spot(j, p);
    j.bot.tx = s.x;
    j.bot.ty = s.y;
    if (p >= 1) finish(j);
  }
}

function move(dt: number) {
  for (const b of bots) {
    const k = b.job ? (b.job.go ? 7 : 18) : b.aux ? (b.aux.go ? 6 : 16) : 3;
    const f = 1 - Math.exp((-k * dt) / 1000);
    b.x += (b.tx - b.x) * f;
    b.y += (b.ty - b.y) * f;
    b.el.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
  }
}

function heroDone() {
  const h = document.getElementById("top");
  return !!h && !h.querySelector("[data-busy]") && els.every((el) => !h.contains(el) || isDone(el));
}

function drive(dt: number) {
  if (!tour) return;
  if (!tour.run) {
    if (heroDone()) tour.hold += dt;
    if (tour.hold > 700) {
      tour.run = true;
      tour.pos = scrollY;
    }
    return;
  }
  const end = root().scrollHeight - innerHeight;
  const rem = end - tour.pos;
  const s = dt / 1000;
  const want = Math.min(jobs.length ? 45 : 140, Math.sqrt(2 * ACC * Math.max(0, rem)));
  tour.v += Math.max(-ACC * s, Math.min(ACC * s, want - tour.v));
  tour.pos += tour.v * s;
  scrollTo(0, tour.pos);
  if (rem < 1 || (tour.v < 0.5 && rem < 4)) stopTour();
}

function tick(now: number) {
  raf = requestAnimationFrame(tick);
  const real = last ? Math.min(50, now - last) : 16;
  last = now;
  if (get().paused) return;
  clock += real;
  frame++;
  cache = new Map();
  for (const j of jobs) {
    docRect(j.el);
    if (j.c) docRect(j.c);
  }
  for (const a of aux) docRect(a.el);
  const acts: (() => void)[] = [];
  const taken = new Set<Bot>();
  if (frame % 3 === 0) sweep(acts, taken);
  if (frame % 6 === 0) idle(acts, taken);
  for (const f of acts) f();
  work(real);
  review(real);
  move(real);
  drive(real);
  if (get().built && !tour && !jobs.length && !aux.length && clock > 4000) {
    cancelAnimationFrame(raf);
    raf = 0;
  }
}

function stopTour() {
  tour = null;
  set({ touring: false });
}

const onKey = (e: KeyboardEvent) => {
  if (tour && keys.has(e.key)) stopTour();
};
const onUser = () => {
  if (tour) stopTour();
};

export function init(lay: HTMLElement, botEls: HTMLElement[]) {
  const d = root();
  if (!d.classList.contains("build")) {
    set({ on: false, built: true });
    return () => {};
  }
  d.dataset.live = "1";
  layer = lay;
  set({ on: true, built: false, paused: false });
  els = Array.from(document.querySelectorAll<HTMLElement>("[data-build]"));
  secOf = new Map(els.map((el) => [el, el.closest("[data-sec]")]));
  open = new Set();
  claimed = new Set();
  jobs = [];
  aux = [];
  seen = new WeakMap();
  io = new IntersectionObserver(
    (es) => es.forEach((e) => e.isIntersecting && open.add(e.target)),
    { rootMargin: "0px 0px -12% 0px" },
  );
  document.querySelectorAll("[data-sec]").forEach((s) => io?.observe(s));
  vis = new Set();
  past = [];
  els.forEach((el) => {
    if (!el.getClientRects().length) el.dataset.s = "done";
  });
  seer = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) vis.add(el);
        else {
          vis.delete(el);
          if (e.boundingClientRect.bottom < 0) past.push(el);
        }
      }),
    { rootMargin: "0px 0px 4% 0px" },
  );
  els.forEach((el) => seer?.observe(el));
  const w = innerWidth;
  const n = w < 768 ? 10 : Math.round(14 + 10 * Math.min(1, (w - 768) / (1440 - 768)));
  max = w < 768 ? 5 : 8;
  bots = botEls.slice(0, n).map((el, i) => {
    const x = scrollX + ((i + 0.5) / n) * w;
    const y = scrollY + innerHeight + 40;
    const role: Role = measurers.test(el.dataset.name ?? "") ? "measure" : "check";
    return { el, st: el.querySelector<HTMLElement>(".bot-st"), role, x, y, tx: x, ty: y, job: null, aux: null, next: 0 };
  });
  botEls.forEach((el, i) => (el.style.display = i < n ? "" : "none"));
  let t = false;
  try {
    t = !!sessionStorage.getItem("tour");
    sessionStorage.removeItem("tour");
  } catch {}
  if (t) {
    tour = { run: false, pos: 0, v: 0, hold: 0 };
    set({ touring: true });
  }
  addEventListener("keydown", onKey);
  addEventListener("wheel", onUser, { passive: true });
  addEventListener("touchstart", onUser, { passive: true });
  const boot = setTimeout(() => {
    d.classList.add("booted");
    last = 0;
    raf = requestAnimationFrame(tick);
  }, 450);
  return () => {
    clearTimeout(boot);
    cancelAnimationFrame(raf);
    raf = 0;
    io?.disconnect();
    seer?.disconnect();
    removeEventListener("keydown", onKey);
    removeEventListener("wheel", onUser);
    removeEventListener("touchstart", onUser);
    jobs.forEach((j) => j.wire.remove());
    aux.forEach((a) => a.ov.remove());
    jobs = [];
    aux = [];
    bots = [];
  };
}

export function togglePause() {
  const s = get();
  if (!s.on || (s.built && !s.touring)) return;
  const p = !s.paused;
  root().classList.toggle("paused", p);
  set({ paused: p });
}

export function toggleAgents() {
  const d = root();
  if (get().on) {
    [...jobs].forEach(finish);
    [...aux].forEach(endAux);
    els.forEach((el) => (el.dataset.s = "done"));
    d.classList.remove("build", "paused");
    cancelAnimationFrame(raf);
    raf = 0;
    stopTour();
    store("local", "agents", "off");
    stripParam();
    set({ on: false, built: true, paused: false });
    return;
  }
  store("local", "agents", "on");
  store("session", "tour", null);
  stripParam();
  history.scrollRestoration = "manual";
  scrollTo(0, 0);
  location.reload();
}

export function toggleTour() {
  if (get().touring) {
    stopTour();
    return;
  }
  store("session", "tour", "1");
  history.scrollRestoration = "manual";
  scrollTo(0, 0);
  location.reload();
}
