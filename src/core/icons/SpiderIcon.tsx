import { IconComponentProps } from "../types";

export function SpiderIcon({ width = 24, height = 24, className = '' }: IconComponentProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`${className}`}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 4v2l5 5" />
            <path d="M2.5 9.5l1.5 1.5h6" />
            <path d="M4 19v-2l6 -6" />
            <path d="M19 4v2l-5 5" />
            <path d="M21.5 9.5l-1.5 1.5h-6" />
            <path d="M20 19v-2l-6 -6" />
            <path d="M12 15m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M12 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
        </svg>
    )
}