import React, { useState } from 'react';
import { Flashcard } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import { useToast } from '../ui/Toast';

const mockFlashcards: Flashcard[] = [
    { id: 'fc1', question: 'Who invented the World Wide Web?', answer: 'Tim Berners-Lee' },
    { id: 'fc2', question: 'What is the largest ocean on Earth?', answer: 'The Pacific Ocean' },
    { id: 'fc3', question: 'In what year did the Titanic sink?', answer: '1912' },
    { id: 'fc4', question: 'What is the main ingredient in guacamole?', answer: 'Avocado' },
    { id: 'fc5', question: 'Which artist painted the Mona Lisa?', answer: 'Leonardo da Vinci' },
];

const FlashcardsPage: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(mockFlashcards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const { showToast } = useToast();

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };
  
  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };
  
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim() === '' || newAnswer.trim() === '') {
      showToast('Please fill out both question and answer.', 'error');
      return;
    }
    const newCard: Flashcard = {
      id: `fc-${Date.now()}`,
      question: newQuestion,
      answer: newAnswer,
    };
    setFlashcards([...flashcards, newCard]);
    setNewQuestion('');
    setNewAnswer('');
    showToast('Flashcard added!', 'success');
  };

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">Flashcards</h1>
            <p className="text-muted-foreground dark:text-dark-muted-foreground">Review your cards or add new ones.</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-dark-foreground">Review Deck</h2>
            {flashcards.length > 0 ? (
                <>
                    <div className="perspective-1000">
                        <Card 
                            onClick={() => setIsFlipped(!isFlipped)}
                            className={`w-full h-64 flex items-center justify-center text-center p-10 cursor-pointer transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                        >
                            <div className="absolute w-full h-full backface-hidden flex items-center justify-center">
                                <p className="text-xl font-semibold leading-relaxed">{currentCard.question}</p>
                            </div>
                            <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center">
                                <p className="text-lg leading-relaxed">{currentCard.answer}</p>
                            </div>
                        </Card>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <Button variant="outline" onClick={handlePrevCard}>Previous</Button>
                        <span className="text-muted-foreground dark:text-dark-muted-foreground">{currentCardIndex + 1} / {flashcards.length}</span>
                        <Button variant="outline" onClick={handleNextCard}>Next</Button>
                    </div>
                </>
            ) : (
                <Card className="h-64 flex items-center justify-center text-muted-foreground dark:text-dark-muted-foreground">
                    <p>No flashcards yet. Add one to get started!</p>
                </Card>
            )}
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-foreground dark:text-dark-foreground">Add New Card</h2>
          <Card>
            <form onSubmit={handleAddCard} className="space-y-4">
              <div>
                <label htmlFor="question" className="block text-sm font-medium mb-1 text-foreground dark:text-dark-foreground">Question</label>
                <Input id="question" value={newQuestion} onChange={e => setNewQuestion(e.target.value)} placeholder="e.g., What is React?" />
              </div>
              <div>
                <label htmlFor="answer" className="block text-sm font-medium mb-1 text-foreground dark:text-dark-foreground">Answer</label>
                <Input id="answer" value={newAnswer} onChange={e => setNewAnswer(e.target.value)} placeholder="e.g., A JavaScript library for building user interfaces" />
              </div>
              <Button type="submit" className="w-full">Add Flashcard</Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

// FIX: Added default export for the FlashcardsPage component.
export default FlashcardsPage;