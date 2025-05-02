interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

export function ConfirmModal  ({ isOpen, title, message, onConfirm, onCancel, confirmText = "Aceptar", cancelText = "Cancelar" }: ConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-brightness-35 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-neutral-700 rounded-2xl m-4 p-6 w-full max-w-sm md:max-w-md shadow-lg text-center">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">{title}</h2>
                <p className="text-md text-neutral-900 dark:dark:text-neutral-50 mb-6">
                    {message}
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-600 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-300 dark:hover:bg-neutral-500 transition font-semibold flex justify-center"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-semibold flex justify-center"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};
