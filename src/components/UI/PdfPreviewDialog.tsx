// src/components/PdfPreviewDialog.tsx
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface PdfPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  onDownload: () => void;
  pdfUrl: string | null;
  loading: boolean;
}

const PdfPreviewDialog: React.FC<PdfPreviewDialogProps> = ({
  open,
  onClose,
  onDownload,
  pdfUrl,
  loading,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Quotation Preview</DialogTitle>
      <DialogContent
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : pdfUrl ? (
          <iframe
            src={pdfUrl}
            style={{ width: "100%", height: "100%", border: "none" }}
            title="Quotation PDF Preview"
          />
        ) : (
          <p>Error generating PDF preview.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onDownload}
          disabled={!pdfUrl || loading}
          variant="contained"
        >
          Download PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PdfPreviewDialog;
