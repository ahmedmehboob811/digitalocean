import React, { useState } from 'react';
import { Quiz, QuizQuestion } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { geminiService } from '../../services/geminiService';
import Spinner from '../ui/Spinner';
import { useToast } from '../ui/Toast';
import Textarea from '../ui/Textarea';

const mockQuiz: Quiz = {
  id: 'quiz-mock-1',
  title: 'World Capitals Quiz',
  questions: [
    {
      question: 'What is the capital of Canada?',
      options: ['Toronto', 'Vancouver', 'Ottawa', 'Montreal'],
      answer: 'Ottawa',
    },
    {
      question: 'What is the capital of Australia?',
      options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
      answer: 'Canberra',
    },
    {
      question: 'What is the capital of Brazil?',
      options: ['Rio de Janeiro', 'São Paulo', 'Salvador', 'Brasília'],
      answer: 'Brasília',
    },
  ],
};

const QuizzesPage: React.FC = () => {
  const [quiz, setQuiz] = useState<Quiz | null>(mockQuiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [sourceText, setSourceText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleGenerateQuiz = async () => {
    if (sourceText.trim() === '') {
        showToast('Please provide some text to generate a quiz from.', 'error');
        return;
    }
    setIsLoading(true);
    try {
        const quizData = await geminiService.generateQuiz(sourceText, 5);
        if (quizData && quizData.questions) {
            setQuiz({ id: 'quiz1', title: 'AI Generated Quiz', questions: quizData.questions });
            setShowResults(false);
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            setScore(0);
        } else {
            throw new Error("Invalid quiz data format");
        }
    } catch (error) {
        showToast('Failed to generate quiz. Please try again.', 'error');
    } finally {
        setIsLoading(false);
    }
  };

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);
    if (option === quiz?.questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const restartQuiz = () => {
    setQuiz(null);
    setSourceText('');
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
  }

  const renderQuizContent = () => {
    if (showResults) {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-xl mb-4">Your Score: {score} / {quiz?.questions.length}</p>
          <Button onClick={restartQuiz}>Generate a New Quiz</Button>
        </div>
      );
    }

    const currentQuestion = quiz?.questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    return (
      <div>
        <h2 className="text-lg font-semibold mb-2">{quiz?.title}</h2>
        <p className="text-sm text-muted-foreground mb-4">Question {currentQuestionIndex + 1}/{quiz?.questions.length}</p>
        <p className="text-xl mb-6">{currentQuestion.question}</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = currentQuestion.answer === option;
            let buttonClass = 'border-border dark:border-dark-border hover:bg-accent dark:hover:bg-dark-accent';
            if (selectedAnswer) {
              if (isSelected && isCorrect) buttonClass = 'bg-green-100 dark:bg-green-900 border-green-500 text-green-800 dark:text-green-200';
              else if (isSelected && !isCorrect) buttonClass = 'bg-red-100 dark:bg-red-900 border-red-500 text-red-800 dark:text-red-200';
              else if (isCorrect) buttonClass = 'bg-green-100 dark:bg-green-900 border-green-500 text-green-800 dark:text-green-200';
            }

            return (
              <button key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={!!selectedAnswer}
                className={`w-full p-4 rounded-md border text-left transition-colors ${buttonClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>
        {selectedAnswer && (
          <Button onClick={handleNextQuestion} className="w-full mt-6">
            {currentQuestionIndex === (quiz?.questions.length || 0) - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        )}
      </div>
    );
  };
  

  return (
    <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">AI Quiz Generator</h1>
            <p className="text-muted-foreground dark:text-dark-muted-foreground">Test your knowledge with an AI-generated quiz.</p>
        </div>
        <Card className="min-h-[32rem] flex flex-col justify-center">
            {quiz ? (
                renderQuizContent()
            ) : (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-dark-foreground">Create a Quiz</h2>
                    <p className="text-muted-foreground dark:text-dark-muted-foreground mb-4">Paste text from your notes below to generate a quiz.</p>
                    <Textarea 
                        value={sourceText}
                        onChange={(e) => setSourceText(e.target.value)}
                        placeholder="Paste your study material here..."
                        className="h-40 mb-4"
                        disabled={isLoading}
                    />
                    <Button onClick={handleGenerateQuiz} disabled={isLoading}>
                        {isLoading ? <Spinner /> : '✨ Generate Quiz'}
                    </Button>
                </div>
            )}
        </Card>
    </div>
  );
};

export default QuizzesPage;