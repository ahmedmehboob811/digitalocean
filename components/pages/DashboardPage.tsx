import React from 'react';
import { authService } from '../../services/authService';
import Card from '../ui/Card';

const DashboardPage: React.FC = () => {
  const user = authService.getCurrentUser();

  // Gracefully handle the display name, defaulting to 'there' if no name is available.
  const displayName = user?.name ? user.name.split(' ')[0] : 'there';

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-foreground dark:text-dark-foreground">Welcome back, {displayName}!</h1>
      <p className="text-muted-foreground dark:text-dark-muted-foreground mb-8">Here's a quick overview of your study space.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-2">My Subjects</h2>
          <ul className="list-disc list-inside text-muted-foreground dark:text-dark-muted-foreground">
            {user?.preferences.subjects.map(subject => <li key={subject}>{subject}</li>)}
          </ul>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-2">Study Goal</h2>
          <p className="text-3xl font-bold text-primary dark:text-dark-primary">{user?.preferences.studyHours}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-2">Difficulty Level</h2>
          <p className="text-lg capitalize bg-accent dark:bg-dark-accent text-accent-foreground dark:text-dark-accent-foreground px-3 py-1 rounded-full inline-block">{user?.preferences.difficulty}</p>
        </Card>
      </div>

      <Card className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <p className="text-muted-foreground dark:text-dark-muted-foreground">Navigate using the sidebar to start a chat, create notes, or generate a quiz.</p>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;