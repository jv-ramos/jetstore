import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import CounterButton from '../components/custom/counterButton';

export default function UserCart() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const { auth } = usePage().props;
    const { cart } = auth;
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    useEffect(() => {
        if (cart?.items) {
            const initial: Record<number, number> = {};
            cart.items.forEach((item: any) => {
                initial[item.id] = item.quantity;
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
            quantity: quantities[product.id] ?? product.quantity,
        }));

        router.patch(
            '/cart/update-bulk',
            { items },
            {
                onError: () => setIsCheckingOut(false),
            },
        );
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
    }

    return (
        <div className="flex h-full w-full flex-1 flex-col rounded-xl p-4">
            <h1 className="text-2xl font-bold">My Cart</h1>
            <Card className="w-full border-0 bg-transparent">
                <CardContent className="p-0">
                    <div className="flex flex-row items-start justify-start py-4 pl-8">
                        <p className="mr-[18rem]">Product</p>
                        <p className="mr-[2.4rem] ml-[1.6rem]">Price</p>
                        <p className="mr-[3.8rem] ml-[1.4rem]">Quantity</p>
                        <p className="ml-1">Total</p>
                    </div>
                    <div className="mb-4 flex max-h-[80vh]">
                        <div className="relative min-h-[60vh] min-w-5/8 rounded-xl border-1 bg-(--cards-color) p-4 shadow-[0_20px_20px_rgba(0,0,0,0.38)] dark:bg-(--dark-cards-color)">
                            {products.map((product: any) => (
                                <div
                                    key={product.id}
                                    className="mb-4 flex items-center justify-between"
                                >
                                    <div className="flex w-1/6 items-center justify-center">
                                        <img
                                            src={product.product.image}
                                            alt={product.product.name}
                                            className="max-h-18 max-w-18 object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]"
                                        />
                                    </div>
                                    <div className="ml-4 w-3/6">
                                        <p className="text-sm font-bold">
                                            {product.product.name?.slice(
                                                0,
                                                30,
                                            ) + '...'}{' '}
                                        </p>
                                    </div>
                                    <div className="align-center m-2 ml-4 flex w-1/6 justify-center">
                                        <p className="text-sm font-bold">
                                            ${product.product.amount}
                                        </p>
                                    </div>
                                    <div
                                        key={product}
                                        className="flex w-1/6 items-center justify-between"
                                    >
                                        <CounterButton
                                            buttonId={product.id}
                                            counter={
                                                quantities[product.id] ??
                                                product.quantity
                                            }
                                            handleCounter={handleCounter}
                                        />{' '}
                                    </div>
                                    <div className="align-center m-2 ml-4 flex w-1/6 justify-center">
                                        <p className="text-sm font-bold text-[#ae6ff7]">
                                            $
                                            {(
                                                product.product.amount *
                                                (quantities[product.id] ??
                                                    product.quantity)
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="m-6 text-sm text-gray-400">
                                        X
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mx-4 flex min-w-3/8 flex-col items-start">
                            <div className="relative flex min-h-[60vh] w-[stretch] max-w-110 flex-col justify-between rounded-xl border-1 bg-(--cards-color) p-4 p-10 shadow-[0_20px_20px_rgba(0,0,0,0.38)] dark:bg-(--dark-cards-color)">
                                <div className="flex h-[60%] flex-col items-start">
                                    <h1 className="text-2xl font-bold">
                                        Order Summary
                                    </h1>
                                    <div className="mt-4 flex w-full items-center justify-between">
                                        <p className="text-sm text-gray-400">
                                            Subtotal
                                        </p>
                                        <p className="text-sm font-bold">
                                            {products
                                                .reduce(
                                                    (total, product) =>
                                                        total +
                                                            product.product
                                                                .amount *
                                                                quantities[
                                                                    product.id
                                                                ] ??
                                                        product.quantity,
                                                    0,
                                                )
                                                .toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex w-full items-center justify-between">
                                        <p className="text-sm text-gray-400">
                                            Shipping
                                        </p>
                                        <p className="text-sm font-bold">
                                            Free
                                        </p>
                                    </div>
                                    <div className="mt-4 flex w-full items-center justify-between">
                                        <p className="text-sm text-gray-400">
                                            Tax
                                        </p>
                                        <p className="text-sm font-bold">
                                            $0.00
                                        </p>
                                    </div>
                                </div>
                                <div className="flex h-full flex-col items-center justify-between">
                                    <div className="mt-4 flex w-full items-center justify-between border-t pt-4">
                                        <p className="text-xl font-bold">
                                            Total
                                        </p>
                                        <p className="text-xl font-bold text-[#ae6ff7]">
                                            {products
                                                .reduce(
                                                    (total, product) =>
                                                        total +
                                                            product.product
                                                                .amount *
                                                                quantities[
                                                                    product.id
                                                                ] ??
                                                        product.quantity,
                                                    0,
                                                )
                                                .toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex w-full items-center justify-between">
                                        <p className="text-sm text-green-600">
                                            You save $0
                                        </p>
                                    </div>
                                    <div className="mt-4 flex w-full items-center">
                                        <Button
                                            variant="outline"
                                            className="bg-purple h-12 w-full hover:bg-[#ae6ff7]"
                                            onClick={() => {
                                                handleCheckout(products);
                                            }}
                                            disabled={isCheckingOut}
                                        >
                                            {isCheckingOut
                                                ? 'Processing...'
                                                : 'Proceed to Checkout'}
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-4 flex h-40 w-full flex-col items-center justify-between border-t">
                                    <p className="py-4 text-sm text-gray-400">
                                        We accept
                                    </p>
                                    <div className="mb-16 flex flex-row justify-center gap-4">
                                        <Skeleton className="h-8 w-16 rounded-lg" />
                                        <Skeleton className="h-8 w-16 rounded-lg" />
                                        <Skeleton className="h-8 w-16 rounded-lg" />
                                        <Skeleton className="h-8 w-16 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
