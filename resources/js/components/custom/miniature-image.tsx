export default function MiniatureImage({ product }: { product: any }) {
    return (
        <img
            src={product.image}
            alt={product.name}
            className="min-h-10 min-w-10 rounded"
        />
    );
}
