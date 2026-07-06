import React, { useEffect, useRef, useState } from "react";
import { Globe2, Users, HeartPulse, Star } from "lucide-react";
import logo1 from "../../../assets/logo1.png";
import logo2 from "../../../assets/logo2.png";
import logo3 from "../../../assets/logo3.png";
import logo4 from "../../../assets/logo4.png";
import logo5 from "../../../assets/logo5.png";
import "./style.css";

const STATS = [
  { icon: Globe2, target: 120, prefix: "", suffix: "+", label: "Countries" },
  { icon: Users, target: 50, prefix: "", suffix: "K+", label: "Providers" },
  { icon: HeartPulse, target: 18, prefix: "", suffix: "M+", label: "Patients served" },
  { icon: Star, target: 4.9, decimals: 1, prefix: "", suffix: "/5", label: "Customer rating" },
];

const TESTIMONIALS = [
  {
    quote:
      "MediCore replaced four systems for us. Our OPD wait time dropped by 38% in the first quarter.",
    name: "Dr. Anika Rao",
    role: "Medical Director, Sunrise Multispecialty",
  },
  {
    quote:
      "The EHR is the first one my doctors actually enjoy using. Documentation is finally fast.",
    name: "James O'Neil",
    role: "CIO, Northbridge Health Group",
  },
  {
    quote:
      "From billing to lab integrations — everything just works. Support has been exceptional.",
    name: "Dr. Priya Menon",
    role: "Founder, WellPath Clinics",
  },
];

const LOGOS = [
  { src: logo1, alt: "Partner logo 1" },
  { src: logo2, alt: "Partner logo 2" },
  { src: logo3, alt: "Partner logo 3" },
  { src: logo4, alt: "Partner logo 4" },
  { src: logo5, alt: "Partner logo 5" },
];

function initials(name) {
  return name
    .replace(/^Dr\.\s*/i, "")
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Animates 0 -> target every time `runId` changes. Instant for
// people who've asked for reduced motion.
function useCountUp(target, decimals, runId, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!runId) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setValue(target);
      return;
    }

    setValue(0);
    let raf;
    const start = performance.now();
    const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const next = easeOutExpo(progress) * target;
      setValue(Number(next.toFixed(decimals)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId, target, decimals]);

  return value;
}

function StatCard({ stat, index, runId }) {
  const decimals = stat.decimals || 0;
  const value = useCountUp(stat.target, decimals, runId);
  const display = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  return (
    <div className="stat-card reveal" style={{ "--delay": `${index * 90}ms` }}>
      <div className="stat-icon-ring">
        <stat.icon className="stat-icon" strokeWidth={1.75} />
      </div>
      <div className="stat-value" key={runId}>
        {stat.prefix}
        {display}
        {stat.suffix}
      </div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

function Stars({ count = 5 }) {
  return (
    <div className="stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="star-icon"
          fill="currentColor"
          strokeWidth={0}
          style={{ animationDelay: `${i * 70}ms` }}
        />
      ))}
    </div>
  );
}

// Seamless right-to-left marquee: the logo strip is duplicated once so the
// animation can loop from -50% back to 0% with no visible seam.
function LogoMarquee({ logos }) {
  return (
    <div className="logo-marquee reveal" style={{ "--delay": "480ms" }} aria-label="Trusted by">
      <div className="logo-marquee__fade logo-marquee__fade--left" aria-hidden="true" />
      <div className="logo-marquee__fade logo-marquee__fade--right" aria-hidden="true" />
      <div className="logo-marquee__track">
        {[...logos, ...logos].map((logo, i) => (
          <div className="logo-marquee__item" key={`${logo.alt}-${i}`}>
            <img src={logo.src} alt={logo.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrustSection() {
  const sectionRef = useRef(null);
  const wasInViewRef = useRef(false);
  // Bumped every time the section transitions from out-of-view to in-view,
  // which both remounts the .reveal elements (restarting their CSS
  // animations) and re-triggers the stat count-up.
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasInViewRef.current) {
          wasInViewRef.current = true;
          setRunId((id) => id + 1);
        } else if (!entry.isIntersecting) {
          wasInViewRef.current = false;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="trust" className="trust-section" data-nav-theme="light" ref={sectionRef}>
      <div className="trust-container" key={runId}>
        <p className="trust-eyebrow reveal" style={{ "--delay": "0ms" }}>
          Trusted by care teams worldwide
        </p>

        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <StatCard stat={stat} index={i} runId={runId} key={stat.label} />
          ))}
        </div>

        <h2 className="trust-heading reveal" style={{ "--delay": "120ms" }}>
          Loved by teams <span className="trust-heading-accent">around the world.</span>
        </h2>

        <div className="testimonial-grid">
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              className="testimonial-card reveal"
              style={{ "--delay": `${180 + i * 100}ms` }}
              key={t.name}
            >
              <span className="testimonial-quote-mark" aria-hidden="true">
                &rdquo;
              </span>
              <Stars />
              <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
              <footer className="testimonial-author">
                <span className="author-avatar">{initials(t.name)}</span>
                <span className="testimonial-author-text">
                  <cite className="author-name">{t.name}</cite>
                  <span className="author-role">{t.role}</span>
                </span>
              </footer>
            </blockquote>
          ))}
        </div>

        <LogoMarquee logos={LOGOS} />
      </div>
    </section>
  );
}