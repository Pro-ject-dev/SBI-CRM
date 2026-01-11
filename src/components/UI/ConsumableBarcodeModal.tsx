import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
} from "@mui/material";
import { Print, Download, QrCode2 } from "@mui/icons-material";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode";
import type { ConsumableMaterial } from "../../types/warehouse";

interface ConsumableBarcodeModalProps {
  open: boolean;
  onClose: () => void;
  material: ConsumableMaterial | null;
}

const ConsumableBarcodeModal = ({ open, onClose, material }: ConsumableBarcodeModalProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Barcode-${material?.materialName || 'Unknown'}`,
  });

  const handleDownload = () => {
    if (!material) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create barcode image
    const barcodeElement = printRef.current?.querySelector('svg');
    if (!barcodeElement) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(barcodeElement);
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height + 100; // Extra space for text

      // White background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw barcode
      ctx.drawImage(img, 0, 50);

      // Add text
      ctx.fillStyle = 'black';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(material.materialName, canvas.width / 2, 30);
      ctx.fillText(material.barcode, canvas.width / 2, canvas.height - 20);

      // Download
      const link = document.createElement('a');
      link.download = `${material.materialName}-barcode.png`;
      link.href = canvas.toDataURL();
      link.click();
    };

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    img.src = url;
  };

  if (!material) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <QrCode2 color="primary" />
          <Typography variant="h6">
            Material Barcode
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box ref={printRef} sx={{ p: 2 }}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              {material.materialName}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Barcode
                value={material.barcode}
                format="CODE128"
                width={2}
                height={80}
                displayValue={true}
                fontSize={14}
                margin={10}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2} sx={{ textAlign: 'left' }}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Category:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {material.category}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Unit:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {material.unit}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Current Stock:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {material.currentStock} {material.unit}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Unit Price:
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  ₹{material.unitPrice}
                </Typography>
              </Grid>
            </Grid>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              Generated on {new Date().toLocaleDateString()}
            </Typography>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button onClick={onClose}>
          Close
        </Button>
        <Button
          onClick={handleDownload}
          variant="outlined"
          startIcon={<Download />}
        >
          Download
        </Button>
        <Button
          onClick={handlePrint}
          variant="contained"
          startIcon={<Print />}
        >
          Print
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsumableBarcodeModal;
