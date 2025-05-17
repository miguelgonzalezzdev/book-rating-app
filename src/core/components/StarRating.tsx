import { useState } from 'react'

interface StarRatingProps {
    initialRating?: number;
    onChange?: (rating: number) => void;  // Función para manejar el cambio del rating
    disabled?: boolean; // Propiedad para deshabilitar el hover
    className?: string; 
}

export function StarRating({ initialRating = 0, onChange, disabled = false, className = "w-8 h-8" }: StarRatingProps) {
    const [rating, setRating] = useState<number>(initialRating)

    const handleMouseOver = (index: number) => {
        if (disabled) return 

        setRating(index + 1)
    }

    const handleMouseOut = () => {
        if (disabled) return
        
        setRating(initialRating)
    }

    const handleClick = (index: number) => {
        if (disabled) return 

        setRating(index + 1)
        if (onChange) onChange(index + 1) // Pasamos el rating seleccionado al componente padre
    }

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`${className} ${i < rating ? 'text-yellow-500' : 'text-gray-300'} transition duration-200 ease-in-out ${disabled ? '' : 'cursor-pointer hover:scale-110'}`}
                    onClick={() => handleClick(i)}
                    onMouseOver={() => handleMouseOver(i)}
                    onMouseOut={handleMouseOut}>
                    <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                    />
                </svg>
            )
        }
        return stars
    }

    return <div className="flex space-x-1">{renderStars()}</div>;
}
