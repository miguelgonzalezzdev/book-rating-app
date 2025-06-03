import { forwardRef } from "react";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

export const ConfirmModal = forwardRef<HTMLDivElement, ConfirmModalProps>(function ConfirmModal(
    { isOpen, title, message, onConfirm, onCancel, confirmText = "Aceptar", cancelText = "Cancelar" },
    ref
) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-brightness-35 backdrop-blur-xs flex items-center justify-center z-50">
            <div
                ref={ref}
                className="bg-white dark:bg-neutral-600 rounded-2xl m-4 p-6 w-full max-w-sm md:max-w-md shadow-lg text-center border border-gray-200 dark:border-neutral-700"
            >
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">{title}</h2>
                <p className="text-md text-neutral-900 dark:text-neutral-50 mb-6">
                    {message}
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg shadow-sm bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-300 dark:hover:bg-neutral-500 transition font-semibold flex justify-center"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg shadow-sm bg-red-600 text-white hover:bg-red-700 transition font-semibold flex justify-center"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
});
