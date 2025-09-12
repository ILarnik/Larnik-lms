 import ExcelJS from "exceljs";
import { Document, Packer, Paragraph } from "docx";
import PDFDocument from "pdfkit";
import fs from "fs";

// Excel generator
export const generateExcel = async (title, data, filePath) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Report");

  if (Array.isArray(data) && data.length > 0) {
    sheet.addRow(Object.keys(data[0]));
    data.forEach((row) => sheet.addRow(Object.values(row)));
  } else {
    sheet.addRow(["No data"]);
  }

  await workbook.xlsx.writeFile(filePath);
  return filePath;
};

// PDF generator
export const generatePDF = async (title, data, filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      doc.fontSize(18).text(title, { align: "center" });
      doc.moveDown();
      doc.fontSize(12).text(JSON.stringify(data, null, 2));

      doc.end();

      writeStream.on("finish", () => resolve(filePath));
      writeStream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
};

// Word generator
export const generateWord = async (title, data, filePath) => {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ text: title, heading: "Heading1" }),
          new Paragraph(JSON.stringify(data, null, 2)),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filePath, buffer);
  return filePath;
};
