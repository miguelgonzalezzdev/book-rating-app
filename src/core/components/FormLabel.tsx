interface FormLabel {
    text: string
    htmlFor?: string
    error?: boolean
}

export function FormLabel({ text, htmlFor, error = false }: FormLabel) {
    return (
        <label htmlFor={htmlFor} className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
            {text}
            {error && <span className="text-red-600 ml-1">*</span>}
        </label>
    )
}
