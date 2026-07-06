import { useState, useRef, useEffect } from "react";
import "./style.css";
const faqData = [
  {
    question: "What is MediCore and how does it work?",
    answer:
      "MediCore is an all-in-one healthcare management platform designed for hospitals, clinics, and private practitioners. It streamlines patient management, appointment scheduling, billing, and medical records into a single, intuitive dashboard — helping you focus on what matters most: patient care.",
  },
  {
    question: "Is my patient data secure with MediCore?",
    answer:
      "Absolutely. MediCore uses bank-grade AES-256 encryption for all data at rest and in transit. We are fully HIPAA-compliant and undergo regular third-party security audits. Role-based access controls ensure only authorized personnel can view sensitive information.",
  },
  {
    question: "Can I integrate MediCore with my existing systems?",
    answer:
      "Yes! MediCore offers robust API integrations and supports HL7 FHIR standards. It seamlessly connects with popular EHR/EMR systems, laboratory information systems, pharmacy management tools, and billing platforms. Our onboarding team will guide you through every step.",
  },
  {
    question: "How long does it take to set up MediCore?",
    answer:
      "Most clinics and private practices are fully onboarded within 48 hours. For larger hospital deployments, our dedicated implementation team typically completes setup in 1–2 weeks, including data migration, staff training, and workflow customization.",
  },
  {
    question: "What kind of support does MediCore offer?",
    answer:
      "We provide 24/7 priority support via live chat, email, and phone. Every customer is assigned a dedicated account manager. We also offer an extensive knowledge base, video tutorials, and regular webinars to help your team get the most out of MediCore.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes — we offer a 14-day free trial with full access to all features, no credit card required. You can explore the platform, import sample data, and see exactly how MediCore fits your workflow before committing to a plan.",
  },
];
function AccordionItem({ item, index, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);
  return (
    <div
      className={`faq__item ${isOpen ? "faq__item--active" : ""}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <button
        className="faq__question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="faq__question-content">
          <span className="faq__question-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="faq__question-text">{item.question}</span>
        </div>
        <div className={`faq__icon ${isOpen ? "faq__icon--open" : ""}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="10"
              y1="4"
              x2="10"
              y2="16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="faq__icon-vline"
            />
            <line
              x1="4"
              y1="10"
              x2="16"
              y2="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </button>
      <div
        className="faq__answer-wrapper"
        style={{ height: `${height}px` }}
      >
        <div className="faq__answer" ref={contentRef}>
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section id="faq" className="faq" data-nav-theme="dark">
      {/* Decorative background elements */}
      <div className="faq__bg-glow faq__bg-glow--1" />
      <div className="faq__bg-glow faq__bg-glow--2" />
      <div className="faq__bg-grid" />
      <div className="faq__inner">
        {/* Header */}
        <div className="faq__header">
          <span className="faq__badge">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Frequently Asked Questions
          </span>
          <h2 className="faq__title">
            Everything you need to know about{" "}
            <span className="faq__title-highlight">MediCore</span>
          </h2>
          <p className="faq__subtitle">
            Have questions? We've got answers. If you can't find what you're
            looking for, feel free to reach out to our support team.
          </p>
        </div>
        {/* FAQ Content Layout */}
        <div className="faq__content">
          {/* Left: Info Card */}
          <div className="faq__info-card">
            <div className="faq__info-card-inner">
              <div className="faq__info-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="faq__info-title">Still have questions?</h3>
              <p className="faq__info-text">
                Can't find the answer you're looking for? Our friendly support
                team is here to help.
              </p>
              <a href="#demo" className="faq__info-cta">
                <span>Get in touch</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              {/* Decorative dots */}
              <div className="faq__info-dots">
                <span /><span /><span /><span /><span /><span /><span /><span /><span />
              </div>
            </div>
          </div>
          {/* Right: Accordion */}
          <div className="faq__accordion">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}