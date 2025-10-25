
import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { mockAuthService } from '../../services/mockAuthService';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import { useToast } from '../ui/Toast';
import Skeleton from '../ui/Skeleton';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await mockAuthService.getUser();
      setUser(currentUser);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (user) {
        if (name === 'name' || name === 'email') {
             setUser({ ...user, [name]: value });
        } else {
             setUser({
                ...user,
                preferences: {
                  ...user.preferences,
                  [name]: name === 'subjects' ? value.split(',').map(s => s.trim()) : value,
                },
              });
        }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    try {
      const updatedUser = await mockAuthService.updateUser(user);
      setUser(updatedUser);
      showToast('Profile updated successfully!', 'success');
    } catch (error) {
      showToast('Failed to update profile.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !user) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-foreground dark:text-dark-foreground">Profile & Preferences</h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-6">
            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-foreground dark:text-dark-foreground">{user.name}</h2>
              <p className="text-muted-foreground dark:text-dark-muted-foreground">{user.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1 text-foreground dark:text-dark-foreground">Full Name</label>
              <Input id="name" name="name" value={user.name} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-foreground dark:text-dark-foreground">Email Address</label>
              <Input id="email" name="email" type="email" value={user.email} onChange={handleInputChange} />
            </div>
          </div>
          
          <hr className="border-border dark:border-dark-border" />
          
          <h3 className="text-lg font-semibold text-foreground dark:text-dark-foreground">Study Preferences</h3>
          
          <div>
            <label htmlFor="subjects" className="block text-sm font-medium mb-1 text-foreground dark:text-dark-foreground">Favorite Subjects</label>
            <Input id="subjects" name="subjects" value={user.preferences.subjects.join(', ')} onChange={handleInputChange} placeholder="e.g., Math, Science, History" />
            <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground mt-1">Separate subjects with a comma.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium mb-1 text-foreground dark:text-dark-foreground">Difficulty Level</label>
              <select id="difficulty" name="difficulty" value={user.preferences.difficulty} onChange={handleInputChange} className="w-full p-2 border rounded-md bg-background dark:bg-dark-background border-border dark:border-dark-border text-foreground dark:text-dark-foreground">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
             <div>
              <label htmlFor="studyHours" className="block text-sm font-medium mb-1 text-foreground dark:text-dark-foreground">Weekly Study Hours</label>
              <Input id="studyHours" name="studyHours" value={user.preferences.studyHours} onChange={handleInputChange} />
            </div>
          </div>
          
          <div className="text-right">
            <Button type="submit" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save Changes'}</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

const ProfileSkeleton: React.FC = () => (
    <div className="max-w-4xl mx-auto">
        <Skeleton className="h-9 w-1/3 mb-6" />
        <Card>
            <div className="space-y-6">
                 <div className="flex items-center space-x-6">
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-5 w-64" />
                    </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2"><Skeleton className="h-5 w-24" /><Skeleton className="h-10 w-full" /></div>
                     <div className="space-y-2"><Skeleton className="h-5 w-24" /><Skeleton className="h-10 w-full" /></div>
                 </div>
                 <Skeleton className="h-px w-full" />
                 <Skeleton className="h-6 w-40" />
                 <div className="space-y-2"><Skeleton className="h-5 w-32" /><Skeleton className="h-10 w-full" /></div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2"><Skeleton className="h-5 w-24" /><Skeleton className="h-10 w-full" /></div>
                     <div className="space-y-2"><Skeleton className="h-5 w-24" /><Skeleton className="h-10 w-full" /></div>
                 </div>
                 <div className="flex justify-end"><Skeleton className="h-10 w-32" /></div>
            </div>
        </Card>
    </div>
)

export default ProfilePage;
