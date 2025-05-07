
export function SkeletonBookListItem() {
    return (
        <li className="flex justify-start gap-6 p-4 border-b border-neutral-300 dark:border-neutral-700 cursor-pointer">
            <div className="w-12 md:w-16 aspect-[3/4] overflow-hidden bg-neutral-300 dark:bg-neutral-700 animate-pulse"></div>
            <div className="flex justify-start flex-col w-full">
                <div className="h-6 bg-neutral-300 dark:bg-neutral-700 animate-pulse mb-2 w-3/4"></div>
                <div className="h-4 bg-neutral-300 dark:bg-neutral-700 animate-pulse mb-1 w-1/2"></div>
                <div className="mt-2 flex justify-start">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className={`w-5 h-5 bg-neutral-300 dark:bg-neutral-700 rounded-full animate-pulse mr-1`}
                        />
                    ))}
                </div>
            </div>
        </li>
    )
}