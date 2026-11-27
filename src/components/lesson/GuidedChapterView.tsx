import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Layers,
  List,
  Printer,
  X,
} from 'lucide-react';
import type { ChapterData, LessonStep, StudyProgress, ThemeMode } from '../../types';
import { computeChapterMastery, computeStepMastery } from '../../utils/mastery';
import { getChapterPalette } from '../../utils/themePalette';
import { ConfirmResetButton } from '../ui/ConfirmResetButton';
import { StepCard } from './StepCard';

interface GuidedChapterViewProps {
  chapter: ChapterData;
  nextChapter: ChapterData | null;
  initialStepIndex: number;
  progress: StudyProgress;
  theme: ThemeMode;
  onStepChange: (stepIndex: number) => void;
  onMarkStepVisited: (chapterId: string, stepId: string, stepIndex: number) => void;
  onCheckpointSolved: (checkpointId: string) => void;
  onExampleViewed: (exampleId: string) => void;
  onToggleExercise: (exerciseId: string) => void;
  onResetStep: (step: LessonStep) => void;
  onResetChapter: (chapter: ChapterData) => void;
  onNavigateChapter: (chapterId: string, stepIndex?: number) => void;
  onBackHome: () => void;
}

export function GuidedChapterView({
  chapter,
  nextChapter,
  initialStepIndex,
  progress,
  theme,
  onStepChange,
  onMarkStepVisited,
  onCheckpointSolved,
  onExampleViewed,
  onToggleExercise,
  onResetStep,
  onResetChapter,
  onNavigateChapter,
  onBackHome,
}: GuidedChapterViewProps) {
  const [stepIndex, setStepIndex] = useState(() =>
    Math.min(Math.max(0, initialStepIndex), chapter.steps.length - 1)
  );
  const [direction, setDirection] = useState(1);
  const [fullViewMode, setFullViewMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const palette = getChapterPalette(chapter.number, theme);
  const nextPalette = nextChapter ? getChapterPalette(nextChapter.number, theme) : null;

  useEffect(() => {
    const safe = Math.min(Math.max(0, initialStepIndex), chapter.steps.length - 1);
    setStepIndex(safe);
  }, [chapter.id, initialStepIndex, chapter.steps.length]);

  const currentStep = chapter.steps[stepIndex];
  const mastery = computeChapterMastery(chapter, progress);

  useEffect(() => {
    if (currentStep) {
      onMarkStepVisited(chapter.id, currentStep.id, stepIndex);
    }
  }, [chapter.id, currentStep, stepIndex, onMarkStepVisited]);

  const goToStep = (nextIdx: number) => {
    const clamped = Math.min(Math.max(0, nextIdx), chapter.steps.length - 1);
    if (clamped === stepIndex) {
      setDrawerOpen(false);
      return;
    }
    setDirection(clamped > stepIndex ? 1 : -1);
    setStepIndex(clamped);
    onStepChange(clamped);
    setDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation in RTL: ArrowLeft = Next, ArrowRight = Previous
  useEffect(() => {
    if (fullViewMode || drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      if (e.key === 'ArrowLeft' && stepIndex < chapter.steps.length - 1) {
        goToStep(stepIndex + 1);
      } else if (e.key === 'ArrowRight' && stepIndex > 0) {
        goToStep(stepIndex - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const isFirst = stepIndex === 0;
  const isLast = stepIndex === chapter.steps.length - 1;

  return (
    <div className="max-w-3xl mx-auto px-3.5 sm:px-6 pt-5 pb-28 sm:py-10">
      {/* Chapter Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-5">
        <button
          type="button"
          onClick={onBackHome}
          className="no-print inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium py-1.5 cursor-pointer"
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowRight className="w-4 h-4" />
          فهرست فصل‌ها
        </button>

        <div className="no-print flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-secondary)',
            }}
          >
            <List className="w-3.5 h-3.5" />
            <span>گام‌ها ({chapter.steps.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setFullViewMode((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            style={{
              backgroundColor: fullViewMode ? palette.accentSoft : 'var(--bg-subtle)',
              color: fullViewMode ? palette.accent : 'var(--text-secondary)',
            }}
          >
            {fullViewMode ? <BookOpen className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {fullViewMode ? 'حالت مرحله‌به‌مرحله' : 'نمایش یکپارچه / چاپ'}
            </span>
            <span className="sm:hidden">{fullViewMode ? 'مرحله‌ای' : 'یکپارچه'}</span>
          </button>

          {fullViewMode && (
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer"
              style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-secondary)' }}
            >
              <Printer className="w-3.5 h-3.5" />
              چاپ
            </button>
          )}
        </div>
      </div>

      {/* Chapter Header Card + Mastery + Chapter Reset */}
      <div className="surface-card rounded-2xl p-4 sm:p-6 mb-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: palette.accent }}
        />
        {theme === 'dark' && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 90% 10%, ${palette.glow}, transparent 58%)`,
            }}
          />
        )}
        <div className="relative z-10 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold mb-1" style={{ color: palette.accent }}>
              <span>فصل {chapter.number}</span>
              <span>•</span>
              <span>{chapter.pdfPages} جزوه</span>
              <span>•</span>
              <span>حدود {chapter.estimatedMinutes} دقیقه</span>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold m-0" style={{ color: 'var(--text-primary)' }}>
              {chapter.title}
            </h1>
            <p className="text-xs sm:text-sm mt-1 mb-0 leading-6" style={{ color: 'var(--text-muted)' }}>
              {chapter.subtitle}
            </p>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2">
            <div
              className="rounded-xl px-3 py-1.5 text-center sm:text-left"
              style={{ backgroundColor: 'var(--bg-subtle)' }}
            >
              <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                تسلط فصل: <strong style={{ color: 'var(--text-primary)' }}>{mastery.tier}</strong>
              </div>
              <div className="text-sm font-bold" style={{ color: palette.accent }}>
                {mastery.percent}٪
              </div>
            </div>
            <ConfirmResetButton
              label="ریست فصل"
              confirmLabel="ریست کل فصل؟"
              compact
              disabled={mastery.percent === 0}
              onConfirm={() => onResetChapter(chapter)}
            />
          </div>
        </div>

        {/* Segmented Progress Bar */}
        {!fullViewMode && (
          <nav aria-label="گام‌های این فصل" className="no-print relative z-10 mt-5">
            <div className="flex items-center gap-1.5">
              {chapter.steps.map((st, idx) => {
                const isActive = idx === stepIndex;
                const sm = computeStepMastery(st, progress);

                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => goToStep(idx)}
                    title={`گام ${idx + 1}: ${st.title}`}
                    aria-label={`گام ${idx + 1}: ${st.title}`}
                    aria-current={isActive ? 'step' : undefined}
                    className="relative flex-1 h-2.5 rounded-full transition-all cursor-pointer overflow-hidden"
                    style={{
                      backgroundColor: isActive
                        ? palette.accent
                        : sm.percent >= 80
                          ? 'var(--success)'
                          : sm.visited
                            ? `${palette.accent}55`
                            : 'var(--border-subtle)',
                      transform: isActive ? 'scaleY(1.3)' : 'scaleY(1)',
                    }}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between gap-2 mt-2 text-[11px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
              <span className="truncate">
                گام {stepIndex + 1} از {chapter.steps.length}: {currentStep.tag}
              </span>
              <span className="hidden sm:inline shrink-0">کلیدهای جهت‌نما برای جابه‌جایی</span>
            </div>
          </nav>
        )}
      </div>

      {/* Main Step Content */}
      {!fullViewMode ? (
        <>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, x: direction > 0 ? -22 : 22 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? 22 : -22 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            >
              <StepCard
                step={currentStep}
                stepIndex={stepIndex}
                totalSteps={chapter.steps.length}
                accent={palette.accent}
                accentSolid={palette.accentSolid}
                accentSoft={palette.accentSoft}
                onAccent={palette.onAccent}
                progress={progress}
                onCheckpointSolved={onCheckpointSolved}
                onExampleViewed={onExampleViewed}
                onToggleExercise={onToggleExercise}
                onResetStep={onResetStep}
              />
            </motion.div>
          </AnimatePresence>

          {/* Desktop Bottom Navigation */}
          <footer
            className="no-print hidden sm:flex mt-10 pt-6 border-t items-center justify-between gap-3"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <button
              type="button"
              disabled={isFirst}
              onClick={() => goToStep(stepIndex - 1)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              <ArrowRight className="w-4 h-4" />
              گام قبلی
            </button>

            {!isLast ? (
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => goToStep(stepIndex + 1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer"
                style={{ backgroundColor: palette.accentSolid, color: palette.onAccent }}
              >
                گام بعدی: {chapter.steps[stepIndex + 1].tag}
                <ArrowLeft className="w-4 h-4" />
              </motion.button>
            ) : nextChapter && nextPalette ? (
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigateChapter(nextChapter.id, 0)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer"
                style={{ backgroundColor: nextPalette.accentSolid, color: nextPalette.onAccent }}
              >
                فصل بعدی: {nextChapter.title}
                <ArrowLeft className="w-4 h-4" />
              </motion.button>
            ) : (
              <button
                type="button"
                onClick={onBackHome}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer"
                style={{ backgroundColor: 'var(--success-solid)', color: 'var(--on-brand)' }}
              >
                <Check className="w-4 h-4" />
                پایان دوره
              </button>
            )}
          </footer>

          {/* Sticky Mobile Bottom Step Bar */}
          <div
            className="no-print sm:hidden fixed bottom-0 left-0 right-0 z-30 border-t backdrop-blur-md px-3 py-2.5"
            style={{
              backgroundColor: 'var(--bg-glass)',
              borderColor: 'var(--border-subtle)',
              paddingBottom: 'max(0.65rem, env(safe-area-inset-bottom))',
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                disabled={isFirst}
                onClick={() => goToStep(stepIndex - 1)}
                className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl text-xs font-bold disabled:opacity-35 cursor-pointer min-h-[44px]"
                style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
              >
                <ArrowRight className="w-4 h-4" />
                قبلی
              </button>

              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold cursor-pointer min-h-[44px]"
                style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
              >
                <List className="w-3.5 h-3.5" style={{ color: palette.accent }} />
                <span>گام {stepIndex + 1} از {chapter.steps.length}</span>
              </button>

              {!isLast ? (
                <button
                  type="button"
                  onClick={() => goToStep(stepIndex + 1)}
                  className="inline-flex items-center justify-center gap-1 px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer min-h-[44px]"
                  style={{ backgroundColor: palette.accentSolid, color: palette.onAccent }}
                >
                  بعدی
                  <ArrowLeft className="w-4 h-4" />
                </button>
              ) : nextChapter && nextPalette ? (
                <button
                  type="button"
                  onClick={() => onNavigateChapter(nextChapter.id, 0)}
                  className="inline-flex items-center justify-center gap-1 px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer min-h-[44px]"
                  style={{ backgroundColor: nextPalette.accentSolid, color: nextPalette.onAccent }}
                >
                  فصل {nextChapter.number}
                  <ArrowLeft className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onBackHome}
                  className="inline-flex items-center justify-center gap-1 px-3.5 py-2.5 rounded-xl text-xs font-bold cursor-pointer min-h-[44px]"
                  style={{ backgroundColor: 'var(--success-solid)', color: 'var(--on-brand)' }}
                >
                  پایان
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-12">
          {chapter.steps.map((st, idx) => (
            <div
              key={st.id}
              className="pb-10 border-b last:border-b-0"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <StepCard
                step={st}
                stepIndex={idx}
                totalSteps={chapter.steps.length}
                accent={palette.accent}
                accentSolid={palette.accentSolid}
                accentSoft={palette.accentSoft}
                onAccent={palette.onAccent}
                progress={progress}
                onCheckpointSolved={onCheckpointSolved}
                onExampleViewed={onExampleViewed}
                onToggleExercise={onToggleExercise}
                printAllMode={true}
                onResetStep={onResetStep}
              />
            </div>
          ))}
        </div>
      )}

      {/* Slide-Over Step Picker Drawer (Mobile + Desktop) */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="no-print fixed inset-0 z-50 flex justify-end"
            style={{ backgroundColor: 'rgba(6, 9, 16, 0.65)', backdropFilter: 'blur(4px)' }}
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 34 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm h-full overflow-y-auto p-5 flex flex-col"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderLeft: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <div>
                  <div className="text-xs font-bold" style={{ color: palette.accent }}>
                    فصل {chapter.number}
                  </div>
                  <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    فهرست گام‌های {chapter.title}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="بستن فهرست گام‌ها"
                  className="p-2 rounded-xl cursor-pointer"
                  style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <ul className="space-y-2 m-0 p-0 list-none flex-1">
                {chapter.steps.map((st, idx) => {
                  const isActive = idx === stepIndex;
                  const sm = computeStepMastery(st, progress);
                  return (
                    <li key={st.id}>
                      <button
                        type="button"
                        onClick={() => goToStep(idx)}
                        className="w-full text-right rounded-xl p-3.5 transition-colors cursor-pointer"
                        style={{
                          backgroundColor: isActive ? palette.accentSoft : 'var(--bg-recessed)',
                          border: `1.5px solid ${isActive ? palette.accent : 'var(--border-subtle)'}`,
                        }}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-bold" style={{ color: isActive ? palette.accent : 'var(--text-muted)' }}>
                            گام {idx + 1} • {st.tag}
                          </span>
                          <span className="text-[11px] font-bold" style={{ color: sm.percent >= 80 ? 'var(--success)' : 'var(--text-muted)' }}>
                            {sm.percent}٪
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm font-bold leading-6" style={{ color: 'var(--text-primary)' }}>
                          {st.title}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
