
import { User } from '../types';

const USER_KEY = 'intellistudy_user';

const mockUser: User = {
  id: 'user_2fA9xJ8yZ7b3qR6c5eF4d3G2h1',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://i.pravatar.cc/150?u=alexjohnson',
  preferences: {
    subjects: ['Mathematics', 'Physics', 'Computer Science'],
    difficulty: 'intermediate',
    studyHours: '10-15 hours/week'
  }
};

const login = (email: string, password: string):Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
        resolve(mockUser);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
};

const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem(USER_KEY);
      resolve();
    }, 300);
  });
};

const getUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userJson = localStorage.getItem(USER_KEY);
      if (userJson) {
        resolve(JSON.parse(userJson) as User);
      } else {
        resolve(null);
      }
    }, 200);
  });
};

const updateUser = (userData: Partial<User>): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const currentUser = await getUser();
            if (currentUser) {
                const updatedUser = { ...currentUser, ...userData, preferences: {...currentUser.preferences, ...userData.preferences}};
                localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
                resolve(updatedUser);
            } else {
                reject(new Error("No user found to update"));
            }
        }, 500);
    });
};

export const mockAuthService = {
  login,
  logout,
  getUser,
  updateUser,
};
