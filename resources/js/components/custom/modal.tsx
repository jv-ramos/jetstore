import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface ModalProps {
    children: {
        title: string;
        body: string;
        comment: string;
    };
    open: boolean;
    onClose: () => void;
}

export default function Modal({ children, open, onClose }: ModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-2xl text-[#ae6ff7]">{children.title}</DialogTitle>
                </DialogHeader>
                <p className="font-sl text-neutral-400"><span className="text-red-400">NOTE: </span>{children.note}</p>
                <p>{children.body}</p>
                <span className="font-sl text-neutral-600">{children.comment}</span>
            </DialogContent>
        </Dialog>
    );
}
