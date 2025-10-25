import React from 'react';
import { Page } from '../../App';
import { authService } from '../../services/authService';
import Button from '../ui/Button';
import ThemeToggle from '../ThemeToggle';

// Icons
// FIX: Corrected the viewBox attribute in the HomeIcon SVG definition.
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const MessageSquareIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
const LayersIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const HelpCircleIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>;
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const LogOutIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;


interface SidebarProps {
  page: Page;
  setPage: (page: Page) => void;
  onLogout: () => void;
}

const navItems: { id: Page; label: string; icon: React.FC<any> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
  { id: 'chat', label: 'AI Chat', icon: MessageSquareIcon },
  { id: 'notes', label: 'Notes', icon: FileTextIcon },
  { id: 'flashcards', label: 'Flashcards', icon: LayersIcon },
  { id: 'quizzes', label: 'Quizzes', icon: HelpCircleIcon },
  { id: 'planner', label: 'Planner', icon: CalendarIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ page, setPage, onLogout }) => {
  const user = authService.getCurrentUser();

  return (
    <aside className="w-64 flex flex-col p-4 bg-card dark:bg-dark-card border-r border-border dark:border-dark-border">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-primary dark:bg-dark-primary text-primary-foreground dark:text-dark-primary-foreground flex items-center justify-center rounded-lg font-bold text-xl">
          A
        </div>
        <h1 className="text-xl font-bold text-foreground dark:text-dark-foreground">Study AI</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              page === item.id
                ? 'bg-accent dark:bg-dark-accent text-accent-foreground dark:text-dark-accent-foreground'
                : 'text-muted-foreground dark:text-dark-muted-foreground hover:bg-accent/50 dark:hover:bg-dark-accent/50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
         <div className="border-t border-border dark:border-dark-border -mx-4 my-4"></div>
         <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer group flex-1 min-w-0" 
              onClick={() => setPage('profile')}
            >
              <img src={user?.avatar} alt="User Avatar" className="w-9 h-9 rounded-full" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate group-hover:text-primary dark:group-hover:text-dark-primary">{user?.name || 'User Profile'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={onLogout}>
                  <LogOutIcon className="w-5 h-5" />
              </Button>
            </div>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;