export const formatNumber = (price) => {
  return Number(Math.round(price)).toLocaleString().split(",").join(".");
};
