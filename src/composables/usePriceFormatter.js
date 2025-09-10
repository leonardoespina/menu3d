// usePriceFormatter.js
export function usePriceFormatter() {
  const formatPrice = (price) => {
    const numericPrice =
      typeof price === "string"
        ? parseFloat(price.replace(/[^0-9.]/g, ""))
        : Number(price);

    if (isNaN(numericPrice)) {
      return "Price not available";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(numericPrice);
  };
  
  return {
    formatPrice
  };
}