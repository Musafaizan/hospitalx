import React, { useState } from "react";
import { CheckCircle2, ArrowRight, Check } from "lucide-react";
import "./style.css";

const REQUIREMENTS = [
  "Hospital Management",
  "Clinic Management",
  "EHR/EMH",

];

const CHECKLIST = [
  "Custom demo based on your specialty",
  "Migration plan from your current system",
  "Transparent pricing on the call",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM = {
  fullName: "",
  orgName: "",
  email: "",
  requirement: REQUIREMENTS[0],
  notes: "",
};

const FORM_SUBMIT_URL = "https://formsubmit.co/ajax/iammusa182@gmail.com";
const FORM_SUBJECT = "MediCore Demo Request";

export default function DemoRequestSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function validate(values) {
    const next = {};
    if (!values.fullName.trim()) next.fullName = "Please enter your name";
    if (!values.orgName.trim()) next.orgName = "Please enter your organization";
    if (!EMAIL_RE.test(values.email.trim())) next.email = "Enter a valid email";
    return next;
  }

  function handleChange(field) {
    return (e) => {
      const value = e.target.value;
      const next = { ...form, [field]: value };
      setForm(next);
      if (touched[field]) {
        setErrors(validate(next));
      }
    };
  }

  function handleBlur(field) {
    return () => {
      setTouched((t) => ({ ...t, [field]: true }));
      setErrors(validate(form));
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setTouched({ fullName: true, orgName: true, email: true });

    if (Object.keys(nextErrors).length === 0) {
      setSending(true);

      const payload = {
        name: form.fullName,
        organization: form.orgName,
        email: form.email,
        requirement: form.requirement,
        notes: form.notes || "(none)",
        _replyto: form.email,
        _subject: FORM_SUBJECT,
        _captcha: "false",
        _template: "table",
      };

      fetch(FORM_SUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to submit demo request");
          }
          return res.json();
        })
        .then(() => {
          setSubmitted(true);
          setForm(INITIAL_FORM);
        })
        .catch(() => {
          setErrors({ submit: "Something went wrong. Please try again." });
        })
        .finally(() => {
          setSending(false);
        });
    }
  }

  function handleReset() {
    setForm(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  }

  return (
    <section id="demo" className="demo-section" data-nav-theme="dark">
      <div className="demo-glow" aria-hidden="true" />
      <div className="demo-container">
        <div className="demo-copy">
          <span className="demo-badge">Free personalized demo</span>
          <h2 className="demo-heading">
            See MediCore <span className="accent">tailored to your practice.</span>
          </h2>
          <p className="demo-subtext">
            Book a 30-minute walkthrough with a product specialist. We&rsquo;ll map
            MediCore to your workflow — no obligations, no sales pressure.
          </p>
          <ul className="demo-checklist">
            {CHECKLIST.map((item) => (
              <li key={item}>
                <CheckCircle2 className="check-icon" strokeWidth={2} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="demo-card-wrap">
          {submitted ? (
            <div className="demo-card success-card">
              <div className="success-icon-wrap">
                <Check className="success-icon" strokeWidth={2.5} />
              </div>
              <h3 className="success-title">Thank you!</h3>
              <p className="success-text">
                Our team will reach out within one business day.
              </p>
              <button type="button" className="submit-btn secondary" onClick={handleReset}>
                Submit another
              </button>
            </div>
          ) : (
            <form className="demo-card" noValidate onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="fullName">Full name</label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Dr. Jane Doe"
                    value={form.fullName}
                    onChange={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    className={errors.fullName && touched.fullName ? "invalid" : ""}
                  />
                  {errors.fullName && touched.fullName && (
                    <span className="error-text">{errors.fullName}</span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="orgName">Hospital / clinic name</label>
                  <input
                    id="orgName"
                    type="text"
                    placeholder="Sunrise Health"
                    value={form.orgName}
                    onChange={handleChange("orgName")}
                    onBlur={handleBlur("orgName")}
                    className={errors.orgName && touched.orgName ? "invalid" : ""}
                  />
                  {errors.orgName && touched.orgName && (
                    <span className="error-text">{errors.orgName}</span>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="email">Work email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@work.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  className={errors.email && touched.email ? "invalid" : ""}
                />
                {errors.email && touched.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="requirement">Primary requirement</label>
                <select
                  id="requirement"
                  value={form.requirement}
                  onChange={handleChange("requirement")}
                >
                  {REQUIREMENTS.map((req) => (
                    <option key={req} value={req}>
                      {req}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="notes">Tell us more (optional)</label>
                <textarea
                  id="notes"
                  rows={3}
                  placeholder="Departments, users, timeline..."
                  value={form.notes}
                  onChange={handleChange("notes")}
                />
              </div>

              <button type="submit" className="submit-btn" disabled={sending}>
                {sending ? "Sending..." : "Request my demo"}
                <ArrowRight className="submit-icon" strokeWidth={2.25} />
              </button>

              {errors.submit && (
                <p className="error-text form-submit-error">{errors.submit}</p>
              )}

              <p className="terms-text">
                By submitting, you agree to our terms &amp; privacy policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}