import express from "express";
import { createContact, getContacts } from "../controllers/contactController.js";

const router = express.Router();

// POST: create new contact message
router.post("/", createContact);

// GET: all contacts (for admin dashboard, optional)
router.get("/", getContacts);

export default router;
