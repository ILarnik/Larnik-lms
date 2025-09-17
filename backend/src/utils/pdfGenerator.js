 // utils/pdfGenerator.js
// import fs from "fs";
// import path from "path";
// import PDFDocument from "pdfkit";

// export async function createCertificatePDF({ studentName, courseTitle, issuedAt, logoUrl, backgroundUrl, signatories = [], templateLayout = {}, certificateId }) {
//   if (!certificateId) throw new Error("certificateId is required for certificate filename");

//   // ✅ PDF file path using MongoDB _id
//   const fileName = `${certificateId}.pdf`;
//   const filePath = path.join(process.cwd(), "public", "certificates", fileName);

//   const doc = new PDFDocument({ size: "A4", margin: 50 });

//   doc.pipe(fs.createWriteStream(filePath));

//   // Optional: add background image
//   if (backgroundUrl) doc.image(path.join(process.cwd(), backgroundUrl), 0, 0, { width: 595, height: 842 });

//   // Optional: add logo
//   if (logoUrl) doc.image(path.join(process.cwd(), logoUrl), 50, 50, { width: 100 });

//   // Add student name and course title
//   doc.fontSize(24).text(studentName, 50, 200);
//   doc.fontSize(18).text(courseTitle, 50, 250);
//   doc.fontSize(12).text(`Issued At: ${issuedAt.toDateString()}`, 50, 300);

//   // Add signatories if any
//   let y = 400;
//   signatories.forEach((sign) => {
//     doc.text(`${sign.name} - ${sign.title}`, 50, y);
//     y += 50;
//   });

//   doc.end();

//   return {
//     filePath,
//     qrUrl: `/certificates/${fileName}`, // you can use this in QR code
//   };
// }


// utils/pdfGenerator.js
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

export async function createCertificatePDF({
  studentName,
  courseTitle,
  issuedAt,
  logoUrl,
  backgroundUrl,
  signatories = [],
  templateLayout = {},
  certificateId,
  qrBuffer, // 👈 add QR buffer
}) {
  if (!certificateId) throw new Error("certificateId is required for certificate filename");

  // ✅ PDF file path using MongoDB _id
  const fileName = `${certificateId}.pdf`;
  const filePath = path.join(process.cwd(), "public", "certificates", fileName);

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.pipe(fs.createWriteStream(filePath));

  // Optional: add background image
  if (backgroundUrl) {
    doc.image(path.join(process.cwd(), backgroundUrl), 0, 0, {
      width: 595,
      height: 842,
    });
  }

  // Optional: add logo
  if (logoUrl) {
    doc.image(path.join(process.cwd(), logoUrl), 50, 50, { width: 100 });
  }

  // Add student name and course title
  doc.fontSize(24).text(studentName, 50, 200);
  doc.fontSize(18).text(courseTitle, 50, 250);
  doc.fontSize(12).text(`Issued At: ${issuedAt.toDateString()}`, 50, 300);

  // Add signatories if any
  let y = 400;
  signatories.forEach((sign) => {
    doc.text(`${sign.name} - ${sign.title}`, 50, y);
    y += 50;
  });

  // ✅ Add QR Code to bottom-right
  if (qrBuffer) {
    doc.image(qrBuffer, 400, 650, { width: 120, height: 120 });
    doc.fontSize(10).text("Scan to download", 400, 770);
  }

  doc.end();

  return {
    filePath,
    pdfUrl: `/certificates/${fileName}`, // serve for download
  };
}
