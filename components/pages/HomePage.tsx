
import React from 'react';
import Button from '../ui/Button';

interface HomePageProps {
  onLogin: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-border dark:border-dark-border transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 dark:bg-dark-primary/20 text-primary dark:text-dark-primary rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-dark-foreground">{title}</h3>
    <p className="text-muted-foreground dark:text-dark-muted-foreground">{description}</p>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary dark:text-dark-primary">IntelliStudy</h1>
        <Button onClick={onLogin}>Sign In</Button>
      </header>
      
      <main>
        {/* Hero Section */}
        <section className="text-center py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-4">Supercharge Your Learning with AI</h2>
            <p className="text-lg lg:text-xl text-muted-foreground dark:text-dark-muted-foreground max-w-3xl mx-auto mb-8">
              IntelliStudy is your personal AI-powered study assistant. From summarizing notes to generating quizzes, we've got you covered.
            </p>
            <Button onClick={onLogin} size="lg" className="text-lg">Get Started for Free</Button>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 bg-secondary dark:bg-dark-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold">All-in-One Study Platform</h2>
              <p className="text-muted-foreground dark:text-dark-muted-foreground mt-2">Everything you need to succeed, in one place.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={<MessageSquareIcon className="w-6 h-6" />}
                title="AI Tutor Chat"
                description="Get instant help and explanations on any subject, anytime."
              />
              <FeatureCard 
                icon={<FileTextIcon className="w-6 h-6" />}
                title="Document Summarizer"
                description="Upload your PDFs and notes to get quick summaries and keywords."
              />
              <FeatureCard 
                icon={<LayersIcon className="w-6 h-6" />}
                title="Smart Flashcards"
                description="Create flashcards manually or let our AI generate them for you."
              />
              <FeatureCard 
                icon={<CalendarIcon className="w-6 h-6" />}
                title="Personalized Planner"
                description="AI-generated study schedules to keep you on track and organized."
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Loved by Students Worldwide</h2>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="bg-card dark:bg-dark-card p-6 rounded-lg text-left shadow-md border border-border dark:border-dark-border">
                <p className="text-muted-foreground dark:text-dark-muted-foreground mb-4">"IntelliStudy has been a game-changer for my exam prep. The AI summaries save me hours of reading!"</p>
                <div className="flex items-center">
                  <img src="https://i.pravatar.cc/150?u=student1" alt="Student 1" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-semibold">Sarah L.</p>
                    <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground">University Student</p>
                  </div>
                </div>
              </div>
              <div className="bg-card dark:bg-dark-card p-6 rounded-lg text-left shadow-md border border-border dark:border-dark-border">
                <p className="text-muted-foreground dark:text-dark-muted-foreground mb-4">"The AI tutor is amazing. It explains complex topics much better than my textbooks. Highly recommended!"</p>
                <div className="flex items-center">
                  <img src="https://i.pravatar.cc/150?u=student2" alt="Student 2" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-semibold">Michael B.</p>
                    <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground">High School Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary dark:bg-dark-secondary py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground dark:text-dark-muted-foreground">
          <p>&copy; 2024 IntelliStudy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// SVG Icons
const MessageSquareIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
const LayersIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;

export default HomePage;
