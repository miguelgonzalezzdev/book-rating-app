import { SkeletonBookListItem } from "./SkeletonBookListItem";

export function SkeletonBooksList() {
    return (
        <section className="bg-neutral-50 dark:bg-neutral-800 min-h-screen">
            <div className="relative mb-6">
                <div className="w-full h-56 bg-neutral-300 dark:bg-neutral-700 animate-pulse z-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"></div> {/* Placeholder for background image */}
                <h1 className="absolute left-10 top-1/2 -translate-y-1/2 text-4xl font-bold bg-neutral-300 dark:bg-neutral-700 animate-pulse z-10 drop-shadow-sm w-32 h-8"></h1> {/* Placeholder for genre */}
            </div>
            <ul className="grid mx-6">
                {[...Array(6)].map((_, index) => (
                    <SkeletonBookListItem key={index} /> 
                ))}
            </ul>
        </section>
    )
}