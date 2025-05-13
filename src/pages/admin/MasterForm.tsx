import { Box } from "@mui/material";
import { masterFormTabItems } from "../../constants/admin/tabItems";
import CustomTabs from "../../components/UI/CustomTabs";
import { useState, type JSX } from "react";

const MasterForm = () => {
  const tabItems = masterFormTabItems;
  const [activeTab, setActiveTab] = useState<string>(tabItems[0]?.id);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleTabChange = (id: string, index: number) => {
    setActiveTab(id);
    setActiveIndex(index);
  };
  return (
    <Box>
      <CustomTabs
        tabItems={tabItems}
        handleTabChange={handleTabChange}
        activeTab={activeTab}
      />
      <Box>{tabItems[activeIndex]?.component()}</Box>
    </Box>
  );
};

export default MasterForm;
