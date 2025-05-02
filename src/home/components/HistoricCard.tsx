interface Review {
    idReview: number;
    imgReview: string;
    text: string;
    dateTimeReview: string;
}

interface User {
    userId: string;
    userName: string;
    imgProfile: string;
}

interface Historic {
    id: number;
    type: string;
    actionText: string;
    dateTime: string;
    user: User;
    review: Review;
}

export const HistoricCard = ({ historic }: { historic: Historic }) => {
    const { userId, userName, imgProfile } = historic.user;
    const { text, imgReview } = historic.review;
    const { id, actionText, dateTime } = historic;

    // Formatear fecha
    const auxFormattedDate = new Date(dateTime.replace(' ', 'T'))
    const formattedDate = auxFormattedDate.toLocaleString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div key={id} className="flex flex-col place-content-end p-4 md:p-6 dark:bg-neutral-600 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-700 w-full lg:w-300 h-75">
            <div className="flex items-center gap-3 mb-auto min-w-0">
                <a href={`/profile/${userId}`} className="cursor-pointer">
                    <img
                        src={imgProfile || 'placeholder_img_profile.png'}
                        alt={`${userName} profile`}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                </a>
                <p className="flex-1 text-md dark:text-neutral-50">
                    <a href={`/profile/${userId}`} className="dark:text-neutral-50 font-bold cursor-pointer">{userName}</a> {actionText}
                </p>
            </div>
            <div className="flex flex-row gap-6 my-4 mx-2 md:mx-10 lg:mx-20 p-3 sm:p-4 md:p-6 border border-gray-200 dark:border-neutral-500">
                <img
                    src={imgReview || 'placeholder_img_book.png'}
                    className="w-24 h-24 object-cover rounded-none" />
                <p className="w-full text-md dark:text-neutral-50 line-clamp-3">{text}</p>
            </div>
            <div className="mt-auto text-xs dark:text-neutral-50 font-medium">{formattedDate}</div>
        </div>
    );
}
