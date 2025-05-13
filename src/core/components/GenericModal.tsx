import { type ReactNode } from "react";
import { CloseIcon } from "../icons/CloseIcon";

interface GenericModalProps {
    isOpen: boolean;
    children: ReactNode;
    onClose: () => void;
}

export function GenericModal  ({ isOpen, children, onClose }: GenericModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-brightness-35 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white dark:bg-neutral-600 rounded-2xl m-4 p-6 w-full max-w-sm md:max-w-md shadow-lg text-center border border-gray-200 dark:border-neutral-700">
                <button type="button" onClick={onClose} className="w-full flex items-center justify-end pb-6" aria-label="Cerrar ventana" title="Cerrar ventana">
                    <CloseIcon width={42} height={42} className="text-red-700 dark:text-red-400 saturate-150"/>
                </button>
                {children}
            </div>
        </div>
    )
}
