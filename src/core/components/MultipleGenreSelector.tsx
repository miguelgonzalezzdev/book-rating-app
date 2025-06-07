/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormGenreSelector } from "./FormGenreSelector";
import { GenreId, GenreName } from "../types";
import { FormLabel } from "./FormLabel";

interface MultipleGenreSelectorProps {
    selectedGenres: { [key: string]: string };
    onChange: (key: string, value: string) => void;
    allGenres: { id: GenreId; name: GenreName }[];
}

const formatGenreLabel = (key: string): string => {
    const match = key.match(/genre(\d+)/i);
    if (match) {
        return `Género ${match[1]}`;
    }
    return key;
}

export function MultipleGenreSelector({ selectedGenres, onChange, allGenres }: MultipleGenreSelectorProps) {

    const getFilteredGenres = (currentKey: string) => {
        const selectedValues = Object.entries(selectedGenres)
            .filter(([key, value]) => key !== currentKey && Number(value) > 0)
            .map(([_, value]) => Number(value))
        return allGenres.filter(genre => !selectedValues.includes(genre.id))
    }



    return (
        <>
            {Object.entries(selectedGenres).map(([key, value]) => (
                <div key={`div-${key}`}>
                    <FormLabel text={formatGenreLabel(key)} htmlFor={key} />
                    <FormGenreSelector
                        key={key}
                        id={key}
                        name={key}
                        placeholder="Selecciona un género"
                        value={value}
                        onChange={(e) => onChange(key, e.target.value)}
                        genres={getFilteredGenres(key)}
                    />
                </div>
            ))}
        </>
    );
}