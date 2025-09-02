import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Logo from "../assets/bramha_logo.jpeg";
import type { PurchaseOrder, PurchaseOrderItem, Vendor } from "../types/warehouse";

function formatCurrency(value: number | string): string {
  const num = Number(value ?? 0);
  return `₹${num.toFixed(2)}`;
}

export function generatePurchaseOrderPdf(
  order: PurchaseOrder,
  opts?: {
    vendorDetails?: Partial<Vendor>;
    ourRefNo?: string;
    yourRefNo?: string;
    refNote?: string;
    placeOfDestination?: string;
    deliveryBy?: string; // overall requested delivery date
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
) {
  const doc = new jsPDF();

  // Header
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

  // Address
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

  // Header info boxes
  const poNo = String(order.id);
  const poDate = new Date(order.requestedDate).toLocaleDateString("en-GB");
  doc.setFontSize(10);
  doc.text(`PO No / Date : ${poNo} / ${poDate}`, 15, 80);
  doc.text(`AMD No / Dt.: -`, 150, 80);
  doc.text(`Job Order No.: -`, 150, 86);

  // From / To blocks
  const vendorName = typeof order.vendor === "string" ? order.vendor : order.vendor?.name || opts?.vendorDetails?.name || "-";
  const vendorAddress = opts?.vendorDetails?.address || "";
  const vendorGst = opts?.vendorDetails?.gstNumber || "";
  const vendorPhone = opts?.vendorDetails?.phone || "";

  doc.setFont("helvetica", "bold");
  doc.text("From", 15, 95);
  doc.text("To", 120, 95);
  doc.setFont("helvetica", "normal");

  const fromLines = [
    "SRI BRAMHA INDUSTRIES",
    "T.S. No.214/5-B, Tanjore - Trichy Main Road,",
    "Opp. Navalur Road, Pudukkottai North Village (p.o.),",
    "Sengipatti (Via), Tanjore - 613 402.",
    "GST: 33AVTPS8228G1Z0",
    "Mobile: 9865699922 / 9842471388",
  ];
  fromLines.forEach((line, i) => doc.text(line, 15, 101 + i * 5));

  const toLines = [
    vendorName,
    ...(vendorAddress ? vendorAddress.split("\n") : []),
    vendorGst ? `GST: ${vendorGst}` : "",
    vendorPhone ? `Mobile: ${vendorPhone}` : "",
  ].filter(Boolean) as string[];
  toLines.forEach((line, i) => doc.text(line, 120, 101 + i * 5));

  // Reference row (Our Ref / Your Ref / Ref: ...)
  doc.setDrawColor(150);
  doc.line(10, 123, 200, 123);
  doc.setFont("helvetica", "normal");
  doc.text(`Our Ref.No.`, 15, 129);
  if (opts?.ourRefNo) doc.text(`: ${opts.ourRefNo}`, 45, 129);
  doc.text(`Your Ref. No.`, 120, 129);
  if (opts?.yourRefNo) doc.text(`: ${opts.yourRefNo}`, 155, 129);
  if (opts?.refNote) doc.text(`Ref: ${opts.refNote}`, 120, 135);

  // Items table
  const startY = 140;
  const headers = [
    "Sl. No",
    "Item Description",
    "Spec./Make",
    "GST",
    "UOM",
    "Qty",
    "Delivery",
    "Unit Price (Rs)",
    "Total Value (Rs)",
  ];
  const body = (order.items || []).map((item: PurchaseOrderItem, idx: number) => {
    const name = typeof item.rawMaterial === "string" ? item.rawMaterial : (item as any).rawMaterialName || (item.rawMaterial as any)?.name || "-";
    const uom = (item as any).unit || "Nos";
    const spec = (item as any).spec || (item as any).description || "-";
    const gst = (item as any).gstPct ?? (opts?.taxes?.cgstPct && opts?.taxes?.sgstPct ? `${(opts.taxes.cgstPct + opts.taxes.sgstPct).toFixed(0)}%` : "-");
    const delivery = (item as any).delivery || (opts?.deliveryBy ? new Date(opts.deliveryBy).toLocaleDateString("en-GB") : "-");
    return [
      idx + 1,
      name,
      spec,
      gst,
      uom,
      String(item.quantity ?? "0"),
      delivery,
      formatCurrency(item.unitPrice),
      formatCurrency(item.totalPrice),
    ];
  });

  autoTable(doc, {
    startY,
    head: [headers],
    body,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: "bold" },
    theme: "striped",
    columnStyles: {
      0: { cellWidth: 12 }, // Sl No
      1: { cellWidth: 45 }, // Item
      2: { cellWidth: 45 }, // Spec/Make
      3: { cellWidth: 15 }, // GST
      4: { cellWidth: 15 }, // UOM
      5: { cellWidth: 15 }, // Qty
      6: { cellWidth: 20 }, // Delivery
      7: { cellWidth: 25 }, // Unit Price
      8: { cellWidth: 25 }, // Total
    },
  });

  // Total
  const afterItemsY = (doc as any).lastAutoTable?.finalY ?? startY + 10;
  const basicValue = Number(order.items?.reduce((s, it: any) => s + Number(it.totalPrice || 0), 0) || order.totalAmount || 0);
  const cgstPct = opts?.taxes?.cgstPct ?? 0;
  const sgstPct = opts?.taxes?.sgstPct ?? 0;
  const cgstVal = basicValue * (cgstPct / 100);
  const sgstVal = basicValue * (sgstPct / 100);
  const roundOff = opts?.taxes?.roundOff ?? 0;
  const netTotal = basicValue + cgstVal + sgstVal + roundOff;

  doc.setFont("helvetica", "bold");
  doc.text(`Basic Value`, 150, afterItemsY + 6);
  doc.text(`${formatCurrency(basicValue)}`, 200, afterItemsY + 6, { align: "right" });
  doc.setFont("helvetica", "normal");
  if (cgstPct) {
    doc.text(`CGST ${cgstPct}%`, 150, afterItemsY + 12);
    doc.text(`${formatCurrency(cgstVal)}`, 200, afterItemsY + 12, { align: "right" });
  }
  if (sgstPct) {
    doc.text(`SGST ${sgstPct}%`, 150, afterItemsY + 18);
    doc.text(`${formatCurrency(sgstVal)}`, 200, afterItemsY + 18, { align: "right" });
  }
  if (roundOff) {
    doc.text(`Round off`, 150, afterItemsY + 24);
    doc.text(`${formatCurrency(roundOff)}`, 200, afterItemsY + 24, { align: "right" });
  }
  doc.setFont("helvetica", "bold");
  doc.text(`Net Total`, 150, afterItemsY + 30);
  doc.text(`${formatCurrency(netTotal)}`, 200, afterItemsY + 30, { align: "right" });

  // Place of Destination block
  doc.setFont("helvetica", "bold");
  doc.text("Place of Destination:", 15, afterItemsY + 12);
  doc.setFont("helvetica", "normal");
  const destLines = (opts?.placeOfDestination
    ? [opts.placeOfDestination]
    : []).concat([]);
  destLines.forEach((line, i) => doc.text(line, 15, afterItemsY + 18 + i * 5));

  // Terms blocks (Taxes, Payment, Delivery, Freight, Insurance, Warranty, Remarks)
  let ty = afterItemsY + 42;
  const addNote = (label: string, value?: string) => {
    if (!value) return;
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 15, ty);
    doc.setFont("helvetica", "normal");
    doc.text(value, 50, ty);
    ty += 6;
  };
  addNote("Taxes", opts?.notes?.taxes);
  addNote("Payment", opts?.notes?.payment);
  addNote("Delivery", opts?.notes?.delivery ?? (opts?.deliveryBy ? `On or before ${new Date(opts.deliveryBy).toLocaleDateString('en-GB')}` : undefined));
  addNote("Freight", opts?.notes?.freight);
  addNote("Insurance", opts?.notes?.insurance);
  addNote("Warranty", opts?.notes?.warranty);
  addNote("Remarks", opts?.notes?.remarks);

  if (opts?.notes?.terms && opts.notes.terms.length) {
    doc.setFont("helvetica", "bold");
    doc.text("Terms & Conditions:", 15, ty);
    ty += 6;
    doc.setFont("helvetica", "normal");
    opts.notes.terms.forEach((t, i) => {
      doc.text(`- ${t}`, 15, ty + i * 5);
    });
    ty += opts.notes.terms.length * 5 + 4;
  }
  if (opts?.notes?.billingAddresses && opts.notes.billingAddresses.length) {
    doc.setFont("helvetica", "bold");
    doc.text("Billing Address:", 15, ty);
    doc.setFont("helvetica", "normal");
    opts.notes.billingAddresses.forEach((b, i) => doc.text(b, 15, ty + 6 + i * 5));
  }

  // Save
  const fileName = `PO_${order.id}_${new Date().toISOString().split("T")[0]}`;
  doc.save(`${fileName}.pdf`);
}


