export function SkeletonHistoricCard() {
  return (
    <div className="flex flex-col place-content-end p-4 md:p-6 dark:bg-neutral-600 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-700 w-full lg:w-300 h-75 animate-pulse">

      <div className="flex items-center gap-3 mb-auto min-w-0">
        <div className="w-10 h-10 rounded-full bg-neutral-300 dark:bg-neutral-500 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-neutral-300 dark:bg-neutral-500 rounded" />
          <div className="h-3 w-1/2 bg-neutral-300 dark:bg-neutral-500 rounded" />
        </div>
      </div>

      <div className="flex flex-row gap-6 my-4 mx-2 md:mx-10 lg:mx-20 p-3 sm:p-4 md:p-6 border border-gray-200 dark:border-neutral-500">
        <div className="w-24 h-24 bg-neutral-300 dark:bg-neutral-500" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-full bg-neutral-300 dark:bg-neutral-500 rounded" />
          <div className="h-3 w-11/12 bg-neutral-300 dark:bg-neutral-500 rounded" />
          <div className="h-3 w-3/4 bg-neutral-300 dark:bg-neutral-500 rounded" />
        </div>
      </div>

      <div className="mt-auto h-3 w-1/4 bg-neutral-300 dark:bg-neutral-500 rounded" />
    </div>
  );
}
