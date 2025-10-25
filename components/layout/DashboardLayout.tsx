
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Page } from '../../App';
import DashboardPage from '../pages/DashboardPage';
import ChatPage from '../pages/ChatPage';
import NotesPage from '../pages/NotesPage';
import FlashcardsPage from '../pages/FlashcardsPage';
import QuizzesPage from '../pages/QuizzesPage';
import PlannerPage from '../pages/PlannerPage';
import ProfilePage from '../pages/ProfilePage';
import { mockAuthService } from '../../services/mockAuthService';
import { User } from '../../types';
import ThemeToggle from '../ThemeToggle';

interface DashboardLayoutProps {
  page: Page;
  setPage: (page: Page) => void;
  onLogout: () => void;
}

const renderPage = (page: Page) => {
  switch (page) {
    case 'dashboard':
      return <DashboardPage setPage={setPage} />;
    case 'chat':
      return <ChatPage />;
    case 'notes':
      return <NotesPage />;
    case 'flashcards':
      return <FlashcardsPage />;
    case 'quizzes':
      return <QuizzesPage />;
    case 'planner':
      return <PlannerPage />;
    case 'profile':
      return <ProfilePage />;
    default:
      return <DashboardPage setPage={setPage} />;
  }
};

let setPage: (page: Page) => void;

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ page: initialPage, setPage: setPageProp, onLogout }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  setPage = setPageProp;

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await mockAuthService.getUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  return (
    <div className="flex h-screen bg-secondary dark:bg-dark-secondary">
      <Sidebar currentPage={initialPage} setPage={setPage} user={user} onLogout={onLogout} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-card dark:bg-dark-card border-b border-border dark:border-dark-border lg:hidden">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-foreground dark:text-dark-foreground">
                <MenuIcon className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-primary dark:text-dark-primary">IntelliStudy</h1>
            <ThemeToggle />
        </header>
        <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderPage(initialPage)}
        </div>
      </main>
    </div>
  );
};

const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);


export default DashboardLayout;
