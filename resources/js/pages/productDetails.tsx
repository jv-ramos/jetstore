import { usePage } from '@inertiajs/react';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import CounterButton from '@/components/custom/counterButton';
import VerticalCarousel from '@/components/custom/verticalCarousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';
import { StarRating } from '../components/custom/starRating';
import { fetchProductById } from '../services/api';

const pageIcons: NavItem[] = [
    {
        title: 'Add to Favorites',
        href: '#',
        icon: Heart,
    },
];

const miniatureImage = (product: any) => {
    return (
        <img
            src={product.image}
            alt={product.name}
            className="min-h-10 min-w-10 rounded"
        />
    );
};

function MainImage({ product }: { product: any }) {
    return (
        <div className="relative rounded-xl border-1 bg-(--cards-color) p-4 shadow-[0_20px_20px_rgba(0,0,0,0.38)] dark:bg-(--dark-cards-color)">
            <span>
                {pageIcons.map((item) => (
                    <a
                        key={item.title}
                        href={toUrl(item.href)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-300 hover:text-(--purple-color) dark:text-[#2b2b2b] dark:hover:text-(--purple-color)"
                    >
                        {item.icon && (
                            <item.icon className="h-8 w-8" strokeWidth={1.2} />
                        )}
                    </a>
                ))}
            </span>
            <img
                src={product.image}
                alt={product.name}
                className="m-20 h-98 w-90 rounded drop-shadow-[10px_10px_0_rgba(89,61,197,0.75)]"
            />
            <span className="relative left-28 flex before:absolute before:bottom-[0] before:h-[80px] before:w-[320px] before:scale-y-[0.4] before:rounded-[200px] before:bg-black/38 before:blur-md before:content-['']"></span>
        </div>
    );
}

export default function ProductDetails() {
    const { url } = usePage();

    const productId = url.split('/').pop();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState(null);
    const [counter, setCounter] = useState(1);
    console.log('Counter state:', counter);

    function handleCounter(operation: boolean) {
        if (operation) {
            setCounter((prev) => prev + 1);
            console.log('Counter incremented:', counter + 1);
        } else {
            setCounter((prev) => (prev > 1 ? prev - 1 : 1));
        }
    }

    useEffect(() => {
        async function loadProduct(productId: string): Promise<void> {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchProductById(productId);
                setProduct(data);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        }
        loadProduct(productId);
    }, [productId]);

    return (
        <Card className="w-full border-0 bg-transparent">
            <CardContent className="p-0">
                {product ? (
                    <>
                        <div className="mb-4 flex max-h-[80vh] flex-row overflow-hidden p-4">
                            <div>
                                {/* Miniature images and MainImage */}
                                <div className="mb-4 flex w-max flex-row overflow-hidden py-10 pr-6">
                                    <VerticalCarousel>
                                        {loading ? (
                                            <Skeleton className="h-10 w-10 rounded" />
                                        ) : (
                                            miniatureImage(product)
                                        )}
                                    </VerticalCarousel>

                                    <MainImage product={product} />
                                </div>
                            </div>

                            <div className="m-10 flex flex-col items-start justify-between pb-4">
                                <div>
                                    <h1 className="mb-4 text-2xl font-bold">
                                        {product.title}
                                    </h1>
                                    <div className="mb-4 flex items-center gap-2">
                                        <StarRating
                                            rating={product.rating?.rate || 0}
                                            size={14}
                                            className="mb-2"
                                        />
                                        <span className="text-sm text-gray-700">
                                            {' '}
                                            {product.rating?.rate.toFixed(1) ||
                                                '0.0'}{' '}
                                            ({product.rating?.count || 0}{' '}
                                            reviews)
                                        </span>
                                    </div>
                                    <p className="text-lg font-semibold">
                                        ${product.price}
                                    </p>
                                    <p className="mb-2 text-gray-700">
                                        {product.description}
                                    </p>
                                </div>
                                <div className="mt-4 flex w-full items-center">
                                    <CounterButton
                                        counter={counter}
                                        handleCounter={handleCounter}
                                    />
                                    <Button
                                        variant="outline"
                                        className="bg-purple ml-4 w-full hover:bg-[#ae6ff7]"
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : error ? (
                    <p className="text-red-500">
                        Error loading product details.
                    </p>
                ) : (
                    <div className="mt-10 mb-4 flex max-h-[80vh] flex-row overflow-hidden p-4">
                        <div>
                            <div className="mr-4 flex h-[642px] w-[100px] flex-col gap-4 overflow-hidden">
                                {[...Array(6)].map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        className="h-48 w-full rounded-lg"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="relative rounded-xl border-1 bg-(--cards-color) p-4 shadow-[0_20px_20px_rgba(0,0,0,0.38)] dark:bg-(--dark-cards-color)">
                            <Skeleton className="m-20 h-98 w-90 rounded" />
                            <span className="relative left-28 flex before:absolute before:bottom-[0] before:h-[80px] before:w-[320px] before:scale-y-[0.4] before:rounded-[200px] before:bg-black/38 before:blur-md before:content-['']"></span>
                        </div>
                        <div className="ml-18 mt-4 flex flex-col items-start justify-between pb-4">
                            <div>
                                <Skeleton className="mb-1 h-6 w-80 rounded" />
                                <Skeleton className="mb-4 h-6 w-20 rounded" />
                                <div className="mb-4 flex items-center gap-2">
                                    <Skeleton className="h-4 w-20 rounded" />
                                    <Skeleton className="h-4 w-30 rounded" />
                                </div>
                                <Skeleton className="mb-2 h-6 w-15 rounded text-lg font-semibold" />
                                <Skeleton className="mb-2 h-4 w-full rounded" />
                                <Skeleton className="mb-2 h-4 w-full rounded" />
                                <Skeleton className="mb-2 h-4 w-full rounded" />
                                <Skeleton className="mb-2 h-4 w-full rounded" />
                                <Skeleton className="mb-2 h-4 w-full rounded" />
                                <Skeleton className="mb-2 h-4 w-full rounded" />
                            </div>
                            <div className="mt-4 flex w-full items-center">
                                <CounterButton
                                    counter={counter}
                                    handleCounter={() => {}}
                                />
                                <Button
                                    variant="outline"
                                    className="bg-purple ml-4 w-full hover:bg-[#ae6ff7]"
                                    disabled
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
