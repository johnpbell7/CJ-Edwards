import React, { useEffect, useRef, useState } from 'react'


/* ─────────────────────────────────────────────
   Data
   ───────────────────────────────────────────── */

const mixes = [
  { id: 1, title: "Solstice — Late Night Rooftop",  length: "62:14", year: "2025", genre: "House / Disco", plays: "48.2k" },
  { id: 2, title: "Midnight Garage Vol. III",       length: "48:31", year: "2025", genre: "UKG / Breaks",  plays: "31.9k" },
  { id: 3, title: "Ritual — Boiler Room Birmingham", length: "71:02", year: "2024", genre: "Techno / House", plays: "112k" },
  { id: 4, title: "Warm Air, Cold Drinks",          length: "55:47", year: "2024", genre: "Balearic / Edits", plays: "26.4k" },
];

const shows = [
  { date: "2026 · 05 · 02", venue: "Hare & Hounds",        city: "Birmingham", tag: "Club",     sold: false },
  { date: "2026 · 05 · 16", venue: "Lakeside Residency",   city: "Cotswolds",  tag: "Wedding",  sold: true  },
  { date: "2026 · 06 · 07", venue: "Printworks (Secret)",  city: "London",     tag: "Club",     sold: false },
  { date: "2026 · 07 · 12", venue: "Wilderness Festival",  city: "Oxfordshire",tag: "Festival", sold: false },
  { date: "2026 · 08 · 23", venue: "Pikes Hotel",          city: "Ibiza",      tag: "Takeover", sold: false },
  { date: "2026 · 09 · 04", venue: "Private Barn Reveal",  city: "Warwickshire",tag: "Wedding", sold: true  },
];

const press = [
  { q: "A selector with an ear for the room — CJ builds slow and delivers hard.", src: "Mixmag" },
  { q: "The kind of set that makes strangers hug at 3am.",                        src: "DJ Mag" },
  { q: "Our entire dancefloor asked who was playing. That was the booking made.", src: "Private client, Soho Farmhouse" },
];

const nav = [
  { label: "Work",     href: "#work",     meta: "Past nights · 2024—26" },
  { label: "Mixes",    href: "#mixes",    meta: "Four selected sets" },
  { label: "Shows",    href: "#shows",    meta: "2026 tour dates" },
  { label: "Weddings", href: "#weddings", meta: "Private hire · from £1,450" },
  { label: "Book",     href: "#book",     meta: "Enquiries · 48h reply" },
];

/* ─────────────────────────────────────────────
   Small components
   ───────────────────────────────────────────── */

function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add("in"), delay); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
}

function Particles({ count = 20, className = "" }) {
  const particles = React.useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      bottom: Math.random() * 20,
      dur: 8 + Math.random() * 14,
      delay: Math.random() * 12,
      px: (Math.random() - 0.5) * 80,
      size: 2 + Math.random() * 2.5,
    })), [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map(p => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            "--dur": `${p.dur}s`,
            "--px": `${p.px}px`,
            "--py": "-110vh",
            animationDelay: `${p.delay}s`,
          }}
        ></span>
      ))}
    </div>
  );
}

function CountStat({ value, label, duration = 2000 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.floor(eased * value));
          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref}>
      <div className="font-display text-3xl md:text-5xl text-[var(--ink)]" style={{fontFeatureSettings: '"tnum"'}}>
        {display.toLocaleString()}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-mute)] mt-2 leading-tight">
        {label}
      </div>
    </div>
  );
}

function BrandMark() {
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setOverHero(window.scrollY < window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#top"
      className="fixed top-4 md:top-7 left-5 md:left-10 z-40 flex items-center gap-3 transition-all duration-700 ease-[cubic-bezier(.2,.6,.2,1)]"
      style={{
        opacity: overHero ? 1 : 0,
        transform: overHero ? "translateY(0)" : "translateY(-20px)",
        pointerEvents: overHero ? "auto" : "none",
      }}
    >
      <Logo size={68} color="var(--accent)" />
      <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[var(--ink-dim)] leading-tight hidden sm:block">
        <div className="text-[var(--ink)]">CJ Edwards</div>
        <div>Selector · Producer</div>
      </div>
    </a>
  );
}

function NowPlaying() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-5 right-5 z-40 transition-all duration-700 ease-[cubic-bezier(.2,.6,.2,1)] hidden md:block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-20px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="nav-glass rounded-full pl-3 pr-5 py-2.5 flex items-center gap-3">
        <span className="radar-ping"></span>
        <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-dim)] leading-tight">
          <div>Now playing</div>
          <div className="text-[var(--ink)]">Midnight Garage III</div>
        </div>
        <div className="text-[var(--accent)]">
          <Wave playing />
        </div>
      </div>
    </div>
  );
}

