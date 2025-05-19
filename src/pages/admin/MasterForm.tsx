import { Box } from "@mui/material";
import { masterFormTabItems } from "../../constants/admin/tabItems";
import CustomTabs from "../../components/UI/CustomTabs";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const MasterForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const tabId = searchParams.get("tab");
  const tabItems = masterFormTabItems;
  const [activeTab, setActiveTab] = useState<string>(tabId || tabItems[0]?.id);
  const [ActiveComponent, setActiveComponent] =
    useState<React.ElementType | null>(
      () =>
        tabItems.find((tab) => tab.id === tabItems[0]?.id)?.component || null
    );

  const handleTabChange = (id: string) => {
    navigate(location.pathname, { replace: true });
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

export default MasterForm;
