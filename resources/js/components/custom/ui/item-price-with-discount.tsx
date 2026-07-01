export default function ItemPriceWithDiscount({ product }: { product: any }) {
    return (
        <p className="text-lg font-semibold">
            ${product.amount}
            {product.promotions && product.promotions.length > 0 && (
                <span className="pl-1 text-left text-xs text-gray-500 line-through">
                    {(
                        product.amount /
                        ((100 -
                            Number(product.promotions[0].discount_percentage)) /
                            100)
                    ).toFixed(2)}
                </span>
            )}
        </p>
    );
}
