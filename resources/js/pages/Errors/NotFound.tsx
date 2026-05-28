import { router } from '@inertiajs/react';
import { ArrowLeft, RouteOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center p-4">
            <Card className="w-full max-w-md border-1 bg-(--cards-color) shadow-[0_20px_20px_rgba(0,0,0,0.38)] dark:bg-(--dark-cards-color)">
                <CardContent className="flex flex-col items-center p-12 text-center">
                    <RouteOff
                        className="mb-4 h-10 w-10 text-[#ae6ff7] opacity-40"
                        strokeWidth={1.2}
                    />

                    <h1 className="text-8xl font-extrabold tracking-tighter text-[#ae6ff7]">
                        404
                    </h1>

                    <h2 className="mt-2 text-xl font-bold">
                        Página não encontrada
                    </h2>

                    <p className="mt-2 mb-8 text-sm leading-relaxed text-gray-400">
                        Esta rota ainda não tem uma página. Se você acha que
                        isso é um erro, entre em contato com o suporte.
                    </p>

                    <hr className="mb-8 w-full border-white/10" />

                    <Button
                        variant="outline"
                        className="gap-2 border-[#ae6ff7]/40 text-[#ae6ff7] hover:bg-[#ae6ff7]/10 hover:text-[#ae6ff7]"
                        onClick={() => router.visit('/')}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar ao início
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
