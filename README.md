# 📚 AI-Powered Study Assistant

An intelligent, modern, and personalized **AI-Powered Study Assistant** built with **Next.js**, **Clerk Authentication**, and **MongoDB**.  
This platform helps students learn smarter — chat with an AI tutor, generate quizzes, manage notes, create flashcards, and track study progress, all in one place.

---

## 🚀 Features

### 🔐 Authentication (Clerk)
- Secure **Sign Up / Login** via Email, Google, or GitHub.  
- User profile management with avatars and preferences.  
- Protected routes — only logged-in users can access the study dashboard.

### 🧠 AI-Powered Tools
- **AI Tutor Chat** – Ask questions and get instant explanations.  
- **Document Summarizer** – Upload PDFs or notes and get concise AI summaries.  
- **Quiz Generator** – Automatically generate quizzes and flashcards from notes or topics.  
- **AI Study Planner** – Generate weekly personalized study schedules based on user preferences.  
- **Progress Insights** – View analytics and AI-driven learning recommendations.

### 📘 Core Modules
- **Dashboard** – Overview of your progress, goals, and quick access to tools.  
- **Notes & Uploads** – Upload study materials, extract summaries, and save key takeaways.  
- **Flashcards** – Create, edit, and study from AI-generated flashcards.  
- **Quizzes** – Take quizzes generated from your study materials.  
- **Study Planner** – Plan your week with AI-suggested schedules and reminders.  
- **Profile** – Manage account details and study preferences.

### 🌙 UI & UX
- Responsive modern design built with **Tailwind CSS** and **shadcn/ui**.  
- **Dark/Light mode** toggle.  
- Loading states, animations, and polished UX with **Framer Motion**.  
- Toast notifications and modals for smooth user interaction.  
- Charts and progress visuals using **Recharts**.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js, React, Tailwind CSS, shadcn/ui |
| **Authentication** | Clerk |
| **Database** | MongoDB (Mongoose ORM) |
| **AI Integration** | OpenAI API (or Gemini API) |
| **Visualization** | Recharts |
| **Deployment** | Vercel |

---

## 🧩 Project Structure

ai-study-assistant/
│
├── app/ # Next.js App Router Pages
│ ├── dashboard/ # Main dashboard
│ ├── chat/ # AI chat interface
│ ├── notes/ # Notes & file uploads
│ ├── flashcards/ # Flashcards management
│ ├── quizzes/ # Quizzes & results
│ ├── planner/ # Study planner
│ └── profile/ # User profile (Clerk)
│
├── components/ # Reusable UI components
├── lib/ # Utility functions (AI APIs, MongoDB config, etc.)
├── models/ # MongoDB Schemas (User, Note, Quiz, etc.)
├── public/ # Static assets
├── styles/ # Global styles
├── .env.local # Environment variables
└── README.md

yaml
Copy code

---

## 🧰 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-study-assistant.git
cd ai-study-assistant
2. Install Dependencies
bash
Copy code
npm install
# or
yarn install
3. Setup Environment Variables
Create a .env.local file and add:

bash
Copy code
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
4. Run the Development Server
bash
Copy code
npm run dev
Visit http://localhost:3000 in your browser.

5. Deploy
Deploy easily on Vercel.

Add all environment variables in your Vercel dashboard.

📈 Future Improvements
🗣️ Voice-based study assistant (speech-to-text & text-to-speech).

🎯 Leaderboards & study streak tracking.

📱 Mobile app (React Native or Expo).

🧩 Integration with Google Drive & Notion for importing notes.

💬 Real-time group study chat.

🧑‍💻 Contributing
Contributions are welcome!

Fork the repo

Create a new branch (feature/your-feature)

Commit your changes

Push and open a Pull Request
