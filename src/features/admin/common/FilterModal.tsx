import { Button, Popover, Stack, Typography, Box } from "@mui/material";
import { DatePickerField } from "../../../components/UI/DatePickerField";
import { InputBox } from "../../../components/UI/InputBox";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

type Keys = "grade" | "startDate" | "endDate";
type Filters = {
  [key in Keys]: {
    key: string;
    label: string;
    value: string;
    error: string;
  };
};

const FilterModal = ({
  anchor,
  onClose,
  filters,
  onFilterChange,
  onReset,
  onApply,
}: {
  anchor: HTMLElement | null;
  onClose: () => void;
  filters: Filters;
  onFilterChange: (key: string, value: string | null) => void;
  onReset: () => void;
  onApply: () => void;
}) => {
  const open = Boolean(anchor);
  const id = open ? "filter-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchor}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: "16px",
            marginLeft: "250px",
            marginTop: "20px",
          },
        },
      }}
    >
      <Box sx={{ p: 2, width: { xs: "100%", sm: 550 } }}>
        {" "}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Box sx={{ display: "block" }}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ fontWeight: 500, color: "text.secondary" }}
            >
              From Date
            </Typography>
            <DatePickerField
              label={filters.startDate.label}
              value={filters.startDate.value}
              onChange={(_label, value) => onFilterChange("startDate", value)}
            />
          </Box>
          <Box sx={{ display: "block" }}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ fontWeight: 500, color: "text.secondary" }}
            >
              To Date
            </Typography>
            <DatePickerField
              label={filters.endDate.label}
              value={filters.endDate.value}
              onChange={(_label, value) => onFilterChange("endDate", value)}
            />
          </Box>
          <Box sx={{ display: "block" }}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ fontWeight: 500, color: "text.secondary" }}
            >
              Grade
            </Typography>
            <InputBox
              id={"grade"}
              name={"grade"}
              value={filters.grade.value || ""}
              type="text"
              onChange={(key, value) => onFilterChange(key, value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </Box>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          sx={{ mt: 3 }}
        >
          <Button
            onClick={onReset}
            sx={{ color: "#666666", borderRadius: "8px" }}
            size="small"
          >
            <RestartAltOutlinedIcon />
            RESET
          </Button>
          <Button
            onClick={onApply}
            variant="contained"
            size="small"
            sx={{ borderRadius: "8px", backgroundColor: "#2563eb", px: 2 }}
          >
            APPLY
          </Button>
        </Stack>
      </Box>
    </Popover>
  );
};

export default FilterModal;
