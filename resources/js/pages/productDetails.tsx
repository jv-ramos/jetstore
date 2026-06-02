import { usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ProductDetailsContainer from '../components/custom/product-details-container';
import { fetchProductById } from '../services/api';

function handleAddToCart(productId: string, counter: number) {
    router.post('/cart/add', {
        product_id: productId,
        cart_item_qt: counter,
    });
}

export default function ProductDetails() {
    const { auth } = usePage().props;
    const { product } = usePage().props;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productFound, setProductFound] = useState(null);
    const [fakeApiProductFound, setfakeApiProductFound] = useState(null);
    const [counter, setCounter] = useState(1);

    function handleCounter(operation: boolean) {
        if (operation) {
            setCounter((prev) => prev + 1);
        } else {
            setCounter((prev) => (prev > 1 ? prev - 1 : 1));
        }
    }

    useEffect(() => {
        async function loadProduct(productId: string): Promise<void> {
            setLoading(true);
            setError(null);

            try {
                const data = product;
                const fakeApiProduct = await fetchProductById(productId);

                setProductFound(data);
                setfakeApiProductFound(fakeApiProduct);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        }
        loadProduct(product.id);
    }, [product.id]);

    return (
        <ProductDetailsContainer handleAddToCart={handleAddToCart} auth={auth} productFound={productFound} fakeApiProductFound={fakeApiProductFound} counter={counter} handleCounter={handleCounter} error={error} loading={loading} />
    );
}
