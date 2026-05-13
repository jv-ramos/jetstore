import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Skeleton } from '@/components/ui/skeleton';
import { dashboard } from '@/routes';
import { fetchProducts } from '../services/api';

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [randomizedProducts, setRandomizedProducts] = useState([]);

    useEffect(() => {
        async function loadProducts(): Promise<void> {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchProducts('');
                console.log('Fetched products:', data);
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

    const handleNavigate = (product: any) => {
        navigate(`/products/${product.id}`);
    };

    function CarrouselComponent({ array }: { array: any[] }) {
        return (
            <Carousel
                opts={{
                    align: 'start',
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {array.slice(0, 20).map((product) => (
                        <CarouselItem
                            key={product.id}
                            className="pl-2 md:basis-1/3 md:pl-4 lg:basis-1/6"
                            onClick={
                                () =>
                                    console.log(
                                        'Clicked product:',
                                        product,
                                    ) /* Placeholder for click action */
                            }
                        >
                            <Link
                                href={`/products/${product.id}`}
                                key={product.id}
                            >
                                <Card className="h-48 dark:bg-[#0f0f0f] bg-[#f2f2f2] ">
                                    <CardContent className="flex h-full flex-col p-4">
                                        {/* Container da imagem com altura fixa e sombra flutuante */}
                                        <div className="mb-3 flex h-32 w-full items-center justify-center">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="max-h-14 max-w-14 object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]"
                                                style={{
                                                    filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2))',
                                                }}
                                            />
                                        </div>

                                        {/* Título alinhado à esquerda */}
                                        <h2 className="mb-2 line-clamp-2 text-left text-xs font-semibold">
                                            {product.title?.slice(0, 20) +
                                                '...' || 'Loading...'}
                                        </h2>

                                        {/* Preço alinhado à esquerda */}
                                        <p className="text-left text-sm font-bold text-[#ae6ff7]">
                                            ${product.price}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        );
    }

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Hero/Placeholder Section */}
                <div className="relative mb-4 min-h-[40vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>

                {/* Featured Products Section */}
                <div className="space-y-4">
                    <span className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">
                            Featured Products
                        </h1>
                        <a href="#" className="text-sm text-[#ae6ff7]">
                            View all
                        </a>
                    </span>
                    {loading ? (
                        <div className="flex gap-4">
                            {[...Array(6)].map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="h-48 w-full rounded-lg"
                                />
                            ))}
                        </div>
                    ) : error ? (
                        <p className="text-red-500">Error loading products.</p>
                    ) : (
                        <CarrouselComponent array={products} />
                    )}
                </div>

                {/* Best Selling Section */}
                <div className="space-y-4">
                    <span className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Best Selling</h1>
                        <a href="#" className="text-sm text-[#ac6ff7]">
                            View all
                        </a>
                    </span>
                    {loading ? (
                        <div className="flex gap-4">
                            {[...Array(6)].map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="h-48 w-full rounded-lg"
                                />
                            ))}
                        </div>
                    ) : error ? (
                        <p className="text-red-500">Error loading products.</p>
                    ) : (
                        <CarrouselComponent array={randomizedProducts} />
                    )}
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
