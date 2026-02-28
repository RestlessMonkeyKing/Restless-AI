import React from 'react';
import { motion } from 'motion/react';

export const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 h-6 px-2">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="w-2 h-2 bg-orange-400 rounded-full"
          animate={{
            y: ["0%", "-50%", "0%"],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot * 0.15
          }}
        />
      ))}
    </div>
  );
};
