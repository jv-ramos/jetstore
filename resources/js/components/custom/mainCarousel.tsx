import { Link } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';

export default function MainCarousel({ array }: { array: any[] }) {
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
                    >
                        <Link href={`/products/${product.id}`} key={product.id}>
                            <Card className="h-48 border-1 bg-[#f2f2f2] dark:bg-[#161616]">
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
                                        {product.title?.slice(0, 20) + '...' ||
                                            'Loading...'}
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
