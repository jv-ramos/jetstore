import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import VerticalCarousel from '@/components/custom/verticalCarousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';
import CounterButton from './counterButton';
import MainImage from './main-image';
import MiniatureImage from './miniature-image';
import { StarRating } from './starRating';

const pageIcons: NavItem[] = [
    {
        title: 'Add to Favorites',
        href: '#',
        icon: Heart,
    },
];

export default function ProductDetailsContainer({
    handleAddToCart,
    auth,
    productFound,
    fakeApiProductFound,
    counter,
    handleCounter,
    error,
    loading,
}: {
    handleAddToCart: (productId: string, counter: number) => void;
    auth: any;
    productFound: any;
    fakeApiProductFound: any;
    counter: number;
    handleCounter: (operation: boolean) => void;
    error: any;
    loading: boolean;
}) {
    return (
        <Card className="w-full border-0 bg-transparent">
            <CardContent className="p-0">
                {productFound && fakeApiProductFound ? (
                    <>
                        <div className="mb-4 flex max-h-[80vh] flex-row overflow-hidden p-4">
                            <div>
                                {/* Miniature images and MainImage */}
                                <div className="mb-4 flex w-max flex-row overflow-hidden py-10 pr-6">
                                    <VerticalCarousel>
                                        {loading ? (
                                            <Skeleton className="h-10 w-10 rounded" />
                                        ) : (
                                            <MiniatureImage
                                                product={productFound}
                                            />
                                        )}
                                    </VerticalCarousel>

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
                                                        <item.icon
                                                            className="h-8 w-8"
                                                            strokeWidth={1.2}
                                                        />
                                                    )}
                                                </a>
                                            ))}
                                        </span>
                                        <MainImage product={productFound} />
                                        <span className="relative left-28 flex before:absolute before:bottom-[0] before:h-[80px] before:w-[320px] before:scale-y-[0.4] before:rounded-[200px] before:bg-black/38 before:blur-md before:content-['']"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="m-10 flex flex-col items-start justify-between pb-4">
                                <div>
                                    <h1 className="mb-4 text-2xl font-bold">
                                        {productFound.name}
                                    </h1>
                                    <div className="mb-4 flex items-center gap-2">
                                        <StarRating
                                            rating={
                                                fakeApiProductFound.rating
                                                    ?.rate || 0
                                            }
                                            size={14}
                                            className="mb-2"
                                        />
                                        <span className="text-sm text-gray-700">
                                            {' '}
                                            {productFound.rating?.rate.toFixed(
                                                1,
                                            ) || '0.0'}{' '}
                                            ({productFound.rating?.count || 0}{' '}
                                            reviews)
                                        </span>
                                    </div>
                                    <p className="text-lg font-semibold">
                                        ${productFound.amount}
                                    </p>
                                    <p className="mb-2 text-gray-700">
                                        {productFound.description}
                                    </p>
                                </div>
                                <div className="mt-4 flex w-full items-center">
                                    <CounterButton
                                        buttonId={productFound.id}
                                        counter={counter}
                                        handleCounter={handleCounter}
                                    />
                                    <Button
                                        variant="outline"
                                        className="bg-purple ml-4 w-full hover:bg-[#ae6ff7]"
                                        onClick={() => {
                                            handleAddToCart(
                                                productFound.id,
                                                counter,
                                            );

                                            if (auth.user) {
                                                toast('Product added to cart!');
                                            }
                                        }}
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
                        <div className="mt-4 ml-18 flex flex-col items-start justify-between pb-4">
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
