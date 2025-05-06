export function SkeletonCard() {
    return (
        <div
            className="flex flex-col justify-start p-3 lg:p-6 rounded-2xl w-full min-h-20 aspect-[2/1] cursor-pointer shadow-md animate-pulse ring-1 ring-black/5 dark:ring-white/10"
        >
            <div className="h-5 lg:h-6 w-1/2 rounded bg-neutral-300 dark:bg-neutral-600"></div>
        </div>
    )
}