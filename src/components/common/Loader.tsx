export function Loader() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 py-20 text-center text-slate-700">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-brand border-t-transparent" />
      <p className="text-lg font-semibold">Loading premium fashion content...</p>
      <p className="max-w-md text-sm text-slate-500">Fetching the latest collections, trending products, and category highlights for a smooth shopping experience.</p>
    </div>
  );
}
