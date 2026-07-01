export function itemPriceWithDiscount(
    product: any,
    quantity: any,
    promotion = null,
) {
    let result = 0;
    result = product.amount * quantity;

    if (promotion) {
        result = (
            result *
            ((100 - promotion.discount_percentage) / 100)
        ).toFixed(2);
    }

    return result;
}

export function rawSubtotal(products, quantities) {
    if (!products.items) {
        return 0.0;
    }

    let quantity = 0;
    let result = 0;

    products.items.map((item: any) => {
        quantity = quantities[item.id] ?? item.cart_item_qt;
        result += quantity * item.product.amount;
    });

    return result.toFixed(2);
}

export function subtotal(products, quantities) {
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

            subtotal =
                subtotal *
                ((100 - products['promotion'][index].discount_percentage) /
                    100);
        }
    });

    return subtotal.toFixed(2);
}
