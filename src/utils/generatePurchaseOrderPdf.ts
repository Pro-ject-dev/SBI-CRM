import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Logo from "../assets/bramha_logo.jpeg";
import type { PurchaseOrder, PurchaseOrderItem, Vendor } from "../types/warehouse";

function formatCurrency(value: number | string): string {
  const num = Number(value ?? 0);
  try {
    return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } catch {
    return `₹${num.toFixed(2)}`;
  }
}

// Helper function to wrap text for destination
function wrapText(text: string, maxWidth: number = 55): string[] {
  if (!text) return [];
  
  // Split by existing line breaks first
  const paragraphs = text.split('\n');
  const allLines: string[] = [];
  
  paragraphs.forEach(paragraph => {
    const words = paragraph.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    
    words.forEach(word => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (testLine.length <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });
    
    if (currentLine) lines.push(currentLine);
    allLines.push(...lines);
  });
  
  return allLines;
}

export function generatePurchaseOrderPdf(
  order: PurchaseOrder,
  opts?: {
    vendorDetails?: Partial<Vendor>;
    ourRefNo?: string;
    yourRefNo?: string;
    refNote?: string;
    placeOfDestination?: string;
    deliveryBy?: string;
    taxes?: { cgstPct?: number; sgstPct?: number; roundOff?: number };
    notes?: {
      taxes?: string;
      payment?: string;
      delivery?: string;
      freight?: string;
      insurance?: string;
      warranty?: string;
      remarks?: string;
      terms?: string[];
      billingAddresses?: string[];
    };
  }
): Blob {
  const doc = new jsPDF();

  // Header section - STATIC SRI BRAMHA INDUSTRIES
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
  doc.text("GSTIN: 33AVTPS8228G1Z0", 195, 5, { align: "right" });

  // Address - STATIC
  doc.setFontSize(9);
  const addressLines = [
    "Register office & Showroom: Near Reliance Market, Opp to SIT Hostel,",
    "Tanjore, Trichy Main Rd, Ariyamangalam Area, Trichy - 620010",
    "Sales: 98656 99922, 98424 71388 / Service: 95781 71388",
    "www.sribramhaindustries.in | bramhaindustries@gmail.com",
  ];
  addressLines.forEach((line, i) => doc.text(line, 15, 35 + i * 5));

  doc.setDrawColor(150);
  doc.line(10, 60, 200, 60);

  // Title centered
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("PURCHASE ORDER", 105, 70, { align: "center" });

  // PO header info boxes with borders - DYNAMIC VALUES
  doc.setDrawColor(0);
  doc.setLineWidth(0.3);
  
  // PO No./Date box
  doc.rect(10, 75, 100, 12);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const poNo = String(order.id);
  const poDate = new Date(order.requestedDate).toLocaleDateString("en-GB");
  doc.text(`PO No. / Date : ${poNo} / ${poDate}`, 12, 82);

  // AMD No box
  doc.rect(110, 75, 45, 12);
  doc.text(`AMD No / Dt.: ${opts?.yourRefNo || '-'}`, 112, 82);

  // Job Order No box
  doc.rect(155, 75, 45, 12);
  doc.text(`Job Order No.: ${opts?.ourRefNo || '-'}`, 157, 82);

  // From/To section with borders
  doc.rect(10, 90, 95, 50); // From section
  doc.rect(105, 90, 95, 50); // To section

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("From", 12, 97);
  doc.text("To", 107, 97);

  // From details - STATIC (SRI BRAMHA INDUSTRIES)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  const fromLines = [
    "SRI BRAMHA INDUSTRIES",
    "T.S. No.214/5-B, Tanjore - Trichy Main Road,",
    "Opp. Navalur Road,",
    "Pudukkudi North Village (p.o.),",
    "Sengipatti (Via), Tanjore - 613 402.",
    "GST: 33AVTPS8228G1Z0",
    "Mobile: 9865699922 / 9842471388"
  ];
  fromLines.forEach((line, i) => doc.text(line, 12, 104 + i * 5));

  // To details - DYNAMIC VALUES
  const vendorName = typeof order.vendor === "string" ? order.vendor : order.vendor?.name || opts?.vendorDetails?.name || "";
  const vendorAddress = (typeof (order as any).vendorAddress === 'string' && (order as any).vendorAddress) || opts?.vendorDetails?.address || "";
  const vendorGst = (order as any)?.vendor?.gstNumber || opts?.vendorDetails?.gstNumber || "";
  const vendorPhone = (order as any)?.vendor?.phone || opts?.vendorDetails?.phone || "";

  const toLines = [
    vendorName,
    ...(vendorAddress ? vendorAddress.split("\n") : []),
    vendorGst ? `GST: ${vendorGst}` : "",
    vendorPhone ? `Mobile: ${vendorPhone}` : ""
  ].filter(Boolean) as string[];
  
  toLines.forEach((line, i) => doc.text(line, 107, 104 + i * 5));

  // Reference section
  doc.rect(10, 145, 95, 12);
  doc.rect(105, 145, 95, 12);
  
  doc.setFontSize(9);
  doc.text("Our Ref.No.", 12, 152);
  if (opts?.ourRefNo) doc.text(`: ${opts.ourRefNo}`, 45, 152);
  
  doc.text("Your Ref. No.", 107, 152);
  if (opts?.yourRefNo) doc.text(`: ${opts.yourRefNo}`, 142, 152);
  if (opts?.refNote) doc.text(`Ref: ${opts.refNote}`, 107, 158);

  // Main content text
  doc.setFontSize(9);
  doc.text("We are pleased to place an order for the following items as per specification, terms & conditions.", 12, 165);

  // Items table - DYNAMIC VALUES with FIXED column widths
  const startY = 175;
  const headers = [
    "Sl. No",
    "Item Description", 
    "Spec./Make",
    "GST",
    "UOM",
    "Qty",
    "Delivery",
    "Unit Price\n(Rs)",
    "Total Value\n(Rs)"
  ];

  const body = (order.items || []).map((item: PurchaseOrderItem, idx: number) => {
    const name = typeof item.rawMaterial === "string" ? item.rawMaterial : (item as any).rawMaterialName || (item.rawMaterial as any)?.name || "-";
    const spec = (item as any).specification || (item as any).spec || (item as any).description || "-";
    const itemGst = (item as any).gstPct || (item as any).gst;
    const gst = itemGst ? `${String(itemGst).trim()}%` : ((order as any)?.cgst && (order as any)?.sgst) ? `${(Number((order as any).cgst) + Number((order as any).sgst)).toFixed(0)}%` : (opts?.taxes?.cgstPct && opts?.taxes?.sgstPct ? `${(opts.taxes.cgstPct + opts.taxes.sgstPct).toFixed(0)}%` : "18%");
    const uom = (item as any).unit || "Nos";
    const qty = String(item.quantity ?? "0");
    const deliveryRaw = (item as any).deliveryDate || (item as any).delivery || (order as any)?.deliveryDate || opts?.deliveryBy;
    const delivery = deliveryRaw ? (()=>{ try { return new Date(deliveryRaw).toLocaleDateString('en-GB'); } catch { return String(deliveryRaw); } })() : "-";
    const unitPrice = formatCurrency(item.unitPrice).replace('₹', '');
    const totalPrice = formatCurrency(item.totalPrice).replace('₹', '');

    return [
      idx + 1,
      name,
      spec,
      gst,
      uom,
      qty,
      delivery,
      unitPrice,
      totalPrice
    ];
  });

  autoTable(doc, {
    startY,
    head: [headers],
    body,
    theme: "grid",
    styles: {
      fontSize: 7,
      cellPadding: 1.5,
      lineColor: [0, 0, 0],
      lineWidth: 0.3,
      overflow: "linebreak",
      valign: "middle",
    },
    headStyles: {
      fillColor: [240, 240, 240],
      textColor: 0,
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
    },
    bodyStyles: {
      halign: "left",
      valign: "top",
    },
    columnStyles: {
      0: { cellWidth: 12, halign: "center" }, // Sl. No
      1: { cellWidth: 40, overflow: 'linebreak' }, // Item Description
      2: { cellWidth: 35, overflow: 'linebreak' }, // Spec/Make
      3: { cellWidth: 12, halign: "center" }, // GST
      4: { cellWidth: 12, halign: "center" }, // UOM
      5: { cellWidth: 12, halign: "center" }, // Qty
      6: { cellWidth: 18, halign: "center" }, // Delivery
      7: { cellWidth: 22, halign: "right" }, // Unit Price
      8: { cellWidth: 27, halign: "right" }, // Total Value
    },
    margin: { left: 10, right: 10 },
  });

  const afterItemsY = (doc as any).lastAutoTable?.finalY ?? startY + 30;

  // E & OE row
  doc.setFontSize(9);
  doc.text("E & OE", 12, afterItemsY + 8);

  // Place of Destination section - DYNAMIC with text wrapping - FIXED
  const destinationBoxHeight = 35; // Increased height
  doc.rect(10, afterItemsY + 12, 120, destinationBoxHeight);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Place of Destination:", 12, afterItemsY + 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  const destinationText = opts?.placeOfDestination || vendorAddress || "";
  const wrappedDestLines = destinationText ? wrapText(destinationText, 55) : ["To be specified"];

  // Start text below the "Place of Destination:" label
  let currentY = afterItemsY + 26;
  const maxY = afterItemsY + 12 + destinationBoxHeight - 3; // Leave 3 units margin from bottom

  wrappedDestLines.forEach((line: string, i: number) => {
    if (currentY <= maxY) {
      doc.text(line, 12, currentY);
      currentY += 4;
    }
  });

  // Totals section - DYNAMIC VALUES
  const basicValue = Number(order.items?.reduce((s, it: any) => s + Number(it.totalPrice || 0), 0) || order.totalAmount || 0);
  const cgstPct = opts?.taxes?.cgstPct ?? Number((order as any)?.cgst || 9);
  const sgstPct = opts?.taxes?.sgstPct ?? Number((order as any)?.sgst || 9);
  const cgstVal = basicValue * (cgstPct / 100);
  const sgstVal = basicValue * (sgstPct / 100);
  const roundOff = opts?.taxes?.roundOff ?? 0;
  const netTotal = basicValue + cgstVal + sgstVal + roundOff;

  autoTable(doc, {
    startY: afterItemsY + 15,
    body: [
      ["Basic Value", formatCurrency(basicValue).replace('₹', '')],
      ...(cgstPct ? [[`CGST ${cgstPct}%`, formatCurrency(cgstVal).replace('₹', '')]] : []),
      ...(sgstPct ? [[`SGST ${sgstPct}%`, formatCurrency(sgstVal).replace('₹', '')]] : []),
      ...(roundOff ? [[`Round off ${roundOff >= 0 ? '' : '(-)'}`, formatCurrency(Math.abs(roundOff)).replace('₹', '')]] : []),
      ["Net Total", formatCurrency(netTotal).replace('₹', '')],
    ],
    theme: "grid",
    styles: { 
      fontSize: 9, 
      cellPadding: 2, 
      lineColor: [0, 0, 0], 
      lineWidth: 0.3,
      overflow: 'hidden'
    },
    bodyStyles: { halign: "right" },
    columnStyles: { 
      0: { halign: "left", cellWidth: 30 }, 
      1: { halign: "right", cellWidth: 25 } 
    },
    margin: { left: 135 },
    willDrawCell: (data) => {
      if (data.row.index === data.table.body.length - 1) {
        doc.setFont("helvetica", "bold");
      } else {
        doc.setFont("helvetica", "normal");
      }
    }
  });

  // Terms section - DYNAMIC VALUES
  let termsY = afterItemsY + 55; // Adjusted for larger destination box
  
  const addTermLine = (label: string, value?: string) => {
    if (!value) return;
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 15, termsY);
    doc.setFont("helvetica", "normal");
    const labelWidth = doc.getTextWidth(`${label}:`);
    doc.text(value, 15 + labelWidth + 5, termsY);
    termsY += 6;
  };

  const taxesText = opts?.notes?.taxes || (cgstPct && sgstPct ? `SGST ${sgstPct}%, CGST ${cgstPct}%` : undefined);
  const paymentText = opts?.notes?.payment || (order as any)?.paymentNote;
  const deliveryText = opts?.notes?.delivery || ((order as any)?.deliveryDate ? `On or before ${new Date((order as any).deliveryDate).toLocaleDateString('en-GB')}` : undefined);
  const freightText = opts?.notes?.freight;
  const insuranceText = opts?.notes?.insurance || (order as any)?.insurance;
  const warrantyText = opts?.notes?.warranty || (order as any)?.warranty;
  const remarksText = opts?.notes?.remarks || (order as any)?.remarks;

  addTermLine("Taxes", taxesText);
  addTermLine("Payment", paymentText);
  addTermLine("Delivery", deliveryText);
  addTermLine("Freight", freightText);
  addTermLine("Insurance", insuranceText);
  addTermLine("Warranty", warrantyText);
  addTermLine("Remarks", remarksText);

  // Terms & Conditions - DYNAMIC
  if (opts?.notes?.terms && opts.notes.terms.length) {
    doc.setFont("helvetica", "bold");
    doc.text("Terms&", 15, termsY);
    doc.text("Conditions:", 15, termsY + 4);
    doc.setFont("helvetica", "normal");
    
    opts.notes.terms.forEach((term, i) => {
      doc.text(`${term}`, 60, termsY + i * 4);
    });
    termsY += opts.notes.terms.length * 4 + 8;
  }

  // Billing addresses - DYNAMIC
  if (opts?.notes?.billingAddresses && opts.notes.billingAddresses.length) {
    doc.setFont("helvetica", "bold");
    doc.text("BILLING SHALL BE MADE TO THE FOLLOWING FACTORY ADDRESS", 15, termsY);
    doc.setFont("helvetica", "normal");
    
    opts.notes.billingAddresses.forEach((address, i) => {
      doc.text(address, 15, termsY + 6 + i * 4);
    });
  }

  // Save the PDF
  const fileName = `PO_${order.id}_${new Date().toISOString().split("T")[0]}`;
  try {
    const pageHeight = (doc as any).internal?.pageSize?.getHeight
      ? (doc as any).internal.pageSize.getHeight()
      : ((doc as any).internal?.pageSize?.height || 297);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text("This is a computer generated document. No signature required.", 105, pageHeight - 8, { align: "center" });
    doc.setTextColor(0);
  } catch {}
  
  // Return the PDF as a blob instead of saving it
  const pdfBlob = doc.output('blob');
  return pdfBlob;
}
