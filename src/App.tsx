import { useState } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastProvider } from './components/common/ToastContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ToastProvider>
      <div className={darkMode ? 'dark bg-slate-950 text-white' : 'bg-white text-slate-900'}>
        <Navbar darkMode={darkMode} onToggleDark={() => setDarkMode((value) => !value)} />
        <main className="min-h-screen-minus-120">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}

export default App;
