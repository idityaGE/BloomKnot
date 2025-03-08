'use client'

import { useEffect, useState } from 'react';
import NumberFlow from '@number-flow/react';
import { motion, AnimatePresence } from 'framer-motion';

const PreLoader = () => {
  const [counter, setCounter] = useState(0);
  const [isCounterCompleted, setIsCounterCompleted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Improved counter logic to ensure smooth progression
  useEffect(() => {
    let isMounted = true;

    const updateCounter = () => {
      if (!isMounted) return;

      if (counter >= 100) {
        setTimeout(() => {
          if (isMounted) {
            setIsCounterCompleted(true);
            setTimeout(() => {
              if (isMounted) {
                setIsExiting(true);
              }
            }, 1000);
          }
        }, 500);
        return;
      }

      // Calculate next increment - faster at start, slower near end
      let increment = 1;
      if (counter < 30) increment = Math.floor(Math.random() * 5) + 3;
      else if (counter < 60) increment = Math.floor(Math.random() * 4) + 2;
      else if (counter < 90) increment = Math.floor(Math.random() * 3) + 1;
      else increment = 1;

      // Ensure we don't exceed 100
      const nextValue = Math.min(counter + increment, 100);

      setCounter(nextValue);

      // Adjust timing based on progress
      const delay = counter < 80
        ? Math.floor(Math.random() * 150) + 50
        : Math.floor(Math.random() * 250) + 150; // Slow down near the end

      setTimeout(updateCounter, delay);
    };

    updateCounter();

    return () => {
      isMounted = false;
    };
  }, [counter]);

  // Separate effect for body overflow
  useEffect(() => {
    document.body.style.overflow = isExiting ? 'auto' : 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isExiting]);

  // Use createPortal to ensure preloader is rendered directly on body
  const bars = Array.from({ length: 10 });

  // Only render when not exiting
  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 w-full h-full z-[99999] flex items-center justify-center pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          key="preloader"
          style={{ position: 'fixed', zIndex: 99999 }} // Inline style as a backup
        >
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isCounterCompleted ? 0 : 1 }}
            transition={{ duration: 0.5 }}
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
                className="bar w-[10vw] bg-secondary h-[105vh]"
                variants={{
                  initial: {
                    y: '0%',
                  },
                  animate: {
                    y: '0%',
                  },
                  exit: {
                    y: '-100%',
                    transition: {
                      delay: index * 0.05,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
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
