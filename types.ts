
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: {
    subjects: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    studyHours: string;
  };
}

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export interface Note {
    id: string;
    title: string;
    content: string;
    summary?: string;
    keywords?: string[];
    createdAt: Date;
}

export interface Flashcard {
    id: string;
    question: string;
    answer: string;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    answer: string;
}

export interface Quiz {
    id: string;
    title: string;
    questions: QuizQuestion[];
    sourceNoteId?: string;
}

export interface StudyPlan {
    [day: string]: string[];
}
