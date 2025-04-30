
interface FormInputField {
    id: string
    name: string
    type: string
    placeholder: string
    value: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    error: boolean
}

export function FormInputField({ id, name, type = "text", placeholder, value, onChange, error }: FormInputField) {
    const baseInputClasses = "w-full px-4 py-3 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 placeholder-gray-400 dark:placeholder-neutral-400 focus:outline-none border border-neutral-300 dark:border-transparent"
    const errorInputClasses = error 
        ? "border border-red-500 focus:ring-red-500 dark:border-red-400" 
        : ""

    return (
        <input
            type={type}
            id={id} 
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${baseInputClasses} ${errorInputClasses}`}
        />
    );
}
