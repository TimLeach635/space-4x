export const populationStyleFormat = (n: number): string => {
  const nf = Intl.NumberFormat("en-GB", {
    useGrouping: true,
  });

  const parts = nf.formatToParts(n);

  const size = parts.filter(part => part.type === "group").length;

  const sizeMap = {
    0: "",
    1: "k",
    2: "m",
    3: "b",
    4: "t",
  }

  if (size > 4) {
    console.warn(`Attempted to format number ${n} which is more than 999 trillion!`);
    return nf.format(n);
  }

  const mostSignificantGroup = parts.filter(part => part.type === "integer")[0].value;

  return mostSignificantGroup + sizeMap[size];
};
