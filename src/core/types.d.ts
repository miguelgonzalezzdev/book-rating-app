import { ALERT_TYPES } from "./constants"

export interface User {
    id: string
    email: string
}

export interface Genre {
    id: number
    name: string
    color: string
}

export type ListOfGenres = Genre[]

export type AlertType = typeof ALERT_TYPES[keyof typeof ALERT_TYPES];