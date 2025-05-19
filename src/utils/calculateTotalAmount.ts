export const calculateTotalAmount = (gst: string, rate: string) => {
  return Number(rate) + (Number(rate) * Number(gst)) / 100;
};
