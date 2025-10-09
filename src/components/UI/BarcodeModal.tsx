import React, { useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import Barcode from 'react-barcode';
import { useReactToPrint } from 'react-to-print';
import type { RawMaterial } from '../../types/warehouse';

interface BarcodeModalProps {
  open: boolean;
  onClose: () => void;
  material: RawMaterial | null;
}

const BarcodeModal: React.FC<BarcodeModalProps> = ({ open, onClose, material }) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (!material) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Barcode for {material.name}</DialogTitle>
      <DialogContent>
        <Box ref={componentRef} sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6">{material.name}</Typography>
          <Typography variant="body1">Barcode: {material.barcode}</Typography>
          <Barcode value={material.barcode} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handlePrint} variant="contained">
          Print
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BarcodeModal;
