"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/content";

type P = { src: StaticImageData; alt: string };
type L = { x: number; y: number; z: number; p: number };

const VS = `attribute vec2 a;varying vec2 v;void main(){v=vec2(a.x*.5+.5,.5-a.y*.5);gl_Position=vec4(a,0.,1.);}`;

const FS = `precision mediump float;
varying vec2 v;
uniform sampler2D ti;
uniform sampler2D th;
uniform vec2 tx;
uniform vec3 lp;
uniform float amb;
uniform float pw;
uniform float asp;
void main(){
  vec4 c=texture2D(ti,v);
  if(c.a<.004){gl_FragColor=vec4(0.);return;}
  float g=dot(c.rgb/max(c.a,.001),vec3(.299,.587,.114));
  g=clamp((g-.5)*1.25+.5,0.,1.);
  float l=texture2D(th,v-vec2(tx.x,0.)).r;
  float r=texture2D(th,v+vec2(tx.x,0.)).r;
  float u=texture2D(th,v-vec2(0.,tx.y)).r;
  float d=texture2D(th,v+vec2(0.,tx.y)).r;
  vec3 n=normalize(vec3((l-r)*8.,(u-d)*8.,1.));
  vec2 dd=(lp.xy-v)*vec2(asp,1.);
  vec3 L=normalize(vec3(dd,lp.z));
  float df=max(dot(n,L),0.);
  float fall=pw/(1.+dot(dd,dd)*4.5);
  vec3 lc=vec3(1.,.36,.3);
  vec3 col=vec3(g)*amb+g*df*fall*lc*1.35+vec3(1.,.8,.75)*pow(df,22.)*fall*.22*smoothstep(.2,.85,g)+vec3(g)*fall*.08;
  col=col*(1.+col/2.4)/(1.+col);
  gl_FragColor=vec4(min(col,vec3(1.))*c.a,c.a);
}`;

const REST: L = { x: 0.16, y: 0.12, z: 0.42, p: 1 };
const AMB = 0.72;
const WA = 0.42;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const clamp = (t: number) => Math.min(1, Math.max(0, t));

