
export function SkeletonReviewCard() {
    return (
        <div className="flex flex-col gap-4 p-4 md:p-6 bg-white dark:bg-neutral-600 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-700 w-full h-full animate-pulse">
            <div className="w-full flex justify-start gap-4">
                <div className="w-14 md:w-20 aspect-[3/4] bg-neutral-200 dark:bg-neutral-500 rounded border border-neutral-300 dark:border-neutral-500" />
                <div className="flex flex-col justify-start gap-2">
                    <div className="h-5 w-40 bg-neutral-200 dark:bg-neutral-500 rounded" />
                    <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-500 rounded" />
                </div>
            </div>
            <div className="w-full flex items-center gap-2">
                <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-500 rounded" />
                <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="w-5 h-5 bg-neutral-200 dark:bg-neutral-500 rounded-xl" />
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-500 rounded" />
                <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-500 rounded" />
            </div>
            <div className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-500 rounded" />
        </div>
    )
}
