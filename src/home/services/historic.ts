import { supabase } from "../../core/supabase/supabaseClient";
import { BookId, ListOfHistoric, UserId } from "../../core/types";

interface HistoricProfile {
    id: UserId
    name: string
    surname: string
    profileimage: string
}

interface HistoricReview {
    id: string
    user_id: UserId
    book_id: BookId
    title: string
    author: string
    imageurl: string
    text: string
}

interface HistoricItem {
    id: string
    action_type_id: number
    target_id: string
    review_id: UserId
    created_at: string
    user_id: UserId
    profiles: HistoricProfile | HistoricProfile[] | null
    reviews: HistoricReview | HistoricReview[] | null
}

interface GetHistoricProps {
    currentAuthUserId: UserId
}

export async function getHistoric({ currentAuthUserId }: GetHistoricProps): Promise<{ success: false; error: string } | { success: true; data: ListOfHistoric }> {
    if (!currentAuthUserId) {
        return { success: false, error: "Error al realizar la acción." }
    }

    const { data, error } = await supabase
        .from('historic')
        .select(`
            id,
            action_type_id,
            target_id,
            review_id,
            created_at,
            user_id,
            profiles (
                id,
                name,
                surname,
                profileimage
            ),
            reviews (
                id,
                user_id,
                book_id,
                title,
                author,
                imageurl,
                text
            )
            `)
        //.neq('user_id', currentAuthUserId)
        .order('created_at', { ascending: false })
        .limit(20)

    if (error) {
        return { success: false, error: error.message }
    }

    const mappedData = (data ?? []).map((item: HistoricItem) => ({
        ...item,
        profiles: item.profiles && Array.isArray(item.profiles) ? item.profiles[0] : item.profiles,
        reviews: item.reviews && Array.isArray(item.reviews) ? item.reviews[0] : item.reviews,
    }));

    return { success: true, data: mappedData }

}
