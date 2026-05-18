import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import CounterButton from '../components/custom/counterButton';
import { fetchProducts } from '../services/api';

export default function UserCart() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [counter, setCounter] = useState(1);
    const [products, setProducts] = useState([]);
    const [randomizedProducts, setRandomizedProducts] = useState([]);

    useEffect(() => {
        async function loadProducts(): Promise<void> {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchProducts('');
                setProducts(data);

                const shuffled = [...data];

                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }

                setRandomizedProducts(shuffled);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, []);
    console.log('Randomized Products:', randomizedProducts);

    function handleCounter(operation: boolean) {
        if (operation) {
            setCounter((prev) => prev + 1);
            console.log('Counter incremented:', counter + 1);
        } else {
            setCounter((prev) => (prev > 1 ? prev - 1 : 1));
        }
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
                            {randomizedProducts
                                .slice(0, 3)
                                .map((product: any) => (
                                    <div
                                        key={product.id}
                                        className="mb-4 flex items-center justify-between"
                                    >
                                        <div className="flex w-1/6 items-center justify-center">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="max-h-18 max-w-18 object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]"
                                            />
                                        </div>
                                        <div className="ml-4 w-3/6">
                                            <p className="text-sm font-bold">
                                                {product.title?.slice(0, 30) +
                                                    '...'}{' '}
                                            </p>
                                        </div>
                                        <div className="align-center m-2 ml-4 flex w-1/6 justify-center">
                                            <p className="text-sm font-bold">
                                                ${product.price}
                                            </p>
                                        </div>
                                        <div
                                            key={product}
                                            className="flex w-1/6 items-center justify-between"
                                        >
                                            <CounterButton
                                                counter={counter}
                                                handleCounter={() => {}}
                                            />
                                        </div>
                                        <div className="align-center m-2 ml-4 flex w-1/6 justify-center">
                                            <p className="text-sm font-bold text-[#ae6ff7]">
                                                ${product.price * counter}
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
                                <div className="flex flex-col items-start h-[60%]">
                                    <h1 className="text-2xl font-bold">
                                        Order Summary
                                    </h1>
                                    <div className="mt-4 flex w-full items-center justify-between">
                                        <p className="text-sm text-gray-400">
                                            Subtotal
                                        </p>
                                        <p className="text-sm font-bold">
                                            $999.99
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
                                <div className="flex flex-col h-full items-center justify-between">
                                    <div className="mt-4 flex w-full items-center justify-between border-t pt-4">
                                        <p className="text-xl font-bold">
                                            Total
                                        </p>
                                        <p className="text-xl font-bold text-[#ae6ff7]">
                                            $999.99
                                        </p>
                                    </div>
                                    <div className="mt-4 flex w-full items-center justify-between">
                                        <p className="text-sm text-green-600">
                                            You save $100.00
                                        </p>
                                    </div>
                                    <div className="mt-4 flex w-full items-center">
                                        <Button
                                            variant="outline"
                                            className="bg-purple h-12 w-full hover:bg-[#ae6ff7]"
                                        >
                                            Proceed to Checkout
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
