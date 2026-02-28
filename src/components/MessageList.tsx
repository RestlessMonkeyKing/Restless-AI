import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { TypingIndicator } from './TypingIndicator';
import { CodeBlock } from './CodeBlock';
import { ChatMode } from '../hooks/useChat';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  mode: ChatMode;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading, mode }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 p-4 space-y-6 sm:p-6">
      <AnimatePresence initial={false}>
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-[#FFD700] to-[#FF8C00] text-white rounded-br-sm font-medium'
                  : 'bg-white text-gray-900 border border-gray-100 rounded-bl-sm'
              }`}
            >
              {msg.content ? (
                <div className={`markdown-body prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-transparent prose-pre:p-0 prose-pre:border-none prose-a:text-orange-500 hover:prose-a:text-orange-600 ${msg.role === 'user' ? 'prose-invert' : ''}`}>
                  <ReactMarkdown
                    remarkPlugins={mode === 'math' ? [remarkMath] : []}
                    rehypePlugins={mode === 'math' ? [rehypeKatex] : []}
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <CodeBlock
                            language={match[1]}
                            value={String(children).replace(/\n$/, '')}
                            canRun={mode === 'coding'}
                          />
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.content as string}
                  </ReactMarkdown>
                </div>
              ) : (
                msg.role === 'assistant' && <TypingIndicator />
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  );
};
