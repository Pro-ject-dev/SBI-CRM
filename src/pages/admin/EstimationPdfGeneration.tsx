import { useEffect, useRef, useState } from "react";
import type { estimationDataType } from "../../types/estimationPdf";
import { estimationData } from "../../constants/salesManager/estimationData";
import { Box, Button, CircularProgress } from "@mui/material";
import PdfPreviewDialog from "../../components/UI/PdfPreviewDialog";
import EstimationDocument from "../../features/admin/EstimationDocument";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const EstimationPdfGeneration = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [quotationDetails, setQuotationDetails] =
    useState<estimationDataType>(estimationData);

  useEffect(() => {
    setQuotationDetails(estimationData);
  }, []);
  const pdfContentRef = useRef<HTMLDivElement>(null);

  const generatePdf = async () => {
    const input = document.getElementById("pdf-render-area");
    if (!input) {
      console.error("PDF content area not found!");
      return null;
    }
    setIsGenerating(true);
    setPdfUrl(null);
    setPdfBlob(null);

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const pageElements = input.getElementsByClassName(
        "pdf-page"
      ) as HTMLCollectionOf<HTMLElement>;

      for (let i = 0; i < pageElements.length; i++) {
        const pageElement = pageElements[i];
        if (i > 0) {
          pdf.addPage();
        }

        const canvas = await html2canvas(pageElement, {
          scale: 2,
          useCORS: true,
          logging: true,
          backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png", 1.0);

        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = imgProps.width;
        const imgHeight = imgProps.height;

        let newImgWidth = pdfWidth;
        let newImgHeight = (pdfWidth * imgHeight) / imgWidth;

        if (newImgHeight > pdfHeight) {
          newImgHeight = pdfHeight;
          newImgWidth = (pdfHeight * imgWidth) / imgHeight;
        }

        const x = (pdfWidth - newImgWidth) / 2;
        const y = 0;

        pdf.addImage(
          imgData,
          "PNG",
          x,
          y,
          newImgWidth,
          newImgHeight,
          undefined,
          "FAST"
        );
      }

      const blob = pdf.output("blob");
      setPdfBlob(blob);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      return pdf;
    } catch (error) {
      console.error("Error generating PDF:", error);
      setPdfUrl(null);
      setPdfBlob(null);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenDialog = async () => {
    setDialogOpen(true);
    await generatePdf();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    setPdfUrl(null);
    setPdfBlob(null);
  };

  const handleDownload = () => {
    if (pdfBlob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(pdfBlob);
      link.download = `${quotationDetails.refNo.replace(
        /\//g,
        "_"
      )}_Quotation.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      generatePdf().then((pdfDoc) => {
        if (pdfDoc) {
          pdfDoc.save(
            `${quotationDetails.refNo.replace(/\//g, "_")}_Quotation.pdf`
          );
        }
      });
    }
  };

  return (
    <Box sx={{ padding: 3, textAlign: "center" }}>
      <h1>Quotation Generator</h1>
      <Button
        variant="contained"
        onClick={handleOpenDialog}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "View & Generate Quotation"
        )}
      </Button>

      <div
        ref={pdfContentRef}
        id="pdf-render-area"
        style={{
          position: "absolute",
          left: "-9999px", // Keep it hidden for normal operation
          top: 0,
          width: "210mm", // <<< THIS IS THE CRITICAL FIX >>>
          backgroundColor: "white", // Good to keep for consistent capture
          // Remove zIndex and border for non-debug mode
        }}
      >
        <EstimationDocument
          data={quotationDetails}
          id="quotationContentForPdf"
        />
      </div>

      <PdfPreviewDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onDownload={handleDownload}
        pdfUrl={pdfUrl}
        loading={isGenerating && !pdfUrl}
      />
    </Box>
  );
};

export default EstimationPdfGeneration;
