
export function ReviewModalSkeleton() {
    return (
        <div className="mt-10 fixed inset-0 backdrop-brightness-35 backdrop-blur-xs flex items-center justify-center z-50 px-2">
            <div className="w-full max-w-lg bg-white dark:bg-neutral-600 rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200 dark:border-neutral-700">
                <div className="space-y-6 md:space-y-8">
                    <div className="w-full flex flex-col items-center justify-center gap-6">
                        <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
                            <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
                        <div className="w-24 md:w-30 aspect-[3/4] bg-neutral-200 dark:bg-neutral-700 rounded" />
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="h-4 w-1/3 bg-neutral-200 dark:bg-neutral-700 rounded" />
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-6 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded mb-2" />
                        <div className="h-30 md:h-50 bg-neutral-200 dark:bg-neutral-700 rounded" />
                    </div>

                    <div className="flex justify-center gap-4">
                        <div className="h-10 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
                        <div className="h-10 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    )
}