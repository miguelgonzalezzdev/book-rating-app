import { IconComponentProps } from "../types";

export function SwordIcon({ width = 24, height = 24, className = '' }: IconComponentProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`${className}`}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 4v5l-9 7l-4 4l-3 -3l4 -4l7 -9z" />
            <path d="M6.5 11.5l6 6" />
        </svg>
    )
}