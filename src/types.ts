// Type definitions for Puter.js
// Based on the provided documentation

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | ContentObject[];
  tool_calls?: ToolCall[];
  tool_call_id?: string;
}

export interface ContentObject {
  type: 'text' | 'file';
  text?: string;
  puter_path?: string;
}

export interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

export interface ChatOptions {
  model?: string;
  stream?: boolean;
  max_tokens?: number;
  temperature?: number;
  tools?: any[];
}

export interface PuterAI {
  chat: (
    promptOrMessages: string | ChatMessage[],
    optionsOrImage?: any,
    testModeOrOptions?: any,
    options?: any
  ) => Promise<any>;
  listModels: () => Promise<string[]>;
}

export interface SignInResult {
  user?: {
    username: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface PuterAuth {
  signIn: (options?: { attempt_temp_user_creation?: boolean }) => Promise<SignInResult>;
  signOut: () => Promise<void>;
  user?: {
    username: string;
    [key: string]: any;
  };
  isSignedIn: () => boolean;
}

export interface Puter {
  ai: PuterAI;
  auth: PuterAuth;
  print: (msg: any) => void;
  fs: any;
}

declare global {
  interface Window {
    puter: Puter;
  }
  const puter: Puter;
}
