import type { ReactNode } from 'react';

interface ErrorStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onRetry?: () => void;
}

export function ErrorState({ title = 'Something went wrong', description = 'There was an issue loading content. Please try again.', actionText = 'Retry', onRetry }: ErrorStateProps) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 rounded-3xl border border-rose-100 bg-rose-50 p-10 text-center">
      <p className="text-6xl">😕</p>
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="text-sm leading-6 text-slate-600">{description}</p>
      {onRetry ? (
        <button onClick={onRetry} className="rounded-full bg-brand px-6 py-2 text-sm font-semibold text-white transition hover:bg-pink-600">
          {actionText}
        </button>
      ) : null}
    </div>
  );
}
