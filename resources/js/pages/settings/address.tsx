import { Form, Head, Link, usePage } from '@inertiajs/react';
import AddressController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/profile';

export default function Address() {
    const { auth } = usePage().props;

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
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="CEP">CEP</Label>

                                <Input
                                    id="CEP"
                                    type="CEP"
                                    className="mt-1 block w-full"
                                    // defaultValue={.CEP}
                                    name="CEP"
                                    required
                                    autoComplete="CEP"
                                    placeholder="CEP address"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.CEP}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="city">City</Label>

                                <Input
                                    id="city"
                                    type="city"
                                    className="mt-1 block w-full"
                                    // defaultValue={.city}
                                    name="city"
                                    required
                                    autoComplete="city"
                                    placeholder="Somewhereopolis"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.city}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="street">Street</Label>

                                <Input
                                    id="street"
                                    type="street"
                                    className="mt-1 block w-full"
                                    // defaultValue={.street}
                                    name="street"
                                    required
                                    autoComplete="street"
                                    placeholder="Nowhere street"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.street}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="number">Number</Label>

                                <Input
                                    id="number"
                                    type="number"
                                    className="mt-1 block w-full"
                                    // defaultValue={.number}
                                    name="number"
                                    required
                                    autoComplete="number"
                                    placeholder="404"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.number}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="complement">Complement</Label>

                                <Input
                                    id="complement"
                                    type="complement"
                                    className="mt-1 block w-full"
                                    // defaultValue={.complement}
                                    name="complement"
                                    required
                                    autoComplete="complement"
                                    placeholder="apto 42"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.complement}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    data-test="update-profile-button"
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
        {
            title: 'Address settings',
            href: edit(),
        },
    ],
};

