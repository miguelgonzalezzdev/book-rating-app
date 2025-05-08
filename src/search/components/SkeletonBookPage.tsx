import { SkeletonGenreTag } from "./SkeletonGenreTag";

export function SkeletonBookPage() {
    return (
      <section className="bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 min-h-screen p-6 md:p-16">
        <div className="max-w-4xl mx-auto grid items-start grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-20 animate-pulse">
          <div className="flex flex-col items-center justify-start gap-4">
            <div className="w-56 aspect-[3/4] bg-neutral-300 dark:bg-neutral-700 rounded-lg shadow-xl" />
            <div className="mt-4 h-10 w-32 rounded-lg bg-blue-400 dark:bg-blue-700" />
          </div>
  
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 items-center text-center md:items-start md:text-left">
              <div className="h-8 w-3/4 bg-neutral-300 dark:bg-neutral-600 rounded" />
              <div className="h-6 w-1/2 bg-neutral-300 dark:bg-neutral-600 rounded" />
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-neutral-300 dark:bg-neutral-600 rounded-full" />
                ))}
              </div>
            </div>
  
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonGenreTag key={i} />
              ))}
            </div>
  
            <div className="space-y-2">
              <div className="h-6 w-32 bg-neutral-300 dark:bg-neutral-600 rounded" />
              <div className="h-4 w-full max-w-lg bg-neutral-200 dark:bg-neutral-700 rounded" />
              <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-700 rounded" />
              <div className="h-4 w-2/3 bg-neutral-200 dark:bg-neutral-700 rounded" />
            </div>
  
            <div className="space-y-2">
              <div className="h-6 w-32 bg-neutral-300 dark:bg-neutral-600 rounded" />
              <div className="h-4 w-1/2 bg-neutral-200 dark:bg-neutral-700 rounded" />
              <div className="h-4 w-1/3 bg-neutral-200 dark:bg-neutral-700 rounded" />
              <div className="h-4 w-1/4 bg-neutral-200 dark:bg-neutral-700 rounded" />
            </div>
          </div>
        </div>
      </section>
    );
  }
  