import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Play, X } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

interface CodeBlockProps {
  language: string;
  value: string;
  canRun?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, value, canRun }) => {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success('Code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  const isWebCode = ['html', 'css', 'javascript', 'js', 'jsx', 'tsx'].includes(language.toLowerCase());
  const shouldShowRun = canRun && isWebCode;

  const runCode = () => {
    setShowPreview(true);
  };

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-[#1e1e1e]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#333]">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{language}</span>
        <div className="flex items-center gap-2">
          {shouldShowRun && (
            <button
              onClick={runCode}
              className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-emerald-400 hover:bg-emerald-400/10 rounded transition-colors"
            >
              <Play size={12} />
              Run
            </button>
          )}
          <button
            onClick={copyToClipboard}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-all"
            title="Copy Code"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>
      </div>
      
      <div className="text-sm">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'var(--font-mono)',
            }
          }}
        >
          {value}
        </SyntaxHighlighter>
      </div>

      <AnimatePresence>
        {showPreview && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-4xl h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Code Preview</h3>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 bg-white">
                <iframe
                  title="preview"
                  className="w-full h-full border-none"
                  srcDoc={`
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <script src="https://cdn.tailwindcss.com"></script>
                        <style>
                          ${language === 'css' ? value : ''}
                        </style>
                      </head>
                      <body>
                        ${language === 'html' ? value : (language === 'javascript' || language === 'js' ? '<div id="root"></div>' : '')}
                        <script>
                          ${(language === 'javascript' || language === 'js') ? value : ''}
                        </script>
                      </body>
                    </html>
                  `}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
