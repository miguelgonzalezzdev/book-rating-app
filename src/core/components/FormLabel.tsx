interface FormLabel {
    text: string
    htmlFor?: string
}

export function FormLabel({ text, htmlFor }: FormLabel) {
    return (
        <label htmlFor={htmlFor} className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1 font-semibold">
            {text}
        </label>
    )
}
