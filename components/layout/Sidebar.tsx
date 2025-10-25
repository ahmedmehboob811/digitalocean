
import React from 'react';
import { Page } from '../../App';
import { User } from '../../types';
import ThemeToggle from '../ThemeToggle';

interface SidebarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  user: User | null;
  onLogout: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  page: Page;
  currentPage: Page;
  setPage: (page: Page) => void;
}> = ({ icon, label, page, currentPage, setPage }) => (
  <button
    onClick={() => setPage(page)}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
      currentPage === page
        ? 'bg-primary text-primary-foreground dark:bg-dark-primary dark:text-dark-primary-foreground'
        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground dark:text-dark-muted-foreground dark:hover:bg-dark-accent dark:hover:text-dark-accent-foreground'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setPage, user, onLogout, isSidebarOpen, setIsSidebarOpen }) => {
  const navItems = [
    { icon: <HomeIcon className="w-5 h-5" />, label: 'Dashboard', page: 'dashboard' as Page },
    { icon: <MessageSquareIcon className="w-5 h-5" />, label: 'AI Tutor', page: 'chat' as Page },
    { icon: <FileTextIcon className="w-5 h-5" />, label: 'Notes & Uploads', page: 'notes' as Page },
    { icon: <LayersIcon className="w-5 h-5" />, label: 'Flashcards', page: 'flashcards' as Page },
    { icon: <HelpCircleIcon className="w-5 h-5" />, label: 'Quizzes', page: 'quizzes' as Page },
    { icon: <CalendarIcon className="w-5 h-5" />, label: 'Study Planner', page: 'planner' as Page },
  ];

  return (
    <>
      <aside className={`fixed lg:relative z-20 h-full w-64 bg-card dark:bg-dark-card border-r border-border dark:border-dark-border flex-col lg:flex transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b border-border dark:border-dark-border">
          <h1 className="text-2xl font-bold text-primary dark:text-dark-primary">IntelliStudy</h1>
           <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-foreground dark:text-dark-foreground">
             <XIcon className="w-6 h-6" />
           </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.page} {...item} currentPage={currentPage} setPage={setPage} />
          ))}
        </nav>
        <div className="p-4 border-t border-border dark:border-dark-border">
          <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground dark:text-dark-muted-foreground">Theme</span>
              <ThemeToggle />
          </div>
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setPage('profile')}>
            <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold text-sm text-foreground dark:text-dark-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-3 mt-4 text-sm font-medium rounded-lg transition-colors duration-200 text-destructive dark:text-red-400 hover:bg-destructive/10 dark:hover:bg-destructive/20"
          >
            <LogOutIcon className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>
       {isSidebarOpen && <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-10 lg:hidden"></div>}
    </>
  );
};

// SVG Icons
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const MessageSquareIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
const LayersIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const HelpCircleIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>;
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const LogOutIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;
const XIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;

export default Sidebar;
