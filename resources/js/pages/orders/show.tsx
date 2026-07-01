import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import OrderDetailsContainer from '@/components/custom/order-details-container';
import { fetchProductById } from '@/services/api';

export default function OrderDetails() {
    const { order } = usePage().props as any;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productFound, setProductFound] = useState(null);
    const [fakeApiProductFound, setfakeApiProductFound] = useState(null);
    // const [productFound, setProductFound] = useState(null);
    // const [fakeApiProductFound, setfakeApiProductFound] = useState(null);
    // const [counter, setCounter] = useState(1);

    useEffect(() => {
        async function loadProduct(productId: string): Promise<void> {
            setLoading(true);
            setError(null);

            try {
                const data = order.order_items;
                const fakeApiProduct = await fetchProductById(
                    data[0].product_id,
                );

                setProductFound(data[0].product);
                setfakeApiProductFound(fakeApiProduct);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        }
        loadProduct(order.order_items[0].product_id);
    }, [order.order_items[0].product_id]);

    return (
        <OrderDetailsContainer
            productFound={productFound}
            fakeApiProductFound={fakeApiProductFound}
            error={error}
            loading={loading}
        />
    );
}
