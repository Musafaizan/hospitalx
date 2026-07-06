import React, { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowRight, Play, ShieldCheck, Globe } from "lucide-react";
import "./style.css";
// Adjust the path to your image as needed
import doctorImage from "../../../assets/header-pic.png";

export default function Hero() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set up the Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle true when in view, false when out of view
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.15, // Triggers when 15% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`hero ${isVisible ? "is-visible" : ""}`} 
      data-nav-theme="dark"
    >
      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__badge">
            <Sparkles size={14} className="hero__badge-icon" />
            <span>Unified Hospital · Clinic · EHR/EMR Platform</span>
          </div>

          <h1 className="hero__title">
            One platform for the
            <br />
            <span className="hero__title-accent">entire continuum</span> of
            <br />
            care.
          </h1>

          <p className="hero__description">
            Run hospital operations, streamline clinic workflows, and manage EHR/EMR records — all in a single cloud system trusted by providers in <strong>120+ countries</strong>.
          </p>

          <div className="hero__actions">
            <a href="#demo" className="hero__cta-primary">
              Request a Free Demo <ArrowRight size={16} strokeWidth={2.5} />
            </a>
            <button type="button" className="hero__cta-secondary">
              <span className="hero__play-btn-circle">
                <Play size={10} fill="currentColor" stroke="none" />
              </span>
              Watch overview
            </button>
          </div>

          <div className="hero__trust">
            <div className="hero__trust-item">
              <ShieldCheck size={16} className="hero__trust-icon" />
              <span>HIPAA &amp; GDPR ready</span>
            </div>
            <div className="hero__trust-item">
              <Globe size={16} className="hero__trust-icon" />
              <span>Multi-language, multi-currency</span>
            </div>
          </div>
        </div>

        <div className="hero__media">
          <div className="hero__image-wrapper">
            <div className="hero__image-container">
              <img
                src={doctorImage}
                alt="Doctor reviewing patient analytics on tablet"
                className="hero__image"
                loading="eager"
              />
              
              {/* System Uptime Badge */}
              <div className="hero__status-badge">
                <span className="hero__status-dot"></span>
                <span>System uptime <strong className="hero__status-value">99.99%</strong></span>
              </div>

              {/* Live Patients Card */}
              <div className="hero__live-patients-card">
                <span className="hero__card-label">Live patients today</span>
                <span className="hero__card-value">4,286</span>
                <span className="hero__card-trend">▲ 12.4% vs last week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}