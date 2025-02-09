"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SendIcon, RefreshCwIcon } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  type: 'assessment' | 'jobs' | 'resume' | 'interview' | 'change';
  onProgress?: (progress: number) => void;
  className?: string;
}

export function ChatInterface({ type, onProgress, className }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial message based on chat type
    const initialMessage = getInitialMessage(type);
    setMessages([{ role: 'assistant', content: initialMessage }]);
  }, [type]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: 'user' as const, content: input },
      { role: 'assistant' as const, content: getResponse(type, input) },
    ];
    setMessages(newMessages);
    setInput('');

    // Update progress if callback exists
    if (onProgress) {
      const progress = Math.min((newMessages.length / 10) * 100, 100);
      onProgress(progress);
    }
  };

  const handleReset = () => {
    setMessages([{ role: 'assistant', content: getInitialMessage(type) }]);
    if (onProgress) {
      onProgress(0);
    }
  };

  return (
    <Card className={`flex flex-col ${className}`}>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend}>
            <SendIcon className="w-4 h-4" />
          </Button>
          <Button variant="outline" onClick={handleReset}>
            <RefreshCwIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

function getInitialMessage(type: string): string {
  switch (type) {
    case 'assessment':
      return "Welcome to your career assessment! I'll help you discover your ideal career path. Let's start with a simple question: What aspects of work do you find most fulfilling?";
    case 'jobs':
      return "I'll help you find the perfect job opportunities. What kind of role are you looking for?";
    case 'resume':
      return "Let's work on your resume. Would you like to create a new resume or review an existing one?";
    case 'interview':
      return "Ready to practice for your interviews? What type of role are you interviewing for?";
    case 'change':
      return "Thinking about a career change? Tell me about your current role and what's motivating you to make a change.";
    default:
      return "How can I help you with your career today?";
  }
}

function getResponse(type: string, input: string): string {
  // Simplified response logic - in a real application, this would be connected to an AI model
  switch (type) {
    case 'assessment':
      return "That's interesting! Based on what you've shared, you seem to value [aspect]. Let's explore this further. Can you tell me about a time when you felt most engaged at work or during a project?";
    case 'jobs':
      return "I've noted your interests in [field]. Have you considered roles in [related fields]? What specific skills would you like to use in your next position?";
    case 'resume':
      return "Great! I can help you highlight your experiences effectively. What would you say is your most significant professional achievement?";
    case 'interview':
      return "For [role] interviews, you'll likely face questions about [specific skills]. Let's practice: How would you handle [common scenario]?";
    case 'change':
      return "I understand your interest in changing careers. Based on your current role and interests, have you considered [alternative career]? What attracts you to this new direction?";
    default:
      return "I understand. Could you tell me more about that?";
  }
}