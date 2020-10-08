
/** RETURN PRICE WITH DISCOUNT */
export function applyDiscount(price: number, discount: number): number {
  return (1 - (discount || 0)/100) * price;
}