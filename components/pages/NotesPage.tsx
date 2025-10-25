
import React, { useState, useCallback } from 'react';
import { Note } from '../../types';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Textarea from '../ui/Textarea';
import { useToast } from '../ui/Toast';
import { geminiService } from '../../services/geminiService';
import Spinner from '../ui/Spinner';

const NotesPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const newNote: Note = {
          id: `note-${Date.now()}`,
          title: file.name,
          content: text,
          createdAt: new Date(),
        };
        setNotes([newNote, ...notes]);
        setActiveNote(newNote);
        showToast('Note uploaded successfully!', 'success');
      };
      reader.readAsText(file);
    } else if (file) {
      showToast('Please upload a .txt file.', 'error');
    }
  };

  const handlePasteSubmit = () => {
    if (pastedText.trim() === '') {
        showToast('Please paste some text first.', 'error');
        return;
    }
    const newNote: Note = {
        id: `note-${Date.now()}`,
        title: `Pasted Note ${new Date().toLocaleString()}`,
        content: pastedText,
        createdAt: new Date(),
      };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setPastedText('');
    showToast('Note created successfully!', 'success');
  };
  
  const generateSummary = useCallback(async () => {
    if (!activeNote) return;
    setIsLoading(true);
    try {
      const summary = await geminiService.summarizeText(activeNote.content);
      const updatedNote = { ...activeNote, summary };
      setActiveNote(updatedNote);
      setNotes(notes.map(n => n.id === activeNote.id ? updatedNote : n));
      showToast('Summary generated!', 'success');
    } catch (error) {
      showToast('Failed to generate summary.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [activeNote, notes, showToast]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <Card className="lg:col-span-1 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-dark-foreground">Your Notes</h2>
        <div className="mb-4 space-y-2">
            <label htmlFor="file-upload" className="w-full text-center px-4 py-2 bg-primary text-primary-foreground dark:bg-dark-primary dark:text-dark-primary-foreground rounded-md cursor-pointer hover:bg-primary/90 dark:hover:bg-dark-primary/90 transition-colors block">
                Upload .txt File
            </label>
            <input id="file-upload" type="file" accept=".txt" onChange={handleFileChange} className="hidden" />
            <Textarea 
                placeholder="Or paste your text here..." 
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                className="h-24"
            />
            <Button onClick={handlePasteSubmit} className="w-full">Create Note from Text</Button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {notes.map(note => (
            <div key={note.id} onClick={() => setActiveNote(note)}
                 className={`p-3 rounded-md cursor-pointer border ${activeNote?.id === note.id ? 'bg-accent dark:bg-dark-accent border-primary dark:border-dark-primary' : 'border-border dark:border-dark-border hover:bg-accent/50 dark:hover:bg-dark-accent/50'}`}>
              <h3 className="font-semibold truncate text-foreground dark:text-dark-foreground">{note.title}</h3>
              <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground">{note.createdAt.toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="lg:col-span-2 flex flex-col">
        {activeNote ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-border dark:border-dark-border">
              <h2 className="text-2xl font-bold text-foreground dark:text-dark-foreground">{activeNote.title}</h2>
              <Button onClick={generateSummary} disabled={isLoading}>
                {isLoading ? <Spinner/> : '✨ Generate Summary'}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto">
                <div className="pr-2">
                    <h3 className="font-semibold mb-2 text-lg text-foreground dark:text-dark-foreground">Full Content</h3>
                    <div className="text-sm prose dark:prose-invert max-w-none bg-secondary dark:bg-dark-secondary p-4 rounded-md h-96 overflow-y-auto">
                        {activeNote.content}
                    </div>
                </div>
                <div className="pl-2">
                    <h3 className="font-semibold mb-2 text-lg text-foreground dark:text-dark-foreground">AI Summary</h3>
                    <div className="text-sm prose dark:prose-invert max-w-none bg-secondary dark:bg-dark-secondary p-4 rounded-md h-96 overflow-y-auto">
                        {isLoading ? (
                            <div className="space-y-2">
                                <div className="h-4 bg-muted dark:bg-dark-muted rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-muted dark:bg-dark-muted rounded w-full animate-pulse"></div>
                                <div className="h-4 bg-muted dark:bg-dark-muted rounded w-2/3 animate-pulse"></div>
                            </div>
                        ) : activeNote.summary ? (
                           <div dangerouslySetInnerHTML={{ __html: activeNote.summary.replace(/\*/g, '•') }} />
                        ) : (
                          <p className="text-muted-foreground dark:text-dark-muted-foreground">Click "Generate Summary" to see AI insights.</p>
                        )}
                    </div>
                </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FileTextIcon className="w-16 h-16 text-muted-foreground dark:text-dark-muted-foreground mb-4"/>
            <h2 className="text-xl font-semibold text-foreground dark:text-dark-foreground">Select a note to view</h2>
            <p className="text-muted-foreground dark:text-dark-muted-foreground">Or upload a new one to get started.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;

export default NotesPage;
