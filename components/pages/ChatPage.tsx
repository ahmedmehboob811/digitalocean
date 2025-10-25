import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import { geminiService } from '../../services/geminiService';
import Spinner from '../ui/Spinner';
import { authService } from '../../services/authService';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const getChatHistoryKey = () => {
    const user = authService.getCurrentUser();
    return user ? `chatHistory_${user.email}` : null;
  }

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const chatHistoryKey = getChatHistoryKey();
    if (chatHistoryKey) {
        const savedMessages = localStorage.getItem(chatHistoryKey);
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        } else {
            setMessages([
              { id: '1', text: 'Hello! I am your AI Study Assistant. How can I help you today?', sender: 'ai', timestamp: new Date() }
            ]);
        }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    const chatHistoryKey = getChatHistoryKey();
    if (chatHistoryKey && messages.length > 0) {
        localStorage.setItem(chatHistoryKey, JSON.stringify(messages));
    }
  }, [messages]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const aiResponse = await geminiService.getAIResponse(input);
        const aiMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: aiResponse,
            sender: 'ai',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
        const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: 'Sorry, I had trouble connecting. Please try again.',
            sender: 'ai',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">AI Tutor Chat</h1>
            <p className="text-muted-foreground dark:text-dark-muted-foreground">Ask me anything about your subjects! Your conversation is saved automatically.</p>
        </div>
      <Card className="flex-1 flex flex-col p-0 overflow-hidden">
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0">AI</div>
              )}
              <div className={`max-w-md p-3 rounded-lg shadow-md ${msg.sender === 'user' ? 'bg-primary text-primary-foreground dark:bg-dark-primary dark:text-dark-primary-foreground' : 'bg-secondary dark:bg-dark-secondary'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
               <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0">AI</div>
               <div className="max-w-md p-3 rounded-lg bg-secondary dark:bg-dark-secondary">
                 <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-muted-foreground dark:bg-dark-muted-foreground rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-muted-foreground dark:bg-dark-muted-foreground rounded-full animate-bounce delay-150"></span>
                    <span className="w-2 h-2 bg-muted-foreground dark:bg-dark-muted-foreground rounded-full animate-bounce delay-300"></span>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-border dark:border-dark-border bg-background/80 dark:bg-dark-background/80 backdrop-blur-sm">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? <Spinner /> : <SendIcon className="w-5 h-5" />}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
);


export default ChatPage;
