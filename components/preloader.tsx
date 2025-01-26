'use client'

import { useEffect, useState } from 'react';
import NumberFlow from '@number-flow/react';
import { motion, AnimatePresence } from 'framer-motion';

const PreLoader = () => {
  const [counter, setCounter] = useState(0);
  const [isCounterCompleted, setIsCounterCompleted] = useState(false);

  const updateCounter = () => {
    if (counter === 100) {
      setTimeout(() => {
        setIsCounterCompleted(true);
      }, 1000);
      return;
    }

    setCounter((prev) => {
      const next = prev + Math.floor(Math.random() * 10) + 1;
      return next > 100 ? 100 : next;
    });

    const delay = Math.floor(Math.random() * 500) + 50;
    setTimeout(updateCounter, delay);
  }

  useEffect(() => {
    document.body.style.overflow = isCounterCompleted ? 'auto' : 'hidden';
    updateCounter();

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [updateCounter]);

  const bars = Array.from({ length: 10 });

  return (
    <AnimatePresence>
      {!isCounterCompleted && (
        <motion.div
          key="preloader"
          className={`fixed top-0 left-0 z-20 ${isCounterCompleted ? 'overflow-auto' : 'overflow-hidden'}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isCounterCompleted ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-10 right-10 text-9xl text-white font-mono"
          >
            <NumberFlow value={counter} />
          </motion.div>

          <motion.div
            className="flex w-full"
            initial="initial"
            animate={isCounterCompleted ? "exit" : "animate"}
          >
            {bars.map((_, index) => (
              <motion.div
                key={index}
                className="bar w-[10vw] bg-black h-[105vh]"
                variants={{
                  initial: {
                    y: '0%',
                    transition: {
                      delay: index * 0.1,
                      duration: 0.5
                    }
                  },
                  exit: {
                    y: '-100%',
                    transition: {
                      delay: index * 0.1,
                      duration: 0.5
                    }
                  }
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreLoader;