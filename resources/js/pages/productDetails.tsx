import { usePage } from '@inertiajs/react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Heart } from 'lucide-react';

import { useEffect, useState } from 'react';
// import { Skeleton } from '@/components/ui/skeleton';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card, CardContent } from '@/components/ui/card';
import { toUrl } from '@/lib/utils';
import { StarRating } from '../components/custom/starRating';

// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
// } from '@/components/ui/carousel';
import { fetchProductById } from '../services/api';

function ButtonGroupOrientation({
    counter,
    handleCounter,
}: {
    counter: number;
    handleCounter: (operation: boolean) => void;
}) {
    return (
        <ButtonGroup
            orientation="horizontal"
            aria-label="Media controls"
            className="h-fit"
        >
            <Button
                variant="outline"
                size="icon"
                className="cursor-pointer bg-(--cards-color) hover:text-[#33aa33] dark:bg-(--dark-cards-color) dark:hover:text-[#33aa33]"
                onClick={() => handleCounter(true)}
            >
                <PlusIcon />
            </Button>
            <span className="flex w-12 items-center justify-center border-1 text-lg font-semibold">
                {counter}
            </span>
            <Button
                variant="outline"
                size="icon"
                className="cursor-pointer bg-(--cards-color) hover:text-[#aa3333] dark:bg-(--dark-cards-color) dark:hover:text-[#aa3333]"
                onClick={() => handleCounter(false)}
            >
                <MinusIcon />
            </Button>
        </ButtonGroup>
    );
}

const pageIcons: NavItem[] = [
    {
        title: 'Add to Favorites',
        href: '#',
        icon: Heart,
    },
];
// function CarouselOrientation() {
//     return (
//         <Carousel
//             opts={{
//                 align: 'start',
//             }}
//             orientation="vertical"
//             className="w-full max-w-xs"
//         >
//             <CarouselContent className="-mt-1 h-[270px]">
//                 {Array.from({ length: 5 }).map((_, index) => (
//                     <CarouselItem key={index} className="basis-1/2 pt-1">
//                         <div className="p-1">
//                             <Card>
//                                 <CardContent className="flex items-center justify-center p-6">
//                                     <span className="text-3xl font-semibold">
//                                         {index + 1}
//                                     </span>
//                                 </CardContent>
//                             </Card>
//                         </div>
//                     </CarouselItem>
//                 ))}
//             </CarouselContent>
//         </Carousel>
//     );
// }

export default function ProductDetails() {
    const { url } = usePage();

    const productId = url.split('/').pop();

    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
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
        async function loadProduct(productId: number): Promise<void> {
            // setLoading(true);
            // setError(null);

            try {
                console.log('Loading product with ID:', productId);
                const data = await fetchProductById(productId);
                setProduct(data);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                // setLoading(false);
            }
        }
        loadProduct(productId);
    }, [productId]);

    const miniatureImage = (product) => {
        return (
            <div className="mx-4 mb-4 rounded-xl border-1 bg-(--cards-color) p-6 dark:bg-(--dark-cards-color)">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded"
                />
            </div>
        );
    };

    return (
        <Card className="w-full border-0 bg-transparent">
            <CardContent>
                {product ? (
                    <>
                        <div className="mb-4 flex flex-row">
                            <div>
                                <div className="mb-4 flex w-max flex-row">
                                    <div className="mt-10">
                                        {miniatureImage(product)}
                                        {miniatureImage(product)}
                                        {miniatureImage(product)}
                                        {miniatureImage(product)}
                                        {miniatureImage(product)}
                                        {miniatureImage(product)}
                                    </div>

                                    <div className="relative my-10 rounded-xl border-1 bg-(--cards-color) p-4 shadow-[0_20px_20px_rgba(0,0,0,0.38)] dark:bg-(--dark-cards-color)">
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
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="m-20 h-98 w-90 rounded drop-shadow-[10px_10px_0_rgba(89,61,197,0.75)]"
                                        />
                                        <span className="relative left-28 flex before:absolute before:bottom-[0] before:h-[80px] before:w-[320px] before:scale-y-[0.4] before:rounded-[200px] before:bg-black/38 before:blur-md before:content-['']"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="m-10">
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
                                        ({product.rating?.count || 0} reviews)
                                    </span>
                                </div>
                                <p className="text-lg font-semibold">
                                    ${product.price}
                                </p>
                                <p className="mb-2 text-gray-700">
                                    {product.description}
                                </p>
                                <div className="mt-4 flex items-center">
                                    <ButtonGroupOrientation
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
                ) : (
                    <p>Loading product details...</p>
                )}
            </CardContent>
        </Card>
    );
}
