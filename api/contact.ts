import { Resend } from 'resend';

// Simple in-memory rate limiting store: IP -> timestamps[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean sanitization helper to strip dangerous tags
function sanitizeInput(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .trim();
}

// RFC-compliant email verification
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  try {
    // 1. Client IP Resolution & Rate Limiting
    const forwardedFor = req.headers['x-forwarded-for'];
    const ip = (typeof forwardedFor === 'string' ? forwardedFor.split(',')[0] : req.socket?.remoteAddress) || '127.0.0.1';
    
    const now = Date.now();
    const timestamps = (rateLimitMap.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    
    if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please wait a few minutes before transmitting another message or reach out directly.'
      });
    }

    // 2. Parse Body Safely
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          success: false,
          error: 'Malformed JSON payload.'
        });
      }
    }

    body = body || {};

    // 3. Honeypot Anti-Spam Check (_gotcha / fax field)
    if (body._gotcha || body.company_fax) {
      // Return 200 to fool the bot without sending any email
      return res.status(200).json({
        success: true,
        message: 'Message sent successfully.'
      });
    }

    // 4. Input Sanitization & Validation
    const rawName = body.name;
    const rawEmail = body.email;
    const rawSubject = body.subject;
    const rawMessage = body.message;

    const name = sanitizeInput(rawName);
    const email = sanitizeInput(rawEmail).toLowerCase();
    const subject = sanitizeInput(rawSubject) || `Portfolio Inquiry from ${name}`;
    const message = sanitizeInput(rawMessage);

    if (!name || name.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid name (at least 2 characters).'
      });
    }
    if (name.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Name is too long (maximum 100 characters).'
      });
    }

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }
    if (email.length > 120) {
      return res.status(400).json({
        success: false,
        error: 'Email address is too long (maximum 120 characters).'
      });
    }

    if (subject.length > 150) {
      return res.status(400).json({
        success: false,
        error: 'Subject is too long (maximum 150 characters).'
      });
    }

    if (!message || message.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a meaningful message (at least 10 characters).'
      });
    }
    if (message.length > 3000) {
      return res.status(400).json({
        success: false,
        error: 'Message is too long (maximum 3,000 characters).'
      });
    }

    // Register IP request timestamp
    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);

    // 5. Email Dispatch via Resend
    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'shreeyakalebere11@gmail.com';
    const fromAddress = process.env.EMAIL_FROM_ADDRESS || 'Shreeya Portfolio <onboarding@resend.dev>';
    const enableAutoReply = process.env.ENABLE_AUTO_REPLY === 'true';

    const timestampFormatted = new Date().toUTCString();

    // If API key is not yet configured (e.g. initial dev or unconfigured deployment), provide graceful mock
    if (!apiKey || apiKey === 'your_api_key_here' || apiKey.startsWith('re_your')) {
      console.warn('[Contact API] RESEND_API_KEY is not configured. Running in simulated delivery mode.');
      console.log(`[Contact API] Simulated email from: ${name} <${email}>`);
      console.log(`[Contact API] Subject: ${subject}`);
      console.log(`[Contact API] Message preview: ${message.slice(0, 100)}...`);

      return res.status(200).json({
        success: true,
        message: "Message sent successfully. I'll get back to you soon.",
        mode: 'simulated'
      });
    }

    const resend = new Resend(apiKey);

    // Primary Notification Email to Shreeya
    const notificationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0A0A0A; color: #F5F5F0; margin: 0; padding: 24px; }
            .card { background-color: #141414; border: 1px solid #262626; border-left: 4px solid #4D9DE0; border-radius: 4px; padding: 24px; max-width: 600px; margin: 0 auto; }
            .badge { display: inline-block; background-color: #1E293B; color: #38BDF8; font-family: monospace; font-size: 11px; padding: 3px 8px; border-radius: 3px; margin-bottom: 16px; letter-spacing: 0.05em; }
            h2 { font-size: 20px; font-weight: 700; margin: 0 0 16px 0; color: #FFFFFF; }
            .field-label { font-family: monospace; font-size: 11px; color: #888888; text-transform: uppercase; margin-bottom: 4px; }
            .field-value { font-size: 15px; color: #F5F5F0; margin-bottom: 16px; word-break: break-word; }
            .message-box { background-color: #0A0A0A; border: 1px solid #262626; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #E4E4E7; }
            .footer { margin-top: 24px; pt-top: 16px; border-top: 1px solid #222222; font-family: monospace; font-size: 11px; color: #666666; display: flex; justify-content: space-between; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">TRANSMISSION // INCOMING CONTACT</div>
            <h2>New Inquiry Received</h2>
            
            <div class="field-label">Sender Name</div>
            <div class="field-value">${name}</div>

            <div class="field-label">Sender Email</div>
            <div class="field-value"><a href="mailto:${email}" style="color: #38BDF8; text-decoration: none;">${email}</a></div>

            <div class="field-label">Subject</div>
            <div class="field-value">${subject}</div>

            <div class="field-label">Transmission Payload</div>
            <div class="message-box">${message}</div>

            <div class="footer" style="margin-top: 20px; padding-top: 14px; border-top: 1px solid #222;">
              <span>Source: Shreeya Kalebere Portfolio</span>
              <span>Time: ${timestampFormatted}</span>
            </div>
          </div>
        </body>
      </html>
    `;

    const { error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: [receiverEmail],
      replyTo: email, // Directly reply to the sender!
      subject: `[Portfolio Inquiry] ${subject} — ${name}`,
      text: `NEW PORTFOLIO CONTACT\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nTime: ${timestampFormatted}\nSource: Shreeya Kalebere Portfolio`,
      html: notificationHtml
    });

    if (sendError) {
      console.error('[Contact API] Resend dispatch error:', sendError);
      return res.status(500).json({
        success: false,
        error: 'Something went wrong while sending your message. Please try again or contact me directly.'
      });
    }

    // Optional Auto-Reply to the Visitor
    if (enableAutoReply) {
      try {
        await resend.emails.send({
          from: fromAddress,
          to: [email],
          subject: `Received: Your inquiry to Shreeya Kalebere`,
          text: `Hi ${name},\n\nThank you for reaching out through my engineering portfolio.\n\nI have received your message regarding "${subject}" and will get back to you as soon as possible.\n\nBest regards,\nShreeya Kalebere\nComputer Science & Engineering\nhttps://github.com/ShreeyaKalebere`
        });
      } catch (autoErr) {
        // Log auto-reply failure without failing the primary response
        console.warn('[Contact API] Auto-reply failed to send:', autoErr);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully. I'll get back to you soon."
    });

  } catch (err: any) {
    console.error('[Contact API] Unexpected server error:', err);
    return res.status(500).json({
      success: false,
      error: 'Something went wrong while sending your message. Please try again or contact me directly.'
    });
  }
}
