import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import type { ChapterData, SearchHit } from '../../types';
import { searchAllContent } from '../../utils/search';

interface SearchModalProps {
  open: boolean;
  chapters: ChapterData[];
  onClose: () => void;
  onSelectHit: (hit: SearchHit) => void;
}

export function SearchModal({ open, chapters, onClose, onSelectHit }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      window.setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => searchAllContent(chapters, query), [chapters, query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-3 sm:px-4"
          style={{ backgroundColor: 'rgba(10, 14, 22, 0.58)', backdropFilter: 'blur(5px)' }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="جستجو در درسنامه"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-2xl overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-strong)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div
              className="flex items-center gap-2.5 px-3.5 sm:px-4 py-3.5 border-b"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <Search className="w-5 h-5 shrink-0" style={{ color: 'var(--text-muted)' }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="جستجوی فرمول، قضیه، مثال یا تمرین (مثلاً: لاگرانژ، لوچمن، ناسره)..."
                className="w-full bg-transparent border-0 outline-none text-sm"
                style={{ color: 'var(--text-primary)' }}
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="بستن جستجو"
                className="p-2 rounded-xl cursor-pointer"
                style={{ color: 'var(--text-muted)' }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-2">
              {!query.trim() ? (
                <div className="p-6 text-center text-xs sm:text-sm leading-7" style={{ color: 'var(--text-muted)' }}>
                  عبارت دلخواه را بنویسید تا مستقیم به همان گام، مثال یا تمرین در جزوه بروید.
                </div>
              ) : results.length === 0 ? (
                <div className="p-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                  موردی برای «{query}» پیدا نشد.
                </div>
              ) : (
                <ul className="space-y-1 m-0 p-0 list-none">
                  {results.map((hit, i) => (
                    <li key={`${hit.chapterId}-${hit.stepIndex}-${hit.kind}-${i}`}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectHit(hit);
                          onClose();
                        }}
                        className="w-full text-right rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer hover:bg-[var(--bg-subtle)]"
                      >
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                            {hit.stepTitle}
                          </span>
                          <span
                            className="text-[11px] font-medium px-2 py-0.5 rounded-md shrink-0"
                            style={{
                              backgroundColor: 'var(--brand-soft)',
                              color: 'var(--brand)',
                            }}
                          >
                            {hit.kind}
                          </span>
                        </div>
                        <div className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>
                          فصل {hit.chapterNumber}: {hit.chapterTitle} (گام {hit.stepIndex + 1})
                        </div>
                        <p className="text-xs m-0 truncate" style={{ color: 'var(--text-secondary)' }}>
                          {hit.snippet}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
