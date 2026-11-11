const nav = document.getElementById("nav"),
  pg = document.getElementById("pg"),
  bands = document.querySelectorAll(".band");
function sc() {
  const y = scrollY;
  nav.classList.toggle("s", y > 60);
  pg.style.transform =
    "scaleX(" + y / (document.body.scrollHeight - innerHeight || 1) + ")";
  bands.forEach((b) => {
    const r = b.getBoundingClientRect();
    b.style.backgroundPosition = "center " + -r.top * 0.25 + "px";
  });
}
addEventListener("scroll", sc, { passive: true });
sc();
document.querySelectorAll(".grid,.mosaic").forEach((g) =>
  [...g.children].forEach((c, i) => {
    c.style.transitionDelay = (i % 6) * 90 + "ms";
  }),
);
document
  .querySelectorAll(".split>:first-child")
  .forEach((e) => e.classList.add("l"));
document
  .querySelectorAll(".split>:last-child")
  .forEach((e) => e.classList.add("r"));
document
  .querySelectorAll(".mosaic div,.tm")
  .forEach((e) => e.classList.add("reveal", "z"));
function count(el) {
  const m = el.textContent.match(/\d[\d,]*/);
  if (!m) return;
  const to = +m[0].replace(/,/g, ""),
    a = el.textContent.slice(0, m.index),
    b = el.textContent.slice(m.index + m[0].length),
    t0 = performance.now();
  (function f(t) {
    const k = Math.min((t - t0) / 1600, 1),
      v = Math.round(to * (1 - Math.pow(1 - k, 3)));
    el.textContent =
      a + (m[0].includes(",") ? v.toLocaleString("en-US") : v) + b;
    if (k < 1) requestAnimationFrame(f);
  })(t0);
}
const io = new IntersectionObserver(
  (es) =>
    es.forEach((x) => {
      if (!x.isIntersecting) return;
      const e = x.target;
      e.classList.add("v");
      setTimeout(() => (e.style.transitionDelay = ""), 1100);
      io.unobserve(e);
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((e) => io.observe(e));
const io2 = new IntersectionObserver(
  (es) =>
    es.forEach((x) => {
      if (x.isIntersecting) {
        count(x.target);
        io2.unobserve(x.target);
      }
    }),
  { threshold: 0.6 },
);
document.querySelectorAll(".stats strong").forEach((e) => io2.observe(e));
const bd = document.body,
  bg = document.getElementById("bg");
function menu(o) {
  bd.classList.toggle("menu-open", o);
  bg.setAttribute("aria-expanded", o);
  bg.setAttribute("aria-label", o ? "Close menu" : "Open menu");
}
bg.addEventListener("click", () => menu(!bd.classList.contains("menu-open")));
document
  .querySelectorAll("#mm a")
  .forEach((a) => a.addEventListener("click", () => menu(false)));
addEventListener("keydown", (e) => e.key === "Escape" && menu(false));
addEventListener("resize", () => innerWidth > 820 && menu(false));
