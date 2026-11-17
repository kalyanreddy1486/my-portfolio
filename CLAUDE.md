# Portfolio Project

Personal portfolio site for Kalyan Reddy. Dark page, one red accent, black and white headshot in front of a giant metallic PORTFOLIO word. Robot cursors build the page live on screen. A Tour button replays the build and scrolls the site for screen recording.

Built from scratch by hand (no create-next-app). Not yet a git repo.

## Source files
- `resume.pdf`: the only source of content. Read it first.
- `headshot.webp`: current black and white photo on a grey studio background. The site uses `public/headshot.png`, a cut-out of it with real transparency. `headshot.png` in the root is the old photo and is not used. Ignore any other images unless named.

## Content rules
- Use ONLY facts from resume.pdf and the owner's public GitHub (github.com/kalyanreddy1486: repo READMEs, descriptions, homepages, profile README). The owner authorised GitHub as a source. Never invent numbers, links, dates or employers.
- Never publish credentials found in repos (the HostelOS README has a demo login; do not copy it).
- resume.pdf contains a phone number and address: it is gitignored and must never be committed or offered for download.
- No lorem ipsum. If a detail is missing, leave the element out.
- Never show a phone number or home address.
- All content lives in `content.ts`. Components read from it and never hardcode text.
- Project links: GitHub repo URLs plus the owner-provided live sites. MetroNear has no public repo, so it has a live link only.

## Section mapping
- Hero: name, degree line, handwritten greeting
- Work ("Things I've built"): manifesto, numbers strip, then four projects (HostelOS, Sign-Bridge ASL, MetroNear, Real-Time Streaming Analytics). No "More on GitHub" grid (owner removed it). Never put the internship here.
- Live links (from the owner): hostel-os-zeta.vercel.app, metro-near.vercel.app, kkr1486-sign-bridge-asl.hf.space. MetroNear's live map shows CARTO "API KEY REQUIRED" watermarks, so it keeps its wireframe until fixed.
- Each featured project is a Problem / Built / Result story with stack chips, Live site / Code buttons where links exist, and either a real screenshot (HostelOS, grayscale until hover) or a wireframe illustration.
- Sign-Bridge ASL is the GitHub name of the resume's "Real-Time Hand Gesture Acquisition and Processing" project.
- Stack: Skills groups
- Record ("Track record"): Experience (Viswam AI), then Education and Certifications
- About: a lead line and a short paragraph that must not repeat the manifesto or the CGPA, plus the "Now" panel (studying, based in, last role, latest build)
- Contact: email, GitHub, LinkedIn. No phone.

## Stack
- Next.js 15 App Router, TypeScript, Tailwind CSS v4, lucide-react
- next/font: Anton (headings), Geist (body), Geist Mono (labels), Caveat Brush (one handwritten line: the hero greeting)
- ESLint 9 flat config, `npm run lint` runs `eslint .`
- Dev server on port 3000

