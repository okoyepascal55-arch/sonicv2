import { useState, useEffect, useCallback } from 'react';
import { useSEO } from '@/hooks/useSEO';
import Sidebar from './components/Sidebar';
import MediaPanel from './components/MediaPanel';
import TextPanel from './components/TextPanel';

const AUTH_KEY = 'sonic_admin_auth';

export default function DashboardPage() {
  useSEO({
    title: 'Sonic Group — Content Dashboard',
    description: 'Medien und Texte der Sonic Group Website verwalten.',
  });

  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeGroup, setActiveGroup] = useState('home');
  const [activeTab, setActiveTab] = useState<'media' | 'text'>('media');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(AUTH_KEY) === 'true') {
        setAuthed(true);
      }
    } catch {
      /* sessionStorage unavailable (e.g. during pre-render) — stay logged out */
    }
  }, []);

  const handleLogin = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    window.setTimeout(() => {
      const u = username.trim().toLowerCase();
      if ((u === 'admin' && password === 'admin') || (u === 'sonic' && password === 'sonic2026')) {
        try {
          sessionStorage.setItem(AUTH_KEY, 'true');
        } catch {
          /* ignore */
        }
        setAuthed(true);
      } else {
        setError('Ungültige Anmeldedaten.');
      }
      setIsLoading(false);
    }, 500);
  }, [username, password]);

  const handleLogout = useCallback(() => {
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {
      /* ignore */
    }
    setAuthed(false);
    setUsername('');
    setPassword('');
  }, []);

  const handleGroupSelect = useCallback((groupId: string) => {
    setActiveGroup(groupId);
    setSidebarOpen(false);
  }, []);

  if (!authed) {
    return (
      <div className="min-h-[100dvh] bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="inline-block w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
            <h1 className="text-3xl font-black text-white text-center uppercase tracking-tight">
              Admin Login
            </h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 text-xs font-semibold rounded-md">
                {error}
              </div>
            )}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Benutzername"
              autoComplete="username"
              className="block w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white text-sm rounded-md focus:outline-none focus:border-lime-400"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort"
              autoComplete="current-password"
              className="block w-full px-4 py-3 border border-gray-700 bg-gray-800 text-white text-sm rounded-md focus:outline-none focus:border-lime-400"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-lime-400 text-gray-900 hover:bg-lime-300 font-black uppercase tracking-wider text-sm rounded-md transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
            >
              {isLoading ? 'Anmeldung…' : 'Anmelden'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-5rem)] min-h-0 overflow-hidden">
      {/* Desktop Sidebar — always visible on lg+ */}
      <div className="hidden lg:block">
        <Sidebar activeGroup={activeGroup} onGroupSelect={handleGroupSelect} variant="desktop" activeTab={activeTab} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
          <div className="absolute left-0 top-0 bottom-0 w-64 z-10">
            <Sidebar activeGroup={activeGroup} onGroupSelect={handleGroupSelect} variant="mobile" onClose={() => setSidebarOpen(false)} activeTab={activeTab} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
        {/* Top Bar with Tabs */}
        <div className="bg-gray-900 text-white sticky top-0 z-40 shrink-0 px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer rounded-md"
            >
              <i className="ri-menu-line text-lg"></i>
            </button>
            <span className="hidden sm:inline-block w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
            <h1 className="text-xs sm:text-sm font-black tracking-tight uppercase truncate">Sonic Content Manager</h1>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center bg-gray-800 rounded-lg p-1 gap-0.5">
            <button
              onClick={() => setActiveTab('media')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'media'
                  ? 'bg-lime-400 text-gray-900'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <i className="ri-image-line text-sm"></i>
              Medien
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'text'
                  ? 'bg-lime-400 text-gray-900'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <i className="ri-file-text-line text-sm"></i>
              Text
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="px-2.5 py-1 sm:px-3 bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors font-bold text-[10px] uppercase tracking-wider cursor-pointer whitespace-nowrap rounded-md"
          >
            Abmelden
          </button>
        </div>

        {activeTab === 'media' ? (
          <MediaPanel activeGroup={activeGroup} />
        ) : (
          <TextPanel activeGroup={activeGroup} />
        )}
      </div>
    </div>
  );
}