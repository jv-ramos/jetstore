import { usePage } from '@inertiajs/react';

export default function OrderDetails() {
    const { order } = usePage().props as any;

    console.log(order);

    return (
        <div>
            <h1>{order.order_number}</h1>
            <p>Status: {order.status}</p>
            {order.order_items?.map((item: any, i: number) => (
                <div key={i} className="flex gap-4">
                    <img src={item.product?.image} alt={item.product?.title} className="h-18 w-18 object-contain" />
                    <div>
                        <p>{item.product?.title ?? item.name}</p>
                        <p>Qtd: {item.quantity} × R$ {item.amount}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
