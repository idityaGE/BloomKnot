'use client'

import React, { useEffect, useState, useCallback } from 'react';
import NumberFlow from '@number-flow/react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const PreLoader = () => {
  const [counter, setCounter] = useState(0);

  const updateCounter = useCallback(() => {
    if (counter === 100) {
      return;
    }

    setCounter(prev => {
      const next = prev + Math.floor(Math.random() * 10) + 1;
      return next > 100 ? 100 : next;
    });

    const delay = Math.floor(Math.random() * 200) + 50;
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

      <div
        className={cn(
          "fixed bottom-10 right-10 text-9xl text-white font-mono",
          counter === 100 ? "opacity-0" : "opacity-100"
        )}
      >
        <NumberFlow value={counter} />
      </div>

      <div className="flex w-full">
        {bars.map((_, index) => (
          <div className='bar w-[10vw] bg-black h-[105vh]' ></div>
        ))}
      </div>

    </div >
  );
};

export default PreLoader;