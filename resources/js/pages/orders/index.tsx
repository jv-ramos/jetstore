import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function OrderHistory() {
    const { orders } = usePage().props as any;
    const items = orders?.data ?? [];

    return (
        <div className="flex h-full w-150 flex-1 flex-col gap-6 self-center overflow-x-auto rounded-xl p-4">
            <div className="relative mb-4 min-h-[40vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                {items.length === 0 ? (
                    <p className="absolute inset-0 m-auto text-center text-lg font-medium text-neutral-500">
                        You have no orders yet.
                    </p>
                ) : (
                    <>
                        <div className="align-center m-8 flex justify-center">
                            {items.map((order: any) => (
                                <div key={order.id}>
                                    {order.order_items.map(
                                        (item: any, i: number) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="rounded-xl border-1 bg-[#f2f2f2] p-2 dark:bg-[#161616]">
                                                    <img
                                                        src={
                                                            item.product?.image
                                                        }
                                                        alt={item.product?.name}
                                                        className="h-18 w-18 object-contain"
                                                    />
                                                </div>
                                                <div className="align-center flex flex-col justify-center">
                                                    <Link
                                                        className="cursor-pointer font-extrabold text-[#ac6ff7]"
                                                        href={`/orders/${order.id}`}
                                                        prefetch
                                                    >
                                                        {item.product?.title ??
                                                            item.name}
                                                    </Link>
                                                    Qtd: {item.quantity} × R${' '}
                                                    {item.amount}
                                                    <p className="text-neutral-700">
                                                        {order.order_number} —{' '}
                                                        {order.status}
                                                    </p>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
