import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextValue {
  notify: (message: string, type?: ToastMessage['type']) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const notify = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}`;
    setMessages((current) => [...current, { id, message, type }]);
    window.setTimeout(() => setMessages((current) => current.filter((item) => item.id !== id)), 3600);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex flex-col gap-3">
        {messages.map((toast) => (
          <div
            key={toast.id}
            className={`w-80 rounded-3xl border px-4 py-3 shadow-card transition duration-300 ${
              toast.type === 'success' ? 'border-emerald-100 bg-emerald-50 text-emerald-900' : toast.type === 'error' ? 'border-rose-100 bg-rose-50 text-rose-900' : 'border-slate-200 bg-white text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium">{toast.message}</span>
              <button type="button" onClick={() => setMessages((current) => current.filter((item) => item.id !== toast.id))} className="rounded-full p-1 text-slate-500 hover:text-slate-900">
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
