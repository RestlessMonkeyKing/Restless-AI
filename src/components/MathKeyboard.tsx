import React from 'react';
import katex from 'katex';
import { motion, AnimatePresence } from 'motion/react';

export const SYMBOLS = [
  { label: '\\frac{a}{b}', value: '\\frac{}{}', tooltip: 'Fraction', isComplex: true },
  { label: 'x^2', value: '^{2}', tooltip: 'Superscript', isComplex: true },
  { label: 'x_n', value: '_{}', tooltip: 'Subscript', isComplex: true },
  { label: '\\sqrt{x}', value: '\\sqrt{}', tooltip: 'Square Root', isComplex: true },
  { label: '\\pi', value: '\\pi', tooltip: 'Pi' },
  { label: '\\theta', value: '\\theta', tooltip: 'Theta' },
  { label: '\\alpha', value: '\\alpha', tooltip: 'Alpha' },
  { label: '\\beta', value: '\\beta', tooltip: 'Beta' },
  { label: '\\times', value: '\\times', tooltip: 'Multiply' },
  { label: '\\div', value: '\\div', tooltip: 'Divide' },
  { label: '\\cdot', value: '\\cdot', tooltip: 'Dot' },
  { label: '\\pm', value: '\\pm', tooltip: 'Plus-Minus' },
  { label: '\\approx', value: '\\approx', tooltip: 'Approx' },
  { label: '\\neq', value: '\\neq', tooltip: 'Not Equal' },
  { label: '\\leq', value: '\\leq', tooltip: 'Less or Equal' },
  { label: '\\geq', value: '\\geq', tooltip: 'Greater or Equal' },
  { label: '\\int', value: '\\int', tooltip: 'Integral' },
  { label: '\\sum', value: '\\sum', tooltip: 'Sum' },
  { label: '\\infty', value: '\\infty', tooltip: 'Infinity' },
  { label: '\\rightarrow', value: '\\rightarrow', tooltip: 'Right Arrow' },
  { label: '\\in', value: '\\in', tooltip: 'Element Of' },
  { label: '\\subset', value: '\\subset', tooltip: 'Subset' },
  { label: '\\forall', value: '\\forall', tooltip: 'For All' },
  { label: '\\exists', value: '\\exists', tooltip: 'Exists' },
  { label: '\\partial', value: '\\partial', tooltip: 'Partial Derivative' },
  { label: '\\Delta', value: '\\Delta', tooltip: 'Delta' },
  { label: '\\sin', value: '\\sin', tooltip: 'Sine' },
  { label: '\\cos', value: '\\cos', tooltip: 'Cosine' },
  { label: '\\tan', value: '\\tan', tooltip: 'Tangent' },
  { label: '\\log', value: '\\log', tooltip: 'Log' },
];

interface MathKeyboardProps {
  onInsert: (symbol: string, isComplex?: boolean) => void;
  isOpen: boolean;
}

export const MathKeyboard: React.FC<MathKeyboardProps> = ({ onInsert, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden bg-gray-50/80 backdrop-blur-sm border-t border-gray-200/50"
        >
          <div className="p-2 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5 max-h-[200px] overflow-y-auto custom-scrollbar">
            {SYMBOLS.map((symbol) => (
              <button
                key={symbol.label}
                onClick={() => onInsert(symbol.value, symbol.isComplex)}
                className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 hover:shadow-sm transition-all text-center flex items-center justify-center min-h-[36px] text-gray-700 active:scale-95"
                type="button"
                title={symbol.tooltip}
              >
                <span dangerouslySetInnerHTML={{ __html: katex.renderToString(symbol.label, { throwOnError: false }) }} />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
