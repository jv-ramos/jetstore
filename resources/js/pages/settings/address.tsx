import { Form, Head, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import AddressController from '@/actions/App/Http/Controllers/Settings/AddressController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit as editAddress } from '@/routes/settings/address';

export default function Address() {
    const { address } = usePage().props;

    const [cepError, setCepError] = useState('');
    const [loadingCep, setLoadingCep] = useState(false);

    const stateRef = useRef(null);
    const cityRef = useRef(null);
    const neighbourhoodRef = useRef(null);
    const streetRef = useRef(null);
    const numberRef = useRef(null);

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
            const data = await res.json();

            if (data.erro) {
                setCepError('CEP não encontrado.');
                return;
            }

            if (stateRef.current) stateRef.current.value = data.uf ?? '';
            if (cityRef.current) cityRef.current.value = data.localidade ?? '';
            if (neighbourhoodRef.current)
                neighbourhoodRef.current.value = data.bairro ?? '';
            if (streetRef.current)
                streetRef.current.value = data.logradouro ?? '';

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

    return (
        <>
            <Head title="Address settings" />

            <h1 className="sr-only">Address settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Address information"
                    description="Update your address"
                />

                <Form
                    {...AddressController.update.form()}
                    options={{ preserveScroll: true }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            {/* CEP */}
                            <div className="grid gap-2">
                                <Label htmlFor="CEP">CEP</Label>

                                <div className="relative">
                                    <Input
                                        id="CEP"
                                        type="text"
                                        inputMode="numeric"
                                        className="mt-1 block w-full"
                                        defaultValue={address.CEP}
                                        name="CEP"
                                        required
                                        autoComplete="postal-code"
                                        placeholder="00000-000"
                                        maxLength={9}
                                        onChange={formatCep}
                                        onBlur={handleCepBlur}
                                    />
                                    {loadingCep && (
                                        <span className="absolute top-1/2 right-3 -translate-y-1/2 animate-pulse text-xs text-muted-foreground">
                                            Buscando…
                                        </span>
                                    )}
                                </div>

                                <InputError
                                    className="mt-2"
                                    message={cepError || errors.CEP}
                                />
                            </div>

                            {/* State */}
                            <div className="grid gap-2">
                                <Label htmlFor="state">State</Label>

                                <Input
                                    id="state"
                                    type="text"
                                    className="mt-1 block w-full"
                                    defaultValue={address.state}
                                    name="state"
                                    required
                                    autoComplete="address-level1"
                                    placeholder="UF"
                                    ref={stateRef}
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.state}
                                />
                            </div>

                            {/* City */}
                            <div className="grid gap-2">
                                <Label htmlFor="city">City</Label>

                                <Input
                                    id="city"
                                    type="text"
                                    className="mt-1 block w-full"
                                    defaultValue={address.city}
                                    name="city"
                                    required
                                    autoComplete="address-level2"
                                    placeholder="Somewhereopolis"
                                    ref={cityRef}
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.city}
                                />
                            </div>

                            {/* Neighbourhood */}
                            <div className="grid gap-2">
                                <Label htmlFor="neighbourhood">
                                    Neighbourhood
                                </Label>

                                <Input
                                    id="neighbourhood"
                                    type="text"
                                    className="mt-1 block w-full"
                                    defaultValue={address.neighbourhood}
                                    name="neighbourhood"
                                    required
                                    autoComplete="address-level3"
                                    placeholder="Bairro"
                                    ref={neighbourhoodRef}
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.neighbourhood}
                                />
                            </div>

                            {/* Street */}
                            <div className="grid gap-2">
                                <Label htmlFor="street">Street</Label>

                                <Input
                                    id="street"
                                    type="text"
                                    className="mt-1 block w-full"
                                    defaultValue={address.street}
                                    name="street"
                                    required
                                    autoComplete="address-line1"
                                    placeholder="Nowhere street"
                                    ref={streetRef}
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.street}
                                />
                            </div>

                            {/* Number */}
                            <div className="grid gap-2">
                                <Label htmlFor="number">Number</Label>

                                <Input
                                    id="number"
                                    type="text"
                                    inputMode="numeric"
                                    className="mt-1 block w-full"
                                    defaultValue={address.number}
                                    name="number"
                                    required
                                    autoComplete="off"
                                    placeholder="404"
                                    ref={numberRef}
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.number}
                                />
                            </div>

                            {/* Complement */}
                            <div className="grid gap-2">
                                <Label htmlFor="complement">Complement</Label>

                                <Input
                                    id="complement"
                                    type="text"
                                    className="mt-1 block w-full"
                                    defaultValue={address.complement}
                                    name="complement"
                                    autoComplete="address-line2"
                                    placeholder="Apto 42"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.complement}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing || loadingCep}
                                    data-test="update-address-button"
                                >
                                    Save
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

Address.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/' },
        { title: 'Settings', href: '/settings' },
        {
            title: 'Address settings',
            href: editAddress(),
        },
    ],
};
