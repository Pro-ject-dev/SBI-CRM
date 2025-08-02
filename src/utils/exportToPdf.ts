import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Logo from "../assets/bramha_logo.jpeg";

export function exportToPdf<T>(
  data: T[],
  headers: Record<keyof T, string>,
  fileName: string
) {
  const doc = new jsPDF();

  if (Logo) {
    doc.addImage(Logo, "PNG", 15, 2, 30, 30);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("SRI BRAMHA INDUSTRIES", 50, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("COMMERCIAL KITCHEN & BAKERY EQUIPMENTS", 50, 22);

  doc.setFontSize(10);
  doc.text("GSTIN: 33AVTPS8228G1Z0", 205, 5, { align: "right" });

  doc.setFontSize(9);
  const addressLines = [
    "Register office & Showroom: Near Reliance Market, Opp to SIT Hostel,",
    "Tanjore, Trichy Main Rd, Ariyamangalam Area, Trichy - 620010",
    "Sales: 98656 99922, 98424 71388 / Service: 95781 71388",
    "www.sribramhaindustries.in | bramhaindustries@gmail.com",
  ];
  addressLines.forEach((line, i) => {
    doc.text(line, 15, 35 + i * 5);
  });

  doc.setDrawColor(150);
  doc.line(10, 60, 200, 60);

  const pdfHeaders = Object.keys(headers).map((key) => headers[key as keyof T]);

  const body = data.map((row) =>
    Object.keys(headers).map((key) => {
      const value = row[key as keyof T];
      return typeof value === "number" || typeof value === "string"
        ? value
        : JSON.stringify(value);
    })
  );

  autoTable(doc, {
    startY: 65,
    head: [pdfHeaders],
    body: body,
    styles: {
      halign: "center",
      valign: "middle",
      fontSize: 10,
    },
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: 255,
      fontStyle: "bold",
    },
    theme: "striped",
  });

  doc.save(`${fileName}.pdf`);
}
