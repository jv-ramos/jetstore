import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
});

export const fetchProducts = async (query : string, page : number = 1): Promise<any> => {
    try {
        const response = await api.get('/products', {
            params: {
                // api_key: API_KEY,
                query,
                page,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

export const fetchProductById = async (productId : number): Promise<any> => {
    try {
        const response = await api.get('/products/' + productId);
        console.log('Fetched product by ID:', response.data);

        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
    }
}
