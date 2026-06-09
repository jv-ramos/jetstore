import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

export default function CheckoutContainer({
    cart,
    data,
    setData,
    post,
    processing,
    errors,
    cepError,
    loadingCep,
    handleCepBlur,
    formatCep,
}) {
    return (
        <>
            <div className="flex h-full w-full flex-1 flex-col rounded-xl p-4">
                <div className="flex">
                    <h1 className="text-2xl font-bold">Checkout</h1>
                </div>
                <div className="flex flex-row items-start justify-start py-7 pl-8"></div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        post('/orders');
                    }}
                    className="space-y-6"
                >
                    <div className="flex w-full gap-4">
                        <div className="mb-4 flex max-h-[80vh] max-w-[57.8vw]">
                            <div className="relative min-h-[60vh] min-w-5/8 rounded-xl border-1 bg-(--cards-color) p-4 shadow-[0_20px_20px_rgba(0,0,0,0.38)] dark:bg-(--dark-cards-color)">
                                <div className="space-y-6 p-4">
                                    <Heading
                                        variant="small"
                                        title="Order info"
                                    />
                                    {/* name */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>

                                        <Input
                                            id="name"
                                            type="text"
                                            className="mt-1 block w-full bg-[#070707]"
                                            name="name"
                                            required
                                            placeholder="John Doe"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.name}
                                        />
                                    </div>
                                    {/* email */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>

                                        <Input
                                            id="email"
                                            type="text"
                                            className="mt-1 block w-full bg-[#070707]"
                                            name="name"
                                            required
                                            placeholder="johndoe@example.com"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.email}
                                        />
                                    </div>
                                    <div className="flex gap-8">
                                        {/* CEP */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="CEP">CEP</Label>

                                            <div className="relative">
                                                <Input
                                                    id="CEP"
                                                    name="CEP"
                                                    type="text"
                                                    inputMode="numeric"
                                                    className="mt-1 block w-full bg-[#070707]"
                                                    value={data.CEP}
                                                    onChange={(e) => {
                                                        formatCep(e);
                                                        setData(
                                                            'CEP',
                                                            e.target.value,
                                                        );
                                                    }}
                                                    onBlur={handleCepBlur}
                                                    placeholder="00000-000"
                                                    maxLength={9}
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
                                                name="state"
                                                type="text"
                                                className="mt-1 block w-full bg-[#070707]"
                                                value={data.state}
                                                onChange={(e) =>
                                                    setData(
                                                        'state',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="UF"
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
                                                name="city"
                                                type="text"
                                                className="mt-1 block w-full bg-[#070707]"
                                                value={data.city}
                                                onChange={(e) =>
                                                    setData(
                                                        'city',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Somewhereopolis"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.city}
                                            />
                                        </div>
                                    </div>

                                    {/* Street */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="street">Street</Label>

                                        <Input
                                            id="street"
                                            name="street"
                                            type="text"
                                            className="mt-1 block w-full bg-[#070707]"
                                            value={data.street}
                                            onChange={(e) =>
                                                setData(
                                                    'street',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Nowhere street"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.street}
                                        />
                                    </div>

                                    <div className="flex gap-8">
                                        {/* Neighbourhood */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="neighbourhood">
                                                Neighbourhood
                                            </Label>

                                            <Input
                                                id="neighbourhood"
                                                name="neighbourhood"
                                                type="text"
                                                className="mt-1 block w-full bg-[#070707]"
                                                value={data.neighbourhood}
                                                onChange={(e) =>
                                                    setData(
                                                        'neighbourhood',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Bairro"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.neighbourhood}
                                            />
                                        </div>

                                        {/* Number */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="number">
                                                Number
                                            </Label>

                                            <Input
                                                id="number"
                                                name="number"
                                                type="text"
                                                inputMode="numeric"
                                                className="mt-1 block w-full bg-[#070707]"
                                                value={data.number}
                                                onChange={(e) =>
                                                    setData(
                                                        'number',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="404"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.number}
                                            />
                                        </div>

                                        {/* Complement */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="complement">
                                                Complement
                                            </Label>

                                            <Input
                                                id="complement"
                                                name="complement"
                                                type="text"
                                                className="mt-1 block w-full bg-[#070707]"
                                                value={data.complement}
                                                onChange={(e) =>
                                                    setData(
                                                        'complement',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Apto 42"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.complement}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-8">
                                        {/* campos do pagamento */}
                                        <div className="grid w-2/3 gap-2">
                                            <Label htmlFor="card_number">
                                                Card Number
                                            </Label>
                                            <Input
                                                id="card_number"
                                                type="text"
                                                name="card_number"
                                                value={data.card_number}
                                                onChange={(e) =>
                                                    setData(
                                                        'card_number',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-1 block w-full bg-[#070707]"
                                            />
                                            <InputError
                                                message={errors.card_number}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="cvv">CVV</Label>
                                            <Input
                                                id="cvv"
                                                type="text"
                                                name="cvv"
                                                value={data.cvv}
                                                onChange={(e) =>
                                                    setData(
                                                        'cvv',
                                                        e.target.value,
                                                    )
                                                }
                                                className="mt-1 block w-full bg-[#070707]"
                                            />
                                            <InputError message={errors.cvv} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex min-w-3/8 flex-col items-start">
                            <div className="relative flex min-h-[60vh] w-[stretch] max-w-110 flex-col justify-between rounded-xl border-1 bg-(--cards-color) p-4 p-10 shadow-[0_20px_20px_rgba(0,0,0,0.38)] dark:bg-(--dark-cards-color)">
                                <div className="flex h-[60%] flex-col items-start justify-between">
                                    <h1 className="mb-3 text-2xl font-bold">
                                        Order Summary
                                    </h1>
                                    <div className="flex h-[min-content] w-full flex-col items-start justify-start">
                                        {cart.items.map((product: any) => (
                                            <div
                                                key={product.id}
                                                className="flex w-full items-center justify-between"
                                            >
                                                <div className="flex w-1/6 items-center justify-center">
                                                    <img
                                                        src={
                                                            product.product
                                                                .image
                                                        }
                                                        alt={
                                                            product.product.name
                                                        }
                                                        className="max-h-10 max-w-10 object-contain p-1 drop-shadow-[0_8px_12px_rgba(0,0,0,0.25)]"
                                                    />
                                                </div>
                                                <div className="ml-4 w-5/6">
                                                    <p className="text-sm font-bold">
                                                        {product.product.name?.slice(
                                                            0,
                                                            25,
                                                        ) +
                                                            (product.product
                                                                .name.length >
                                                            25
                                                                ? '...'
                                                                : '')}{' '}
                                                    </p>
                                                </div>
                                                <div className="align-center ml-4 flex w-1/6 justify-end">
                                                    <p className="text-sm font-bold">
                                                        $
                                                        {(
                                                            product.product
                                                                .amount *
                                                            product.cart_item_qt
                                                        ).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full items-center justify-between">
                                        <div className="mt-4 flex w-full items-center justify-between">
                                            <p className="text-sm text-gray-400">
                                                Subtotal
                                            </p>
                                            <p className="text-sm font-bold">
                                                ${cart.total.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="mt-4 flex w-full items-center justify-between">
                                            <p className="text-sm text-gray-400">
                                                Shipping
                                            </p>
                                            <p className="text-sm font-bold">
                                                Free
                                            </p>
                                        </div>
                                        <div className="mt-4 flex w-full items-center justify-between">
                                            <p className="text-sm text-gray-400">
                                                Tax
                                            </p>
                                            <p className="text-sm font-bold">
                                                $0.00
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex h-[min-content] flex-col items-center justify-between">
                                    <div className="mt-4 flex w-full items-center justify-between border-t pt-4">
                                        <p className="text-xl font-bold">
                                            Total
                                        </p>
                                        <p className="text-xl font-bold text-[#ae6ff7]">
                                            ${cart.total.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex w-full items-center justify-between">
                                        <p className="text-sm text-green-600">
                                            You save $0
                                        </p>
                                    </div>
                                    <div className="mt-4 flex w-full items-center">
                                        <Button
                                            variant="outline"
                                            type="submit"
                                            disabled={processing}
                                            className="bg-purple h-12 w-full hover:bg-[#ae6ff7]"
                                        >
                                            {processing
                                                ? 'Processing...'
                                                : 'Place Order'}
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-4 flex h-20 w-full flex-col items-center justify-between border-t">
                                    <p className="py-4 text-sm text-gray-400">
                                        We accept
                                    </p>
                                    <div className="mb-2 flex flex-row justify-center gap-4">
                                        <Skeleton className="h-8 w-16 rounded-lg" />
                                        <Skeleton className="h-8 w-16 rounded-lg" />
                                        <Skeleton className="h-8 w-16 rounded-lg" />
                                        <Skeleton className="h-8 w-16 rounded-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
