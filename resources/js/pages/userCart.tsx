import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import UserCartContainer from '../components/custom/user-cart-container';

export default function UserCart() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [products, setProducts] = useState([]);
    const { auth } = usePage().props;
    const { cart } = auth;

    useEffect(() => {
        console.log(cart);

        if (cart?.items) {
            const initial: Record<number, number> = {};
            cart.items.forEach((item: any) => {
                initial[item.id] = item.cart_item_qt;
            });
            setQuantities(initial);
            setProducts(cart.items);
        }
    }, [cart]);

    function handleUpdateCart(products: any[]) {
        if (isCheckingOut) {
            return;
        }

        setIsCheckingOut(true);

        const items = products.map((product) => ({
            product_id: product.product_id,
            cart_item_qt: quantities[product.id] ?? product.cart_item_qt,
        }));

        router.patch(
            '/cart/update-bulk',
            { items },
            {
                onError: () => setIsCheckingOut(false),
            },
        );
    }

    function handleRemoveItemFormCart(product: any): void {
        router.delete(`/cart/remove/${product.product_id}`);
    }

    function handleCheckout(products: any[]) {
        handleUpdateCart(products);
    }

    function handleCounter(operation: boolean, buttonId: number) {
        setQuantities((prev) => ({
            ...prev,
            [buttonId]: operation
                ? (prev[buttonId] ?? 1) + 1
                : Math.max(1, (prev[buttonId] ?? 1) - 1),
        }));
        setTimeout(() => {
            router.patch(`/cart/update/${buttonId}`, {
                quantity: quantities,
            });
        }, 5000);
    }

    function handleMultiply(
        amount: any,
        quantities: any,
        productQuantity: any,
    ): any {
        return amount * (quantities ?? productQuantity);
    }

    function handleTotalAndFix(products: any, quantities: any): any {
        return products
            .reduce(
                (total: any, product: any) =>
                    total +
                    handleMultiply(
                        product.product.amount,
                        quantities[product.id],
                        product.cart_item_qt,
                    ),
                0,
            )
            .toFixed(2);
    }

    return (
        <UserCartContainer
            loading={loading}
            error={error}
            quantities={quantities}
            isCheckingOut={isCheckingOut}
            products={products}
            handleRemoveItemFormCart={handleRemoveItemFormCart}
            handleCheckout={handleCheckout}
            handleCounter={handleCounter}
            handleTotalAndFix={handleTotalAndFix}
            handleMultiply={handleMultiply}
        />
    );
}
UserCart.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/' },
        { title: 'Cart', href: '/cart' },
    ],
};
