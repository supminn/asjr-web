# Email Setup with Nodemailer and Gmail

This project uses Nodemailer with Gmail SMTP to send emails from the contact form.

## Required Environment Variables

Add the following to your `.env` file:

```env
# Gmail SMTP Settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true

# Gmail Credentials
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password-here

# Optional: Recipient email (defaults to GMAIL_USER if not set)
GMAIL_RECIPIENT=recipient-email@gmail.com
```

## How to Get a Gmail App Password

1. Go to your Google Account: [https://myaccount.google.com/](https://myaccount.google.com/)
2. Select **Security** from the left menu
3. Under "Signing in to Google," select **2-Step Verification** (you must have this enabled)
4. At the bottom, select **App passwords**
5. Select the app as **Mail** and the device as **Other (Custom name)**
6. Enter a name like "ASJR Contact Form"
7. Click **Generate**
8. Copy the 16-character password (remove spaces)
9. Use this password as your `GMAIL_APP_PASSWORD`

**Important:** Never commit your `.env` file or expose your app password!

## API Endpoint

**URL:** `/api/contact`

**Method:** `POST`

**Content-Type:** `application/json`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "message": "This is my message"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Email sent successfully!",
  "messageId": "<message-id@gmail.com>"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Failed to send email. Please try again later.",
  "error": "Error details here"
}
```

## Features

- ✅ Server-side email sending (secure)
- ✅ Environment variable configuration
- ✅ HTML formatted emails
- ✅ Reply-to support (recipient can reply directly to the user)
- ✅ Detailed console logging for debugging
- ✅ Proper error handling
- ✅ Form validation
- ✅ Loading states in UI

## Email Template

The email sent includes:
- Sender's name and email
- Message content
- HTML formatting for better readability
- Reply-to set to sender's email for easy responses

## Testing

1. Ensure all environment variables are set in your `.env` file
2. Start your development server: `npm run dev`
3. Navigate to the contact form page
4. Fill out and submit the form
5. Check the server console for logs
6. Check your Gmail inbox for the email

## Troubleshooting

### "Authentication failed" error
- Verify your `GMAIL_USER` is correct
- Make sure you're using an **App Password**, not your regular Gmail password
- Ensure 2-Step Verification is enabled on your Google account
- Regenerate a new App Password if needed

### "Connection timeout" error
- Check your `SMTP_PORT` (use 465 for SSL or 587 for TLS)
- Verify `SMTP_SECURE` matches your port (true for 465, false for 587)
- Check your firewall or antivirus isn't blocking SMTP

### Email not receiving
- Check your spam/junk folder
- Verify `GMAIL_RECIPIENT` is set correctly
- Check the server console logs for error messages
- Ensure the email address in `GMAIL_USER` is valid

### "All fields are required" error
- Ensure all form fields are filled out
- Check the network request in browser DevTools
- Verify JSON payload is correctly formatted

## Security Notes

- ✅ Passwords are stored in `.env` (not committed to Git)
- ✅ Email sending happens server-side (credentials never exposed to client)
- ✅ Input validation on both client and server
- ✅ Error messages don't expose sensitive information
- ⚠️ Consider implementing rate limiting to prevent abuse
- ⚠️ Consider adding CAPTCHA for production use

## Production Deployment

Before deploying to production:

1. Set all environment variables in your hosting platform
2. Consider using a dedicated email service (SendGrid, Mailgun, etc.) for better deliverability
3. Implement rate limiting
4. Add CAPTCHA or spam protection
5. Monitor email sending logs
6. Set up email delivery notifications

## Support

For issues with Gmail SMTP, refer to:
- [Google's SMTP guide](https://support.google.com/mail/answer/7126229)
- [Nodemailer documentation](https://nodemailer.com/)

