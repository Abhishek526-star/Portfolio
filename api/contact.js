import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// Load environment variables if running locally
dotenv.config()

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' })
  }

  try {
    const { name, email, subject, message } = req.body || {}

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required.' })
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required.' })
    }
    if (!subject || !subject.trim()) {
      return res.status(400).json({ error: 'Subject is required.' })
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required.' })
    }

    const gmailUser = process.env.GMAIL_USER || 'abhishekkumar63871@gmail.com'
    const gmailPass = process.env.GMAIL_APP_PASS

    if (!gmailPass) {
      console.warn('[Contact API] GMAIL_APP_PASS is not set in environment.')
      return res.status(500).json({
        error:
          'GMAIL_APP_PASS is not configured in .env. Please set your 16-character Gmail App Password.',
      })
    }

    // Configure Nodemailer Gmail SMTP Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: gmailUser,
        pass: gmailPass.replace(/\s+/g, ''), // clean whitespace from app password
      },
    })

    // HTML Email Template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; background-color: #f8fafc;">
        <div style="background: linear-gradient(135deg, #2563eb, #38bdf8); padding: 20px; border-radius: 8px; color: #ffffff; text-align: center;">
          <h2 style="margin: 0; font-size: 22px;">New Inquiry from Portfolio</h2>
          <p style="margin: 5px 0 0; opacity: 0.9; font-size: 14px;">abhishek-kumar.dev</p>
        </div>

        <div style="padding: 24px 16px; background-color: #ffffff; margin-top: 16px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: bold; width: 120px;">Sender Name:</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Sender Email:</td>
              <td style="padding: 10px 0; color: #2563eb;">
                <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Subject:</td>
              <td style="padding: 10px 0; color: #0f172a;">${subject}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
            <p style="color: #64748b; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px;">
              Message Content:
            </p>
            <div style="background-color: #f1f5f9; padding: 16px; border-radius: 6px; color: #1e293b; line-height: 1.6; white-space: pre-wrap; font-size: 14px;">
${message}
            </div>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #94a3b8;">
          <p style="margin: 0;">Hit "Reply" in your email client to respond directly to <strong>${email}</strong>.</p>
          <p style="margin: 4px 0 0;">Received on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</p>
        </div>
      </div>
    `

    // Send Mail
    await transporter.sendMail({
      from: `"${name} (Portfolio Inquiry)" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: htmlContent,
    })

    return res.status(200).json({ success: true, message: 'Message sent successfully!' })
  } catch (error) {
    console.error('[Contact API Error]:', error)
    return res.status(500).json({
      error: error.message || 'Failed to send message via Gmail SMTP. Please try again.',
    })
  }
}
