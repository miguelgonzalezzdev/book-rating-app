
interface FormButton {
    text: string
}

export function FormButton({ text }: FormButton) {
    return (
        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200">
            {text}
        </button>
    )
}
