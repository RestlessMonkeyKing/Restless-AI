import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Calculator, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import katex from 'katex';
import { MathKeyboard, SYMBOLS } from './MathKeyboard';

interface InputAreaProps {
  onSend: (content: string) => void;
  isLoading: boolean;
  isReady: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading, isReady }) => {
  const [showMath, setShowMath] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const getEditorContent = () => {
    if (!editorRef.current) return '';
    let content = '';
    editorRef.current.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        content += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.hasAttribute('data-latex')) {
          content += `$${el.getAttribute('data-latex')}$`;
        } else {
          content += el.textContent;
        }
      }
    });
    return content;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const content = getEditorContent();
    if (content.trim() && !isLoading && isReady) {
      onSend(content);
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
        setIsEmpty(true);
      }
      setShowMath(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const createMathNode = (symbol: string) => {
    const span = document.createElement('span');
    span.contentEditable = 'false';
    span.className = 'inline-block mx-0.5 select-none align-middle text-orange-600 font-medium bg-orange-50 rounded px-0.5';
    span.setAttribute('data-latex', symbol);
    try {
      span.innerHTML = katex.renderToString(symbol, { throwOnError: false });
    } catch (e) {
      span.textContent = symbol;
    }
    return span;
  };

  const handleInput = () => {
    if (!editorRef.current) return;
    
    setIsEmpty(editorRef.current.textContent?.trim() === '');

    // Auto-convert LaTeX patterns (e.g., "\alpha " -> α)
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const node = range.startContainer;

    // Only process text nodes
    if (node.nodeType === Node.TEXT_NODE && node.textContent) {
      const text = node.textContent;
      // Look for pattern: backslash + letters + space at the end of the cursor position
      // We check the text *before* the cursor
      const cursorOffset = range.startOffset;
      const textBeforeCursor = text.slice(0, cursorOffset);
      
      const match = textBeforeCursor.match(/\\([a-zA-Z]+)\s$/);
      
      if (match) {
        const command = match[1]; // e.g., "alpha"
        const fullCommand = `\\${command}`;
        
        // Check if it's a known symbol (excluding complex ones for now to avoid mess)
        const symbol = SYMBOLS.find(s => s.value === fullCommand && !s.isComplex);
        
        if (symbol) {
          // We found a match! Replace it.
          const matchLength = match[0].length; // length of "\alpha "
          const startReplace = cursorOffset - matchLength;
          
          // Split the text node
          const textNode = node as Text;
          const afterText = textNode.splitText(startReplace);
          afterText.textContent = afterText.textContent?.substring(matchLength) || '';
          
          // Create the math node
          const mathNode = createMathNode(symbol.value);
          
          // Insert math node
          textNode.parentNode?.insertBefore(mathNode, afterText);
          
          // Move cursor after the math node
          const newRange = document.createRange();
          newRange.setStart(afterText, 0);
          newRange.setEnd(afterText, 0);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      }
    }
  };

  const insertSymbol = (symbol: string, isComplex?: boolean) => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    
    let node: Node;
    
    if (isComplex) {
      const span = document.createElement('span');
      span.textContent = symbol;
      node = span;
    } else {
      node = createMathNode(symbol);
    }

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && editorRef.current.contains(selection.anchorNode)) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(node);
      range.setStartAfter(node);
      range.setEndAfter(node);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      editorRef.current.appendChild(node);
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    
    setIsEmpty(false);
  };

  // Focus editor on mount/ready
  useEffect(() => {
    if (isReady && editorRef.current) {
      editorRef.current.focus();
    }
  }, [isReady]);

  return (
    <div className="p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 sticky bottom-0 z-10">
      <div className="max-w-4xl mx-auto relative">
        <div 
          className={`relative flex flex-col bg-gray-100/50 rounded-[24px] border border-gray-200 focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-500/10 focus-within:bg-white focus-within:shadow-lg transition-all duration-300 ease-out ${showMath ? 'rounded-b-none border-b-0' : ''}`}
          onClick={() => editorRef.current?.focus()}
        >
          
          <div className="flex items-end gap-2 p-2">
            <div className="pl-3 pb-3 text-orange-500">
              <Sparkles size={20} strokeWidth={2} />
            </div>
            
            <div className="relative w-full flex items-center">
              {isEmpty && (
                <div className="absolute left-2 text-gray-400 pointer-events-none select-none z-10">
                  {isReady ? "Ask the Monkey King..." : "Summoning the King..."}
                </div>
              )}
              <div
                ref={editorRef}
                contentEditable={!isLoading && isReady}
                suppressContentEditableWarning={true}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none focus:ring-0 focus:outline-none py-3 px-2 max-h-[150px] min-h-[48px] text-[16px] text-gray-900 leading-relaxed overflow-y-auto whitespace-pre-wrap break-words"
                role="textbox"
                aria-multiline="true"
                tabIndex={0}
              />
            </div>
            
            <div className="flex gap-1 mb-0.5">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMath(!showMath)}
                className={`p-2.5 rounded-full transition-all duration-200 ${
                  showMath 
                    ? 'bg-orange-100 text-orange-600' 
                    : 'bg-transparent text-gray-400 hover:bg-gray-200/50 hover:text-gray-600'
                }`}
                title="Math Keyboard"
                type="button"
              >
                {showMath ? <X size={18} /> : <Calculator size={18} />}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                disabled={isEmpty || isLoading || !isReady}
                onClick={() => handleSubmit()}
                className={`p-2.5 rounded-full transition-all duration-200 ${
                  !isEmpty 
                    ? 'bg-gradient-to-r from-[#FFD700] to-[#FF4500] text-white shadow-md hover:shadow-lg hover:scale-105' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send size={18} strokeWidth={2.5} className={!isEmpty ? 'ml-0.5' : ''} />
              </motion.button>
            </div>
          </div>
          
          <MathKeyboard isOpen={showMath} onInsert={insertSymbol} />
        </div>
        
        <div className="text-center mt-2">
          <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
            Powered by RestlessMonkey King AI
          </p>
        </div>
      </div>
    </div>
  );
};
