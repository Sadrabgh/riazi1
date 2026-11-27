import { motion } from 'framer-motion';

interface ChapterArtworkProps {
  chapterNumber: number;
  accent: string;
}

/**
 * آرت‌ورک برداری انیمیشنی منحصربه‌فرد برای هر یک از ۷ فصل ریاضی عمومی ۱
 */
export function ChapterArtwork({ chapterNumber, accent }: ChapterArtworkProps) {
  return (
    <div
      className="h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center overflow-hidden border"
      style={{ background: `${accent}14`, borderColor: `${accent}30` }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="h-11 w-11" fill="none">
        {chapterNumber === 1 && (
          <g>
            <circle cx="32" cy="32" r="21" stroke={accent} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.55" />
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '32px 32px' }}
            >
              <polygon points="53,32 21.5,50.2 21.5,13.8" stroke={accent} strokeWidth="2" fill={`${accent}22`} />
              <circle cx="53" cy="32" r="3.2" fill={accent} />
              <circle cx="21.5" cy="50.2" r="3.2" fill={accent} />
              <circle cx="21.5" cy="13.8" r="3.2" fill={accent} />
            </motion.g>
          </g>
        )}

        {chapterNumber === 2 && (
          <g>
            <line x1="10" y1="32" x2="54" y2="32" stroke={accent} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.45" />
            <motion.path
              d="M 10 50 Q 26 48 32 32 Q 38 16 54 14"
              stroke={accent}
              strokeWidth="2.4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            />
            <motion.circle
              cx="32"
              cy="32"
              r="5"
              fill="var(--bg-surface)"
              stroke={accent}
              strokeWidth="2.4"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              style={{ transformOrigin: '32px 32px' }}
            />
          </g>
        )}

        {chapterNumber === 3 && (
          <g>
            <path d="M 10 48 Q 32 10 54 44" stroke={accent} strokeWidth="2.3" strokeLinecap="round" />
            <motion.line
              x1="14"
              y1="27"
              x2="50"
              y2="27"
              stroke={accent}
              strokeWidth="2"
              strokeDasharray="4 2"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle cx="32" cy="27" r="3.4" fill={accent} />
          </g>
        )}

        {chapterNumber === 4 && (
          <g>
            {[0, 1, 2, 3, 4].map((i) => {
              const h = [14, 24, 34, 28, 18][i];
              return (
                <motion.rect
                  key={i}
                  x={11 + i * 8.5}
                  y={52 - h}
                  width="7"
                  height={h}
                  rx="1.5"
                  fill={`${accent}33`}
                  stroke={accent}
                  strokeWidth="1.4"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  style={{ transformOrigin: 'bottom' }}
                />
              );
            })}
            <path d="M 10 40 Q 32 10 54 36" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )}

        {chapterNumber === 5 && (
          <g>
            <line x1="8" y1="32" x2="56" y2="32" stroke={accent} strokeWidth="1.2" opacity="0.45" />
            {[16, 26, 36, 46].map((cx, i) => (
              <motion.ellipse
                key={cx}
                cx={cx}
                cy="32"
                rx="5"
                ry={[11, 18, 18, 11][i]}
                stroke={accent}
                strokeWidth="1.8"
                fill={`${accent}14`}
                animate={{ ry: [[11, 18, 18, 11][i], [13, 20, 20, 13][i], [11, 18, 18, 11][i]] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </g>
        )}

        {chapterNumber === 6 && (
          <g>
            <line x1="10" y1="14" x2="54" y2="14" stroke={accent} strokeWidth="1.4" strokeDasharray="3 3" opacity="0.6" />
            {[28, 16, 10, 6, 4].map((w, i) => (
              <motion.rect
                key={i}
                x="12"
                y={48 - i * 8}
                width={w * 1.4}
                height="5.5"
                rx="2"
                fill={accent}
                opacity={1 - i * 0.14}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ transformOrigin: 'left' }}
              />
            ))}
          </g>
        )}

        {chapterNumber === 7 && (
          <g>
            <motion.path
              d="M 32 32 C 48 12, 56 32, 32 32 C 56 32, 48 52, 32 32 C 16 52, 8 32, 32 32 C 8 32, 16 12, 32 32"
              stroke={accent}
              strokeWidth="2"
              fill={`${accent}1A`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
            <circle cx="32" cy="32" r="2.8" fill={accent} />
          </g>
        )}
      </svg>
    </div>
  );
}
