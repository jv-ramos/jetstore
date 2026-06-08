import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Skeleton } from '@/components/ui/skeleton';
import MainCarousel from './mainCarousel';

export default function DashboardContainer({
    loading,
    error,
    productsList,
    promotionsList,
    randomizedProducts,
}: {
    loading: boolean;
    error: string | null;
    productsList: any[];
    promotionsList: any[];
    randomizedProducts: any[];
}) {
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
                        <a href="/products" className="text-sm text-[#ae6ff7]">
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
                        <MainCarousel array={productsList} />
                    )}
                </div>

                {/* Best Selling Section */}
                <div className="space-y-4">
                    <span className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Best Selling</h1>
                        <a
                            href="/best-selling"
                            className="text-sm text-[#ac6ff7]"
                        >
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
                        <MainCarousel array={randomizedProducts} />
                    )}
                </div>

                {/* Promotions */}
                <div className="space-y-4">
                    <span className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Promotions</h1>
                        <a
                            href="/promotions"
                            className="text-sm text-[#ac6ff7]"
                        >
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
                        <MainCarousel array={promotionsList} />
                    )}
                </div>
            </div>
        </>
    );
}
