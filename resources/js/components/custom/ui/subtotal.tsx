export default function Subtotal({
    products,
    quantities,
}: {
    products: any;
    quantities: Record<number, number>;
}) {
    if (!products.items) {
        return 0.0;
    }

    let quantity = 0;
    let subtotal = 0;
    products.items.map((item: any, index: any) => {
        quantity = quantities[item.id] ?? item.cart_item_qt;
        subtotal += quantity * item.product.amount;

        if (products.promotion) {
            if (!products['promotion'][index]) {
                return;
            }

            subtotal = subtotal * ((100 - products['promotion'][index].discount_percentage) / 100);
        }
    });

    return subtotal.toFixed(2);
}
