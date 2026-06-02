export default function MainImage({ product }: { product: any }) {
    return (
        <img
            src={product.image}
            alt={product.name}
            className="m-20 h-98 w-90 rounded drop-shadow-[10px_10px_0_rgba(89,61,197,0.75)]"
        />
    );
}
