

import React from "react";
import { Building, Stethoscope, Users } from "lucide-react";
import "./style.css";

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="who-serve__check-icon"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function WhoWeServe() {
  return (
    <section className="who-serve" id="who-we-serve" data-nav-theme="light">
      <div className="who-serve__inner">
        <div className="who-serve__header">
          <div className="who-serve__badge">Who We Serve</div>
          <h2 className="who-serve__title">
            Built for every kind of care
            <br />
            provider.
          </h2>
        </div>

        <div className="who-serve__grid">
          {/* Card 1: Hospitals */}
          <div className="who-serve__card">
            <div className="who-serve__card-icon-container">
              <Building size={20} strokeWidth={2.4} />
            </div>
            <h3 className="who-serve__card-title">Hospitals</h3>
            <p className="who-serve__card-subtitle">Multi-department, multi-location.</p>
            <ul className="who-serve__list">
              <li>
                <CheckIcon />
                <span>IPD, OPD, OT, Emergency</span>
              </li>
              <li>
                <CheckIcon />
                <span>Lab, Radiology &amp; Pharmacy</span>
              </li>
              <li>
                <CheckIcon />
                <span>Insurance &amp; TPA workflows</span>
              </li>
              <li>
                <CheckIcon />
                <span>HR, payroll &amp; finance</span>
              </li>
            </ul>
            <button type="button" className="who-serve__cta">
              Talk to sales
            </button>
          </div>

          {/* Card 2: Clinics (Most Popular) */}
          <div className="who-serve__card who-serve__card--featured">
            <div className="who-serve__card-popular-badge">Most Popular</div>
            <div className="who-serve__card-icon-container">
              <Stethoscope size={20} strokeWidth={2.4} />
            </div>
            <h3 className="who-serve__card-title">Clinics</h3>
            <p className="who-serve__card-subtitle">Single &amp; multi-specialty.</p>
            <ul className="who-serve__list">
              <li>
                <CheckIcon />
                <span>Appointments &amp; tele-consult</span>
              </li>
              <li>
                <CheckIcon />
                <span>OPD queue &amp; prescriptions</span>
              </li>
              <li>
                <CheckIcon />
                <span>Patient recalls &amp; CRM</span>
              </li>
              <li>
                <CheckIcon />
                <span>Package &amp; membership billing</span>
              </li>
            </ul>
            <button type="button" className="who-serve__cta who-serve__cta--featured">
              Talk to sales
            </button>
          </div>

          {/* Card 3: Private Practitioners */}
          <div className="who-serve__card">
            <div className="who-serve__card-icon-container">
              <Users size={20} strokeWidth={2.4} />
            </div>
            <h3 className="who-serve__card-title">Private Practitioners</h3>
            <p className="who-serve__card-subtitle">Specialists &amp; solo doctors.</p>
            <ul className="who-serve__list">
              <li>
                <CheckIcon />
                <span>Beautiful EHR templates</span>
              </li>
              <li>
                <CheckIcon />
                <span>e-Prescribing &amp; lab orders</span>
              </li>
              <li>
                <CheckIcon />
                <span>Mobile-first patient app</span>
              </li>
              <li>
                <CheckIcon />
                <span>Automated follow-ups</span>
              </li>
            </ul>
            <button type="button" className="who-serve__cta">
              Talk to sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
