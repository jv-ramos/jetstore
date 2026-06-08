import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import DashboardContainer from '@/components/custom/dashboard-container';
import { dashboard as routeDashboard } from '@/routes';

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productsList, setProductsList] = useState([]);
    const [promotionsList, setPromotionsList] = useState([]);
    const [randomizedProducts, setRandomizedProducts] = useState([]);
    const { products } = usePage().props;
    const { promotions } = usePage().props;

    useEffect(() => {
        async function loadProducts(): Promise<void> {
            setLoading(true);
            setError(null);

            try {
                const data = products.data.slice();
                setProductsList(data);

                const promoData = promotions.data.slice();
                setPromotionsList(promoData);

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

    return (
        <DashboardContainer loading={loading} error={error} productsList={productsList} promotionsList={promotionsList} randomizedProducts={randomizedProducts} />
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: routeDashboard(),
        },
    ],
};
