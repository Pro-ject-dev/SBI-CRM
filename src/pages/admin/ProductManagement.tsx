import { useEffect, useState } from "react";
import { productManagementTabItems } from "../../constants/admin/tabItems";
import { Box } from "@mui/material";
import CustomTabs from "../../components/UI/CustomTabs";

const ProductManagement = () => {
  const tabItems = productManagementTabItems;
  const [activeTab, setActiveTab] = useState<string>(tabItems[0]?.id);
  const [ActiveComponent, setActiveComponent] =
    useState<React.ElementType | null>(
      () =>
        tabItems.find((tab) => tab.id === tabItems[0]?.id)?.component || null
    );

  const handleTabChange = (id: string) => {
    setActiveTab(id);
  };

  useEffect(() => {
    if (!activeTab) {
      setActiveComponent(null);
      return;
    }
    const selectedTab = tabItems.find((obj) => obj.id === activeTab);
    setActiveComponent(() => selectedTab?.component || null);
  }, [activeTab, tabItems]);

  return (
    <Box>
      <CustomTabs
        tabItems={tabItems}
        handleTabChange={handleTabChange}
        activeTab={activeTab}
      />
      <Box>{ActiveComponent && <ActiveComponent />}</Box>
    </Box>
  );
};

export default ProductManagement;
