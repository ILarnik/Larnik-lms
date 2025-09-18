 import Contact from "../models/Contact.js";
import { transporter } from "../utils/email.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message, subscribe } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, Email and Message are required" });
    }

    const contact = new Contact({ name, email, phone, message, subscribe });
    await contact.save();

    // Send email to support
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,  // sender
      to: process.env.SUPPORT_EMAIL,                        // your support email
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "Not provided"}</p>
        <p><b>Message:</b> ${message}</p>
        <p><b>Subscribe:</b> ${subscribe ? "Yes" : "No"}</p>
      `,
    });

    res.status(201).json({ message: "Message received successfully!" });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};

 
// optional: get all messages (admin use)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
};
