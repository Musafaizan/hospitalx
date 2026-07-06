import React from "react";
import { Stethoscope, Mail, Phone, MapPin } from "lucide-react";
import "./style.css";

const PRODUCT_LINKS = [
  { label: "Unified Solution", href: "/#solution" },
  { label: "Who We Serve", href: "/#who-we-serve" },
  { label: "Advantages", href: "/#advantages" },
  { label: "Trust & Security", href: "/#trust" },
];
const COMPANY_LINKS = [
  { label: "About", href: "/#who-we-serve" },
  { label: "Careers", href: "/#demo" },
  { label: "Blog", href: "/#faq" },
  { label: "Contact", href: "/#demo" },
];
const LEGAL_LINKS = [
  { label: "Privacy", href: "/#faq" },
  { label: "Terms", href: "/#demo" },
  { label: "Security", href: "/#trust" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" data-nav-theme="dark">
      <div className="footer-top">
        <div className="footer-brand reveal" style={{ "--delay": "0ms" }}>
          <div className="brand-row">
            <span className="brand-icon">
              <Stethoscope strokeWidth={2} />
            </span>
            <span className="brand-name">
              Medi<span className="accent">Core</span>
            </span>
          </div>
          <p className="brand-desc">
            The unified healthcare platform for hospitals, clinics and private
            practitioners.
          </p>
        </div>

        <nav className="footer-col reveal" style={{ "--delay": "80ms" }} aria-label="Product">
          <h4 className="col-title">Product</h4>
          <ul className="col-list">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col reveal" style={{ "--delay": "160ms" }} aria-label="Company">
          <h4 className="col-title">Company</h4>
          <ul className="col-list">
            {COMPANY_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col reveal" style={{ "--delay": "240ms" }}>
          <h4 className="col-title">Contact</h4>
          <ul className="contact-list">
            <li>
              <Mail className="contact-icon" strokeWidth={1.8} />
              <a href="mailto:hello@medicore.io">hello@medicore.io</a>
            </li>
            <li>
              <Phone className="contact-icon" strokeWidth={1.8} />
              <a href="tel:+15550101200">+1 (555) 010-1200</a>
            </li>
            <li>
              <MapPin className="contact-icon" strokeWidth={1.8} />
              <span>Global HQ &middot; Available in 120+ countries</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">&copy; {year} MediCore. All rights reserved.</p>
        <ul className="legal-list">
          {LEGAL_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}