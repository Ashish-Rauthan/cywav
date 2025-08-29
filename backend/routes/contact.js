// In routes/contact.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  try {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your email password or app password
      }
    });
    
    // Setup email data
    let mailOptions = {
      from: `"${name}" <${email}>`, // Sender address
      to: process.env.RECEIVER_EMAIL, // Your email to receive messages
      subject: subject,
      text: message,
      html: `<p>${message}</p>`
    };
    
    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

// Change this line:
export default router;