import type { estimationDataType } from "../../types/estimationPdf";
import Signature from "../../assets/bramha_signature.jpeg";

export const estimationData: estimationDataType = {
  customer: {
    name: "M/S.RAYAL NUTS",
    address: "Chennai",
    phone: "6383954467",
    gst: "INC64387GK76",
  },
  refNo: "SBI/QUO/0326",
  date: "23/05/2024",
  items: [
    {
      sNo: 1,
      productName: "DISPLAY COUNTER NORMAL (CORIAN FINISH) 48 INCH",
      code: "10532",
      specification: `Size: 48Inch L X 26Inch B X 48Inch H
Specification: Inner frame work by quality stainless steel 304 grade pipes. Bottom & side paneling by 6mm corian sheet. Glass paneling by 8mm and 6mm toughned glass. Display top by 12mm corian. It consist of 3 Shelves with aluminium sliding door. It is mounted on leg bushes.`,
      unitPrice: 64000.0,
      quantity: 2,
      total: 128000.0,
    },
  ],
  discount: 8000.0,
  cgstRate: 9,
  sgstRate: 9,
  bankDetails: {
    unitName: "SRI BRAMHA COMMERCIAL",
    bankName: "CITY UNION BANK",
    branchName: "Pappakurichi, kattur",
    accountNo: "510909010137075",
    accountType: "Current account",
    micr: "641054025",
    ifsc: "CIUB0000441",
  },
  signatureImageUrl: Signature,
};
