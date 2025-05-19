export const calculateTotalAmount = (gst: string, rate: string) => {
  console.log("Rate Gst: ", rate, gst);
  return Number(rate) + (Number(rate) * Number(gst)) / 100;
};
