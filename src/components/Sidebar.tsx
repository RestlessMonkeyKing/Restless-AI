import React from 'react';
import { motion } from 'motion/react';
import { Code, Gamepad2, Calculator, X, ChevronRight, MessageSquare, Trash2 } from 'lucide-react';
import { ChatMode } from '../hooks/useChat';
import { ChatSession } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  sessions: ChatSession[];
  currentSessionId: string;
  onSessionSwitch: (id: string) => void;
  onSessionDelete: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  currentMode, 
  onModeChange,
  sessions,
  currentSessionId,
  onSessionSwitch,
  onSessionDelete
}) => {
  const modes = [
    { id: 'math', name: 'Math Mode', icon: Calculator, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'coding', name: 'Coding Mode', icon: Code, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'playground', name: 'Playground', icon: Gamepad2, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Content */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 left-0 h-full w-[280px] bg-white border-r border-gray-200 z-50 flex flex-col shadow-2xl lg:shadow-none"
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-xl tracking-tight text-gray-900">
            Monkey <span className="text-orange-500">Modes</span>
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Modes Section */}
          <div className="p-4 space-y-2">
            <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Select Mode</p>
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  onModeChange(mode.id as ChatMode);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 group ${
                  currentMode === mode.id 
                    ? `${mode.bg} ${mode.color} ring-1 ring-current/20` 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${
                  currentMode === mode.id ? 'bg-white shadow-sm' : 'bg-gray-100 group-hover:bg-white'
                }`}>
                  <mode.icon size={18} />
                </div>
                <span className="font-semibold flex-1 text-left text-sm">{mode.name}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-gray-100 my-2" />

          {/* History Section */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">History</p>
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`group relative flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  currentSessionId === session.id 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => {
                  onSessionSwitch(session.id);
                  if (window.innerWidth < 1024) onClose();
                }}
              >
                <MessageSquare size={16} className={currentSessionId === session.id ? 'text-orange-500' : 'text-gray-400'} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{session.title}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">{session.mode}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSessionDelete(session.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all text-gray-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs font-medium text-gray-500 mb-1">Current Mode</p>
            <p className="text-sm font-bold text-gray-900 capitalize">{currentMode}</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
