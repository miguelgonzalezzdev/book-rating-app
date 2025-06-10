/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ListOfUserInfo } from "../../core/types";
import { useAuthStore } from "../../core/store/authStore";
import { getAllUsers } from "../services/users";

export function useUsers () {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)
    const [users, setUsers] = useState<ListOfUserInfo>([])
    const [isLoading, setIsLoading] = useState(false) 
    const [error, setError] = useState("") 

    useEffect(() => {
        if (!isAuthenticated) return

        const fetchAllUsers = async () => {
            try {
                setIsLoading(true)

                const data = await getAllUsers()     
                
                if (!data.success) {
                    setError("Error al obtener los usuarios")
                    return
                }

                setUsers(data.data ?? [])

            } catch {
                setError("Error al obtener los usuarios")
            } finally {
                setIsLoading(false)
            }
        }

        fetchAllUsers()
    }, [])

    return {
        users,
        isLoading,
        error
    }
}