import { usePage } from '@inertiajs/react';

export default function OrderShow() {
    const { auth } = usePage().props;
    const { order } = auth;

    return (
        <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
            <div className="relative mb-4 min-h-[40vh] flex-1 overflow-hidden rounded-xl md:min-h-min dark:border-sidebar-border">
                <p className="absolute inset-0 m-auto text-center text-lg font-medium text-neutral-500 dark:text-neutral-400">
                    {order || 'You have no orders yet.'}
                </p>
            </div>
        </div>
    );
}
