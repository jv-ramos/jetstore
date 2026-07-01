export default function ItemPrice({
    product,
    quantity,
}: {
    product: any;
    quantity?: number;
}) {
    return product.promotions && product.promotions.length > 0
        ? (
              product.amount /
              ((100 - Number(product.promotions[0].discount_percentage)) / 100)
          ).toFixed(2)
        : product.amount.toFixed(2) * (quantity ?? 1);
}
