import React, { useEffect, useRef, useState } from "react";
import { Cloud, ShieldCheck, Wallet, Smartphone } from "lucide-react";
import "./style.css";

const FEATURES = [
  {
    icon: Cloud,
    title: "Cloud-Native",
    description: "Zero-install, auto-updates, elastic scale on secure infrastructure.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade Security",
    description:
      "HIPAA & GDPR ready with end-to-end encryption and audit trails.",
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    description: "Transparent per-user plans. No hidden fees. Cancel anytime.",
  },
  {
    icon: Smartphone,
    title: "Anywhere, Anytime",
    description:
      "Web + native iOS/Android apps for doctors, staff and patients.",
  },
];

const STATS = [
  { value: "99.99%", label: "Uptime SLA" },
  { value: "< 200ms", label: "Avg response" },
  { value: "256-bit", label: "Encryption" },
];

export default function Advantages() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="advantages"
      ref={sectionRef}
      data-nav-theme="light"
      className={`adv ${isVisible ? "adv--visible" : ""}`}
    >
      <div className="adv__inner">
        <div className="adv__content">
          <span className="adv__badge adv__reveal" style={{ "--d": "0ms" }}>
            TECHNICAL ADVANTAGES
          </span>

          <h2 className="adv__title adv__reveal" style={{ "--d": "80ms" }}>
            Engineered for
            <br />
            <span className="adv__title-accent">reliability</span> at any
            scale.
          </h2>

          <p className="adv__description adv__reveal" style={{ "--d": "160ms" }}>
            Built on modern cloud infrastructure with strict compliance,
            MediCore keeps your data safe and your teams productive — from a
            single practice to a 1,000-bed hospital network.
          </p>

          <div className="adv__stats">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="adv__stat adv__reveal"
                style={{ "--d": `${240 + i * 80}ms` }}
              >
                <span className="adv__stat-value">{stat.value}</span>
                <span className="adv__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="adv__grid">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="adv__card adv__reveal"
                style={{ "--d": `${120 + i * 100}ms` }}
              >
                <span className="adv__card-icon">
                  <Icon size={20} strokeWidth={2.2} />
                </span>
                <h3 className="adv__card-title">{feature.title}</h3>
                <p className="adv__card-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
