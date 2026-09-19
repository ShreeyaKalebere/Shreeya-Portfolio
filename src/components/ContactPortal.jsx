import React, { useState } from 'react';
import { 
  Send, 
  Github, 
  Linkedin, 
  Mail, 
  FileText, 
  CheckCircle2, 
  Compass, 
  AlertCircle 
} from 'lucide-react';
import { PERSONAL_INFO, LINKS } from '../data/config';
import { sound } from '../utils/audio';
import '../styles/portal.css';

export default function ContactPortal({ onOpenSecretRoom }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.message.trim()) errs.message = 'Please provide a message.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      sound.playQuestChime();
      setIsSubmitted(true);

      // Construct mailto link as requested fallback
      const recipient = LINKS.hasRealEmail ? LINKS.emailPlaceholder : 'contact@shreeyakalebere.dev';
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    } else {
      sound.playTerminalKey();
    }
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact Portal District">
      <div className="container">
        <div className="portal-wrapper cyber-corners" data-cursor="portal">
          <div className="portal-vortex-glow" />

          <div className="portal-grid">
            {/* Left: Obsidian Portal & Direct Channels */}
            <div className="portal-identity-col">
              <div 
                className="portal-tag" 
                onClick={() => {
                  sound.playPortalHum();
                  onOpenSecretRoom();
                }}
                style={{ cursor: 'pointer' }}
                title="Click obsidian rune to open secret room"
              >
                <Compass size={16} />
                <span>DIMENSIONAL NETHER PORTAL // ACTIVE</span>
              </div>

              <h2 className="portal-title">OPEN A CONNECTION</h2>

              <p className="portal-subtext">
                Have a project, research idea, internship opportunity or collaboration in mind? Connect with Shreeya.
              </p>

              {/* Direct Buttons */}
              <div className="portal-direct-buttons">
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portal-action-btn"
                  onClick={() => sound.playClick()}
                >
                  <Github size={18} />
                  <span>GITHUB</span>
                </a>

                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portal-action-btn"
                  onClick={() => sound.playClick()}
                >
                  <Linkedin size={18} />
                  <span>LINKEDIN</span>
                </a>

                <a
                  href={`mailto:${LINKS.hasRealEmail ? LINKS.emailPlaceholder : 'contact@shreeyakalebere.dev'}?subject=${encodeURIComponent(LINKS.mailtoSubject)}`}
                  className="portal-action-btn"
                  onClick={() => sound.playClick()}
                >
                  <Mail size={18} />
                  <span>EMAIL DIRECT</span>
                </a>

                <a
                  href={LINKS.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portal-action-btn"
                  onClick={() => sound.playClick()}
                >
                  <FileText size={18} />
                  <span>RESUME (PDF)</span>
                </a>
              </div>
            </div>

            {/* Right: Validated Input Transmission Form */}
            <div className="portal-form-col">
              <div className="portal-form-title">
                <Send size={18} color="var(--matrix-green)" />
                <span>TRANSMIT DISPATCH</span>
              </div>

              {isSubmitted ? (
                <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                  <CheckCircle2 size={42} color="var(--matrix-green)" style={{ margin: '0 auto 14px' }} />
                  <h3 style={{ color: '#ffffff', marginBottom: '8px' }}>DISPATCH PREPARED</h3>
                  <p style={{ color: '#a7f3d0', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Your default email client has been opened with your inquiry prefilled. Thank you for connecting with Shreeya!
                  </p>
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ marginTop: '20px' }}
                    onClick={() => setIsSubmitted(false)}
                  >
                    Transmit Another Message
                  </button>
                </div>
              ) : (
                <form className="portal-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      Your Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <span className="form-error-msg">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      Your Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      className="form-input"
                      placeholder="e.g. alex@organization.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <span className="form-error-msg">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      Transmission Message
                    </label>
                    <textarea
                      id="contact-message"
                      className="form-textarea"
                      placeholder="Share details regarding your team, software internship, research idea, or role..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    {errors.message && <span className="form-error-msg">{errors.message}</span>}
                  </div>

                  <button type="submit" className="btn-primary form-submit-btn">
                    <Send size={16} />
                    <span>TRANSMIT DISPATCH</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
