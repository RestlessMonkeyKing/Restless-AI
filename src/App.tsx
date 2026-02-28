import React from 'react';
import { useChat } from './hooks/useChat';
import { useAuth } from './hooks/useAuth';
import { MessageList } from './components/MessageList';
import { InputArea } from './components/InputArea';
import { ModelSelector } from './components/ModelSelector';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Trash2, LogIn, LogOut, User, Sparkles, Zap } from 'lucide-react';

import { Toaster } from 'sonner';

function App() {
  const { messages, isLoading, isReady, models, selectedModel, setSelectedModel, sendMessage, clearChat } = useChat();
  const { user, isSignedIn, signIn, signOut, isAuthReady } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] font-sans text-gray-900 selection:bg-[#FFD700]/30 selection:text-black">
      <Toaster position="top-center" richColors />
      {/* Header */}
      <header className="flex-none h-16 bg-white/70 backdrop-blur-2xl border-b border-gray-200/40 sticky top-0 z-20 transition-all duration-300">
        <div className="max-w-4xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF4500] rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 text-white ring-1 ring-white/50"
            >
              <Crown size={20} strokeWidth={2.5} />
            </motion.div>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg tracking-tight text-gray-900 leading-none flex items-center gap-1">
                RestlessMonkey <span className="text-orange-500">King</span> AI
              </h1>
              {models.length > 0 && (
                <div className="mt-0.5 sm:hidden">
                   <ModelSelector models={models} selectedModelId={selectedModel} onSelect={setSelectedModel} />
                </div>
              )}
            </div>
            {models.length > 0 && (
              <div className="hidden sm:block ml-2">
                <ModelSelector models={models} selectedModelId={selectedModel} onSelect={setSelectedModel} />
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {isAuthReady && (
              isSignedIn ? (
                <div className="flex items-center gap-3">
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden sm:flex items-center gap-2 text-xs font-medium text-gray-600 bg-gray-100/80 px-3 py-1.5 rounded-full border border-gray-200/50"
                  >
                    <User size={14} className="text-gray-400" />
                    <span>{user?.username || 'User'}</span>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.05)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={signOut}
                    className="p-2 rounded-full text-gray-500 transition-colors hover:text-red-500"
                    title="Sign Out"
                  >
                    <LogOut size={18} />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => signIn()}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all shadow-sm"
                >
                  <LogIn size={14} />
                  <span>Sign In</span>
                </motion.button>
              )
            )}
            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.05)', rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearChat}
              className="p-2 rounded-full text-gray-500 transition-all hover:text-red-500"
              title="Clear Chat"
            >
              <Trash2 size={18} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto relative">
        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8"
            >
              <div className="relative">
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-24 h-24 bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF4500] rounded-[2rem] shadow-2xl shadow-orange-500/30 flex items-center justify-center relative z-10"
                >
                  <Crown size={48} className="text-white" strokeWidth={1.5} />
                </motion.div>
                <div className="absolute inset-0 bg-orange-400 blur-3xl opacity-20 rounded-full transform scale-150 z-0" />
              </div>

              <div className="space-y-3 max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  RestlessMonkey <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FF4500]">King AI</span>
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed font-medium">
                  Unleash your creativity. I'm ready for anything.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl mt-8">
                {[
                  { icon: Sparkles, text: 'Write a myth about a monkey king' },
                  { icon: Zap, text: 'Explain quantum entanglement simply' },
                  { icon: Crown, text: 'Help me plan a royal feast' },
                  { icon: User, text: 'Roast my resume (upload file)' }
                ].map((item, i) => (
                  <motion.button
                    key={item.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    whileHover={{ scale: 1.02, y: -2, borderColor: '#FFA500' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => sendMessage(item.text)}
                    className="group bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-sm text-left text-gray-600 hover:shadow-md transition-all duration-200 flex items-center gap-3"
                  >
                    <div className="p-2 bg-orange-50 rounded-lg text-orange-500 group-hover:bg-orange-100 transition-colors">
                      <item.icon size={16} />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <MessageList messages={messages} isLoading={isLoading} />
          )}
        </AnimatePresence>
      </main>

      {/* Input Area */}
      <InputArea onSend={sendMessage} isLoading={isLoading} isReady={isReady} />
    </div>
  );
}

export default App;
