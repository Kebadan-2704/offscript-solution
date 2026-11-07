'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface KineticTextProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delayMs?: number;
  mode?: 'words' | 'chars';
}

/**
 * Modern kinetic text reveal with staggered mask transitions.
 * Inspired by high-end studio typography and editorial design.
 */
export function KineticText({
  children,
  as: Component = 'h2',
  className = '',
  delayMs = 0,
  mode = 'words',
}: KineticTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <Component className={className}>{children}</Component>;
  }

  const items = mode === 'words' ? children.split(' ') : children.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: mode === 'words' ? 0.08 : 0.02,
        delayChildren: delayMs / 1000,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: '105%',
      opacity: 0.1,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const, // Custom crisp ease-out
      },
    },
  };

  return (
    <Component ref={ref as never} className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="inline-flex flex-wrap"
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden pb-[0.06em] mr-[0.25em] last:mr-0"
          >
            <motion.span variants={itemVariants} className="inline-block">
              {item}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
