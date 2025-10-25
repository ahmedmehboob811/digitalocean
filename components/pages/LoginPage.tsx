import React, { useState } from 'react';
import { authService } from '../../services/authService';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import { useToast } from '../ui/Toast';
import Spinner from '../ui/Spinner';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isSignUp) {
      try {
        await authService.signUp(name, email, password, avatar);
        showToast('Account created successfully! Please sign in.', 'success');
        setIsSignUp(false); // Switch to login mode
        setName('');
        setEmail('');
        setPassword('');
        setAvatar(null);
      } catch (error) {
        showToast(error instanceof Error ? error.message : 'Sign up failed.', 'error');
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        await authService.login(email, password);
        onLoginSuccess();
      } catch (error) {
        showToast('Invalid email or password.', 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setName('');
    setEmail('');
    setPassword('');
    setAvatar(null);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background dark:bg-dark-background p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">AI Study Assistant</h1>
          <p className="text-muted-foreground dark:text-dark-muted-foreground">
            {isSignUp ? 'Create a new account' : 'Sign in to continue'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {isSignUp && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Profile Picture</label>
                <div className="flex items-center gap-4">
                  <img
                    src={avatar || `https://api.dicebear.com/8.x/initials/svg?seed=User&backgroundColor=00897b,d81b60,8e24aa,3949ab,e53935`}
                    alt="Avatar Preview"
                    className="w-16 h-16 rounded-full object-cover bg-secondary dark:bg-dark-secondary"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="cursor-pointer rounded-md bg-secondary dark:bg-dark-secondary px-3 py-2 text-sm font-semibold text-secondary-foreground dark:text-dark-secondary-foreground hover:bg-secondary/80 dark:hover:bg-dark-secondary/80"
                  >
                    Upload Image
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
              </div>
               <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Spinner /> : isSignUp ? 'Create Account' : 'Sign In'}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button type="button" onClick={toggleMode} className="font-semibold text-primary dark:text-dark-primary hover:underline ml-1">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
