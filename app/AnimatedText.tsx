"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../components/useInView';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const quote = {
  animate: {
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const singleWord = {
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

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`w-full mx-auto py-3 md:py-2 flex items-center justify-center text-center overflow-hidden dark:text-light ${className}`}
    >
      <motion.h1
        className="inline-block w-full text-dark font-extralight md:text-4xl dark:text-light"
        variants={quote}
        initial="initial"
        animate={inView ? 'animate' : 'initial'}
      >
        {text.split(' ').map((word, index) => (
          <motion.span key={word + '-' + index} className="inline-block" variants={singleWord}>
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default AnimatedText;
