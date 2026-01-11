import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Logo from "../assets/bramha_logo.jpeg";

export function exportToPdf<T>(
  data: T[],
  headers: Record<keyof T, string>,
  fileName: string
) {
  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();
  const rightMargin = pageWidth - 15;

  if (Logo) {
    doc.addImage(Logo, "PNG", 15, 5, 25, 25);
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("SRI BRAMHA INDUSTRIES", 45, 12);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("COMMERCIAL KITCHEN & BAKERY EQUIPMENTS", 45, 18);

  doc.setFontSize(10);
  doc.text("GSTIN: 33AVTPS8228G1Z0", rightMargin, 12, { align: "right" });

  doc.setFontSize(9);
  doc.setTextColor(100);
  const addressLines = [
    "Register office & Showroom: Near Reliance Market, Opp to SIT Hostel,",
    "Tanjore, Trichy Main Rd, Ariyamangalam Area, Trichy - 620010",
    "Sales: 98656 99922, 98424 71388 / Service: 95781 71388",
    "www.sribramhaindustries.in | bramhaindustries@gmail.com",
  ];
  addressLines.forEach((line, i) => {
    doc.text(line, 45, 24 + i * 4.5);
  });
  doc.setTextColor(0);

  doc.setDrawColor(220);
  doc.line(15, 45, rightMargin, 45);

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
    startY: 50,
    head: [pdfHeaders],
    body: body,
    styles: {
      fontSize: 9,
      cellPadding: 2,
      lineColor: [220, 220, 220],
      lineWidth: 0.1,
      valign: "middle",
    },
    headStyles: {
      fillColor: [240, 240, 240],
      textColor: [0, 0, 0],
      fontStyle: "bold",
      halign: "center",
    },
    bodyStyles: {
      halign: "left",
    },
    theme: "grid",
  });

  doc.save(`${fileName}.pdf`);
}
