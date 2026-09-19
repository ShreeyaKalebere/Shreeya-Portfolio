import React, { useState } from 'react';
import { PROFILE } from '../../data/profile';
import { ArrowRight, Copy, Check, ExternalLink, Mail, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  _gotcha: string; // Honeypot bot protection
}

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
  _gotcha: ''
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Field validation helper
  const validateForm = (): string | null => {
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      return 'Please provide your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      return 'Please provide a meaningful message (at least 10 characters).';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData(INITIAL_FORM);
      } else {
        setErrorMessage(
          data.error || 'Something went wrong while sending your message. Please try again or contact me directly.'
        );
      }
    } catch (err) {
      setErrorMessage(
        'Network error encountered. Please verify your connection or reach out directly via email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="neo-container">
        {/* Editorial Section Header */}
        <div className="swiss-header">
          <div className="swiss-header-meta">
            <div className="swiss-header-num">
              <span>09 / CONTACT</span>
            </div>
            <span>MODULE_09 // DISPATCH & INQUIRIES</span>
          </div>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '32px',
            alignItems: 'start'
          }}
          className="contact-grid"
        >
          {/* Left Column (5 Cols): Big Typography & Coordinates */}
          <div className="contact-col-left" style={{ gridColumn: 'span 5 / span 5' }}>
            <h2 
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.0,
                color: 'var(--text-primary)',
                letterSpacing: '-0.035em',
                marginBottom: '18px',
                textTransform: 'uppercase'
              }}
            >
              LET'S BUILD<br />
              SOMETHING.
            </h2>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '28px' }}>
              Seeking Software Engineering, AI/ML, and Computer Vision opportunities. Open to technical collaborations, internships, and research discussions.
            </p>

            {/* Direct Copy Card */}
            <div 
              className="bento-card"
              style={{
                padding: '18px 20px',
                marginBottom: '20px',
                backgroundColor: 'var(--bg-surface)'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>
                PRIMARY DISPATCH EMAIL
              </span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                {PROFILE.email}
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="swiss-btn"
                style={{ width: '100%', fontSize: '0.72rem', padding: '8px' }}
                aria-label="Copy email address to clipboard"
              >
                {copied ? <Check size={13} color="var(--accent-green)" /> : <Copy size={13} />}
                <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL ADDRESS'}</span>
              </button>
            </div>

            {/* Verified Channels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href={PROFILE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="swiss-btn"
                style={{ justifyContent: 'space-between', fontSize: '0.75rem', padding: '10px 14px' }}
              >
                <span>LINKEDIN // in/shreeya-kalebere</span>
                <ExternalLink size={13} />
              </a>

              <a
                href={PROFILE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="swiss-btn"
                style={{ justifyContent: 'space-between', fontSize: '0.75rem', padding: '10px 14px' }}
              >
                <span>GITHUB // @ShreeyaKalebere</span>
                <ExternalLink size={13} />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="swiss-btn"
                style={{ justifyContent: 'space-between', fontSize: '0.75rem', padding: '10px 14px' }}
              >
                <span>RÉSUMÉ // PDF DOWNLOAD</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Right Column (7 Cols): Clean Transmission Form */}
          <div className="contact-col-right" style={{ gridColumn: 'span 7 / span 7' }}>
            <div className="bento-card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: 'var(--border-width) solid var(--border-color)', paddingBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  TRANSMIT DIRECT INQUIRY
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent-green)', borderRadius: '50%' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-green)' }}>
                    API ONLINE // 256-BIT ENCRYPTION
                  </span>
                </div>
              </div>

              {errorMessage && (
                <div 
                  role="alert"
                  style={{
                    padding: '12px 16px',
                    marginBottom: '20px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid #EF4444',
                    borderLeft: '4px solid #EF4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.82rem',
                    color: '#F87171'
                  }}
                >
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {submitted ? (
                <div 
                  style={{ 
                    padding: '32px 24px', 
                    backgroundColor: 'var(--bg-surface)', 
                    border: 'var(--border-width) solid var(--accent-green)', 
                    textAlign: 'center' 
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(183, 243, 74, 0.15)', border: '1px solid var(--accent-green)', marginBottom: '16px' }}>
                    <Check size={20} color="var(--accent-green)" />
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                    TRANSMISSION CONFIRMED
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto 24px' }}>
                    Message sent successfully. I've received your dispatch and will review and respond promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setErrorMessage(null);
                    }}
                    className="swiss-btn swiss-btn-primary"
                    style={{ fontSize: '0.78rem', padding: '10px 18px' }}
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* Invisible Honeypot field for bot trapping */}
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData._gotcha}
                    onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                    style={{ display: 'none', position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                    aria-hidden="true"
                  />

                  <div>
                    <label 
                      htmlFor="contact-name"
                      style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px' }}
                    >
                      FULL NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maya Chen"
                      className="swiss-input"
                      disabled={isSubmitting}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="contact-email"
                      style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px' }}
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. maya@company.com"
                      className="swiss-input"
                      disabled={isSubmitting}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="contact-subject"
                      style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px' }}
                    >
                      SUBJECT (OPTIONAL)
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. SDE Internship / AI Engineering Role"
                      className="swiss-input"
                      disabled={isSubmitting}
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="contact-message"
                      style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '6px' }}
                    >
                      MESSAGE / PROJECT SCOPE *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Discuss software engineering opportunities, technical challenges, or collaboration scope..."
                      className="swiss-input"
                      disabled={isSubmitting}
                      style={{ resize: 'none', width: '100%' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="swiss-btn swiss-btn-primary"
                    style={{ 
                      padding: '12px 20px', 
                      fontSize: '0.85rem', 
                      width: '100%', 
                      marginTop: '6px',
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                        <span>TRANSMITTING INQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT DISPATCH</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .contact-col-left, .contact-col-right {
            grid-column: span 12 / span 12 !important;
          }
        }
      `}</style>
    </section>
  );
};
export default Contact;