## Design
- Background `#09090b`, zinc greys, one accent red `#ff3b2f`
- Blue wireframe is the only other colour, used by the build animation
- Cursor name tags use only red, blue or zinc-100. No other hues.
- No purple gradients, no glass cards
- Greys are neutral: the `zinc` scale is overridden in `globals.css` with zero-chroma values (Tailwind's zinc reads blue on this background)
- Type scale (desktop): 12 · 14 · 16 · 20 · 24 · 32 · 48 · 72px, plus viewport-sized display words. Use only the classes in `globals.css`, never ad-hoc text sizes:
  - `.t-h2` Anton caps 72→44 (section titles) · `.t-num` Anton 48→40 (numbers strip) · `.t-num-sm` Anton 32 (project numbers, viz stats)
  - `.t-statement` Geist 500 32→24, max 40ch (manifesto) · `.t-h3` Geist 600 32→24 (role, project names, email) · `.t-list` Geist 500 24→20 (skills, socials) · `.t-lead` Geist 24→20 (intro lines)
  - `.t-h4` Geist 600 20 (schools) · `.t-body` Geist 16 / 1.7 (all paragraphs and bullets, 62–68ch) · `.t-small` 14 (issuers) · `.label` Geist Mono 12 caps (labels); dates are Geist Mono 12
  - Hero name is Anton 60→30; buttons 14px mono; greeting is the only Caveat Brush line. Greys are neutral (zinc overridden). Nothing under 12px on screen.
- Hero: PORTFOLIO in Anton with red-to-black metallic gradient and a slow sheen, photo in grayscale with contrast on a red radial glow, bottom edge fading into the page. Headshot via `next/image` with `priority`.
- Sections in order: Hero, Work, Stack, Record, About, Contact
- Each project has a blue wireframe SVG illustration (`components/viz/`) drawn only from resume facts: hostel dashboard, metro A* route with walk/metro/auto legs, 21-point hand landmarks
- Sticky section bar appears after the hero, with active section and red scroll progress
- The page h1 is the name. PORTFOLIO is decorative (aria-hidden)
- Hero portrait (`components/Portrait.tsx`) is relit live with a WebGL shader (normals estimated from a blurred luminance map, red key light, soft highlight roll-off). Opening: lights out, a red light sweeps left to right across the portrait and the PORTFOLIO word, then settles as a key light top-left. After that the cursor is the light. The word shares the light through a CSS radial mask (`.lit .px-word`). Falls back to the plain image if WebGL is unavailable. Reduced motion and agents off skip the sweep; touch keeps the resting light.
- Hero is deliberately minimal: word, lit portrait, greeting, name, one mono tag line, one button, scroll cue. Live Bengaluru clock (IST) in the nav and footer.
- Work opens with a manifesto (`manifesto` in content.ts) whose words light up as you scroll, then a single numbers strip. Each number appears only once on the page.
- About shows a "Now" panel instead of stat tiles. Contact ends with a giant metallic LET'S TALK, big email link, copy button and socials.
- Open Graph image generated with `next/og` from content.ts

## Animation
- Page loads empty. Cursor count: 10 on phones (<768px), scales with width from 14 to 24 at 1440px+. Cursors render at 68% scale.
- Cursor names (24): Scout, Layout, Typeset, Motion, QA, Deploy, Copy, Lint, Index, Render, Palette, Review, Grid, Kern, Spacing, Contrast, Cache, Bundle, Audit, Format, Trace, Test, Ship, Polish
- Each cursor: arrow plus coloured name tag with a tiny robot head (blinking LED eyes, pulsing antenna)
- Elements use `data-build="type" | "pop" | "wipe"`
- Max 10 building at once on desktop (6 on phones), in DOM order
- Cursors never roam aimlessly. Each one shows a status line naming its task and the content it is working on (→ target, typing / painting / placing, measuring, checking, queued).
- Agents without a build job do review work on finished elements in view: "measurer" agents (Layout, Grid, Kern, Spacing, Format, Polish, Typeset, Palette, Motion, Render, Bundle, Cache) draw a red dimension line with the element's real pixel size; the rest trace a blue outline and stamp "✓ pass". Building always takes priority over review. Reviews skip oversized elements (wider than 70% of the viewport or taller than 45%).
- Agent labels are deliberately quiet: name tags 7.5px inside the 68% cursor scale, status lines smaller and at 60% opacity, review marks faint.
- Up to 6 idle agents queue beside the next element to be built. Any agent with nothing to do fades out and flies back in from the nearest screen edge when work appears.
- Sections build on scroll into view. Anything scrolled past appears instantly
- One requestAnimationFrame loop plus IntersectionObserver
- Hide unbuilt elements with `visibility: hidden`
- Add the build-mode class in an inline script in `<head>` to avoid flashes
- Safety: without JS nothing is hidden (class is only added by script); if the loop has not started within 4s, reveal everything
- Short boot loader first (0.45s, 0.6s fade)
- The hero greeting, name and tag line render immediately (no data-build) so the main content appears without waiting; agents build the rest
- At most 8 agents review at once; the rest rest off-screen
- Precedence: `?agents=on|off` URL param > saved localStorage toggle > `prefers-reduced-motion` (shows finished page)

## Controls
- Bottom dock: Pause, Agents on/off (saved in localStorage), Tour
- Pause freezes the build loop and the tour. It is disabled when agents are off or the build is done and no tour is running.
- Tour sets a sessionStorage flag, reloads, forces agents on for that run, waits for the hero to build, then scrolls slowly with ease in, steady, ease out
- Scrolling (wheel, touch, keys) or Esc stops the tour
- Keys: T tour, A agents, P pause. Ignored with Ctrl/Meta/Alt held or when focus is in an input. Shown in dock tooltips.

## Code style
- Clean code with no comments
- Short variable names
- Small components, one per file
- No unused code or dead imports

## Quality bar
- Responsive with no sideways scroll at 360px, 768px and 1440px
- Every button has hover, active, focus-visible and disabled states
- Metadata (title, description, Open Graph) from resume content
- Work in phases. After each phase run `npm run build` and fix errors before moving on
- Before finishing run `npm run build` and `npm run lint`, then check the dev server loads with no console errors

## Commands
- `npm install`
- `npm run dev`, then open `http://localhost:3000/?agents=on`
- `npm run build`
- `npm run lint`

## Deploy
- Push to a GitHub repo, then import it on vercel.com with Add New > Project and click Deploy

## When finished
Report how to run it, which resume facts were used, anything left out because it was missing, and the Vercel steps.
