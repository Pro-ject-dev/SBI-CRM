// SizeChartPopover.tsx
import React, { useState } from 'react';
import {
  Popover,
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface SizeChartPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSetSize: (size: string) => void; // Expects "Length * Width * Thickness"
  initialLength?: string | number;
  initialWidth?: string | number;
  initialThickness?: string | number;
}

// Standard sizes should now use 'length'
const standardSizes = [
  { length: 200, width: 100, thickness: 20 }, // Changed height to length
  { length: 300, width: 150, thickness: 25 }, // Changed height to length
  { length: 400, width: 200, thickness: 30 }, // Changed height to length
];

const SizeChartPopover: React.FC<SizeChartPopoverProps> = ({
  anchorEl,
  onClose,
  onSetSize,
  initialLength = 0,
  initialWidth = 0,
  initialThickness = 0,
}) => {
  const [customLength, setCustomLength] = useState<number>(Number(initialLength) || 0);
  const [customWidth, setCustomWidth] = useState<number>(Number(initialWidth) || 0);
  const [customThickness, setCustomThickness] = useState<number>(Number(initialThickness) || 0);

  // Calculate area based on length and width
  const calculateArea = (length: number, width: number) => {
    if (isNaN(length) || isNaN(width)) return 0;
    return length * width;
  };

  const handleSetThisSize = (length: number, width: number, thickness: number) => {
    // Ensure the output string is Length * Width * Thickness
    const sizeString = `${length} x ${width} x ${thickness}`;
    onSetSize(sizeString);
    onClose();
  };

  // Update state when initial values change (e.g. if product selection changes size)
  React.useEffect(() => {
    setCustomLength(Number(initialLength) || 0);
    setCustomWidth(Number(initialWidth) || 0);
    setCustomThickness(Number(initialThickness) || 0);
  }, [initialLength, initialWidth, initialThickness, anchorEl]); // Re-run if anchorEl changes (popover reopens)


  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Box sx={{ p: 3, width: 600 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Size Chart (Units based on product selection)
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Length</TableCell> {/* Changed from Height */}
                <TableCell>Width</TableCell>
                <TableCell>Thickness</TableCell>
                <TableCell>Area (L x W)</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {standardSizes.map((size, index) => (
                <TableRow key={index}>
                  <TableCell>{size.length}</TableCell>
                  <TableCell>{size.width}</TableCell>
                  <TableCell>{size.thickness}</TableCell>
                  <TableCell>{calculateArea(size.length, size.width)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleSetThisSize(size.length, size.width, size.thickness)}
                    >
                      Set
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Custom Size
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Length (inches)" // Changed from Height
            type="number"
            value={customLength || ''}
            onChange={(e) => setCustomLength(Number(e.target.value))}
            inputProps={{ min: 0, step: "any" }}
          />
          <TextField
            label="Width (inches)"
            type="number"
            value={customWidth || ''}
            onChange={(e) => setCustomWidth(Number(e.target.value))}
            inputProps={{ min: 0, step: "any" }}
          />
          <TextField
            label="Thickness (mm)"
            type="number"
            value={customThickness || ''}
            onChange={(e) => setCustomThickness(Number(e.target.value))}
            inputProps={{ min: 0, step: "any" }}
          />
        </Box>

        {customLength > 0 && customWidth > 0 && (
          <Typography sx={{ mb: 2 }}>
            Area: {calculateArea(customLength, customWidth)} sq. in
          </Typography>
        )}

        <Button
          variant="contained"
          onClick={() => handleSetThisSize(customLength, customWidth, customThickness)}
          disabled={!(customLength > 0) || !(customWidth > 0) || !(customThickness > 0)}
          sx={{
            "&.Mui-disabled": { // More specific selector for disabled state
              bgcolor: "primary.main",
              color: "white",
              opacity: 0.5,
            },
          }}
        >
          Set Custom Size
        </Button>
      </Box>
    </Popover>
  );
};

export default SizeChartPopover;