export default function Portrait({ src, alt }: P) {
  const box = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    const b = box.current;
    const c = cv.current;
    const im = img.current;
    const sec = document.getElementById("top");
    const word = sec?.querySelector<HTMLElement>(".px-word");
    if (!b || !c || !im || !sec || !word) return;
    const gl = c.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) return;
    const root = document.documentElement;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hover = matchMedia("(any-hover: hover)").matches;
    const build = root.classList.contains("build") && !calm;

    const sh = (t: number, s: string) => {
      const o = gl.createShader(t);
      if (!o) return null;
      gl.shaderSource(o, s);
      gl.compileShader(o);
      return gl.getShaderParameter(o, gl.COMPILE_STATUS) ? o : null;
    };
    const vs = sh(gl.VERTEX_SHADER, VS);
    const fs = sh(gl.FRAGMENT_SHADER, FS);
    const pr = gl.createProgram();
    if (!vs || !fs || !pr) return;
    gl.attachShader(pr, vs);
    gl.attachShader(pr, fs);
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (k: string) => gl.getUniformLocation(pr, k);
    const uLp = U("lp");
    const uAmb = U("amb");
    const uPw = U("pw");
    const uAsp = U("asp");
    const uTx = U("tx");
    gl.uniform1i(U("ti"), 0);
    gl.uniform1i(U("th"), 1);

    const tex = (unit: number, from: TexImageSource) => {
      const t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, from);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    };

    let ready = false;
    let phase: "wait" | "run" | "idle" = build ? "wait" : "idle";
    let t0 = 0;
    let raf = 0;
    let amb = build ? 0 : AMB;
    let wa = 1;
    const cur: L = { ...REST };
    const tgt: L = { ...REST };

    if (build) {
      im.style.opacity = "0";
      b.dataset.busy = "1";
    }

    const size = () => {
      const r = b.getBoundingClientRect();
      const dpr = Math.min(2, devicePixelRatio || 1);
      c.width = Math.max(1, Math.round(r.width * dpr));
      c.height = Math.max(1, Math.round(r.height * dpr));
      gl.viewport(0, 0, c.width, c.height);
      gl.uniform1f(uAsp, r.width / Math.max(1, r.height));
      if (ready) paint();
    };

    const light = () => {
      const r = b.getBoundingClientRect();
      const wr = word.getBoundingClientRect();
      const x = r.left + cur.x * r.width - wr.left;
      const y = r.top + cur.y * r.height - wr.top;
      word.style.setProperty("--lx", `${x}px`);
      word.style.setProperty("--ly", `${y}px`);
      word.style.setProperty("--la", wa.toFixed(3));
      word.style.setProperty("--lr", `${Math.round(r.height * 0.75 * cur.p)}px`);
    };

    const paint = () => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform3f(uLp, cur.x, cur.y, cur.z);
      gl.uniform1f(uAmb, amb);
      gl.uniform1f(uPw, cur.p);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      light();
    };

    const sweep = (s: number) => {
      const a = ease(clamp(s / 2.4));
      const sx = -0.45 + a * 1.75;
      const sy = 0.3 - Math.sin(a * Math.PI) * 0.16;
      const k = ease(clamp((s - 2) / 1.4));
      cur.x = sx + (REST.x - sx) * k;
      cur.y = sy + (REST.y - sy) * k;
      cur.z = 0.3 + (REST.z - 0.3) * k;
      cur.p = 1.15 + (REST.p - 1.15) * k;
      amb = AMB * ease(clamp((s - 0.6) / 2.2));
      const dim = 1 - (1 - clamp(s / 1)) ** 2;
      wa = 1 - dim * 0.78 + 0.2 * ease(clamp((s - 1.8) / 1.6));
      paint();
      return s >= 3.4;
    };

    const frame = (now: number) => {
      raf = 0;
      if (phase === "run") {
        if (!t0) t0 = now;
        if (sweep((now - t0) / 1000)) {
          phase = "idle";
          delete b.dataset.busy;
          setHint(hover);
        }
        raf = requestAnimationFrame(frame);
        return;
      }
      if (phase !== "idle") return;
      let moving = false;
      for (const k of ["x", "y", "z", "p"] as const) {
        const d = tgt[k] - cur[k];
        if (Math.abs(d) > 0.0005) moving = true;
        cur[k] += d * 0.1;
      }
      if (Math.abs(WA - wa) > 0.002) {
        wa += (WA - wa) * 0.05;
        moving = true;
      }
      paint();
      if (moving) raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!ready) return;
      sec.classList.add("lit");
      im.style.opacity = "0";
      if (phase === "wait" && b.dataset.s) {
        phase = "run";
        wa = 1;
        kick();
      } else if (phase === "idle") {
        paint();
        kick();
      }
    };

    const abort = () => {
      if (phase !== "wait" || root.classList.contains("build")) return;
      phase = "idle";
      amb = AMB;
      delete b.dataset.busy;
      start();
    };

    const mo = new MutationObserver(() => {
      start();
      abort();
    });
    mo.observe(b, { attributes: true, attributeFilter: ["data-s"] });
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });

    const move = (e: PointerEvent) => {
      if (phase !== "idle") return;
      const r = b.getBoundingClientRect();
      tgt.x = (e.clientX - r.left) / r.width;
      tgt.y = (e.clientY - r.top) / r.height;
      tgt.z = 0.3;
      tgt.p = 1.05;
      setHint(false);
      kick();
    };
    const leave = () => {
      Object.assign(tgt, REST);
      kick();
    };

    const load = () => {
      const url = im.currentSrc || im.src;
      const el = new window.Image();
      el.onload = () => {
        const hw = 320;
        const hh = Math.round((hw * el.naturalHeight) / el.naturalWidth);
        const o = document.createElement("canvas");
        o.width = hw;
        o.height = hh;
        const g = o.getContext("2d");
        if (!g) return;
        g.filter = "grayscale(1) blur(3px)";
        g.drawImage(el, 0, 0, hw, hh);
        tex(0, el);
        tex(1, o);
        gl.uniform2f(uTx, 2 / hw, 2 / hh);
        ready = true;
        size();
        if (!build) setHint(hover);
        start();
      };
      el.src = url;
    };
    if (im.complete && im.naturalWidth) load();
    else im.addEventListener("load", load, { once: true });

    const ro = new ResizeObserver(size);
    ro.observe(b);
    sec.addEventListener("pointermove", move);
    sec.addEventListener("pointerleave", leave);
    const onScroll = () => ready && phase === "idle" && light();
    addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      ro.disconnect();
      sec.removeEventListener("pointermove", move);
      sec.removeEventListener("pointerleave", leave);
      removeEventListener("scroll", onScroll);
      im.removeEventListener("load", load);
    };
  }, [src]);

  return (
    <div
      ref={box}
      data-build="wipe"
      className="px-photo self-build fadein absolute [animation-delay:150ms] bottom-0 left-1/2 z-10 h-[76svh] -translate-x-1/2 sm:h-[80svh]"
    >
      <Image
        ref={img}
        src={src}
        alt={alt}
        priority
        sizes="(min-width: 640px) 64vh, 61vh"
        className="fade-b h-full w-auto max-w-none contrast-125 grayscale transition-opacity duration-500"
      />
      <canvas ref={cv} aria-hidden className="fade-b pointer-events-none absolute inset-0 h-full w-full" />
      <p
        aria-hidden
        className={`label pointer-events-none absolute top-[38%] -right-44 hidden items-center gap-2 transition-opacity duration-700 lg:flex ${hint ? "opacity-100" : "opacity-0"}`}
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
        {hero.hint}
      </p>
    </div>
  );
}
