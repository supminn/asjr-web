import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const { firstName, lastName, email, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Gmail SMTP Configuration from environment variables
    const smtpConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: process.env.SMTP_SECURE === 'true' || true,
      user: process.env.GMAIL_USER,
      recipient: process.env.GMAIL_RECIPIENT || process.env.GMAIL_USER,
      password: process.env.GMAIL_APP_PASSWORD,
    };

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.password,
      },
    });

    // Email options
    const mailOptions = {
      from: smtpConfig.user,
      to: smtpConfig.recipient,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      text: `
Name: ${firstName} ${lastName}
Email: ${email}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">ASJR Contact Form Submission</h2>
          <div>
            <p><strong>From:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          <div style="background-color: #f5f5f5; padding: 16px 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #888; font-size: 12px;">This email was sent from the ASJR contact form.</p>
        </div>
      `,
      replyTo: email,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: error.message,
    });
  }
}
