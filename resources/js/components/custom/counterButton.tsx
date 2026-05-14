import { MinusIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

export default function CounterButton({
    counter,
    handleCounter,
}: {
    counter: number;
    handleCounter: (operation: boolean) => void;
}) {
    return (
        <ButtonGroup
            orientation="horizontal"
            aria-label="Media controls"
            className="h-fit"
        >
            <Button
                variant="outline"
                size="icon"
                className="cursor-pointer bg-(--cards-color) hover:text-[#33aa33] dark:bg-(--dark-cards-color) dark:hover:text-[#33aa33]"
                onClick={() => handleCounter(true)}
            >
                <PlusIcon />
            </Button>
            <span className="flex w-12 items-center justify-center border-1 text-lg font-semibold">
                {counter}
            </span>
            <Button
                variant="outline"
                size="icon"
                className="cursor-pointer bg-(--cards-color) hover:text-[#aa3333] dark:bg-(--dark-cards-color) dark:hover:text-[#aa3333]"
                onClick={() => handleCounter(false)}
            >
                <MinusIcon />
            </Button>
        </ButtonGroup>
    );
}
