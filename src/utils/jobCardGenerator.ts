import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Logo from "../assets/bramha_logo.jpeg";
import type { OrderManagementDataDto } from "../types/orderManagement";

// Helper function to map deadline status numbers to meaningful text
const mapDeadlineStatus = (status: string | number): string => {
  const statusStr = String(status);
  switch (statusStr) {
    case "1":
      return "Pending";
    case "2":
      return "Ongoing";
    case "3":
      return "Completed";
    case "4":
      return "Delayed";
    default:
      return statusStr || "Pending";
  }
};

export function generateJobCard(order: OrderManagementDataDto) {
  try {
    const doc = new jsPDF();
    let currentY = 35; // Starting Y position after header
    const sectionSpacing = 15; // Space between sections
    const pageHeight = doc.internal.pageSize.height;
    const bottomMargin = 50; // Space from bottom for signatures
    
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
      doc.text(line, 15, currentY + i * 5);
    });

    currentY += 25; // Update Y position after address lines

    // Separator line
    doc.setDrawColor(150);
    doc.line(10, currentY + 10, 200, currentY + 10);
    currentY += 20;

    // Job Card Details section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Job Card Details", 15, currentY);

    const jobCardData = [
      ["Job Card No:", `JC/${new Date().getFullYear()}/${String(order.id).padStart(3, '0')}`],
      ["Order ID:", `ORD/${new Date().getFullYear()}/${String(order.id).padStart(3, '0')}`],
      ["Project Start Date:", order.deadlineStart || "-"],
      ["Project Deadline (End Date):", order.deadlineEnd || "-"],
      ["Date Issued:", new Date().toLocaleDateString('en-GB')],
    ];

    autoTable(doc, {
      startY: currentY + 5,
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

    // Update currentY after job card table
    currentY = (doc as any).lastAutoTable.finalY + sectionSpacing;

    // Check if we need a new page for client details
    if (currentY + 60 > pageHeight - bottomMargin) {
      doc.addPage();
      currentY = 20;
    }

    // Client Details section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Client Details", 15, currentY);

    const clientData = [
      ["Client Name:", order.estimation.customerName || "-"],
      ["Company:", order.estimation.companyName || "-"],
      ["Contact No:", order.estimation.customerPhone || "-"],
      ["Email:", (() => {
        try {
          if (Array.isArray(order.leads) && order.leads.length > 0) {
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
      startY: currentY + 5,
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

    // Update currentY after client details table
    currentY = (doc as any).lastAutoTable.finalY + sectionSpacing;

    // Calculate estimated height for order details
    const estimatedOrderDetailsHeight = (order.estimation.products.length * 10) + 50;
    if (currentY + estimatedOrderDetailsHeight > pageHeight - bottomMargin) {
      doc.addPage();
      currentY = 20;
    }

    // Order Details section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Order Details", 15, currentY);

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
      startY: currentY + 5,
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

    // Update currentY after order details table
    currentY = (doc as any).lastAutoTable.finalY + sectionSpacing;

    // Calculate estimated height for production stages
    const productionStagesCount = (order.deadline && Array.isArray(order.deadline)) ? order.deadline.length : 0;
    const estimatedProductionHeight = (productionStagesCount * 12) + 60;
    
    if (currentY + estimatedProductionHeight > pageHeight - bottomMargin) {
      doc.addPage();
      currentY = 20;
    }

    // Production Line Stages section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Production Line Stages with Deadlines", 15, currentY);

    const productionStagesHeaders = [
      "Stage No", "Stage Name", "Start Date", "End Date", 
      "Est. Time", "Status", "Remarks"
    ];

    // Use dynamic internal deadlines from order data, fallback to default stages if none exist
    let productionStagesBody: any[] = [];
    
    if (order.deadline && Array.isArray(order.deadline) && order.deadline.length > 0) {
      // Use dynamic internal deadlines
      productionStagesBody = order.deadline.map((deadline, index) => {
        const startDate = deadline.startAt ? new Date(deadline.startAt).toLocaleDateString('en-GB') : "-";
        const endDate = deadline.endAt ? new Date(deadline.endAt).toLocaleDateString('en-GB') : "-";
        
        // Calculate estimated time based on start and end dates
        let estTime = "-";
        if (deadline.startAt && deadline.endAt) {
          const start = new Date(deadline.startAt);
          const end = new Date(deadline.endAt);
          const diffTime = Math.abs(end.getTime() - start.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          estTime = `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
        }
        
        return [
          index + 1,
          deadline.name || `Stage ${index + 1}`,
          startDate,
          endDate,
          estTime,
          mapDeadlineStatus(deadline.status),
          deadline.delayReason || "-",
        ];
      });
    } else {
      // Add a placeholder row if no production stages exist
      productionStagesBody = [
        ["-", "No stages defined", "-", "-", "-", "Pending", "-"]
      ];
    }

    autoTable(doc, {
      startY: currentY + 5,
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
        2: { cellWidth: 25 }, // Start Date
        3: { cellWidth: 25 }, // End Date
        4: { cellWidth: 20 }, // Est. Time
        5: { cellWidth: 20 }, // Status
        6: { cellWidth: 50 }, // Remarks
      },
    });

    // Update currentY after production stages table
    currentY = (doc as any).lastAutoTable.finalY + sectionSpacing;

    // Ensure signatures are on the same page or add new page
    const footerHeight = 80; // Estimated height for notes and signatures
    if (currentY + footerHeight > pageHeight - 20) {
      doc.addPage();
      currentY = 20;
    }

    // Supervisor Notes section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Supervisor Notes:", 15, currentY + 10);
    
    // Add dotted lines for notes
    for (let i = 0; i < 3; i++) {
      doc.setLineDashPattern([2, 2], 0);
      doc.line(15, currentY + 16 + i * 8, 195, currentY + 15 + i * 8);
    }

    // Reset line dash pattern
    doc.setLineDashPattern([], 0);

    // Signatures section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Signatures:", 15, currentY + 45);
    
    const signatureLabels = ["Operation Manager:", "QC Manager:", "Dispatch Officer:"];
    signatureLabels.forEach((label, index) => {
      doc.text(label, 15, currentY + 60 + index * 18);
      doc.setLineDashPattern([2, 2], 0);
      doc.line(15, currentY + 70 + index * 18, 80, currentY + 70 + index * 18);
    });

    // Reset line dash pattern
    doc.setLineDashPattern([], 0);

    // Save the PDF
    const fileName = `JobCard_${order.id}_${new Date().toISOString().split('T')[0]}`;
    doc.save(`${fileName}.pdf`);
  } catch (error) {
    console.error("Error generating job card:", error);
    alert("Error generating job card. Please try again.");
  }
}
