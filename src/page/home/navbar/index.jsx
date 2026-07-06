import React, { useEffect, useRef, useState } from "react";
import { Stethoscope, Menu, X } from "lucide-react";
import "./style.css";

const NAV_LINKS = [
 { name: "Trust", href: "#trust" },
  { name: "Who We Serve", href: "#who-we-serve" },
  { name: "Advantages", href: "#advantages" },
  { name: "Solution", href: "#solution" },
  { name: "FAQ", href: "#faq" },
];

function getNavbarTheme() {
  const navbar = document.querySelector(".mc-navbar");
  const probeY = window.scrollY + (navbar?.offsetHeight ?? 80) * 0.5;
  let theme = "dark";

  document.querySelectorAll("[data-nav-theme]").forEach((section) => {
    const rect = section.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const bottom = top + rect.height;

    if (probeY >= top && probeY < bottom) {
      theme = section.dataset.navTheme;
    }
  });

  return theme;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const tickingRef = useRef(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsLight(getNavbarTheme() === "light");
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(updateTheme);
    };

    updateTheme();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className={`mc-navbar ${isLight ? "mc-navbar--light" : ""}`}>
      <div className="mc-navbar__inner">
        <a href="#" className="mc-navbar__brand">
          <span className="mc-navbar__logo">
            <Stethoscope size={18} strokeWidth={2.4} />
          </span>
          <span className="mc-navbar__brand-text">
            Medi<span className="mc-navbar__brand-accent">Core</span>
          </span>
        </a>

        <nav
          className={`mc-navbar__links ${isOpen ? "mc-navbar__links--open" : ""}`}
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mc-navbar__link"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#demo"
            className="mc-navbar__cta mc-navbar__cta--mobile"
            onClick={() => setIsOpen(false)}
          >
            Request a Demo
          </a>
        </nav>

        <a href="#demo" className="mc-navbar__cta mc-navbar__cta--desktop">
          Request a Demo
        </a>

        <button
          type="button"
          className="mc-navbar__toggle"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <X size={22} strokeWidth={2.2} />
          ) : (
            <Menu size={22} strokeWidth={2.2} />
          )}
        </button>
      </div>
    </header>
  );
}