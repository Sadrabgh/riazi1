import { AnimatePresence, motion } from 'framer-motion';

const PARTICLES = [
  { x: -46, y: -38, color: '#0F766E' },
  { x: 48, y: -34, color: '#2563EB' },
  { x: -24, y: -52, color: '#D97706' },
  { x: 26, y: -50, color: '#7C3AED' },
  { x: -56, y: -8, color: '#059669' },
  { x: 58, y: -6, color: '#DC2626' },
  { x: 0, y: -58, color: '#0284C7' },
];

export function CelebrationBurst({ active }: { active: boolean }) {
  return (
    <div className="pointer-events-none relative h-0 w-0 mx-auto overflow-visible" aria-hidden="true">
      <AnimatePresence>
        {active &&
          PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{ background: p.color }}
              initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
              animate={{ x: p.x, y: p.y, scale: [1, 1.3, 0], opacity: [1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.025 }}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
