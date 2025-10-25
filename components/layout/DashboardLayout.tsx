
import React from 'react';
import { Page } from '../../App';
import Sidebar from './Sidebar';
import DashboardPage from '../pages/DashboardPage';
import ChatPage from '../pages/ChatPage';
import NotesPage from '../pages/NotesPage';
import FlashcardsPage from '../pages/FlashcardsPage';
import QuizzesPage from '../pages/QuizzesPage';
import PlannerPage from '../pages/PlannerPage';
import ProfilePage from '../pages/ProfilePage';

interface DashboardLayoutProps {
  page: Page;
  setPage: (page: Page) => void;
  onLogout: () => void;
}

const pageComponents: Record<Page, React.FC> = {
  dashboard: DashboardPage,
  chat: ChatPage,
  notes: NotesPage,
  flashcards: FlashcardsPage,
  quizzes: QuizzesPage,
  planner: PlannerPage,
  profile: ProfilePage,
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ page, setPage, onLogout }) => {
  const ActivePage = pageComponents[page];

  return (
    <div className="flex h-screen bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground">
      <Sidebar page={page} setPage={setPage} onLogout={onLogout} />
      <main className="flex-1 p-8 overflow-y-auto">
        {ActivePage && <ActivePage />}
      </main>
    </div>
  );
};

export default DashboardLayout;
