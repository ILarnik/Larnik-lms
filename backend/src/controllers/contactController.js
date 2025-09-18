import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message, subscribe } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, Email and Message are required" });
    }

    const contact = new Contact({ name, email, phone, message, subscribe });
    await contact.save();

    res.status(201).json({ message: "Message received successfully!" });
  } catch (error) {
    console.error(error);
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
