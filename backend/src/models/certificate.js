 import mongoose from "mongoose";
 import crypto from "crypto";

/**
 * Certificate Template Schema
 * (Superadmin maintains this, only 1 fixed template in your system)
 */
const CertificateTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // creator (SuperAdmin)
  logoUrl: { type: String },        // optional logo path or CDN
  backgroundUrl: { type: String },  // optional background image
  signatories: [
    {
      name: { type: String, required: true },
      title: { type: String, default: "" },
      signatureUrl: { type: String, default: "" },
    },
  ],
  layout: { type: Object, default: {} }, // positions, fonts, colors
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

/**
 * Issued Certificate Schema
 */
// const IssuedCertificateSchema = new mongoose.Schema({
//   certificateId: {
//     type: String,
//     unique: true,
//     default: () => new mongoose.Types.ObjectId().toString(),
//   },
//   studentEmail: { type: String, required: true },
//   studentName: { type: String, required: true },
//   courseuniqueId: { type: String, required: true }, // manually entered by teacher
//   courseTitle: { type: String, required: true },
//   templateId: { type: mongoose.Schema.Types.ObjectId, ref: "CertificateTemplate" },
//   score: { type: Number, required: true },
//   issuedAt: { type: Date, default: Date.now },
//   pdfUrl: { type: String, default: "" },
//   qrUrl: { type: String, default: "" },
//   validated: { type: Boolean, default: false },
//   status: {
//     type: String,
//     enum: ["pending", "approved", "rejected"],
//     default: "pending",
//   },
// });
 const IssuedCertificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true, default: () => crypto.randomUUID() },
  uniqueId: { type: String, required: true, unique: true, default: () => `CERT-${Date.now()}-${crypto.randomBytes(4).toString("hex").toUpperCase()}` },
  studentEmail: { type: String, required: true },
  studentName: { type: String, required: true },
  courseuniqueId: { type: String, required: true },
  courseTitle: { type: String, required: true },
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: "CertificateTemplate" },
  score: { type: Number, required: true },
  issuedAt: { type: Date, default: Date.now },
  pdfUrl: { type: String, default: "" },
  qrUrl: { type: String, default: "" },
  validated: { type: Boolean, default: false },
  status: { type: String, enum: ["pending","approved","rejected"], default: "pending" },
  
  approvedBy: { type: [String], default: [] }, // roles of who approved
approvalFlow: { type: [String], default: [] },
  //rejectedBy: { type: [String], default: [] }, // roles of who rejected
});

export const CertificateTemplate = mongoose.model(
  "CertificateTemplate",
  CertificateTemplateSchema
);
export const IssuedCertificate = mongoose.model(
  "IssuedCertificate",
  IssuedCertificateSchema
);
