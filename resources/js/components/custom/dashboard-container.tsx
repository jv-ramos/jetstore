import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Skeleton } from '@/components/ui/skeleton';
import MainCarousel from './mainCarousel';
import Modal from './modal';

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
    const [isModalOpen, setIsModalOpen] = useState(true);
    const modalData = {
        title: 'Welcome to the Dashboard',
        note: 'This is a work in progress',
        body: 'This application is an academic prototype, not a commercial product, and is intended solely for demonstration and learning purposes.',
        comment: 'This project was developed as a hands-on study encompassing multiple domains of modern software engineering. It explores full-stack development with PHP and the Laravel framework, RESTful API design, and microservices architecture with independent, loosely coupled services communicating via well-defined interfaces. The project also covers cloud deployment strategies, API Gateway configuration for routing, authentication, and rate limiting, as well as integration with third-party payment systems and financial APIs. Additional topics include containerization, CI/CD pipelines, and scalable infrastructure provisioning — reflecting real-world practices adopted across the industry.',
    };

    return (
        <>
            <Head title="Dashboard" />
            <Modal
                children={modalData}
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
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
