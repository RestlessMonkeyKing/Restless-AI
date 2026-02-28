import { useState, useRef, useEffect } from 'react';
import { ChatMessage, ChatSession } from '../types';
import { toast } from 'sonner';
import { Model, PRESET_MODELS } from '../data/models';

export type ChatMode = 'coding' | 'playground' | 'math';

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  isReady: boolean;
  models: Model[];
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  mode: ChatMode;
  setMode: (mode: ChatMode) => void;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  sessions: ChatSession[];
  currentSessionId: string;
  createNewSession: (mode?: ChatMode) => void;
  switchSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
}

const STORAGE_KEY = 'monkey_king_chats';

export function useChat(): UseChatReturn {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [models, setModels] = useState<Model[]>(PRESET_MODELS);
  const [selectedModel, setSelectedModelInternal] = useState<string>('gpt-4o-mini');

  const setSelectedModel = (modelId: string) => {
    setSelectedModelInternal(modelId);
    updateCurrentSession({ modelId });
  };

  // Sync selectedModel when switching sessions
  useEffect(() => {
    if (currentSession?.modelId) {
      setSelectedModelInternal(currentSession.modelId);
    }
  }, [currentSessionId]);
  const isStreamingRef = useRef(false);

  // Load sessions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSessions(parsed);
          setCurrentSessionId(parsed[0].id);
        } else {
          createNewSession('math');
        }
      } catch (e) {
        createNewSession('math');
      }
    } else {
      createNewSession('math');
    }
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  }, [sessions]);

  const currentSession = sessions.find(s => s.id === currentSessionId);
  const messages = currentSession?.messages || [];
  const mode = currentSession?.mode || 'math';

  const setMode = (newMode: ChatMode) => {
    // If switching mode, create a new session or switch to the most recent session of that mode
    const recentOfMode = [...sessions].sort((a, b) => b.updatedAt - a.updatedAt).find(s => s.mode === newMode);
    
    if (recentOfMode && recentOfMode.messages.length > 0) {
      setCurrentSessionId(recentOfMode.id);
      // Also update selected model if the session has one
      if (recentOfMode.modelId) {
        setSelectedModel(recentOfMode.modelId);
      }
    } else {
      // Auto-select best model for the mode
      let bestModel = selectedModel;
      if (newMode === 'math') bestModel = 'openai/gpt-5.2';
      else if (newMode === 'coding') bestModel = 'anthropic/claude-3-7-sonnet';
      else if (newMode === 'playground') bestModel = 'openai/gpt-4o-mini';
      
      setSelectedModel(bestModel);
      createNewSession(newMode, bestModel);
    }
  };

  const createNewSession = (newMode: ChatMode = 'math', modelId?: string) => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      mode: newMode,
      modelId: modelId || selectedModel,
      updatedAt: Date.now()
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  };

  const switchSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => {
      const filtered = prev.filter(s => s.id !== sessionId);
      if (filtered.length === 0) {
        // Always keep at least one session
        const newSession: ChatSession = {
          id: crypto.randomUUID(),
          title: 'New Chat',
          messages: [],
          mode: 'math',
          modelId: selectedModel,
          updatedAt: Date.now()
        };
        setCurrentSessionId(newSession.id);
        return [newSession];
      }
      if (currentSessionId === sessionId) {
        setCurrentSessionId(filtered[0].id);
      }
      return filtered;
    });
  };

  const updateCurrentSession = (updates: Partial<ChatSession>) => {
    setSessions(prev => prev.map(s => 
      s.id === currentSessionId ? { ...s, ...updates, updatedAt: Date.now() } : s
    ));
  };

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
                 let rawName = id.split('/').pop() || id;
                 let name = rawName.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
                 
                 // Simplify name: remove dates and technical suffixes
                 name = name
                   .replace(/\d{8}/g, '') // YYYYMMDD
                   .replace(/\d{4}-\d{2}-\d{2}/g, '') // YYYY-MM-DD
                   .replace(/\d{4}/g, (match) => {
                      const num = parseInt(match);
                      return (num >= 2020 && num <= 2030) ? '' : match;
                   })
                   .replace(/Instruct/gi, '')
                   .replace(/Preview/gi, '')
                   .replace(/Latest/gi, '')
                   .replace(/Snapshot/gi, '')
                   .trim()
                   .replace(/\s+/g, ' ');

                 let provider = id.split('/')[0] || 'Other';
                 // Simplify provider: remove "openrouter:" etc.
                 if (provider.includes(':')) {
                   provider = provider.split(':').pop() || provider;
                 }
                 provider = provider.charAt(0).toUpperCase() + provider.slice(1);
                 
                 newModels.push({
                   id,
                   name,
                   provider
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
    const newMessages = [...messages, userMessage];
    
    // Update title if it's the first message
    let newTitle = currentSession?.title || 'New Chat';
    if (messages.length === 0) {
      newTitle = content.slice(0, 30) + (content.length > 30 ? '...' : '');
    }

    updateCurrentSession({ messages: newMessages, title: newTitle });
    setIsLoading(true);
    isStreamingRef.current = true;

    try {
      // Prepare messages for the API
      const enhancedHistory: ChatMessage[] = newMessages.map(m => ({ role: m.role, content: m.content }));
      
      let systemInstruction = '';
      if (mode === 'math') {
        systemInstruction = '\n\n(System Note: You are in MATH MODE. Please format ALL mathematical expressions using LaTeX syntax wrapped in $ symbols for inline math (e.g. $E=mc^2$) and $$ for block math. Provide step-by-step clear explanations for math problems.)';
      } else if (mode === 'coding') {
        systemInstruction = '\n\n(System Note: You are in CODING MODE. Focus on providing clean, efficient, and well-documented code. Use markdown code blocks with appropriate language tags.)';
      } else {
        systemInstruction = '\n\n(System Note: You are in PLAYGROUND MODE. Be creative, engaging, and helpful. Use a friendly tone.)';
      }

      const enhancedUserMessage: ChatMessage = { 
        role: 'user', 
        content: `${content}${systemInstruction}` 
      };
      
      enhancedHistory[enhancedHistory.length - 1] = enhancedUserMessage;

      // Initial placeholder for AI response
      const aiMessagePlaceholder: ChatMessage = { role: 'assistant', content: '' };
      const messagesWithPlaceholder = [...newMessages, aiMessagePlaceholder];
      updateCurrentSession({ messages: messagesWithPlaceholder });

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

        setSessions(prev => prev.map(s => {
          if (s.id === currentSessionId) {
            const updatedMsgs = [...s.messages];
            updatedMsgs[updatedMsgs.length - 1] = { ...updatedMsgs[updatedMsgs.length - 1], content: fullContent };
            return { ...s, messages: updatedMsgs, updatedAt: Date.now() };
          }
          return s;
        }));
      }

    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error(`Error: ${error.message || 'Failed to send message'}`);
      const errorMsg: ChatMessage = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
      updateCurrentSession({ messages: [...newMessages, errorMsg] });
    } finally {
      setIsLoading(false);
      isStreamingRef.current = false;
    }
  };

  const clearChat = () => {
    updateCurrentSession({ messages: [] });
    isStreamingRef.current = false;
  };

  return {
    messages,
    isLoading,
    isReady,
    models,
    selectedModel,
    setSelectedModel,
    mode,
    setMode,
    sendMessage,
    clearChat,
    sessions,
    currentSessionId,
    createNewSession,
    switchSession,
    deleteSession
  };
}
