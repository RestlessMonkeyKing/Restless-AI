import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { toast } from 'sonner';
import { Model, PRESET_MODELS } from '../data/models';

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  isReady: boolean;
  models: Model[];
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [models, setModels] = useState<Model[]>(PRESET_MODELS);
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4o-mini');
  const isStreamingRef = useRef(false);

  // Check if Puter.js is loaded and fetch models
  useEffect(() => {
    const checkPuter = async () => {
      if (window.puter) {
        setIsReady(true);
        try {
          if (window.puter.ai.listModels) {
             const availableModels = await window.puter.ai.listModels();
             if (Array.isArray(availableModels) && availableModels.length > 0) {
               // Map fetched strings to Model objects if they don't exist in presets
               const newModels: Model[] = [];
               const existingIds = new Set(PRESET_MODELS.map(m => m.id));
               
               availableModels.forEach((m: any) => {
                 const id = typeof m === 'string' ? m : (m.id || m.puterId);
                 if (!id || existingIds.has(id)) return;
                 
                 // Try to format name nicely
                 let name = id.split('/').pop() || id;
                 name = name.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
                 
                 newModels.push({
                   id,
                   name,
                   provider: id.split('/')[0] || 'Other'
                 });
               });
               
               if (newModels.length > 0) {
                 setModels([...PRESET_MODELS, ...newModels]);
               }
             }
          }
        } catch (error) {
          console.error("Failed to list models", error);
        }
      } else {
        setTimeout(checkPuter, 500);
      }
    };
    checkPuter();
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading || !isReady) return;

    const userMessage: ChatMessage = { role: 'user', content };
    
    // Optimistically add user message
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    isStreamingRef.current = true;

    try {
      // Prepare messages for the API
      // Append instruction to use LaTeX for math to the last user message
      const enhancedHistory: ChatMessage[] = messages.map(m => ({ role: m.role, content: m.content }));
      
      const enhancedUserMessage: ChatMessage = { 
        role: 'user', 
        content: `${content}\n\n(System Note: Please format ALL mathematical expressions using LaTeX syntax wrapped in $ symbols for inline math (e.g. $E=mc^2$) and $$ for block math. Do not use plain text for math.)` 
      };
      
      enhancedHistory.push(enhancedUserMessage);

      // Initial placeholder for AI response
      const aiMessagePlaceholder: ChatMessage = { role: 'assistant', content: '' };
      setMessages((prev) => [...prev, aiMessagePlaceholder]);

      // Call Puter.js
      if (!window.puter) {
        throw new Error('Puter.js is not loaded');
      }

      // Correct signature: chat(messages, testMode, options)
      const response = await window.puter.ai.chat(enhancedHistory, false, { 
        model: selectedModel, 
        stream: true 
      });

      let fullContent = '';

      for await (const part of response) {
        if (!isStreamingRef.current) break;
        
        const text = part?.text || '';
        fullContent += text;

        setMessages((prev) => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          newMessages[lastIndex] = { ...newMessages[lastIndex], content: fullContent };
          return newMessages;
        });
      }

    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error(`Error: ${error.message || 'Failed to send message'}`);
      setMessages((prev) => [
        ...prev, 
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
      isStreamingRef.current = false;
    }
  };

  const clearChat = () => {
    setMessages([]);
    isStreamingRef.current = false;
  };

  return {
    messages,
    isLoading,
    isReady,
    models,
    selectedModel,
    setSelectedModel,
    sendMessage,
    clearChat
  };
}
