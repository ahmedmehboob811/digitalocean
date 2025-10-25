import React, { useState, useEffect, useCallback } from 'react';
import LoginPage from './components/pages/LoginPage';
import DashboardLayout from './components/layout/DashboardLayout';
import { ToastProvider, useToast } from './components/ui/Toast';
import { authService } from './services/authService';

export type Page = 'dashboard' | 'chat' | 'notes' | 'flashcards' | 'quizzes' | 'planner' | 'profile';

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<Page>('dashboard');
  const { showToast } = useToast();

  useEffect(() => {
    const checkAuth = () => {
      const user = authService.getCurrentUser();
      setIsAuthenticated(!!user);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setIsAuthenticated(true);
    showToast('Successfully signed in!', 'success');
  }, [showToast]);

  const handleLogout = useCallback(() => {
    authService.logout();
    setIsAuthenticated(false);
    setPage('dashboard');
    showToast('Successfully signed out.', 'success');
  }, [showToast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background dark:bg-dark-background">
        <div className="w-16 h-16 border-4 border-primary dark:border-dark-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <DashboardLayout page={page} setPage={setPage} onLogout={handleLogout} />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
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
  
  return (
    <ToastProvider>
      <div className={`${theme}`}>
        <AppContent />
      </div>
    </ToastProvider>
  );
};

export default App;