function Wave({ playing = false }) {
  return (
    <div className="flex items-end gap-[3px] h-5">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="wave-bar block w-[3px] bg-current rounded-full"
          style={{
            height: "100%",
            animationDelay: `${i * 0.12}s`,
            animationPlayState: playing ? "running" : "paused",
            opacity: playing ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  );
}

function WaveAccent({ bars = 5 }) {
  return (
    <div className="wave-accent">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          style={{
            height: "100%",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

function MagneticButton({ href, children, variant = "primary", className = "", onClick }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.35}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  const base = "mag-btn relative inline-flex items-center gap-3 px-7 py-4 font-display tracking-wide text-base rounded-full overflow-visible";
  const styles = variant === "primary"
    ? "bg-[var(--accent)] text-[#1a0f08]"
    : "bg-transparent border border-[var(--line)] text-[var(--ink)]";

  const Tag = href ? "a" : "button";

  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <Tag
        ref={ref}
        href={href}
        onClick={onClick}
        className={`${base} ${styles} ${className}`}
      >
        <span className="orbit-dot"></span>
        {children}
      </Tag>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sections
   ───────────────────────────────────────────── */

function Logo({ size = 28, color = "currentColor", className = "" }) {
  return (
    <svg width={size} height={size * (1341.87 / 1706.06)} viewBox="0 0 1706.06 1341.87" fill={color} className={className} xmlns="http://www.w3.org/2000/svg">
      <polygon points="1146.75 202.63 1048.86 279.96 988.29 327.84 890.41 405.17 792.47 327.84 890.36 250.51 950.98 202.63 890.36 154.75 829.79 202.58 731.91 279.91 671.29 327.79 573.4 405.12 512.83 453.05 512.79 453.05 414.95 530.38 354.33 578.21 256.45 655.55 195.88 703.42 256.45 751.3 317.06 703.42 414.95 780.76 354.38 828.63 256.49 905.97 158.56 828.63 97.99 780.76 .11 703.42 97.99 626.09 158.56 578.21 256.45 500.88 317.06 453.05 414.95 375.67 475.52 327.79 573.45 250.46 634.02 202.63 731.91 125.3 792.47 77.42 890.36 .08 988.25 77.42 1048.86 125.3 1146.75 202.63"/>
      <polygon points="1418.9 424.57 1321.01 501.86 1260.45 549.74 1162.51 627.07 1101.94 674.95 1004.06 752.28 943.49 800.16 845.56 877.49 784.99 925.37 687.1 1002.7 626.53 1050.58 528.65 1127.91 430.76 1050.58 370.14 1002.7 272.26 925.37 370.14 848.04 430.76 800.16 528.65 722.83 626.53 800.16 528.65 877.49 468.03 925.37 528.65 973.25 589.22 925.37 687.1 848.04 747.72 800.16 845.6 722.83 906.17 674.95 1004.06 597.62 1064.67 549.74 1162.56 472.4 1223.18 424.53 1162.56 376.65 1064.67 299.32 1162.51 222.03 1260.45 299.36 1321.01 347.24 1418.9 424.57"/>
      <path d="M1705.96,643.2l-97.84,77.29-60.62,47.88-97.89,77.33-97.89-77.33,97.89-77.33,60.62-47.88-60.62-47.83-60.62,47.88-97.84,77.29-60.62,47.88-85.44,64.89,60.57,47.92,97.89,77.29-101.09,86.33-166.39-118.94-61.92,45.06-60.57,47.88-97.89,77.33-60.62,47.88,60.62,47.88,60.62-47.88,97.84-77.33,97.89,77.33-97.89,77.33-60.57,47.88-87.2,68.89c-6.27,4.95-15.11,4.95-21.38,0l-87.2-68.89-60.62-47.88-97.89-77.33,97.93-77.33,60.57-47.88,97.89-77.33,60.62-47.88,97.84-77.29,60.62-47.92,97.89-77.33,60.62-47.88,97.84-77.33,60.62-47.88,97.84-77.29,97.93,77.33,60.57,47.88,97.89,77.33Z"/>
    </svg>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Background video */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.unsplash.com/photo-1571266028243-d220c6a6b71c?w=1920&q=80"
      >
        <source src="https://cdn.pixabay.com/video/2023/09/26/182869-867676063_large.mp4" type="video/mp4" />
      </video>

      {/* Poster fallback image layer for slow connections */}
      <img
        aria-hidden="true"
        src="https://images.unsplash.com/photo-1571266028243-d220c6a6b71c?w=1920&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        style={{ mixBlendMode: "multiply" }}
      />

      {/* Animated amber/brass glow orbs — screen blend, drift like stage lights */}
      <div className="hero-glow">
        <div className="glow-orb a"></div>
        <div className="glow-orb b"></div>
        <div className="glow-orb c"></div>
      </div>

      <div className="hero-tint absolute inset-0"></div>

      {/* Floating amber particles drifting upward */}
      <Particles count={28} className="z-[5]" />

      {/* Hero content — tight on mobile, spaced on desktop */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col justify-end md:justify-between px-5 md:px-10 pt-24 md:pt-10 pb-32 md:pb-32 gap-10 md:gap-0">

        {/* Top rail — desktop only (mobile has BrandMark fixed top-left) */}
        <div className="hidden md:flex justify-end items-start gap-4">
          <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-dim)]">
            <WaveAccent bars={7} />
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-0.5">
                <span className="radar-ping"></span>
                <span>Now playing · Midnight Garage III</span>
              </div>
              <div>Birmingham · UK</div>
              <div className="text-[var(--accent)] mt-0.5">Bookings open · 2026</div>
            </div>
          </div>
        </div>

        {/* Huge condensed headline */}
        <div>
          <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--ink-dim)] flex items-center mb-6 md:mb-10">
            <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3"></span>
            DJ · Producer · Birmingham Since 2017
          </div>

          <h1 className="font-display display-tight text-white">
            <span className="block text-[17vw] md:text-[12vw] lg:text-[10vw]">Records for</span>
            <span className="block text-[17vw] md:text-[12vw] lg:text-[10vw]">rooms <span className="accent-shimmer">that</span> move.</span>
          </h1>
        </div>

        {/* Bottom row — CTA left with magnetic feel, paragraph right */}
        <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-16 items-end">
          <MagneticButton href="#book">
            <span>BOOK CJ</span>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 5h14M11 1l4 4-4 4" stroke="currentColor" strokeWidth="2"/></svg>
          </MagneticButton>
          <p className="md:justify-self-end md:text-right max-w-[48ch] text-[var(--ink-dim)] text-sm md:text-base leading-relaxed">
            <span className="text-[var(--ink)] font-medium">I'm CJ Edwards</span> — nine years reading rooms, from 300-cap basements to lakeside weddings. House, disco, garage, the bits in between. Available worldwide for clubs, festivals and private hire.
          </p>
        </div>
      </div>

      {/* Animated scroll cue — bottom left corner */}
      <div className="absolute bottom-24 md:bottom-8 right-6 md:right-10 z-10 hidden md:flex flex-col items-center gap-3">
        <div className="scroll-cue"></div>
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--ink-mute)] [writing-mode:vertical-rl]">
          Scroll
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["House", "Garage", "Disco edits", "Balearic", "Rare groove", "Broken beat", "B-sides", "Dub plates"];
  return (
    <div className="border-y border-[var(--line)] bg-[var(--bg-2)] py-8 overflow-hidden marquee-mask relative">
      <div className="flex marquee-track whitespace-nowrap">
        {[...Array(2)].map((_, r) => (
          <div key={r} className="flex items-center gap-16 pr-16 shrink-0">
            {words.map((w, i) => (
              <span key={`${r}-${i}`} className="flex items-center gap-12 text-4xl md:text-6xl font-display text-[var(--ink-dim)] tracking-wide">
                {w.toUpperCase()}
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full shrink-0"></span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="relative px-5 md:px-10 py-28 md:py-40">
      <div className="grid md:grid-cols-12 gap-10 md:gap-16">
        <div className="md:col-span-4 md:sticky md:top-28 self-start">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)] mb-8 flex items-center gap-3">
              <span className="text-[var(--accent)]">01 —</span>
              <span>The work</span>
              <WaveAccent bars={4} />
            </div>
            <h2 className="font-display display-tight text-[13.5vw] leading-[0.9] md:text-6xl md:leading-[0.85] mb-8">
              Rooms read.<br />Floors moved.<br /><span className="text-[var(--accent)]">Memories made.</span>
            </h2>
            <p className="text-[var(--ink-dim)] leading-relaxed max-w-[40ch] mb-10">
              From 300-cap basements to lakeside weddings, the job is the same — build tension, earn the drop, send everyone home with a story. Below is a slice of the last two years.
            </p>

            {/* Stat counter block */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-8 border-t border-[var(--line)]">
              <CountStat value={2147} label="Sets played" />
              <CountStat value={9} label="Years working" />
              <CountStat value={34} label="Cities / 12 countries" />
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-8 grid grid-cols-2 gap-4 md:gap-6">
          <Reveal className="col-span-2 md:col-span-2 aspect-[16/10] relative overflow-hidden group card-hover rounded-md">
            <img src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1400&q=80&auto=format&fit=crop" alt="DJ performing with hands raised, crowd lit by stage lights." className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" onError={(e) => { e.target.src = "https://picsum.photos/seed/cjeprint/1400/875"; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-2">2025 · Club</div>
                <div className="font-heading text-xl md:text-2xl">Ritual — Printworks</div>
              </div>
              <div className="font-mono text-xs text-[var(--ink-dim)]">04 / 18</div>
            </div>
          </Reveal>

          <Reveal delay={100} className="aspect-[4/5] relative overflow-hidden group card-hover rounded-md">
            <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=900&q=80&auto=format&fit=crop" alt="Golden hour outdoor wedding reception with string lights." className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" onError={(e) => { e.target.src = "https://picsum.photos/seed/cjewedding/900/1125"; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent"></div>
            <div className="absolute bottom-5 left-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-1">2025 · Private</div>
              <div className="font-heading text-lg">Lakeside, Cotswolds</div>
            </div>
          </Reveal>

          <Reveal delay={200} className="aspect-[4/5] relative overflow-hidden group card-hover rounded-md">
            <img src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&q=80&auto=format&fit=crop" alt="Festival crowd at dusk lit by stage lights." className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" onError={(e) => { e.target.src = "https://picsum.photos/seed/cjefestival/900/1125"; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent"></div>
            <div className="absolute bottom-5 left-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-1">2024 · Festival</div>
              <div className="font-heading text-lg">Wilderness — Atrium</div>
            </div>
          </Reveal>

          <Reveal delay={150} className="col-span-2 aspect-[16/9] relative overflow-hidden group card-hover rounded-md">
            <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&q=80&auto=format&fit=crop" alt="Smoky nightclub interior with atmospheric light." className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" onError={(e) => { e.target.src = "https://picsum.photos/seed/cjeclub/1400/788"; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-2">2024 · Residency</div>
                <div className="font-heading text-xl md:text-2xl">Hare & Hounds — Monthly</div>
              </div>
              <div className="font-mono text-xs text-[var(--ink-dim)]">12 / 18</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Mixes() {
  const [playing, setPlaying] = useState(null);
  return (
    <section id="mixes" className="relative px-5 md:px-10 py-28 md:py-40 border-t border-[var(--line)]">
      <Reveal>
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)] mb-8 flex items-center gap-3">
          <span className="text-[var(--accent)]">02 —</span>
          <span>Selected mixes</span>
          <WaveAccent bars={6} />
        </div>
      </Reveal>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-24 items-end mb-16 md:mb-24">
        <Reveal>
          <h2 className="font-display display-tight text-[15vw] md:text-[9vw]">
            Press <span className="text-[var(--accent)]">play.</span><br />Pour a drink.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-[var(--ink-dim)] leading-relaxed text-base md:text-lg max-w-[45ch] md:pb-4">
            Four mixes. Different rooms, different hours. Headphones on, lights down, volume honest.
          </p>
        </Reveal>
      </div>

      {/* Mix list — row-based */}
      <div className="border-t border-[var(--line)]">
        {mixes.map((m, i) => (
          <Reveal key={m.id} delay={i * 80}>
            <div
              onClick={() => setPlaying(playing === m.id ? null : m.id)}
              className="group relative grid grid-cols-[auto_1fr_auto] md:grid-cols-[60px_1.5fr_1fr_auto_auto] gap-4 md:gap-8 items-center py-6 md:py-8 border-b border-[var(--line)] cursor-pointer hover:bg-[var(--bg-2)] hover:pl-6 md:hover:pl-8 transition-all duration-500 px-2 md:px-4"
            >
              {/* Hover accent bar */}
              <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--accent)] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></span>

              <div className="font-mono text-xs text-[var(--ink-mute)]">0{m.id}</div>

              <div>
                <div className="font-heading text-xl md:text-3xl group-hover:text-[var(--accent)] transition-colors duration-300">
                  {m.title}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-mute)] mt-1 md:hidden">
                  {m.genre} · {m.length}
                </div>
              </div>

              <div className="hidden md:block font-mono text-xs uppercase tracking-[0.2em] text-[var(--ink-dim)]">
                {m.genre}
              </div>

              <div className="hidden md:block font-mono text-xs text-[var(--ink-dim)] text-right">
                {m.length}
              </div>

              <div className="flex items-center gap-3 justify-end">
                <div className="text-[var(--accent)]">
                  <Wave playing={playing === m.id} />
                </div>
                <div className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] transition-all duration-500">
                  {playing === m.id ? (
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="text-[var(--ink)] group-hover:text-[#1a0f08]">
                      <rect x="1" y="1" width="3" height="10" fill="currentColor"/>
                      <rect x="6" y="1" width="3" height="10" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="text-[var(--ink)] group-hover:text-[#1a0f08] ml-[2px]">
                      <path d="M1 1l8 5-8 5V1z" fill="currentColor"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Stream links */}
      <Reveal delay={200}>
        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-mono uppercase tracking-[0.2em]">
          <span className="text-[var(--ink-mute)]">Also on —</span>
          <a href="#" className="hover-link text-[var(--ink)]">Soundcloud</a>
          <a href="#" className="hover-link text-[var(--ink)]">Mixcloud</a>
          <a href="#" className="hover-link text-[var(--ink)]">Spotify</a>
          <a href="#" className="hover-link text-[var(--ink)]">YouTube</a>
        </div>
      </Reveal>
    </section>
  );
}

function Shows() {
  return (
    <section id="shows" className="relative px-5 md:px-10 py-28 md:py-40 border-t border-[var(--line)] bg-[var(--bg-2)] overflow-hidden">
      <div
        className="ambient-glow"
        style={{
          width: "50vw", height: "50vw", top: "-10%", left: "-10%",
          background: "radial-gradient(circle, rgba(232,103,60,0.6) 0%, transparent 65%)",
          animation: "ambientB 9s ease-in-out infinite"
        }}
      ></div>

      <div className="relative z-10">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)] mb-8 flex items-center gap-3">
            <span className="text-[var(--accent)]">03 —</span>
            <span>Shows · 2026</span>
            <WaveAccent bars={5} />
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display display-tight text-[18vw] md:text-[9vw] mb-16 md:mb-24">
            Where <span className="text-[var(--accent)]">next.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1.2fr_1fr_auto_auto] gap-4 md:gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-mute)] pb-4 border-b border-[var(--line)]">
          <div>Date</div>
          <div>Venue</div>
          <div className="hidden md:block">City</div>
          <div className="hidden md:block">Type</div>
          <div>Tickets</div>
        </div>

        {shows.map((s, i) => (
          <Reveal key={i} delay={i * 60}>
            <div className="group relative grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1.2fr_1fr_auto_auto] gap-4 md:gap-8 items-center py-6 md:py-7 border-b border-[var(--line)] transition-all duration-500 hover:pl-4 cursor-pointer">
              {/* Hover accent bar */}
              <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--accent)] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></span>

              <div className="font-mono text-xs md:text-sm text-[var(--ink-dim)] whitespace-nowrap group-hover:text-[var(--ink)] transition-colors">{s.date}</div>
              <div>
                <div className="font-heading text-lg md:text-2xl group-hover:text-[var(--accent)] transition-colors duration-300">
                  {s.venue}
                </div>
                <div className="md:hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-mute)] mt-1">
                  {s.city} · {s.tag}
                </div>
              </div>
              <div className="hidden md:block font-mono text-xs uppercase tracking-[0.2em] text-[var(--ink-dim)]">
                {s.city}
              </div>
              <div className="hidden md:block font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-dim)]">
                {s.tag}
              </div>
              <div>
                {s.sold ? (
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-mute)] line-through">
                    Sold out
                  </span>
                ) : (
                  <a href="#" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] hover-link">
                    Tickets →
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Weddings() {
  return (
    <section id="weddings" className="relative border-t border-[var(--line)]">
      <div className="grid md:grid-cols-2">
        {/* Image side — blue DJ photo colour-graded to amber */}
        <div className="relative aspect-[4/5] md:aspect-auto min-h-[70vh] overflow-hidden group">
          <img
            src={`${import.meta.env.BASE_URL}dj-setup.jpg`}
            alt="DJ setup with laptop running DJ software, controller and turntables lit at an event."
            className="absolute inset-0 w-full h-full object-cover ken-burns"
            style={{
              filter: "hue-rotate(180deg) saturate(1.1) contrast(1.1) brightness(0.9)",
            }}
          />
          {/* Orange multiply overlay — pushes remaining blues to warm */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(232,103,60,0.45) 0%, rgba(180,70,35,0.35) 100%)",
              mixBlendMode: "multiply",
            }}
          ></div>
          {/* Amber color overlay — screen blend to inject warm light */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 30% 40%, rgba(232,103,60,0.5) 0%, transparent 70%)",
              mixBlendMode: "screen",
            }}
          ></div>
          {/* Dark gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(12,11,10,0.2)] via-transparent to-[rgba(12,11,10,0.7)]"></div>
          {/* Animated amber orb overlay */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "70%", height: "70%", top: "-15%", right: "-15%",
              background: "radial-gradient(circle, rgba(232,103,60,0.8) 0%, transparent 65%)",
              mixBlendMode: "screen",
              filter: "blur(50px)",
              animation: "ambientA 7s ease-in-out infinite"
            }}
          ></div>
          {/* Second drifting glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "55%", height: "55%", bottom: "-15%", left: "-10%",
              background: "radial-gradient(circle, rgba(232,103,60,0.6) 0%, transparent 70%)",
              mixBlendMode: "screen",
              filter: "blur(60px)",
              animation: "ambientB 10s ease-in-out infinite"
            }}
          ></div>
          {/* Grain overlay for polish */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
            style={{
              backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
            }}
          ></div>

          <div className="absolute top-6 md:top-10 left-6 md:left-10 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink)] flex items-center gap-3 z-10">
            <span className="text-[var(--accent)]">04 —</span>
            <span>Weddings · Private hire</span>
            <WaveAccent bars={4} />
          </div>
          <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6 md:right-10 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-dim)] flex justify-between z-10">
            <span>Aug 2025 · The Barn at Berryfields</span>
            <span>Cap · 180</span>
          </div>
        </div>

        {/* Text side */}
        <div className="px-6 md:px-16 py-20 md:py-32 flex flex-col justify-center">
          <Reveal>
            <h2 className="font-display display-tight text-[14vw] md:text-6xl lg:text-7xl mb-10">
              Your day.<br /><span className="text-[var(--accent)]">Scored properly.</span>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-[var(--ink-dim)] leading-relaxed text-base md:text-lg max-w-[48ch] mb-12">
              Ceremony strings, golden-hour vinyl, a reception floor that goes until the venue pulls the plug. Full PA, DJ booth, wireless mic for speeches, optional sax or percussion — shaped around your guests, not a template.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-x-8 gap-y-8 mb-12 border-t border-[var(--line)] pt-10">
            <Reveal delay={150}>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">Included</div>
                <ul className="text-sm text-[var(--ink-dim)] leading-[2] space-y-0">
                  <li>Up to 8 hours playing</li>
                  <li>Pre-event consultation</li>
                  <li>Full PA & booth</li>
                  <li>Wireless speech mic</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">Add-ons</div>
                <ul className="text-sm text-[var(--ink-dim)] leading-[2] space-y-0">
                  <li>Sax / percussion duet</li>
                  <li>Ceremony acoustic set</li>
                  <li>Custom edit of your song</li>
                  <li>Extended lighting rig</li>
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={250}>
            <div className="flex flex-wrap items-center gap-6">
              <MagneticButton href="#book" variant="secondary">
                REQUEST WEDDING BROCHURE
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 5h14M11 1l4 4-4 4" stroke="currentColor" strokeWidth="2"/></svg>
              </MagneticButton>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--ink-mute)]">
                From £1,450
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Press() {
  return (
    <section className="relative px-5 md:px-10 py-28 md:py-40 border-t border-[var(--line)] overflow-hidden">
      {/* Ambient glow behind */}
      <div
        className="ambient-glow"
        style={{
          width: "45vw", height: "45vw", top: "20%", right: "-15%",
          background: "radial-gradient(circle, rgba(232,103,60,0.55) 0%, transparent 65%)",
          animation: "ambientA 11s ease-in-out infinite"
        }}
      ></div>

      <div className="relative z-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)] mb-8 flex items-center gap-3">
              <span className="text-[var(--accent)]">05 —</span>
              <span>Said about</span>
              <WaveAccent bars={4} />
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-9 space-y-12 md:space-y-16 max-w-4xl">
          {press.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <blockquote className="group">
                <div className="font-heading text-2xl md:text-3xl lg:text-4xl leading-[1.25] max-w-[40ch] text-[var(--ink)]" style={{letterSpacing: "-0.015em", fontWeight: 600}}>
                  <span className="text-[var(--accent)] mr-1">"</span>
                  {p.q}
                  <span className="text-[var(--accent)] ml-1">"</span>
                </div>
                <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-mute)] flex items-center gap-3">
                  <span className="inline-block w-6 h-px bg-[var(--ink-mute)]"></span>
                  {p.src}
                </div>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Book() {
  const [type, setType] = useState("Club / festival");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="book" className="book-section relative px-5 md:px-10 py-28 md:py-40 border-t border-[rgba(26,15,8,0.18)] bg-[var(--accent)] overflow-hidden">
      {/* Warm-white radial glow top-right and dark glow bottom-left — both read on orange */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "60vw", height: "60vw", top: "-15%", right: "-15%",
          background: "radial-gradient(circle, rgba(255,225,190,0.45) 0%, transparent 65%)",
          filter: "blur(70px)",
          animation: "ambientA 10s ease-in-out infinite",
        }}
      ></div>
      <div
        className="absolute pointer-events-none"
        style={{
          width: "55vw", height: "55vw", bottom: "-22%", left: "-18%",
          background: "radial-gradient(circle, rgba(26,15,8,0.55) 0%, transparent 65%)",
          filter: "blur(80px)",
          animation: "ambientB 12s ease-in-out infinite",
        }}
      ></div>

      <div className="relative z-10 grid md:grid-cols-12 gap-10 md:gap-16 text-[#1a0f08]">
        <div className="md:col-span-5">
          <Reveal>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-[rgba(26,15,8,0.78)] mb-8 flex items-center gap-3">
              <span className="text-[#1a0f08] font-semibold">06 —</span>
              <span>Bookings</span>
              <WaveAccent bars={4} />
            </div>
            <h2 className="font-display display-tight text-[16vw] md:text-7xl mb-10 text-[#1a0f08]">
              Tell me<br />about<br /><span className="text-white">the night.</span>
            </h2>
            <p className="text-[rgba(26,15,8,0.85)] leading-relaxed max-w-[38ch] mb-12 text-base md:text-lg">
              Quickest reply is direct — but this form works too. Expect a response within 48 hours, often same day.
            </p>

            <div className="space-y-4 font-mono text-sm">
              <div className="flex gap-4">
                <span className="text-[rgba(26,15,8,0.6)] w-20 text-xs uppercase tracking-[0.2em] pt-1">Direct</span>
                <a href="mailto:bookings@cjedwards.co" className="hover-link text-[#1a0f08] font-semibold">
                  bookings@cjedwards.co
                </a>
              </div>
              <div className="flex gap-4">
                <span className="text-[rgba(26,15,8,0.6)] w-20 text-xs uppercase tracking-[0.2em] pt-1">Agent</span>
                <a href="mailto:anna@bluestream.agency" className="hover-link text-[#1a0f08]">
                  anna@bluestream.agency
                </a>
              </div>
              <div className="flex gap-4">
                <span className="text-[rgba(26,15,8,0.6)] w-20 text-xs uppercase tracking-[0.2em] pt-1">Wedding</span>
                <a href="mailto:weddings@cjedwards.co" className="hover-link text-[#1a0f08]">
                  weddings@cjedwards.co
                </a>
              </div>
              <div className="flex gap-4">
                <span className="text-[rgba(26,15,8,0.6)] w-20 text-xs uppercase tracking-[0.2em] pt-1">Studio</span>
                <span className="text-[#1a0f08]">Digbeth, Birmingham B9</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={100}>
            <div className="bg-[rgba(26,15,8,0.06)] border border-[rgba(26,15,8,0.18)] rounded-2xl p-6 md:p-10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="radar-ping" style={{ filter: "hue-rotate(180deg) saturate(0)" }}></span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1a0f08] font-semibold">Enquiry form · 48h reply</span>
              </div>
              <div className="font-display text-3xl md:text-4xl mb-8 leading-[0.95] text-[#1a0f08]">
                Fill this in,<br />I'll get back.
              </div>

              <div className="mb-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[rgba(26,15,8,0.7)] mb-4">Type of booking</div>
                <div className="flex flex-wrap gap-2">
                  {["Club / festival", "Wedding", "Private / corporate", "Studio / collab"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={`press px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] border transition-all duration-300 ${
                        type === t
                          ? "border-[#1a0f08] bg-[#1a0f08] text-[var(--accent)]"
                          : "border-[rgba(26,15,8,0.35)] text-[rgba(26,15,8,0.78)] hover:border-[#1a0f08] hover:text-[#1a0f08]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <input type="text" placeholder="Your name" className="input-bare" />
              <input type="email" placeholder="Email" className="input-bare" />
              <input type="text" placeholder="Event date — day / month / year" className="input-bare" />
              <input type="text" placeholder="Venue or location" className="input-bare" />
              <input type="text" placeholder="Approximate guest count" className="input-bare" />
              <textarea placeholder="Tell me about the night — vibe, set length, anything that matters." rows="4" className="input-bare resize-none"></textarea>

              <div className="pt-8 flex flex-wrap items-center gap-6">
                <MagneticButton onClick={handleSubmit} className="!bg-[#1a0f08] !text-[var(--accent)]">
                  {sent ? "RECEIVED — TALK SOON" : "SEND ENQUIRY"}
                  {!sent && <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 5h14M11 1l4 4-4 4" stroke="currentColor" strokeWidth="2"/></svg>}
                </MagneticButton>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[rgba(26,15,8,0.65)] max-w-[28ch] leading-relaxed">
                  By sending you agree to the privacy policy. Nothing shared, nothing spammy.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative px-5 md:px-10 pt-20 pb-48 md:pb-40 border-t border-[var(--line)] overflow-hidden">
      {/* Ambient glow */}
      <div
        className="ambient-glow"
        style={{
          width: "60vw", height: "60vw", bottom: "-25%", right: "-15%",
          background: "radial-gradient(circle, rgba(232,103,60,0.55) 0%, transparent 65%)",
          animation: "ambientA 12s ease-in-out infinite"
        }}
      ></div>

      <div className="relative z-10">
        {/* Back to top bar */}
        <div className="mb-16 md:mb-24">
          <a href="#top" className="group flex items-center justify-between border-b border-[var(--line)] pb-6 hover:border-[var(--accent)] transition-colors duration-500">
            <span className="font-display text-2xl md:text-4xl tracking-wide text-[var(--ink-dim)] group-hover:text-[var(--ink)] transition-colors duration-500">
              BACK TO TOP
            </span>
            <span className="flex items-center gap-4">
              <span className="hidden md:block font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-mute)]">Return</span>
              <span className="w-12 h-12 rounded-full border border-[var(--line)] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] flex items-center justify-center transition-all duration-500">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[var(--ink)] group-hover:text-[#1a0f08] transition-colors duration-500">
                  <path d="M7 13V1M2 6l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                </svg>
              </span>
            </span>
          </a>
        </div>

        {/* Top block — big booking CTA + link columns */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-16 md:mb-24">
          <div className="md:col-span-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-[var(--accent)]"></span>
              Book direct
            </div>
            <a
              href="mailto:bookings@cjedwards.co"
              className="font-display text-3xl md:text-5xl lg:text-6xl tracking-wide text-[var(--ink)] hover:text-[var(--accent)] transition-colors duration-500 block mb-5 break-all md:break-normal"
            >
              bookings@cjedwards.co
            </a>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-mute)]">
              Studio · Digbeth, Birmingham B9 · Worldwide
            </div>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-8">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-mute)] mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-[var(--accent)]"></span>
                Follow
              </div>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover-link inline-flex items-center gap-2"><span>Instagram</span><span className="text-[var(--ink-mute)] text-xs">↗</span></a></li>
                <li><a href="#" className="hover-link inline-flex items-center gap-2"><span>Soundcloud</span><span className="text-[var(--ink-mute)] text-xs">↗</span></a></li>
                <li><a href="#" className="hover-link inline-flex items-center gap-2"><span>Mixcloud</span><span className="text-[var(--ink-mute)] text-xs">↗</span></a></li>
                <li><a href="#" className="hover-link inline-flex items-center gap-2"><span>Spotify</span><span className="text-[var(--ink-mute)] text-xs">↗</span></a></li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-mute)] mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-[var(--accent)]"></span>
                Site
              </div>
              <ul className="space-y-2 text-sm">
                <li><a href="#book" className="hover-link">Bookings</a></li>
                <li><a href="#weddings" className="hover-link">Weddings</a></li>
                <li><a href="#mixes" className="hover-link">Mixes</a></li>
                <li><a href="#shows" className="hover-link">Shows</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Giant wordmark — replaces the oversized logo */}
        <a href="#top" className="group block select-none" aria-label="Back to top">
          <div
            className="font-display tracking-[-0.02em] leading-[0.82] text-[var(--ink)] transition-colors duration-700 group-hover:text-[var(--accent)]"
            style={{ fontSize: "clamp(72px, 22vw, 320px)" }}
          >
            CJ EDWARDS
          </div>
        </a>

        {/* Bottom row — monogram + meta */}
        <div className="mt-10 pt-8 border-t border-[var(--line)] flex flex-col md:flex-row justify-between items-start md:items-center gap-5 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-mute)]">
          <div className="flex items-center gap-3">
            <Logo size={22} color="var(--ink-mute)" />
            <span>© CJ Edwards · MMXXVI · Birmingham</span>
          </div>
          <div className="flex items-center gap-3">
            <WaveAccent bars={4} />
            <span>Studio transmission no. 001</span>
          </div>
          <div>Built with long nights &amp; short records</div>
        </div>
      </div>
    </footer>
  );
}

function FloatingNav() {
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const ids = ["top", ...nav.map(n => n.href.slice(1))];
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (open) { setHidden(false); lastY.current = y; return; }
      if (y < 80) { setHidden(false); lastY.current = y; return; }
      const delta = y - lastY.current;
      if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <>
      {/* Full-screen menu overlay */}
      <div
        className={`fixed inset-0 z-[45] transition-all duration-700 ease-[cubic-bezier(.2,.6,.2,1)] ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "rgba(12,11,10,0.94)", backdropFilter: "blur(28px)" }}
        onClick={() => setOpen(false)}
      >
        {/* Animated ambient glows behind menu */}
        <div
          className="ambient-glow"
          style={{
            width: "70vw", height: "70vw", top: "-15%", right: "-20%",
            background: "radial-gradient(circle, rgba(232,103,60,0.55) 0%, transparent 60%)",
            animation: "ambientA 8s ease-in-out infinite"
          }}
        ></div>
        <div
          className="ambient-glow"
          style={{
            width: "55vw", height: "55vw", bottom: "-15%", left: "-15%",
            background: "radial-gradient(circle, rgba(196,154,90,0.55) 0%, transparent 65%)",
            animation: "ambientB 11s ease-in-out infinite"
          }}
        ></div>

        <div
          className="relative h-full flex flex-col justify-between px-6 md:px-12 py-24 md:py-16"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top meta row — sits under the hamburger, with big amber logo anchor */}
          <div
            className="flex justify-between items-start gap-6"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-20px)",
              transition: `opacity 600ms cubic-bezier(.2,.6,.2,1), transform 600ms cubic-bezier(.2,.6,.2,1)`,
            }}
          >
            <div className="flex items-center gap-4 md:gap-6">
              <Logo size={60} color="var(--accent)" className="logo-pulse" />
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-dim)] leading-tight">
                <div className="flex items-center gap-2 mb-1">
                  <span className="radar-ping"></span>
                  <span>Live · Birmingham</span>
                </div>
                <div className="text-[var(--ink)] text-sm md:text-base font-display tracking-wide normal-case">CJ Edwards</div>
                <div className="mt-0.5">Selector · Producer · 2017</div>
              </div>
            </div>
            <div className="text-right hidden sm:block font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-dim)]">
              <div>Navigation · 2026</div>
              <div className="mt-1 text-[var(--accent)]">Bookings open</div>
            </div>
          </div>

          {/* Nav items — giant, full-width rounded rectangles */}
          <div className="grid gap-3 md:gap-4 w-full">
            {nav.map((n, i) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="menu-item group relative block bg-[var(--accent)] text-[#1a0f08] font-display tracking-wide rounded-xl overflow-hidden"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(40px)",
                  transition: `opacity 700ms ${200 + i * 80}ms cubic-bezier(.2,.6,.2,1), transform 700ms ${200 + i * 80}ms cubic-bezier(.2,.6,.2,1)`,
                }}
              >
                {/* Shimmer sweep on hover */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>

                <div className="relative flex items-center justify-between px-5 md:px-10 py-5 md:py-7">
                  <div className="flex items-center gap-4 md:gap-6">
                    <span className="font-mono text-xs md:text-sm opacity-50">0{i + 1}</span>
                    <span className="text-3xl md:text-5xl lg:text-6xl">{n.label.toUpperCase()}</span>
                  </div>
                  <span className="flex items-center gap-3 text-xs md:text-sm font-mono opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
                    <span className="hidden md:inline">{n.meta}</span>
                    <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                      <path d="M1 6h16M12 1l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/>
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Bottom meta row — contact info */}
          <div
            className="grid md:grid-cols-3 gap-6 md:gap-12 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[var(--ink-dim)]"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 600ms 600ms cubic-bezier(.2,.6,.2,1), transform 600ms 600ms cubic-bezier(.2,.6,.2,1)`,
            }}
          >
            <div>
              <div className="text-[var(--ink-mute)] mb-2">Direct</div>
              <a href="mailto:bookings@cjedwards.co" className="text-[var(--ink)] hover-link normal-case tracking-normal">bookings@cjedwards.co</a>
            </div>
            <div>
              <div className="text-[var(--ink-mute)] mb-2">Follow</div>
              <div className="flex gap-4">
                <a href="#" className="text-[var(--ink)] hover-link">IG</a>
                <a href="#" className="text-[var(--ink)] hover-link">SC</a>
                <a href="#" className="text-[var(--ink)] hover-link">MX</a>
                <a href="#" className="text-[var(--ink)] hover-link">SP</a>
              </div>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-[var(--ink-mute)] mb-2">Studio</div>
              <div className="text-[var(--ink)]">Digbeth · Birmingham</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating pill nav — minimal three-part: MENU | wordmark | BOOK */}
      <nav
        className={`fixed bottom-0 inset-x-0 md:inset-x-auto md:bottom-5 md:left-1/2 md:-translate-x-1/2 z-[60] safe-bottom transition-transform duration-500 ease-[cubic-bezier(.2,.6,.2,1)] ${hidden ? "translate-y-full" : "translate-y-0"}`}
      >
        <div className="nav-glass rounded-none md:rounded-full px-3 py-3 md:p-2 flex items-center justify-between md:justify-start gap-2 md:gap-2 w-full md:w-auto border-t md:border border-[var(--line)] max-w-full overflow-hidden">

          {/* Menu button — animated hamburger + label */}
          <button
            onClick={() => setOpen(!open)}
            className="mag-btn relative bg-[var(--accent)] text-[#1a0f08] rounded-xl md:rounded-full pl-4 pr-5 py-3.5 md:py-3 md:pl-4 md:pr-5 flex items-center gap-2.5 font-display text-sm md:text-sm tracking-wide min-w-[108px] md:min-w-[110px] justify-center md:justify-start shrink-0"
          >
            <span className="flex flex-col gap-[4px] md:gap-[3px] w-5 md:w-4">
              <span className={`block h-[2.5px] md:h-[2px] bg-[#1a0f08] transition-all duration-400 ease-[cubic-bezier(.2,.6,.2,1)] ${open ? "translate-y-[6.5px] md:translate-y-[5px] rotate-45" : ""}`}></span>
              <span className={`block h-[2.5px] md:h-[2px] bg-[#1a0f08] transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`}></span>
              <span className={`block h-[2.5px] md:h-[2px] bg-[#1a0f08] transition-all duration-400 ease-[cubic-bezier(.2,.6,.2,1)] ${open ? "-translate-y-[6.5px] md:-translate-y-[5px] -rotate-45" : ""}`}></span>
            </span>
            {open ? "CLOSE" : "MENU"}
          </button>

          {/* Center wordmark */}
          <a href="#top" className="flex items-center gap-2 md:gap-2.5 px-1 md:px-5 py-2 text-[var(--ink)] shrink min-w-0">
            <Logo size={28} color="var(--ink)" className="md:hidden shrink-0" />
            <Logo size={26} color="var(--ink)" className="hidden md:block" />
            <span className="font-display text-sm tracking-wide hidden xs:inline">CJ EDWARDS</span>
          </a>

          {/* Contact button */}
          <a
            href="#book"
            className="mag-btn relative bg-transparent border border-[var(--line)] text-[var(--ink)] rounded-xl md:rounded-full px-4 md:px-5 py-3.5 md:py-3 font-display text-sm md:text-sm tracking-wide hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-300 min-w-[82px] md:min-w-[80px] text-center flex items-center justify-center shrink-0"
          >
            BOOK
          </a>
        </div>

        {/* Active section indicator — subtle dot showing progress */}
        <div className="hidden md:flex absolute -top-3 left-1/2 -translate-x-1/2 gap-1">
          {["top", ...nav.map(n => n.href.slice(1))].map((id) => (
            <span
              key={id}
              className={`h-[2px] rounded-full transition-all duration-500 ${
                active === id ? "w-6 bg-[var(--accent)]" : "w-1 bg-[var(--line)]"
              }`}
            ></span>
          ))}
        </div>
      </nav>
    </>
  );
}

/* ─────────────────────────────────────────────
   App
   ───────────────────────────────────────────── */

function App() {
  // Cursor tracking
  useEffect(() => {
    const dot = document.getElementById("cursorDot");
    if (!dot) return;
    const move = (e) => { dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px"; };
    const overLink = () => dot.classList.add("active");
    const outLink = () => dot.classList.remove("active");
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", overLink);
      el.addEventListener("mouseleave", outLink);
    });
    return () => window.removeEventListener("mousemove", move);
  });

  return (
    <>
      <BrandMark />
      <NowPlaying />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Mixes />
        <Shows />
        <Weddings />
        <Press />
        <Book />
      </main>
      <Footer />
      <FloatingNav />
    </>
  );
}

export default App
