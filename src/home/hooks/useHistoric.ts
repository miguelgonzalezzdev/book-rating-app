import { useEffect, useState } from "react";
import { ListOfHistoric } from "../../core/types";
import { useAuthStore } from "../../core/store/authStore";
import { getHistoric } from "../services/historic";

export function useHistoric () {
    const currentAuthUser = useAuthStore((state) => state.user)
    const [historicList, setHistoricList] = useState<ListOfHistoric>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchHistoric = async () => {
            if (!currentAuthUser) return

             setIsLoading(true)

            try {
                
                const data = await getHistoric({ currentAuthUserId: currentAuthUser.id })

                 if (!data.success) {
                    setError(data.error ?? "Error al obtener el historial")
                    return
                }

                setHistoricList(data.data ?? [])
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err))
            } finally {
                setIsLoading(false)
            }
        }

        fetchHistoric()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { historicList, isLoading, error }
}