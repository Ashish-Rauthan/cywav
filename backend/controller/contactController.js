import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save in DB
    const newMessage = new Contact({ name, email, subject, message });
    await newMessage.save();

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // Send email to YOU
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>📩 New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return res.status(200).json({ message: "Message sent & email delivered!" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};
