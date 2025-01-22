'use client'

import React, { useEffect, useState, useCallback } from 'react';
import NumberFlow from '@number-flow/react';
import { motion } from 'framer-motion';

const PreLoader = () => {
  const [counter, setCounter] = useState(0);
  const [iscompeleted, setIscompeleted] = useState(false)

  const updateCounter = useCallback(() => {
    if (counter === 100) {
      setTimeout(() => {
        setIscompeleted(true)
      }, 500)
      return;
    }

    setCounter(prev => {
      const next = prev + Math.floor(Math.random() * 10) + 1;
      return next > 100 ? 100 : next;
    });

    const delay = Math.floor(Math.random() * 500) + 50;
    setTimeout(updateCounter, delay);
  }, [counter]);

  useEffect(() => {
    updateCounter();
  }, [updateCounter]);

  const bars = Array.from({ length: 10 });

  return (
    <div
      className="fixed top-0 left-0 z-20"
    >

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: iscompeleted ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-10 right-10 text-9xl text-white font-mono"
      >
        <NumberFlow value={counter} />
      </motion.div>

      <motion.div
        animate={{ y: iscompeleted ? '-100%' : '0%' }}
        transition={{ duration: 1 }}
        className="flex w-full"
      >
        {bars.map((_, index) => (
          <div className='bar w-[10vw] bg-black h-[105vh]' ></div>
        ))}
      </motion.div>

    </div >
  );
};

export default PreLoader;