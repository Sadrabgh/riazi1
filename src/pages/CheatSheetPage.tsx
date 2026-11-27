import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Printer } from 'lucide-react';
import type { ChapterData, ThemeMode } from '../types';
import { getChapterPalette } from '../utils/themePalette';
import { MathFormula, RichMathText } from '../components/ui/MathText';

interface CheatSheetPageProps {
  chapters: ChapterData[];
  theme: ThemeMode;
  onBackHome: () => void;
  onOpenChapter: (chapterId: string) => void;
}

export function CheatSheetPage({
  chapters,
  theme,
  onBackHome,
  onOpenChapter,
}: CheatSheetPageProps) {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('all');

  const visibleChapters =
    selectedChapterId === 'all'
      ? chapters
      : chapters.filter((ch) => ch.id === selectedChapterId);

  return (
    <div className="max-w-5xl mx-auto px-3.5 sm:px-6 py-6 sm:py-10">
      <div className="no-print flex flex-wrap items-center justify-between gap-3 mb-5">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium cursor-pointer"
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به صفحه اصلی
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer"
          style={{ backgroundColor: 'var(--brand-solid)', color: 'var(--on-brand)' }}
        >
          <Printer className="w-4 h-4" />
          چاپ / ذخیره PDF
        </button>
      </div>

      <header className="mb-6">
        <h1 className="text-xl sm:text-3xl font-bold mb-2 m-0" style={{ color: 'var(--text-primary)' }}>
          برگه خلاصه فرمول‌های ریاضی عمومی ۱
        </h1>
        <p className="text-xs sm:text-base m-0 leading-7" style={{ color: 'var(--text-muted)' }}>
          مرجع سریع تمام روابط، آزمون‌ها و قضیه‌های کلیدی ۷ فصل جزوه برای مرور سریع.
        </p>
      </header>

      {/* Animated Chapter Filter Pills */}
      <div className="no-print flex flex-wrap gap-1.5 sm:gap-2 mb-7">
        <button
          type="button"
          onClick={() => setSelectedChapterId('all')}
          className="relative px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer"
          style={{
            backgroundColor: selectedChapterId === 'all' ? 'transparent' : 'var(--bg-subtle)',
            color: selectedChapterId === 'all' ? 'var(--on-brand)' : 'var(--text-secondary)',
          }}
        >
          {selectedChapterId === 'all' && (
            <motion.span
              layoutId="cs-pill"
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: 'var(--brand-solid)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
          )}
          <span className="relative z-10">همه فصل‌ها</span>
        </button>
        {chapters.map((ch) => {
          const active = selectedChapterId === ch.id;
          const p = getChapterPalette(ch.number, theme);
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => setSelectedChapterId(ch.id)}
              className="relative px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer"
              style={{
                backgroundColor: active ? 'transparent' : 'var(--bg-subtle)',
                color: active ? p.onAccent : 'var(--text-secondary)',
              }}
            >
              {active && (
                <motion.span
                  layoutId="cs-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: p.accentSolid }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">
                فصل {ch.number}: {ch.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Formula Groups */}
      <div className="space-y-8">
        {visibleChapters.map((ch) => {
          const p = getChapterPalette(ch.number, theme);
          return (
            <section key={ch.id} className="space-y-4">
              <div
                className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: p.accent }} />
                  <h2 className="text-base sm:text-lg font-bold m-0" style={{ color: 'var(--text-primary)' }}>
                    فصل {ch.number}: {ch.title}
                  </h2>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    ({ch.pdfPages})
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenChapter(ch.id)}
                  className="no-print text-xs font-bold cursor-pointer"
                  style={{ color: p.accent }}
                >
                  مطالعه فصل ←
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {ch.cheatSheet.map((entry, idx) => (
                  <div
                    key={`${ch.id}-cs-${idx}`}
                    className="surface-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between"
                  >
                    <div className="text-xs font-bold mb-2" style={{ color: p.accent }}>
                      {entry.title}
                    </div>
                    <div className="math-scroll-box math-tray rounded-xl px-3 py-2.5">
                      <MathFormula latex={entry.latex} />
                    </div>
                    {entry.note && (
                      <p className="text-xs leading-6 mt-2.5 mb-0" style={{ color: 'var(--text-muted)' }}>
                        <RichMathText text={entry.note} />
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
