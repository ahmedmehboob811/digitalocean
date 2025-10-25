import { User } from '../types';

// In a real app, never store passwords in plaintext. This is for demonstration purposes only.
type StoredUser = User & { password?: string };

const ALL_USERS_KEY = 'study_ai_all_users';
const CURRENT_USER_KEY = 'study_ai_current_user';

// Initialize with an empty array if no users are stored
const getStoredUsers = (): StoredUser[] => {
  const usersJson = localStorage.getItem(ALL_USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

const setStoredUsers = (users: StoredUser[]) => {
  localStorage.setItem(ALL_USERS_KEY, JSON.stringify(users));
};

const signUp = (name: string, email: string, password?: string, avatar?: string | null): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getStoredUsers();
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return reject(new Error('User with this email already exists.'));
      }

      const newUser: StoredUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password,
        avatar: avatar || `https://i.pravatar.cc/150?u=${email}`,
        preferences: {
          subjects: [],
          difficulty: 'beginner',
          studyHours: '5 hours per week',
        },
      };

      users.push(newUser);
      setStoredUsers(users);
      
      // Return user without password
      const { password: _, ...userToReturn } = newUser;
      resolve(userToReturn);
    }, 500);
  });
};


const login = (email: string, password?: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getStoredUsers();
      const user = users.find(u => u.email === email);
      
      if (user && user.password === password) {
        // Return user without password
        const { password: _, ...userToReturn } = user;
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToReturn));
        resolve(userToReturn);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
};

const logout = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  if (userJson) {
    try {
      return JSON.parse(userJson) as User;
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      return null;
    }
  }
  return null;
};

export const authService = {
  signUp,
  login,
  logout,
  getCurrentUser,
};
