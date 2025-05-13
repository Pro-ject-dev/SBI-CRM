import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { TabBar } from "../../types/tabBar";
import type { JSX } from "react";

const CustomTabs = ({
  tabItems,
  handleTabChange,
  activeTab,
}: {
  tabItems: TabBar[];
  handleTabChange: (id: string, index: number) => void;
  activeTab: string;
}) => {
  const colors = {
    bgGray100: "#f3f4f6",
    textGray600: "#4b5563",
    textGray900: "#111827",
    bgSlate700: "#334155",
    textWhite: "#ffffff",
  };

  const shadowMd =
    "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          borderRadius: "9999px",
          backgroundColor: colors.bgGray100,
          p: 0.5,
        }}
      >
        {tabItems.map((tab, index) => (
          <Button
            key={tab.id}
            onClick={() => handleTabChange(tab.id, index)}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: "9999px",
              fontSize: "0.875rem",
              fontWeight: 500,
              textTransform: "none",
              transition: "all 0.2s ease-in-out",
              minWidth: "auto",
              lineHeight: "1.25rem",

              ...(activeTab === tab.id
                ? {
                    backgroundColor: colors.bgSlate700,
                    color: colors.textWhite,
                    boxShadow: shadowMd,
                    "&:hover": {
                      backgroundColor: colors.bgSlate700,
                    },
                  }
                : {
                    color: colors.textGray600,
                    backgroundColor: "transparent",
                    "&:hover": {
                      color: colors.textGray900,
                      backgroundColor: "transparent",
                    },
                  }),
            }}
          >
            {tab.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default CustomTabs;
