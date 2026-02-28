import React from 'react';
import katex from 'katex';
import { motion, AnimatePresence } from 'motion/react';

export const SYMBOLS = [
  // Basic & Layout
  { label: '\\frac{a}{b}', value: '\\frac{}{}', tooltip: 'Fraction', isComplex: true },
  { label: 'x^2', value: '^{2}', tooltip: 'Superscript', isComplex: true },
  { label: 'x_n', value: '_{}', tooltip: 'Subscript', isComplex: true },
  { label: '\\sqrt{x}', value: '\\sqrt{}', tooltip: 'Square Root', isComplex: true },
  { label: '\\sqrt[n]{x}', value: '\\sqrt[]{}', tooltip: 'n-th Root', isComplex: true },
  
  // Operators
  { label: '\\pm', value: '\\pm', tooltip: 'Plus-Minus' },
  { label: '\\mp', value: '\\mp', tooltip: 'Minus-Plus' },
  { label: '\\times', value: '\\times', tooltip: 'Multiply' },
  { label: '\\div', value: '\\div', tooltip: 'Divide' },
  { label: '\\cdot', value: '\\cdot', tooltip: 'Dot' },
  { label: '\\ast', value: '\\ast', tooltip: 'Asterisk' },
  { label: '\\star', value: '\\star', tooltip: 'Star' },
  { label: '\\circ', value: '\\circ', tooltip: 'Circle' },
  { label: '\\bullet', value: '\\bullet', tooltip: 'Bullet' },
  
  // Relations
  { label: '=', value: '=', tooltip: 'Equal' },
  { label: '\\neq', value: '\\neq', tooltip: 'Not Equal' },
  { label: '\\approx', value: '\\approx', tooltip: 'Approx' },
  { label: '\\sim', value: '\\sim', tooltip: 'Similar' },
  { label: '\\cong', value: '\\cong', tooltip: 'Congruent' },
  { label: '\\propto', value: '\\propto', tooltip: 'Proportional' },
  { label: '<', value: '<', tooltip: 'Less Than' },
  { label: '>', value: '>', tooltip: 'Greater Than' },
  { label: '\\leq', value: '\\leq', tooltip: 'Less or Equal' },
  { label: '\\geq', value: '\\geq', tooltip: 'Greater or Equal' },
  { label: '\\ll', value: '\\ll', tooltip: 'Much Less' },
  { label: '\\gg', value: '\\gg', tooltip: 'Much Greater' },
  
  // Functions & Trig
  { label: '\\log', value: '\\log', tooltip: 'Log' },
  { label: '\\log_b', value: '\\log_{}', tooltip: 'Log with Base', isComplex: true },
  { label: '\\ln', value: '\\ln', tooltip: 'Natural Log' },
  { label: '\\exp', value: '\\exp', tooltip: 'Exponential' },
  { label: '\\sin', value: '\\sin', tooltip: 'Sine' },
  { label: '\\cos', value: '\\cos', tooltip: 'Cosine' },
  { label: '\\tan', value: '\\tan', tooltip: 'Tangent' },
  { label: '\\sin^{-1}', value: '\\sin^{-1}', tooltip: 'Inverse Sine' },
  { label: '\\cos^{-1}', value: '\\cos^{-1}', tooltip: 'Inverse Cosine' },
  { label: '\\tan^{-1}', value: '\\tan^{-1}', tooltip: 'Inverse Tangent' },
  { label: '\\sec', value: '\\sec', tooltip: 'Secant' },
  { label: '\\csc', value: '\\csc', tooltip: 'Cosecant' },
  { label: '\\cot', value: '\\cot', tooltip: 'Cotangent' },
  { label: '\\sinh', value: '\\sinh', tooltip: 'Hyperbolic Sine' },
  { label: '\\cosh', value: '\\cosh', tooltip: 'Hyperbolic Cosine' },
  { label: '\\tanh', value: '\\tanh', tooltip: 'Hyperbolic Tangent' },
  
  // Calculus
  { label: '\\int', value: '\\int', tooltip: 'Integral' },
  { label: '\\int_a^b', value: '\\int_{}^{}', tooltip: 'Definite Integral', isComplex: true },
  { label: '\\oint', value: '\\oint', tooltip: 'Contour Integral' },
  { label: '\\sum', value: '\\sum', tooltip: 'Sum' },
  { label: '\\sum_{i=1}^n', value: '\\sum_{i=1}^{n}', tooltip: 'Summation', isComplex: true },
  { label: '\\prod', value: '\\prod', tooltip: 'Product' },
  { label: '\\lim', value: '\\lim', tooltip: 'Limit' },
  { label: '\\lim_{x \\to \\infty}', value: '\\lim_{x \\to \\infty}', tooltip: 'Limit to Infinity', isComplex: true },
  { label: '\\frac{d}{dx}', value: '\\frac{d}{dx}', tooltip: 'Derivative' },
  { label: '\\frac{d^2}{dx^2}', value: '\\frac{d^2}{dx^2}', tooltip: 'Second Derivative' },
  { label: '\\partial', value: '\\partial', tooltip: 'Partial Derivative' },
  { label: '\\nabla', value: '\\nabla', tooltip: 'Nabla / Gradient' },
  { label: '\\Delta', value: '\\Delta', tooltip: 'Delta' },
  { label: '\\infty', value: '\\infty', tooltip: 'Infinity' },
  
  // Logic & Sets
  { label: '\\forall', value: '\\forall', tooltip: 'For All' },
  { label: '\\exists', value: '\\exists', tooltip: 'Exists' },
  { label: '\\neg', value: '\\neg', tooltip: 'Not' },
  { label: '\\land', value: '\\land', tooltip: 'And' },
  { label: '\\lor', value: '\\lor', tooltip: 'Or' },
  { label: '\\implies', value: '\\implies', tooltip: 'Implies' },
  { label: '\\iff', value: '\\iff', tooltip: 'If and only if' },
  { label: '\\in', value: '\\in', tooltip: 'Element Of' },
  { label: '\\notin', value: '\\notin', tooltip: 'Not Element Of' },
  { label: '\\subset', value: '\\subset', tooltip: 'Subset' },
  { label: '\\subseteq', value: '\\subseteq', tooltip: 'Subset or Equal' },
  { label: '\\cup', value: '\\cup', tooltip: 'Union' },
  { label: '\\cap', value: '\\cap', tooltip: 'Intersection' },
  { label: '\\emptyset', value: '\\emptyset', tooltip: 'Empty Set' },
  
  // Greek Letters
  { label: '\\alpha', value: '\\alpha', tooltip: 'Alpha' },
  { label: '\\beta', value: '\\beta', tooltip: 'Beta' },
  { label: '\\gamma', value: '\\gamma', tooltip: 'Gamma' },
  { label: '\\delta', value: '\\delta', tooltip: 'Delta' },
  { label: '\\epsilon', value: '\\epsilon', tooltip: 'Epsilon' },
  { label: '\\zeta', value: '\\zeta', tooltip: 'Zeta' },
  { label: '\\eta', value: '\\eta', tooltip: 'Eta' },
  { label: '\\theta', value: '\\theta', tooltip: 'Theta' },
  { label: '\\iota', value: '\\iota', tooltip: 'Iota' },
  { label: '\\kappa', value: '\\kappa', tooltip: 'Kappa' },
  { label: '\\lambda', value: '\\lambda', tooltip: 'Lambda' },
  { label: '\\mu', value: '\\mu', tooltip: 'Mu' },
  { label: '\\nu', value: '\\nu', tooltip: 'Nu' },
  { label: '\\xi', value: '\\xi', tooltip: 'Xi' },
  { label: '\\pi', value: '\\pi', tooltip: 'Pi' },
  { label: '\\rho', value: '\\rho', tooltip: 'Rho' },
  { label: '\\sigma', value: '\\sigma', tooltip: 'Sigma' },
  { label: '\\tau', value: '\\tau', tooltip: 'Tau' },
  { label: '\\phi', value: '\\phi', tooltip: 'Phi' },
  { label: '\\chi', value: '\\chi', tooltip: 'Chi' },
  { label: '\\psi', value: '\\psi', tooltip: 'Psi' },
  { label: '\\omega', value: '\\omega', tooltip: 'Omega' },
  { label: '\\Gamma', value: '\\Gamma', tooltip: 'Gamma (Cap)' },
  { label: '\\Lambda', value: '\\Lambda', tooltip: 'Lambda (Cap)' },
  { label: '\\Phi', value: '\\Phi', tooltip: 'Phi (Cap)' },
  { label: '\\Psi', value: '\\Psi', tooltip: 'Psi (Cap)' },
  { label: '\\Omega', value: '\\Omega', tooltip: 'Omega (Cap)' },
  
  // Misc
  { label: '30^\\circ', value: '^\\circ', tooltip: 'Degree' },
  { label: '\\angle', value: '\\angle', tooltip: 'Angle' },
  { label: '\\parallel', value: '\\parallel', tooltip: 'Parallel' },
  { label: '\\perp', value: '\\perp', tooltip: 'Perpendicular' },
  { label: '\\dots', value: '\\dots', tooltip: 'Dots' },
  { label: '\\cdots', value: '\\cdots', tooltip: 'Center Dots' },
  { label: '\\rightarrow', value: '\\rightarrow', tooltip: 'Right Arrow' },
  { label: '\\leftarrow', value: '\\leftarrow', tooltip: 'Left Arrow' },
  { label: '\\uparrow', value: '\\uparrow', tooltip: 'Up Arrow' },
  { label: '\\downarrow', value: '\\downarrow', tooltip: 'Down Arrow' },
  
  // Brackets & Delimiters
  { label: '(', value: '(', tooltip: 'Left Parenthesis' },
  { label: ')', value: ')', tooltip: 'Right Parenthesis' },
  { label: '[', value: '[', tooltip: 'Left Bracket' },
  { label: ']', value: ']', tooltip: 'Right Bracket' },
  { label: '\\{', value: '\\{', tooltip: 'Left Brace' },
  { label: '\\}', value: '\\}', tooltip: 'Right Brace' },
  { label: '\\langle', value: '\\langle', tooltip: 'Left Angle' },
  { label: '\\rangle', value: '\\rangle', tooltip: 'Right Angle' },
  { label: '\\lceil', value: '\\lceil', tooltip: 'Ceiling (Left)' },
  { label: '\\rceil', value: '\\rceil', tooltip: 'Ceiling (Right)' },
  { label: '\\lfloor', value: '\\lfloor', tooltip: 'Floor (Left)' },
  { label: '\\rfloor', value: '\\rfloor', tooltip: 'Floor (Right)' },
  { label: '|x|', value: '| |', tooltip: 'Absolute Value', isComplex: true },
  { label: '\\|x\\|', value: '\\| \\|', tooltip: 'Norm', isComplex: true },
  
  // Sets & Number Systems
  { label: '\\mathbb{R}', value: '\\mathbb{R}', tooltip: 'Real Numbers' },
  { label: '\\mathbb{Z}', value: '\\mathbb{Z}', tooltip: 'Integers' },
  { label: '\\mathbb{Q}', value: '\\mathbb{Q}', tooltip: 'Rational Numbers' },
  { label: '\\mathbb{N}', value: '\\mathbb{N}', tooltip: 'Natural Numbers' },
  { label: '\\mathbb{C}', value: '\\mathbb{C}', tooltip: 'Complex Numbers' },
  
  // More Arrows
  { label: '\\leftrightarrow', value: '\\leftrightarrow', tooltip: 'Left-Right Arrow' },
  { label: '\\Longleftrightarrow', value: '\\Longleftrightarrow', tooltip: 'Double Left-Right Arrow' },
  { label: '\\Longrightarrow', value: '\\Longrightarrow', tooltip: 'Double Right Arrow' },
  { label: '\\Longleftarrow', value: '\\Longleftarrow', tooltip: 'Double Left Arrow' },
  { label: '\\mapsto', value: '\\mapsto', tooltip: 'Maps To' },
  
  // Matrices & Tables
  { label: '\\begin{matrix} a & b \\\\ c & d \\end{matrix}', value: '\\begin{matrix}  &  \\\\  &  \\end{matrix}', tooltip: 'Matrix', isComplex: true },
  { label: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}', value: '\\begin{pmatrix}  &  \\\\  &  \\end{pmatrix}', tooltip: 'Parenthesis Matrix', isComplex: true },
  { label: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}', value: '\\begin{bmatrix}  &  \\\\  &  \\end{bmatrix}', tooltip: 'Bracket Matrix', isComplex: true },
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
