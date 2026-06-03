import { useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import CheckoutContainer from '@/components/custom/checkout-container';

export default function Checkout() {
    const { auth } = usePage().props;
    const { address, cart } = auth;

    const [cepError, setCepError] = useState('');
    const [loadingCep, setLoadingCep] = useState(false);

    const numberRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        CEP: address?.CEP ?? '',
        state: address?.state ?? '',
        city: address?.city ?? '',
        street: address?.street ?? '',
        neighbourhood: address?.neighbourhood ?? '',
        number: address?.number ?? '',
        complement: address?.complement ?? '',
        card_number: '',
        cvv: '',
    });

    async function handleCepBlur(e) {
        const raw = e.target.value.replace(/\D/g, '');

        if (raw.length !== 8) {
            setCepError('CEP deve conter 8 dígitos.');

            return;
        }

        setCepError('');
        setLoadingCep(true);

        try {
            const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
            const json = await res.json(); // renomeia para não conflitar com `data` do useForm

            if (json.erro) {
                setCepError('CEP não encontrado.');

                return;
            }

            setData((prev) => ({
                ...prev,
                state: json.uf ?? prev.state,
                city: json.localidade ?? prev.city,
                neighbourhood: json.bairro ?? prev.neighbourhood,
                street: json.logradouro ?? prev.street,
            }));

            numberRef.current?.focus();
        } catch {
            setCepError('Erro ao buscar CEP. Tente novamente.');
        } finally {
            setLoadingCep(false);
        }
    }

    function formatCep(e) {
        const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
        e.target.value =
            digits.length > 5
                ? `${digits.slice(0, 5)}-${digits.slice(5)}`
                : digits;
    }

    function handleMultiply(
        amount: any,
        quantities: any,
        productQuantity: any,
    ): any {
        return amount * (quantities ?? productQuantity);
    }

    return (
        <CheckoutContainer
            cart={cart}
            data={data}
            setData={setData}
            post={post}
            processing={processing}
            errors={errors}
            cepError={cepError}
            loadingCep={loadingCep}
            handleCepBlur={handleCepBlur}
            formatCep={formatCep}
        />
    );
}

Checkout.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/' },
        { title: 'Cart', href: '/cart' },
        { title: 'Checkout', href: '/checkout' },
    ],
};
