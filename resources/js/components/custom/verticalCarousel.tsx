import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

export default function VerticalCarousel({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // FIX:THIS COMPONENT IS BROKEN!! HELP!!
        <Carousel
            opts={{
                align: 'start',
            }}
            orientation="vertical"
            className="mr-4 h-[642px] w-[100px] overflow-hidden"
        >
            <CarouselContent className="mt-[0.8] h-full flex-col gap-4">
                {Array.from({ length: 20 }).map((_, index) => (
                    <CarouselItem
                        key={index}
                        className="basis-1/8 gap-2 rounded-xl border-1 bg-(--cards-color) pt-1 dark:bg-(--dark-cards-color)"
                    >
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex items-center justify-center">
                                    <span className="py-[9.8px]">
                                        {children}
                                    </span>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}
