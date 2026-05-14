import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
    rating: number; // 0 a 5 (aceita decimais: 4.5)
    maxStars?: number; // padrão: 5
    size?: number; // tamanho em pixels
    showValue?: boolean; // mostrar número ao lado
    className?: string;
    variant?: 'default' | 'yellow' | 'purple'; // cores
}

export function StarRating({
    rating,
    maxStars = 5,
    size = 16,
    showValue = false,
    className,
    variant = 'yellow',
}: StarRatingProps) {
    // Garante que rating está entre 0 e maxStars
    const clampedRating = Math.max(0, Math.min(rating, maxStars));

    // Cores por variante
    const colors = {
        default: 'fill-foreground text-foreground',
        yellow: 'fill-yellow-400 text-yellow-400',
        purple: 'fill-[#ac6ff7] text-[#ac6ff7]',
    };

    return (
        <div className={cn('flex items-center gap-1', className)}>
            <div className="flex items-center">
                {Array.from({ length: maxStars }, (_, index) => {
                    const starValue = index + 1;
                    const fillPercentage = Math.max(
                        0,
                        Math.min(100, (clampedRating - index) * 100),
                    );

                    return (
                        <div key={index} className="relative">
                            {/* Estrela vazia (fundo) */}
                            <Star
                                className="text-muted-foreground/30"
                                size={size}
                                strokeWidth={1.5}
                            />

                            {/* Estrela preenchida (overlay) */}
                            <div
                                className="absolute inset-0 overflow-hidden"
                                style={{ width: `${fillPercentage}%` }}
                            >
                                <Star
                                    className={colors[variant]}
                                    size={size}
                                    strokeWidth={1.5}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {showValue && (
                <span className="ml-1 text-sm font-medium text-muted-foreground">
                    {clampedRating.toFixed(1)}
                </span>
            )}
        </div>
    );
}
