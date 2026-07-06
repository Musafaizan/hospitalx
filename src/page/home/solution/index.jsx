import React, { useState, useEffect, useRef } from "react";
import {
  Building,
  Stethoscope,
  FileText,
  Bed,
  Pill,
  CreditCard,
  Users,
  Activity,
  Calendar,
  ClipboardList,
  TrendingUp,
  ClipboardCheck,
  ShieldCheck,
  Lock,
  Link2,
  Bell,
  Clock,
  CheckCircle2,
} from "lucide-react";
import solution from "../../../assets/solution-bg.png";  
import "./style.css";

const IconMap = {
  Building,
  Stethoscope,
  FileText,
  Bed,
  Pill,
  CreditCard,
  Users,
  Activity,
  Calendar,
  ClipboardList,
  TrendingUp,
  ClipboardCheck,
  ShieldCheck,
  Lock,
  Link2,
  Bell,
  Clock,
  CheckCircle2,
};

const TABS = {
  hospital: {
    id: "hospital",
    label: "Hospital Operations",
    icon: "Building",
    sublabel: "End-to-end hospital management — from admissions to discharge.",
    mockUrl: "app.medicore.health/hospital",
    statChips: [
      { label: "Bed occupancy", value: "86%" },
      { label: "Avg. stay", value: "3.2 days" },
    ],
    chartValues: [46, 72, 58, 90, 64, 80],
    mockRows: [
      { icon: "Bed", label: "Ward 4B — General", value: "12 / 16 beds" },
      { icon: "ClipboardList", label: "Lab orders pending", value: "7 new" },
      { icon: "CreditCard", label: "TPA claim #4471", value: "Approved" },
    ],
    badges: [
      { icon: "Bell", text: "Live bed board" },
      { icon: "CheckCircle2", text: "1-click TPA claims" },
    ],
    cards: [
      {
        title: "IPD & Ward Management",
        desc: "Bed allocation, transfers, nursing workflows.",
        icon: "Bed",
      },
      {
        title: "Laboratory & Radiology",
        desc: "Orders, samples, LIS/RIS with instrument integration.",
        icon: "ClipboardList",
      },
      {
        title: "Pharmacy & Inventory",
        desc: "Stock, batch, expiry & vendor management.",
        icon: "Pill",
      },
      {
        title: "Billing & Insurance",
        desc: "TPA, claims, GST/VAT compliant invoicing.",
        icon: "CreditCard",
      },
      {
        title: "HR & Payroll",
        desc: "Staff rota, attendance, doctor commissions.",
        icon: "Users",
      },
      {
        title: "Operation Theatre",
        desc: "OT scheduling, consumables & anesthesia notes.",
        icon: "Activity",
      },
    ],
  },
  clinic: {
    id: "clinic",
    label: "Clinic Workflow",
    icon: "Stethoscope",
    sublabel: "Purpose-built for single & multi-specialty clinics.",
    mockUrl: "app.medicore.health/clinic",
    statChips: [
      { label: "Avg. wait time", value: "6 min" },
      { label: "No-shows", value: "-32%" },
    ],
    chartValues: [30, 55, 40, 68, 84, 60],
    mockRows: [
      { icon: "Calendar", label: "Dr. Sharma — Cardiology", value: "10:30 AM" },
      { icon: "Users", label: "Walk-ins in queue", value: "4 waiting" },
      { icon: "FileText", label: "Rx sent to pharmacy", value: "Just now" },
    ],
    badges: [
      { icon: "Clock", text: "Zero double-bookings" },
      { icon: "Bell", text: "Automated recalls" },
    ],
    cards: [
      {
        title: "Online Appointments",
        desc: "Self-booking, reminders, tele-consult links.",
        icon: "Calendar",
      },
      {
        title: "OPD Queue Management",
        desc: "Token flow, doctor calendars, no-shows.",
        icon: "ClipboardList",
      },
      {
        title: "Prescription Templates",
        desc: "Specialty-based Rx with drug interaction alerts.",
        icon: "FileText",
      },
      {
        title: "Quick Billing",
        desc: "Package, membership & discount handling.",
        icon: "CreditCard",
      },
      {
        title: "Patient CRM",
        desc: "Recalls, WhatsApp/SMS/Email marketing.",
        icon: "Users",
      },
      {
        title: "Analytics",
        desc: "Doctor performance, revenue, retention KPIs.",
        icon: "TrendingUp",
      },
    ],
  },
  ehr: {
    id: "ehr",
    label: "EHR / EMR",
    icon: "FileText",
    sublabel: "Certified electronic records that clinicians actually enjoy.",
    mockUrl: "app.medicore.health/records",
    statChips: [
      { label: "Uptime", value: "99.98%" },
      { label: "Audit coverage", value: "100%" },
    ],
    chartValues: [60, 66, 74, 70, 88, 92],
    mockRows: [
      { icon: "FileText", label: "Patient record sync", value: "Live · HL7" },
      { icon: "ShieldCheck", label: "Access review", value: "Passed" },
      { icon: "Pill", label: "e-Rx interaction check", value: "Clear" },
    ],
    badges: [
      { icon: "Lock", text: "Role-based access" },
      { icon: "Link2", text: "HL7 / FHIR ready" },
    ],
    cards: [
      {
        title: "Unified Patient Record",
        desc: "Timeline of encounters, allergies & problems.",
        icon: "FileText",
      },
      {
        title: "SOAP & Custom Forms",
        desc: "Voice-to-text, macros & smart templates.",
        icon: "ClipboardCheck",
      },
      {
        title: "Lab Integration",
        desc: "HL7/FHIR interfaces & auto-reports.",
        icon: "ClipboardList",
      },
      {
        title: "e-Prescribing",
        desc: "Formulary, dosing & controlled-substance rules.",
        icon: "Pill",
      },
      {
        title: "Consent & Audit",
        desc: "Immutable audit trail, role-based access.",
        icon: "ShieldCheck",
      },
      {
        title: "Analytics & MU",
        desc: "Quality measures & population health.",
        icon: "Activity",
      },
    ],
  },
};

