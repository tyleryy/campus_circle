import React from "react";
import { motion, Variants } from "framer-motion";

const quote: Variants = {
  animate: {
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const singleLetter: Variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

interface AnimatedLetterProps {
  text: string;
  className?: string;
}

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({
  text,
  className = "",
}) => {
  return (
    <div className="w-full mx-auto py-3 md:py-2 flex items-center justify-center text-center overflow-hidden dark:text-light">
      <motion.h1
        className={`inline-block w-full text-dark font-bold md:text-7xl dark:text-light ${className}`}
        variants={quote}
        initial="initial"
        animate="animate"
      >
        {text.split("").map((letter, index) => (
          <motion.span
            key={letter + "-" + index}
            className="inline-block"
            variants={singleLetter}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default AnimatedLetter;
