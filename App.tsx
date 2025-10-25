
import React, { useState, useEffect, useCallback } from 'react';
import HomePage from './components/pages/HomePage';
import DashboardLayout from './components/layout/DashboardLayout';
import { ToastProvider, useToast } from './components/ui/Toast';
import { mockAuthService } from './services/mockAuthService';

export type Page = 'dashboard' | 'chat' | 'notes' | 'flashcards' | 'quizzes' | 'planner' | 'profile';

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<Page>('dashboard');
  const { showToast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await mockAuthService.getUser();
      setIsAuthenticated(!!user);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      await mockAuthService.login('user@example.com', 'password');
      setIsAuthenticated(true);
      showToast('Successfully logged in!', 'success');
    } catch (error) {
      showToast('Login failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const handleLogout = useCallback(async () => {
    await mockAuthService.logout();
    setIsAuthenticated(false);
    setPage('dashboard');
    showToast('Successfully logged out.', 'success');
  }, [showToast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <DashboardLayout page={page} setPage={setPage} onLogout={handleLogout} />
      ) : (
        <HomePage onLogin={handleLogin} />
      )}
    </>
  );
};


const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-dark-background', 'text-dark-foreground');
      document.body.classList.remove('bg-background', 'text-foreground');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-background', 'text-foreground');
      document.body.classList.remove('bg-dark-background', 'text-dark-foreground');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ToastProvider>
      <div className={`${theme}`}>
        <AppContent />
      </div>
    </ToastProvider>
  );
};

export default App;
