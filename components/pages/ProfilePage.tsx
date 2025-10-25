
import React, { useState } from 'react';
import { authService } from '../../services/authService';
import { User } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import { useToast } from '../ui/Toast';

const ProfilePage: React.FC = () => {
  const currentUser = authService.getCurrentUser();
  const [user, setUser] = useState<User | null>(currentUser);
  const { showToast } = useToast();

  if (!user) {
    return <p>Loading user profile...</p>;
  }

  const handleSave = () => {
    // In a real app, this would make an API call.
    // For now, we just show a toast message.
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">Your Profile</h1>
        <p className="text-muted-foreground dark:text-dark-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      
      <Card>
        <div className="flex items-center space-x-6 mb-8">
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">User Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                        <Input id="name" value={user.name} disabled />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <Input id="email" value={user.email} disabled />
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Study Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="subjects" className="block text-sm font-medium mb-1">Subjects</label>
                        <Input id="subjects" value={user.preferences.subjects.join(', ')} onChange={(e) => setUser({...user, preferences: {...user.preferences, subjects: e.target.value.split(',').map(s => s.trim()) }})} />
                    </div>
                    <div>
                        <label htmlFor="hours" className="block text-sm font-medium mb-1">Weekly Study Hours</label>
                        <Input id="hours" value={user.preferences.studyHours} onChange={(e) => setUser({...user, preferences: {...user.preferences, studyHours: e.target.value }})}/>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleSave}>Save Changes</Button>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
