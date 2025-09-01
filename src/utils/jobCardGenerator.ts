import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Logo from "../assets/bramha_logo.jpeg";
import type { OrderManagementDataDto } from "../types/orderManagement";

export function generateJobCard(order: OrderManagementDataDto) {
  try {
    const doc = new jsPDF();
  
  // Add company logo
  if (Logo) {
    doc.addImage(Logo, "PNG", 15, 2, 30, 30);
  }

  // Company header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("SRI BRAMHA INDUSTRIES", 50, 15);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("COMMERCIAL KITCHEN & BAKERY EQUIPMENTS", 50, 22);
  
  doc.setFontSize(10);
  doc.text("GSTIN: 33AVTPS8228G1Z0", 205, 5, { align: "right" });
  
  // Company address and contact
  doc.setFontSize(9);
  const addressLines = [
    "Address | Contact | Email",
    "Register office & Showroom: Near Reliance Market, Opp to SIT Hostel,",
    "Tanjore, Trichy Main Rd, Ariyamangalam Area, Trichy - 620010",
    "Sales: 98656 99922, 98424 71388 / Service: 95781 71388",
    "www.sribramhaindustries.in | bramhaindustries@gmail.com",
  ];
  addressLines.forEach((line, i) => {
    doc.text(line, 15, 35 + i * 5);
  });

  // Separator line
  doc.setDrawColor(150);
  doc.line(10, 70, 200, 70);

  // Job Card Details section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Job Card Details", 15, 85);

  // Job Card Details table
  const jobCardData = [
    ["Job Card No:", `JC/${new Date().getFullYear()}/${String(order.id).padStart(3, '0')}`],
    ["Order ID:", `ORD/${new Date().getFullYear()}/${String(order.id).padStart(3, '0')}`],
    ["Project Start Date:", order.deadlineStart || "-"],
    ["Project Deadline (End Date):", order.deadlineEnd || "-"],
    ["Date Issued:", new Date().toLocaleDateString('en-GB')],
  ];

  autoTable(doc, {
    startY: 90,
    head: [],
    body: jobCardData,
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60 },
      1: { cellWidth: 80 },
    },
    theme: 'plain',
  });

  // Client Details section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Client Details", 15, 140);

  const clientData = [
    ["Client Name:", order.estimation.customerName || "-"],
    ["Company:", order.estimation.companyName || "-"],
    ["Contact No:", order.estimation.customerPhone || "-"],
    ["Email:", (() => {
      try {
        if (Array.isArray(order.leads) && order.leads.length > 0) {
          // Use find instead of direct indexing to avoid TypeScript tuple issues
          const firstLead = order.leads.find(lead => lead && typeof lead === 'object' && 'email' in lead);
          return firstLead ? (firstLead as any).email || "-" : "-";
        } else if (order.leads && typeof order.leads === 'object' && 'email' in order.leads) {
          return (order.leads as any).email || "-";
        }
        return "-";
      } catch {
        return "-";
      }
    })()],
  ];

  autoTable(doc, {
    startY: 145,
    head: [],
    body: clientData,
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 60 },
      1: { cellWidth: 80 },
    },
    theme: 'plain',
  });

  // Order Details section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Order Details", 15, 190);

  const orderDetailsHeaders = ["Item Code", "Description", "Qty", "Unit", "Material", "Remarks"];
  const orderDetailsBody = order.estimation.products.map((product, index) => [
    product.prodCode || `ITM-${String(index + 1).padStart(3, '0')}`,
    product.name || "-",
    product.quantity || "-",
    "pcs",
    product.specification || "-",
    product.notes || "-",
  ]);

  autoTable(doc, {
    startY: 195,
    head: [orderDetailsHeaders],
    body: orderDetailsBody,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: 255,
      fontStyle: 'bold',
    },
    theme: 'striped',
    columnStyles: {
      0: { cellWidth: 25 }, // Item Code
      1: { cellWidth: 45 }, // Description
      2: { cellWidth: 20 }, // Qty
      3: { cellWidth: 20 }, // Unit
      4: { cellWidth: 35 }, // Material
      5: { cellWidth: 35 }, // Remarks
    },
  });

  // Production Line Stages section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Production Line Stages with Deadlines", 15, 280);

  const productionStagesHeaders = [
    "Stage No", "Stage Name", "Assigned To", "Start Date", "End Date", 
    "Est. Time", "Actual Time", "Status", "Remarks"
  ];

  // Default production stages with calculated dates
  const defaultStages = [
    { name: "Design Review", assignedTo: "Design Team", estTime: "1 day", weight: 0.1 },
    { name: "Material Procurement", assignedTo: "Purchase Team", estTime: "2 days", weight: 0.15 },
    { name: "Fabrication", assignedTo: "Production Team", estTime: "3 days", weight: 0.3 },
    { name: "Assembly", assignedTo: "Assembly Team", estTime: "2 days", weight: 0.25 },
    { name: "Quality Testing", assignedTo: "QC Team", estTime: "1 day", weight: 0.1 },
    { name: "Final Inspection", assignedTo: "QA Manager", estTime: "0.5 day", weight: 0.05 },
    { name: "Packaging", assignedTo: "Store Team", estTime: "0.5 day", weight: 0.05 },
  ];

  // Calculate stage dates based on project timeline
  const projectStart = order.deadlineStart ? new Date(order.deadlineStart) : new Date();
  const projectEnd = order.deadlineEnd ? new Date(order.deadlineEnd) : new Date();
  const totalDays = Math.ceil((projectEnd.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24));
  
  const productionStagesBody = defaultStages.map((stage, index) => {
    const stageStartDate = new Date(projectStart);
    const stageEndDate = new Date(projectStart);
    
    // Calculate stage dates based on weight
    if (index > 0) {
      const previousStagesWeight = defaultStages
        .slice(0, index)
        .reduce((sum, s) => sum + s.weight, 0);
      stageStartDate.setDate(projectStart.getDate() + Math.floor(previousStagesWeight * totalDays));
    }
    
    stageEndDate.setDate(stageStartDate.getDate() + Math.ceil(stage.weight * totalDays));
    
    return [
      index + 1,
      stage.name,
      stage.assignedTo,
      stageStartDate.toLocaleDateString('en-GB'),
      stageEndDate.toLocaleDateString('en-GB'),
      stage.estTime,
      "-",
      "Pending",
      "-",
    ];
  });

  autoTable(doc, {
    startY: 285,
    head: [productionStagesHeaders],
    body: productionStagesBody,
    styles: {
      fontSize: 7,
      cellPadding: 1,
    },
    headStyles: {
      fillColor: [37, 99, 235],
      textColor: 255,
      fontStyle: 'bold',
    },
    theme: 'striped',
    columnStyles: {
      0: { cellWidth: 15 }, // Stage No
      1: { cellWidth: 25 }, // Stage Name
      2: { cellWidth: 25 }, // Assigned To
      3: { cellWidth: 25 }, // Start Date
      4: { cellWidth: 25 }, // End Date
      5: { cellWidth: 20 }, // Est. Time
      6: { cellWidth: 20 }, // Actual Time
      7: { cellWidth: 20 }, // Status
      8: { cellWidth: 25 }, // Remarks
    },
  });

  // Supervisor Notes section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Supervisor Notes:", 15, 380);
  
  // Add dotted lines for notes
  for (let i = 0; i < 3; i++) {
    doc.setLineDashPattern([2, 2], 0);
    doc.line(15, 385 + i * 8, 195, 385 + i * 8);
  }

  // Signatures section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Signatures:", 15, 420);
  
  const signatureLabels = ["Operation Manager:", "QC Manager:", "Dispatch Officer:"];
  signatureLabels.forEach((label, index) => {
    doc.text(label, 15, 430 + index * 15);
    doc.setLineDashPattern([2, 2], 0);
    doc.line(15, 435 + index * 15, 80, 435 + index * 15);
  });

    // Save the PDF
    const fileName = `JobCard_${order.id}_${new Date().toISOString().split('T')[0]}`;
    doc.save(`${fileName}.pdf`);
  } catch (error) {
    console.error("Error generating job card:", error);
    alert("Error generating job card. Please try again.");
  }
}
