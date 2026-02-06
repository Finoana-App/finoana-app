'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';

export function LeftSide() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const cells = gridRef.current.querySelectorAll('.grid-cell');
      gsap.fromTo(
        cells,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="hidden lg:block"
    >
      <div ref={gridRef} className="grid h-150 grid-cols-3 grid-rows-3 gap-3">
        <div className="grid-cell bg-primary col-span-2 row-span-2 flex flex-col justify-between rounded-3xl p-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-primary-foreground/60 mb-4 text-sm tracking-widest uppercase">Community</p>
              <h2 className="text-primary-foreground text-3xl leading-tight font-light">
                Where faith
                <br />
                meets fellowship.
              </h2>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-primary-foreground/20 border-primary-foreground/10 h-8 w-8 rounded-full border"
                />
              ))}
            </div>
            <span className="text-primary-foreground/50 text-sm">2,847 believers</span>
          </motion.div>
        </div>
        <div className="grid-cell bg-secondary flex flex-col justify-center rounded-3xl p-6">
          <p className="text-foreground text-4xl font-extralight">12K</p>
          <p className="text-muted-foreground mt-1 text-xs">Daily prayers</p>
        </div>
        <div className="grid-cell bg-secondary flex flex-col justify-end rounded-3xl p-6">
          <p className="text-muted-foreground text-xs leading-relaxed italic">
            &quot;For where two or three gather...&quot;
          </p>
          <p className="text-muted-foreground/60 mt-2 text-[10px]">Matthew 18:20</p>
        </div>
        <div className="grid-cell bg-primary flex flex-col justify-center rounded-3xl p-6">
          <p className="text-primary-foreground text-2xl font-extralight">847</p>
          <p className="text-primary-foreground/50 mt-1 text-xs">Groups</p>
        </div>
        <div className="grid-cell bg-secondary col-span-2 flex items-center justify-between rounded-3xl p-6">
          <div>
            <p className="text-muted-foreground/60 text-[10px] tracking-wider uppercase">Verse of the Day</p>
            <p className="text-foreground mt-1 text-sm font-light">Trust in the Lord with all your heart...</p>
          </div>
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
            <Heart className="text-primary h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
