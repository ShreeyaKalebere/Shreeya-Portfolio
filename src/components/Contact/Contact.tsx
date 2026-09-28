import React, { useState } from 'react';
import { PROFILE } from '../../data/profile';
import { ArrowRight, Copy, Check, ExternalLink, Mail, AlertCircle, Loader2, Send, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audio';

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
      return 'Please enter your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return 'Please enter a valid email address so I can reply back.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      return 'Please write a message with at least 5 characters.';
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setErrorMessage(null);

    // Bot trap check
    if (formData._gotcha) {
      e.preventDefault();
      setSubmitted(true);
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      e.preventDefault();
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    sound.playScanSweep();

    // The form natively posts to the hidden iframe target="formsubmit_frame"
    // This avoids all browser CORS / AJAX restrictions and delivers straight to FormSubmit
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sound.playSuccessChime();
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  // Gmail Web Compose Pre-filled URL
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PROFILE.email)}&su=${encodeURIComponent(formData.subject || `Inquiry from ${formData.name || 'Portfolio Visitor'}`)}&body=${encodeURIComponent(
    formData.message 
      ? `${formData.message}\n\n---\nFrom: ${formData.name || 'Visitor'} (${formData.email || 'No email provided'})`
      : `Hi Shreeya,\n\nI would love to connect with you regarding opportunities / collaboration.\n\nBest,\n`
  )}`;

  // Default Mailto Pre-filled URL
  const mailtoUrl = `mailto:${encodeURIComponent(PROFILE.email)}?subject=${encodeURIComponent(formData.subject || `Inquiry from ${formData.name || 'Portfolio Visitor'}`)}&body=${encodeURIComponent(
    formData.message 
      ? `${formData.message}\n\n---\nFrom: ${formData.name || 'Visitor'} (${formData.email || 'No email provided'})`
      : `Hi Shreeya,\n\nI would love to connect with you regarding opportunities / collaboration.\n\nBest,\n`
  )}`;

  return (
    <section id="contact" style={{ padding: '80px 0', position: 'relative' }}>
      {/* Hidden iframe target for silent, CORS-free FormSubmit processing */}
      <iframe 
        name="formsubmit_frame" 
        id="formsubmit_frame" 
        title="FormSubmit Processor" 
        style={{ display: 'none', width: 0, height: 0, border: 'none' }} 
      />

      <div className="neo-container">
        {/* Editorial Section Header */}
        <div className="swiss-header">
          <div className="swiss-header-meta">
            <div className="swiss-header-num">
              <span>09 / CONTACT</span>
            </div>
            <span>MODULE_09 // DIRECT INQUIRIES & DISPATCH</span>
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
          {/* Left Column (5 Cols): Typography & Quick Channels */}
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

            {/* Direct Copy & Compose Card */}
            <div 
              className="bento-card"
              style={{
                padding: '18px 20px',
                marginBottom: '20px',
                backgroundColor: 'var(--bg-surface)'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px' }}>
                PRIMARY DISPATCH INBOX
              </span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                {PROFILE.email}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="swiss-btn swiss-btn-primary"
                  style={{ width: '100%', fontSize: '0.72rem', padding: '8px', textAlign: 'center', justifyContent: 'center' }}
                >
                  <Mail size={13} />
                  <span>OPEN IN GMAIL WEB ↗</span>
                </a>
              </div>
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
                  <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--accent-green)', borderRadius: '50%', boxShadow: '0 0 6px var(--accent-green)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-green)' }}>
                    ROUTED TO: {PROFILE.email}
                  </span>
                </div>
              </div>

              {errorMessage && (
                <div 
                  role="alert"
                  style={{
                    padding: '12px 16px',
                    marginBottom: '20px',
                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid #EF4444',
                    borderLeft: '4px solid #EF4444',
                    fontSize: '0.82rem',
                    color: '#F87171',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              {submitted ? (
                <div 
                  style={{ 
                    padding: '36px 24px', 
                    backgroundColor: 'var(--bg-surface)', 
                    border: 'var(--border-width) solid var(--accent-green)', 
                    textAlign: 'center' 
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(183, 243, 74, 0.15)', border: '1px solid var(--accent-green)', marginBottom: '16px' }}>
                    <Check size={24} color="var(--accent-green)" />
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
                    TRANSMISSION DISPATCHED!
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '460px', margin: '0 auto 16px' }}>
                    Your message has been sent directly to <strong style={{ color: 'var(--text-primary)' }}>{PROFILE.email}</strong>. I will review your inquiry and reply to your email address promptly!
                  </p>

                  <div style={{ margin: '16px auto', maxWidth: '440px', padding: '10px 14px', background: '#111', border: '1px dashed #333', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#999' }}>
                    <strong style={{ color: '#FFD83D', display: 'block', marginBottom: '4px' }}>FIRST TIME SETUP NOTE:</strong>
                    The very first time you test this, FormSubmit sends a one-time activation email to <strong style={{ color: '#FFF' }}>{PROFILE.email}</strong>. Open Gmail and click <em>"Activate Form"</em> to start receiving all future messages instantly!
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setErrorMessage(null);
                        setFormData(INITIAL_FORM);
                      }}
                      className="swiss-btn swiss-btn-primary"
                      style={{ fontSize: '0.78rem', padding: '10px 18px' }}
                    >
                      SEND ANOTHER MESSAGE
                    </button>

                    <a
                      href={gmailComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="swiss-btn"
                      style={{ fontSize: '0.78rem', padding: '10px 18px' }}
                    >
                      <Mail size={13} />
                      <span>OPEN IN GMAIL WEB ↗</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form 
                  action={`https://formsubmit.co/${PROFILE.email}`} 
                  method="POST" 
                  target="formsubmit_frame"
                  onSubmit={handleSubmit}
                  noValidate 
                  style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
                >
                  {/* FormSubmit Configuration Fields */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_subject" value={`New Portfolio Inquiry from ${formData.name || 'Visitor'}: ${formData.subject || 'Connection Request'}`} />
                  <input type="hidden" name="_replyto" value={formData.email} />

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
                      YOUR FULL NAME *
                    </label>
                    <input
                      id="contact-name"
                      name="name"
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
                      YOUR EMAIL ADDRESS (FOR REPLIES) *
                    </label>
                    <input
                      id="contact-email"
                      name="email"
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
                      SUBJECT / PURPOSE (OPTIONAL)
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. SDE Internship / AI Engineering / Technical Collaboration"
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
                      MESSAGE DETAILS *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
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

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '6px' }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="swiss-btn swiss-btn-primary"
                      style={{ 
                        flex: '1 1 200px',
                        padding: '12px 20px', 
                        fontSize: '0.85rem', 
                        opacity: isSubmitting ? 0.7 : 1,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        justifyContent: 'center'
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                          <span>TRANSMITTING DIRECT TO EMAIL...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>TRANSMIT DISPATCH TO EMAIL</span>
                        </>
                      )}
                    </button>

                    <a
                      href={gmailComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="swiss-btn"
                      style={{ 
                        padding: '12px 16px', 
                        fontSize: '0.85rem',
                        justifyContent: 'center'
                      }}
                      title="Direct compose in Gmail Web"
                    >
                      <Mail size={15} />
                      <span>OPEN IN GMAIL WEB</span>
                    </a>
                  </div>
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
