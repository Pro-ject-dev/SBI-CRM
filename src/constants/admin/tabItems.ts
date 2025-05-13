import AddonsForm from "../../features/admin/AddonsForm";
import BanksForm from "../../features/admin/BanksForm";
import CombosMappingForm from "../../features/admin/CombosMappingForm";
import CustomizedProductsForm from "../../features/admin/CustomizedProductsForm";
import StandardProductsForm from "../../features/admin/StandardProductsForm";
import TermsForm from "../../features/admin/TermsForm";
import type { TabBar } from "../../types/tabBar";

export const masterFormTabItems: TabBar[] = [
  {
    id: "standard",
    label: "Standard Products",
    component: StandardProductsForm,
  },
  {
    id: "customized",
    label: "Customized Products",
    component: CustomizedProductsForm,
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
