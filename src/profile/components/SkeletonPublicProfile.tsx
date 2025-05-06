export function SkeletonPublicProfile() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 flex items-center justify-center flex-col p-4">
            <section className="w-full max-w-2xl flex flex-col justify-center items-center bg-white dark:bg-neutral-600 rounded-2xl p-6 md:p-10 gap-4 shadow-md border border-gray-200 dark:border-neutral-700">
                <div className="w-32 h-32 rounded-full bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                <div className="mt-4 w-1/2 h-6 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                <div className="mt-2 w-3/4 h-4 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                <div className="mt-4 w-2/3 h-4 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                <div className="w-full mt-8 h-12 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                <div className="mt-6 w-2/3 h-10 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
            </section>
        </div>
    )
}
