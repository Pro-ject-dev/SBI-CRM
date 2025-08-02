import AddonsForm from "../../features/admin/AddonsForm";
import AddonsProductManagement from "../../features/admin/AddonsProductManagement";
import BanksForm from "../../features/admin/BanksForm";
import ComboMappingManagement from "../../features/admin/ComboMappingManagement";
import CombosMappingForm from "../../features/admin/CombosMappingForm";
import CustomizedForm from "../../features/admin/CustomizedForm";
import CustomizedProductManagement from "../../features/admin/CustomizedProductManagement";
import StandardForm from "../../features/admin/StandardForm";
import StandardProductManagement from "../../features/admin/StandardProductManagement";
import TermsForm from "../../features/admin/TermsForm";
import type { TabBar } from "../../types/tabBar";

export const masterFormTabItems: TabBar[] = [
  {
    id: "standard",
    label: "Standard Products",
    component: StandardForm,
  },
  {
    id: "customized",
    label: "Customized Products",
    component: CustomizedForm,
  },
  { id: "addons", label: "Add-ons Products", component: AddonsForm },
  {
    id: "combosmapping",
    label: "Combos Mapping",
    component: CombosMappingForm,
  },
  { id: "banks", label: "Banks", component: BanksForm },
  { id: "terms", label: "Terms", component: TermsForm },
];

export const productManagementTabItems: TabBar[] = [
  {
    id: "standard",
    label: "Standard Products",
    component: StandardProductManagement,
  },
  {
    id: "customized",
    label: "Customized Products",
    component: CustomizedProductManagement,
  },
  {
    id: "addons",
    label: "Add-ons Products",
    component: AddonsProductManagement,
  },
  {
    id: "combo",
    label: "Combo Mapping",
    component: ComboMappingManagement,
  },
];
