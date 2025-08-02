export const textDate = (date: string) => {
  const [day, month, year] = date.split("-");
  const formattedDate = new Date(`${year}-${month}-${day}`);

  const result = formattedDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return result;
};
