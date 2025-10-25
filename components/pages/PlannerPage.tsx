import React, { useState } from 'react';
import { StudyPlan } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import { geminiService } from '../../services/geminiService';
import Spinner from '../ui/Spinner';
import { useToast } from '../ui/Toast';

const mockPlan: StudyPlan = {
  Monday: ['Study Physics: Chapter 1 (2 hours)', 'Review Math notes (1 hour)'],
  Tuesday: ['History Reading: Chapter 3 (1.5 hours)'],
  Wednesday: ['Physics practice problems (2 hours)', 'Start Math assignment (1 hour)'],
  Thursday: ['History research for essay (1.5 hours)'],
  Friday: ['Review week\'s notes (2 hours)', 'Take practice quiz for Physics'],
  Saturday: [],
  Sunday: ['Plan for the next week (30 mins)'],
};

const PlannerPage: React.FC = () => {
  const [plan, setPlan] = useState<StudyPlan | null>(mockPlan);
  const [subjects, setSubjects] = useState('');
  const [hours, setHours] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjects || !hours) {
        showToast('Please fill in all fields.', 'error');
        return;
    }
    setIsLoading(true);
    setPlan(null);
    try {
        const result = await geminiService.generateStudyPlan(subjects, hours);
        if (result && result.plan) {
            setPlan(result.plan);
        } else {
            throw new Error('Invalid plan format');
        }
    } catch (error) {
        showToast('Failed to generate study plan.', 'error');
    } finally {
        setIsLoading(false);
    }
  };
  
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">AI Study Planner</h1>
            <p className="text-muted-foreground dark:text-dark-muted-foreground">Let AI create a personalized study schedule for you.</p>
        </div>
        
      <Card className="mb-8">
        <form onSubmit={handleGeneratePlan} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <label htmlFor="subjects" className="block text-sm font-medium mb-1 text-foreground dark:text-dark-foreground">Subjects</label>
            <Input id="subjects" value={subjects} onChange={e => setSubjects(e.target.value)} placeholder="e.g., Math, Physics, History" />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="hours" className="block text-sm font-medium mb-1 text-foreground dark:text-dark-foreground">Weekly Study Hours</label>
            <Input id="hours" value={hours} onChange={e => setHours(e.target.value)} placeholder="e.g., 10 hours" />
          </div>
          <div className="md:col-span-1">
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Spinner /> : '✨ Generate Plan'}
            </Button>
          </div>
        </form>
      </Card>
      
      <div>
        {isLoading && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {daysOfWeek.slice(0,4).map(day => (
                     <Card key={day}>
                        <div className="h-6 bg-muted dark:bg-dark-muted rounded w-1/3 mb-4 animate-pulse"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-muted dark:bg-dark-muted rounded w-full animate-pulse"></div>
                            <div className="h-4 bg-muted dark:bg-dark-muted rounded w-5/6 animate-pulse"></div>
                        </div>
                     </Card>
                ))}
            </div>
        )}
        {plan && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {daysOfWeek.map(day => (
              <Card key={day} className="flex flex-col">
                <h3 className="text-lg font-semibold mb-3 text-foreground dark:text-dark-foreground">{day}</h3>
                <ul className="space-y-2 list-disc list-inside text-sm flex-1">
                  {(plan[day] && plan[day].length > 0) ? (
                    plan[day].map((activity, index) => (
                      <li key={index} className="text-muted-foreground dark:text-dark-muted-foreground">{activity}</li>
                    ))
                  ) : (
                    <li className="text-muted-foreground/70 dark:text-dark-muted-foreground/70 italic">Rest Day</li>
                  )}
                </ul>
              </Card>
            ))}
          </div>
        )}
        {!isLoading && !plan && (
            <div className="text-center py-16">
                <CalendarIcon className="w-16 h-16 text-muted dark:text-dark-muted mx-auto mb-4" />
                <p className="text-muted-foreground dark:text-dark-muted-foreground">Your generated study plan will appear here.</p>
            </div>
        )}
      </div>
    </div>
  );
};


const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;

export default PlannerPage;