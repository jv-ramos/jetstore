export default function Subtotal({ products, quantities } : { products: any, quantities: Record<number, number>}) {
    if (!products.items) {
        return 0.0;
    }

    let quantity = 0;
    let subtotal = 0;
    products.items.map((item : any) => {
        quantity += quantities[item.id] ?? item.cart_item_qt;

        subtotal += quantity * item.product.amount;
    });

    return subtotal.toFixed(2);
}
