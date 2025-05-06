export function SkeletonProfile() {
    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 flex items-center justify-center flex-col p-4">
            <section className="w-full max-w-2xl bg-white dark:bg-neutral-600 rounded-2xl p-6 md:p-10 space-y-6 shadow-lg border border-gray-200 dark:border-neutral-700">
                <div className="relative flex justify-center items-start space-y-2">
                    <div className="w-32 h-32 rounded-full bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                    <div className="absolute p-2 ml-40">
                        <div className="w-8 h-8 rounded-full bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                    </div>
                </div>
                <div className="text-md flex justify-center flex-wrap gap-4 md:gap-10">
                    <div className="w-1/3 h-4 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                    <div className="w-1/3 h-4 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                    <div className="w-1/3 h-4 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                </div>
                <form className="space-y-6">
                    <div className="space-y-2">
                        <div className="w-1/2 h-6 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                        <div className="h-10 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="w-1/2 h-6 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                        <div className="h-10 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="w-1/2 h-6 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                        <div className="h-10 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="w-1/2 h-6 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                        <div className="h-10 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                    </div>

                    <div className="w-full h-12 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>

                    <div className="pt-4 border-t border-neutral-300 dark:border-neutral-500 flex justify-center">
                        <div className="w-1/2 h-6 bg-neutral-300 dark:bg-neutral-500 animate-pulse"></div>
                    </div>
                </form>
            </section>

            <div className="fixed inset-0 bg-black opacity-50 flex items-center justify-center z-50">
            </div>
        </div>
    )
}
