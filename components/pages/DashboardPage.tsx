
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Page } from '../../App';
import { User } from '../../types';
import { mockAuthService } from '../../services/mockAuthService';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Skeleton from '../ui/Skeleton';

interface DashboardPageProps {
  setPage: (page: Page) => void;
}

const progressData = [
  { name: 'Mon', hours: 2 },
  { name: 'Tue', hours: 3 },
  { name: 'Wed', hours: 1.5 },
  { name: 'Thu', hours: 4 },
  { name: 'Fri', hours: 2.5 },
  { name: 'Sat', hours: 5 },
  { name: 'Sun', hours: 1 },
];

const QuickActionCard: React.FC<{ icon: React.ReactNode; title: string; description: string; page: Page; setPage: (page: Page) => void; }> = ({ icon, title, description, page, setPage }) => (
    <Card className="flex flex-col justify-between">
        <div>
            <div className="mb-4 text-primary dark:text-dark-primary">{icon}</div>
            <h3 className="text-lg font-semibold mb-1 text-foreground dark:text-dark-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground mb-4">{description}</p>
        </div>
        <Button onClick={() => setPage(page)} variant="outline" size="sm">
            Go to {title}
        </Button>
    </Card>
);

const DashboardPage: React.FC<DashboardPageProps> = ({ setPage }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await mockAuthService.getUser();
            setUser(currentUser);
            setLoading(false);
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div>
                <Skeleton className="h-8 w-1/2 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Skeleton className="h-64" />
                    <Skeleton className="h-64" />
                    <Skeleton className="h-64" />
                </div>
                 <div className="mt-8">
                    <Skeleton className="h-80" />
                </div>
            </div>
        )
    }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">Welcome back, {user?.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground dark:text-dark-muted-foreground">Here's your study progress and quick actions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickActionCard 
            icon={<MessageSquareIcon className="w-8 h-8"/>}
            title="AI Tutor"
            description="Ask a question and get expert help instantly."
            page="chat"
            setPage={setPage}
        />
        <QuickActionCard 
            icon={<FileTextIcon className="w-8 h-8"/>}
            title="Upload Notes"
            description="Summarize documents or create quizzes from your material."
            page="notes"
            setPage={setPage}
        />
         <QuickActionCard 
            icon={<LayersIcon className="w-8 h-8"/>}
            title="Flashcards"
            description="Review your flashcards or create a new set."
            page="flashcards"
            setPage={setPage}
        />
        <QuickActionCard 
            icon={<CalendarIcon className="w-8 h-8"/>}
            title="Study Planner"
            description="Check your schedule or generate a new plan."
            page="planner"
            setPage={setPage}
        />
      </div>

      <Card>
         <h2 className="text-xl font-semibold mb-4 text-foreground dark:text-dark-foreground">Weekly Study Hours</h2>
          <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={progressData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" className="dark:stroke-dark-border" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" className="dark:stroke-dark-muted-foreground text-xs" />
                      <YAxis stroke="hsl(var(--muted-foreground))" className="dark:stroke-dark-muted-foreground text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'hsl(var(--background))', 
                            borderColor: 'hsl(var(--border))',
                        }}
                        wrapperClassName="dark:!bg-dark-background dark:!border-dark-border"
                      />
                      <Legend />
                      <Bar dataKey="hours" fill="hsl(222.2 47.4% 11.2%)" className="dark:fill-dark-primary" radius={[4, 4, 0, 0]} />
                  </BarChart>
              </ResponsiveContainer>
          </div>
      </Card>
    </div>
  );
};

// SVG Icons
const MessageSquareIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
const LayersIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;


export default DashboardPage;
