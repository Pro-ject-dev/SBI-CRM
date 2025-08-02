import { Box, Button, Popover, Stack } from "@mui/material";
import type { OptionProps } from "../../../types/selectBox";
import { SelectBox } from "../../../components/UI/SelectBox";
import { exportToExcel } from "../../../utils/exportToExcel";
import { exportToPdf } from "../../../utils/exportToPdf";

const ExportModal = ({
  anchor,
  onClose,
  fileData,
  selectedValue,
  onDropDownChange,
  dropDownData,
  disable,
}: {
  anchor: HTMLElement | null;
  onClose: () => void;
  fileData: {
    data:
      | StandardFileDataDto[]
      | CustomizedFileDataDto[]
      | AddonsFileDataDto[]
      | ComboFileDataDto[];
    headers: Record<string, string>;
    pageName: string;
  };
  selectedValue: string;
  onDropDownChange: (id: string, value: string | OptionProps[]) => void;
  dropDownData: OptionProps[];
  disable: boolean;
}) => {
  const open = Boolean(anchor);
  const id = open ? "export-popover" : undefined;

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
            marginTop: "20px",
          },
        },
      }}
    >
      <Box sx={{ p: 2, width: { xs: "100%", sm: 480 } }}>
        {" "}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <SelectBox
            id={"exportProduct"}
            name={"exportProduct"}
            value={selectedValue}
            options={dropDownData}
            onChange={(key, value) => onDropDownChange(key, value)}
          />
          <Button
            sx={{
              textTransform: "none",
              minWidth: 0,
              height: "fit-content",
              px: 2,
              mr: 1,
              borderRadius: "8px",
              color: "#2E7D32",
              border: `1px solid #2E7D32`,
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "#e9f7ef",
              },
            }}
            title="Export to Excel"
            onClick={() => {
              fileData.pageName === "standard"
                ? exportToExcel(
                    fileData.data as StandardFileDataDto[],
                    fileData.headers,
                    fileData.pageName
                  )
                : fileData.pageName === "customized"
                ? exportToExcel(
                    fileData.data as CustomizedFileDataDto[],
                    fileData.headers,
                    fileData.pageName
                  )
                : fileData.pageName === "addons"
                ? exportToExcel(
                    fileData.data as AddonsFileDataDto[],
                    fileData.headers,
                    fileData.pageName
                  )
                : exportToExcel(
                    fileData.data as ComboFileDataDto[],
                    fileData.headers,
                    fileData.pageName
                  );
            }}
            disabled={disable}
          >
            <Box
              component="img"
              src="/icons/excel.png"
              alt="icon"
              sx={{ width: 24, height: 24, mr: 1 }}
            />
            Excel
          </Button>
          <Button
            sx={{
              textTransform: "none",
              minWidth: 0,
              height: "fit-content",
              px: 2,
              mr: 1,
              borderRadius: "8px",
              color: "#CF1F25",
              border: `1px solid #CF1F25`,
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "#f9ebea",
              },
            }}
            title="Export to Pdf"
            onClick={() => {
              fileData.pageName === "standard"
                ? exportToPdf(
                    fileData.data as StandardFileDataDto[],
                    fileData.headers,
                    fileData.pageName
                  )
                : fileData.pageName === "customized"
                ? exportToPdf(
                    fileData.data as CustomizedFileDataDto[],
                    fileData.headers,
                    fileData.pageName
                  )
                : fileData.pageName === "addons"
                ? exportToPdf(
                    fileData.data as AddonsFileDataDto[],
                    fileData.headers,
                    fileData.pageName
                  )
                : exportToPdf(
                    fileData.data as ComboFileDataDto[],
                    fileData.headers,
                    fileData.pageName
                  );
            }}
            disabled={disable}
          >
            <Box
              component="img"
              src="/icons/pdf.png"
              alt="icon"
              sx={{ width: 24, height: 24, mr: 1 }}
            />
            Pdf
          </Button>
        </Stack>
      </Box>
    </Popover>
  );
};
export default ExportModal;