const TAB_ORDER = ["hospital", "clinic", "ehr"];

function ProductMock({ tab }) {
  const MaxBar = Math.max(...tab.chartValues);
  return (
    <div className="solution__mock" key={tab.id}>
      <div className="solution__mock-chrome">
        <span className="solution__mock-dot solution__mock-dot--r" />
        <span className="solution__mock-dot solution__mock-dot--y" />
        <span className="solution__mock-dot solution__mock-dot--g" />
        <div className="solution__mock-url">
          <Lock size={10} strokeWidth={2.4} />
          {tab.mockUrl}
        </div>
      </div>

      <div className="solution__mock-body">
        <div className="solution__mock-stats">
          {tab.statChips.map((chip, i) => (
            <div className="solution__mock-stat" key={i} style={{ animationDelay: `${0.05 + i * 0.08}s` }}>
              <span className="solution__mock-stat-value">{chip.value}</span>
              <span className="solution__mock-stat-label">{chip.label}</span>
            </div>
          ))}
        </div>

        <div className="solution__mock-chart" role="img" aria-label="Activity chart">
          {tab.chartValues.map((v, i) => (
            <span
              key={i}
              className="solution__mock-bar"
              style={{
                "--bar-h": `${(v / MaxBar) * 100}%`,
                animationDelay: `${0.15 + i * 0.06}s`,
              }}
            />
          ))}
        </div>

        <div className="solution__mock-list">
          {tab.mockRows.map((row, i) => {
            const RowIcon = IconMap[row.icon] || FileText;
            return (
              <div
                className="solution__mock-row"
                key={i}
                style={{ animationDelay: `${0.35 + i * 0.09}s` }}
              >
                <span className="solution__mock-row-icon">
                  <RowIcon size={14} strokeWidth={2.2} />
                </span>
                <span className="solution__mock-row-label">{row.label}</span>
                <span className="solution__mock-row-value">{row.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Solution() {
  const [activeTab, setActiveTab] = useState("hospital");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const currentTab = TABS[activeTab];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`solution ${isVisible ? "is-visible" : ""}`}
      id="solution"
      data-nav-theme="light"
    >
      {/* Ambient background layer */}
      <div className="solution__bg" aria-hidden="true">
        <div className="solution__blob solution__blob--a" />
        <div className="solution__blob solution__blob--b" />
        <div className="solution__blob solution__blob--c" />
        <div className="solution__grid-overlay" />
      </div>

      <div className="solution__inner">
        <div className="solution__header">
          <div className="solution__badge">THE UNIFIED SOLUTION</div>
          <h2 className="solution__title">
            Three products. <span className="solution__title-accent">One intelligent system.</span>
          </h2>
          <p className="solution__subtitle">
            Explore how MediCore consolidates hospital operations, clinic workflows and EHR/EMR into
            a single, elegant experience.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="solution__tabs">
          {TAB_ORDER.map((key) => {
            const tab = TABS[key];
            const TabIcon = IconMap[tab.icon] || Building;
            const isActive = activeTab === key;

            return (
              <button
                key={key}
                type="button"
                className={`solution__tab-btn ${isActive ? "solution__tab-btn--active" : ""}`}
                onClick={() => setActiveTab(key)}
              >
                <TabIcon size={16} strokeWidth={2.2} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="solution__desc-container">
          <p className="solution__sublabel" key={activeTab}>
            {currentTab.sublabel}
          </p>
        </div>

        {/* Split layout: feature cards + live product mock */}
        <div className="solution__layout">
          <div className="solution__grid" key={activeTab}>
            {currentTab.cards.map((card, index) => {
              const CardIcon = IconMap[card.icon] || FileText;

              return (
                <div
                  className="solution__card"
                  key={index}
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  <div className="solution__card-icon-container">
                    <CardIcon size={20} strokeWidth={2.4} className="solution__card-icon" />
                  </div>
                  <h3 className="solution__card-title">{card.title}</h3>
                  <p className="solution__card-desc">{card.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="solution__visual">
            <div className="solution__visual-glow" aria-hidden="true" />
            <ProductMock tab={currentTab} />

            {currentTab.badges.map((badge, i) => {
              const BadgeIcon = IconMap[badge.icon] || CheckCircle2;
              return (
                <div
                  className={`solution__float-badge solution__float-badge--${i}`}
                  key={`${activeTab}-${i}`}
                >
                  <BadgeIcon size={14} strokeWidth={2.4} />
                  <span>{badge.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}