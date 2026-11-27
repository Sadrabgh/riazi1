import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Circle,
  Eye,
  FileText,
  HelpCircle,
  Lightbulb,
  PenTool,
  Sparkles,
} from 'lucide-react';
import type { LessonStep, PracticeExercise, StudyProgress, WorkedExample } from '../../types';
import { computeStepMastery } from '../../utils/mastery';
import { MathFormula, RichMathText } from '../ui/MathText';
import { CelebrationBurst } from '../ui/CelebrationBurst';
import { ConfirmResetButton } from '../ui/ConfirmResetButton';

interface StepCardProps {
  step: LessonStep;
  stepIndex: number;
  totalSteps: number;
  accent: string;
  accentSolid: string;
  accentSoft: string;
  onAccent: string;
  progress: StudyProgress;
  printAllMode?: boolean;
  onCheckpointSolved: (checkpointId: string) => void;
  onExampleViewed: (exampleId: string) => void;
  onToggleExercise: (exerciseId: string) => void;
  onResetStep: (step: LessonStep) => void;
}

type StepStage = 'lesson' | 'examples' | 'exercises';

function ProgressiveWorkedCard({
  badge,
  examTag,
  difficulty,
  question,
  questionLatex,
  hint,
  steps,
  answerLatex,
  accent,
  accentSolid,
  accentSoft,
  onAccent,
  solved,
  onToggleSolved,
  onReveal,
}: {
  badge: string;
  examTag?: string;
  difficulty?: PracticeExercise['difficulty'];
  question: string;
  questionLatex?: string;
  hint: string;
  steps: { label: string; text: string; latex?: string }[];
  answerLatex: string;
  accent: string;
  accentSolid: string;
  accentSoft: string;
  onAccent: string;
  solved?: boolean;
  onToggleSolved?: () => void;
  onReveal?: () => void;
}) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const allRevealed = revealedCount >= steps.length;

  const revealNext = () => {
    const next = Math.min(steps.length, revealedCount + 1);
    setRevealedCount(next);
    if (next === 1 && onReveal) onReveal();
  };

  const revealAll = () => {
    setRevealedCount(steps.length);
    if (onReveal) onReveal();
  };

  const diffStyles: Record<PracticeExercise['difficulty'], { bg: string; color: string }> = {
    پایه: { bg: 'var(--success-bg)', color: 'var(--success-text)' },
    امتحانی: { bg: 'var(--warn-bg)', color: 'var(--warn-text)' },
    چالشی: { bg: 'var(--danger-bg)', color: 'var(--danger-text)' },
  };

  return (
    <motion.div
      layout="position"
      className="surface-card rounded-2xl p-4 sm:p-6 transition-all"
      style={{
        borderColor: solved ? 'var(--success-border)' : 'var(--border-subtle)',
      }}
    >
      {/* Top Meta Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold"
            style={{ backgroundColor: accentSoft, color: accent }}
          >
            {badge}
          </span>
          {difficulty && (
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium"
              style={diffStyles[difficulty]}
            >
              {difficulty}
            </span>
          )}
          {examTag && (
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium"
              style={{
                backgroundColor: 'var(--warn-bg)',
                color: 'var(--warn-text)',
                border: '1px solid var(--warn-border)',
              }}
            >
              {examTag}
            </span>
          )}
        </div>

        <div className="no-print flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-secondary)',
            }}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? 'بستن راهنما' : 'راهنما'}</span>
          </button>

          {onToggleSolved && (
            <motion.button
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={onToggleSolved}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
              style={{
                backgroundColor: solved ? 'var(--success-bg)' : 'var(--bg-subtle)',
                color: solved ? 'var(--success-text)' : 'var(--text-secondary)',
                border: solved ? '1px solid var(--success-border)' : '1px solid transparent',
              }}
            >
              {solved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
              <span>{solved ? 'حل شد' : 'حل کردم'}</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Question */}
      <p className="text-[14.5px] sm:text-[15.5px] leading-8 font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
        <RichMathText text={question} />
      </p>

      {questionLatex && (
        <div className="math-scroll-box math-tray rounded-xl px-3.5 py-2.5 my-2.5">
          <MathFormula latex={questionLatex} />
        </div>
      )}

      {/* Hint Drawer */}
      <AnimatePresence initial={false}>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className="rounded-xl p-3.5 my-3 text-xs sm:text-sm leading-7 flex items-start gap-2"
              style={{
                backgroundColor: 'var(--warn-bg)',
                border: '1px solid var(--warn-border)',
                color: 'var(--warn-text)',
              }}
            >
              <Lightbulb className="w-4 h-4 shrink-0 mt-1" />
              <span>
                <RichMathText text={hint} />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progressive Solution Steps */}
      <div className="space-y-2.5 mt-3.5">
        <AnimatePresence initial={false}>
          {steps.slice(0, revealedCount).map((st, idx) => (
            <motion.div
              key={`${badge}-st-${idx}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="rounded-xl p-3.5 sm:p-4"
              style={{
                backgroundColor: 'var(--bg-recessed)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-5 h-5 rounded-full text-[11px] font-bold inline-flex items-center justify-center shrink-0"
                  style={{ backgroundColor: accentSolid, color: onAccent }}
                >
                  {idx + 1}
                </span>
                <span className="text-xs font-bold" style={{ color: accent }}>
                  {st.label}
                </span>
              </div>
              <p className="text-xs sm:text-sm leading-7 m-0" style={{ color: 'var(--text-secondary)' }}>
                <RichMathText text={st.text} />
              </p>
              {st.latex && (
                <div
                  className="math-scroll-box mt-2 pt-2 border-t"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <MathFormula latex={st.latex} />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="math-scroll-box rounded-xl p-3.5 sm:p-4"
            style={{
              backgroundColor: 'var(--success-bg)',
              border: '1px solid var(--success-border)',
            }}
          >
            <div className="text-xs font-bold mb-1" style={{ color: 'var(--success-text)' }}>
              پاسخ نهایی
            </div>
            <MathFormula latex={answerLatex} />
          </motion.div>
        )}
      </div>

      {/* Reveal Controls */}
      <div
        className="no-print flex flex-wrap items-center gap-2 mt-4 pt-3 border-t"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        {!allRevealed ? (
          <>
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={revealNext}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer"
              style={{ backgroundColor: accentSolid, color: onAccent }}
            >
              <Eye className="w-4 h-4" />
              {revealedCount === 0
                ? steps.length === 1
                  ? 'نمایش راه‌حل کامل'
                  : `شروع حل گام‌به‌گام (${steps.length} مرحله)`
                : `مرحله ${revealedCount + 1} از ${steps.length}`}
            </motion.button>
            {steps.length > 1 && (
              <button
                type="button"
                onClick={revealAll}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                نمایش کامل حل
              </button>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={() => setRevealedCount(0)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-muted)',
            }}
          >
            <ChevronDown className="w-3.5 h-3.5 rotate-180" />
            بستن راه‌حل
          </button>
        )}
      </div>
    </motion.div>
  );
}

export function StepCard({
  step,
  stepIndex,
  totalSteps,
  accent,
  accentSolid,
  accentSoft,
  onAccent,
  progress,
  printAllMode = false,
  onCheckpointSolved,
  onExampleViewed,
  onToggleExercise,
  onResetStep,
}: StepCardProps) {
  const [stage, setStage] = useState<StepStage>('lesson');
  const [exampleIdx, setExampleIdx] = useState(0);
  const [exampleDir, setExampleDir] = useState(1);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [exerciseDir, setExerciseDir] = useState(1);
  const [exerciseFilter, setExerciseFilter] = useState<'all' | 'exam' | 'unsolved'>('all');

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [wrongShake, setWrongShake] = useState(false);
  const [justCelebrated, setJustCelebrated] = useState(false);

  useEffect(() => {
    setStage('lesson');
    setExampleIdx(0);
    setExerciseIdx(0);
    setExerciseFilter('all');
    setSelectedOption(null);
  }, [step.id]);

  const examples = step.examples ?? [];
  const exercises = step.exercises ?? [];

  const filteredExercises = exercises.filter((pr) => {
    if (exerciseFilter === 'exam') return Boolean(pr.examTag);
    if (exerciseFilter === 'unsolved') return !progress.solvedExercises.includes(pr.id);
    return true;
  });

  useEffect(() => {
    if (exerciseIdx >= filteredExercises.length && filteredExercises.length > 0) {
      setExerciseIdx(0);
    }
  }, [exerciseFilter, filteredExercises.length, exerciseIdx]);

  const stepMastery = computeStepMastery(step, progress);

  const isCheckpointAlreadySolved = step.checkpoint
    ? progress.solvedCheckpoints.includes(step.checkpoint.id)
    : false;

  const effectiveSelected =
    selectedOption !== null
      ? selectedOption
      : isCheckpointAlreadySolved && step.checkpoint
        ? step.checkpoint.correctIndex
        : null;

  const isCorrectSelection =
    step.checkpoint !== undefined && effectiveSelected === step.checkpoint.correctIndex;

  const handleOptionSelect = (idx: number) => {
    if (!step.checkpoint) return;
    setSelectedOption(idx);
    if (idx === step.checkpoint.correctIndex) {
      if (!isCheckpointAlreadySolved) {
        setJustCelebrated(true);
        window.setTimeout(() => setJustCelebrated(false), 1200);
      }
      onCheckpointSolved(step.checkpoint.id);
    } else {
      setWrongShake(true);
      window.setTimeout(() => setWrongShake(false), 420);
    }
  };

  const hasExamExercises = exercises.some((pr) => Boolean(pr.examTag));

  const availableStages: { id: StepStage; label: string; count?: number; icon: typeof BookOpen }[] = [
    { id: 'lesson', label: '۱. درسنامه', icon: BookOpen },
    ...(examples.length > 0
      ? [{ id: 'examples' as const, label: '۲. مثال‌ها', count: examples.length, icon: FileText }]
      : []),
    ...(exercises.length > 0
      ? [
          {
            id: 'exercises' as const,
            label: examples.length > 0 ? '۳. تمرین‌ها' : '۲. تمرین‌ها',
            count: exercises.length,
            icon: PenTool,
          },
        ]
      : []),
  ];

  const jumpExample = (next: number) => {
    const safe = Math.min(Math.max(0, next), examples.length - 1);
    setExampleDir(safe >= exampleIdx ? 1 : -1);
    setExampleIdx(safe);
  };

  const jumpExercise = (next: number) => {
    const safe = Math.min(Math.max(0, next), filteredExercises.length - 1);
    setExerciseDir(safe >= exerciseIdx ? 1 : -1);
    setExerciseIdx(safe);
  };

  const activeBadgeBg = 'rgba(255,255,255,0.18)';

  const renderLessonContent = () => (
    <div className="space-y-6">
      {/* Plain-Persian Intuition */}
      <section className="surface-card rounded-2xl p-5 sm:p-7 space-y-3.5">
        {step.intuition.split('\n\n').map((para, idx) => (
          <p key={idx} className="lesson-prose m-0">
            <RichMathText text={para} />
          </p>
        ))}
      </section>

      {/* Atomic Formula Cards */}
      {step.formulas && step.formulas.length > 0 && (
        <section className="space-y-3" aria-label="فرمول‌های کلیدی این گام">
          {step.formulas.map((f, idx) => (
            <motion.div
              key={`${step.id}-f-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.26 }}
              className="surface-card rounded-2xl p-4 sm:p-6 relative overflow-hidden"
            >
              <div
                className="absolute top-0 bottom-0 right-0 w-1.5"
                style={{ backgroundColor: accent }}
              />
              <div className="pr-3">
                <h3 className="text-xs sm:text-sm font-bold mb-2.5 m-0" style={{ color: accent }}>
                  {f.title}
                </h3>
                <div className="math-scroll-box math-tray rounded-xl px-3 sm:px-4 py-3 mb-2.5">
                  <MathFormula latex={f.latex} />
                </div>
                <p className="text-xs sm:text-sm leading-7 m-0" style={{ color: 'var(--text-secondary)' }}>
                  <RichMathText text={f.plainExplain} />
                </p>
              </div>
            </motion.div>
          ))}
        </section>
      )}

      {/* Optional Reference Table */}
      {step.table && (
        <section className="surface-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-xs sm:text-sm">
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-subtle)' }}>
                  {step.table.headers.map((h, idx) => (
                    <th
                      key={idx}
                      className="px-3.5 sm:px-4 py-3 font-bold border-b whitespace-nowrap"
                      style={{
                        color: 'var(--text-primary)',
                        borderColor: 'var(--border-subtle)',
                      }}
                    >
                      <RichMathText text={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.table.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="border-b last:border-b-0"
                    style={{ borderColor: 'var(--border-subtle)' }}
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className="px-3.5 sm:px-4 py-2.5 leading-7"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <RichMathText text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Tip / Trap Callouts */}
      {step.tip && (
        <aside
          className="rounded-2xl p-4 sm:p-5 flex items-start gap-3"
          style={{
            backgroundColor: 'var(--success-bg)',
            border: '1px solid var(--success-border)',
          }}
        >
          <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--success)' }} />
          <div>
            <h3 className="text-xs sm:text-sm font-bold mb-1 m-0" style={{ color: 'var(--success-text)' }}>
              {step.tip.title}
            </h3>
            <p className="text-xs sm:text-sm leading-7 m-0" style={{ color: 'var(--success-text)' }}>
              <RichMathText text={step.tip.body} />
            </p>
          </div>
        </aside>
      )}

      {step.trap && (
        <aside
          className="rounded-2xl p-4 sm:p-5 flex items-start gap-3"
          style={{
            backgroundColor: 'var(--danger-bg)',
            border: '1px solid var(--danger-border)',
          }}
        >
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--danger)' }} />
          <div>
            <h3 className="text-xs sm:text-sm font-bold mb-1 m-0" style={{ color: 'var(--danger-text)' }}>
              {step.trap.title}
            </h3>
            <p className="text-xs sm:text-sm leading-7 m-0" style={{ color: 'var(--danger-text)' }}>
              <RichMathText text={step.trap.body} />
            </p>
          </div>
        </aside>
      )}

      {/* Interactive Checkpoint */}
      {step.checkpoint && (
        <motion.section
          animate={wrongShake ? { x: [0, -7, 7, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.34 }}
          className="surface-card rounded-2xl p-5 sm:p-6 relative overflow-hidden"
          style={{
            borderColor: isCorrectSelection ? 'var(--success-border)' : 'var(--border-strong)',
          }}
        >
          <CelebrationBurst active={justCelebrated} />

          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: accent }} />
              <span className="text-xs font-bold" style={{ color: accent }}>
                بررسی سریع درک مطلب
              </span>
            </div>
            {isCheckpointAlreadySolved && (
              <span
                className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success-text)' }}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                تثبیت شد
              </span>
            )}
          </div>

          <p className="text-sm sm:text-[15.5px] font-bold leading-8 mb-4" style={{ color: 'var(--text-primary)' }}>
            <RichMathText text={step.checkpoint.prompt} />
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {step.checkpoint.options.map((opt, idx) => {
              const isSelected = effectiveSelected === idx;
              const isRight = idx === step.checkpoint!.correctIndex;
              let borderColor = 'var(--border-subtle)';
              let bgColor = 'var(--bg-recessed)';

              if (isSelected && isRight) {
                borderColor = 'var(--success-border)';
                bgColor = 'var(--success-bg)';
              } else if (isSelected && !isRight) {
                borderColor = 'var(--danger-border)';
                bgColor = 'var(--danger-bg)';
              }

              return (
                <motion.button
                  key={idx}
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleOptionSelect(idx)}
                  className="text-right rounded-xl px-4 py-3 text-xs sm:text-sm leading-7 transition-colors cursor-pointer min-h-[46px]"
                  style={{
                    backgroundColor: bgColor,
                    border: `1.5px solid ${borderColor}`,
                    color: 'var(--text-primary)',
                  }}
                >
                  <RichMathText text={opt} />
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {effectiveSelected !== null && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm leading-7"
                style={{
                  backgroundColor: isCorrectSelection ? 'var(--success-bg)' : 'var(--danger-bg)',
                  color: isCorrectSelection ? 'var(--success-text)' : 'var(--danger-text)',
                }}
              >
                <span className="font-bold ml-1.5">
                  {isCorrectSelection ? 'درست است:' : 'دوباره بررسی کنید:'}
                </span>
                <RichMathText text={step.checkpoint.feedback} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      )}

      {/* CTA to enter one-by-one examples or exercises */}
      {!printAllMode && (examples.length > 0 || exercises.length > 0) && (
        <div className="flex justify-end pt-1">
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setStage(examples.length > 0 ? 'examples' : 'exercises');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer"
            style={{ backgroundColor: accentSolid, color: onAccent }}
          >
            {examples.length > 0
              ? `شروع مثال‌های حل‌شده (${examples.length} مثال)`
              : `شروع تمرین‌های این گام (${exercises.length} تمرین)`}
            <ArrowLeft className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );

  return (
    <article className="space-y-5 sm:space-y-6">
      {/* Step Header + Per-Step Mastery & Reset */}
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
              style={{ backgroundColor: accentSoft, color: accent }}
            >
              گام {stepIndex + 1} از {totalSteps}
            </span>
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-muted)' }}
            >
              {step.tag}
            </span>
          </div>

          <div className="no-print flex items-center gap-2">
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ backgroundColor: 'var(--bg-subtle)', color: accent }}
            >
              تسلط گام: {stepMastery.percent}٪
            </span>
            <ConfirmResetButton
              label="ریست این گام"
              confirmLabel="ریست گام؟"
              compact
              disabled={stepMastery.percent === 0}
              onConfirm={() => {
                setSelectedOption(null);
                onResetStep(step);
              }}
            />
          </div>
        </div>

        <h2
          className="text-xl sm:text-[26px] font-bold leading-snug m-0"
          style={{ color: 'var(--text-primary)' }}
        >
          {step.title}
        </h2>

        {/* 3-Stage Step Switcher (درسنامه ← مثال‌ها ← تمرین‌ها) */}
        {!printAllMode && availableStages.length > 1 && (
          <div
            className="no-print grid gap-1.5 p-1.5 rounded-2xl"
            style={{
              gridTemplateColumns: `repeat(${availableStages.length}, minmax(0, 1fr))`,
              backgroundColor: 'var(--bg-subtle)',
            }}
            role="tablist"
            aria-label="بخش‌های این گام"
          >
            {availableStages.map((s) => {
              const Icon = s.icon;
              const active = stage === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setStage(s.id)}
                  className="relative flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-colors"
                  style={{ color: active ? onAccent : 'var(--text-secondary)' }}
                >
                  {active && (
                    <motion.span
                      layoutId={`stage-tab-${step.id}`}
                      className="absolute inset-0 rounded-xl shadow-xs"
                      style={{ backgroundColor: accentSolid }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 relative z-10 shrink-0 hidden sm:block" />
                  <span className="relative z-10 truncate">{s.label}</span>
                  {s.count !== undefined && (
                    <span
                      className="relative z-10 text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                      style={{
                        backgroundColor: active ? activeBadgeBg : 'var(--bg-surface)',
                        color: active ? onAccent : 'var(--text-muted)',
                      }}
                    >
                      {s.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Guided 3-Stage View vs Print/Unified View */}
      {printAllMode ? (
        <div className="space-y-8">
          {renderLessonContent()}

          {examples.length > 0 && (
            <section className="space-y-3.5">
              <h3 className="text-base font-bold m-0" style={{ color: 'var(--text-primary)' }}>
                مثال‌های حل‌شده جزوه ({examples.length} مثال)
              </h3>
              <div className="space-y-3.5">
                {examples.map((ex: WorkedExample) => (
                  <ProgressiveWorkedCard
                    key={ex.id}
                    badge={`مثال ${ex.number}`}
                    examTag={ex.examTag}
                    question={ex.question}
                    questionLatex={ex.questionLatex}
                    hint={ex.hint}
                    steps={ex.steps}
                    answerLatex={ex.answerLatex}
                    accent={accent}
                    accentSolid={accentSolid}
                    accentSoft={accentSoft}
                    onAccent={onAccent}
                    onReveal={() => onExampleViewed(ex.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {exercises.length > 0 && (
            <section className="space-y-3.5">
              <h3 className="text-base font-bold m-0" style={{ color: 'var(--text-primary)' }}>
                تمرین‌های جزوه با حل کامل ({exercises.length} تمرین)
              </h3>
              <div className="space-y-3.5">
                {exercises.map((pr: PracticeExercise) => (
                  <ProgressiveWorkedCard
                    key={pr.id}
                    badge={`تمرین ${pr.number}`}
                    examTag={pr.examTag}
                    difficulty={pr.difficulty}
                    question={pr.question}
                    questionLatex={pr.questionLatex}
                    hint={pr.hint}
                    steps={pr.steps}
                    answerLatex={pr.answerLatex}
                    accent={accent}
                    accentSolid={accentSolid}
                    accentSoft={accentSoft}
                    onAccent={onAccent}
                    solved={progress.solvedExercises.includes(pr.id)}
                    onToggleSolved={() => onToggleExercise(pr.id)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          {stage === 'lesson' && (
            <motion.div
              key="stage-lesson"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {renderLessonContent()}
            </motion.div>
          )}

          {stage === 'examples' && examples.length > 0 && (
            <motion.section
              key="stage-examples"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Compact Numbered Jump Strip for Examples */}
              <div className="surface-card rounded-2xl p-3 sm:p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                    مثال {exampleIdx + 1} از {examples.length}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    برای پرش مستقیم، شماره مثال را لمس کنید
                  </span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {examples.map((ex, i) => {
                    const active = i === exampleIdx;
                    const viewed = progress.viewedExamples.includes(ex.id);
                    return (
                      <button
                        key={ex.id}
                        type="button"
                        onClick={() => jumpExample(i)}
                        className="shrink-0 min-w-[36px] h-9 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                        style={{
                          backgroundColor: active
                            ? accentSolid
                            : viewed
                              ? 'var(--success-bg)'
                              : 'var(--bg-subtle)',
                          color: active
                            ? onAccent
                            : viewed
                              ? 'var(--success-text)'
                              : 'var(--text-secondary)',
                          border: viewed && !active ? '1px solid var(--success-border)' : '1px solid transparent',
                        }}
                      >
                        {ex.number}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Single Focused Example Card */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={examples[exampleIdx].id}
                  initial={{ opacity: 0, x: exampleDir > 0 ? -18 : 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: exampleDir > 0 ? 18 : -18 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                >
                  <ProgressiveWorkedCard
                    badge={`مثال ${examples[exampleIdx].number}`}
                    examTag={examples[exampleIdx].examTag}
                    question={examples[exampleIdx].question}
                    questionLatex={examples[exampleIdx].questionLatex}
                    hint={examples[exampleIdx].hint}
                    steps={examples[exampleIdx].steps}
                    answerLatex={examples[exampleIdx].answerLatex}
                    accent={accent}
                    accentSolid={accentSolid}
                    accentSoft={accentSoft}
                    onAccent={onAccent}
                    onReveal={() => onExampleViewed(examples[exampleIdx].id)}
                  />
                </motion.div>
              </AnimatePresence>

              {/* One-by-One Example Navigation */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  disabled={exampleIdx === 0}
                  onClick={() => jumpExample(exampleIdx - 1)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                  style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
                >
                  <ArrowRight className="w-4 h-4" />
                  مثال قبلی
                </button>

                {exampleIdx < examples.length - 1 ? (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => jumpExample(exampleIdx + 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer"
                    style={{ backgroundColor: accentSolid, color: onAccent }}
                  >
                    مثال بعدی
                    <ArrowLeft className="w-4 h-4" />
                  </motion.button>
                ) : exercises.length > 0 ? (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setStage('exercises');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer"
                    style={{ backgroundColor: 'var(--success-solid)', color: 'var(--on-brand)' }}
                  >
                    رفتن به تمرین‌ها ({exercises.length} تمرین)
                    <ArrowLeft className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <span className="text-xs font-bold" style={{ color: 'var(--success-text)' }}>
                    پایان مثال‌های این گام
                  </span>
                )}
              </div>
            </motion.section>
          )}

          {stage === 'exercises' && exercises.length > 0 && (
            <motion.section
              key="stage-exercises"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Filter + Compact Numbered Jump Strip for Exercises */}
              <div className="surface-card rounded-2xl p-3 sm:p-3.5 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                    {filteredExercises.length > 0
                      ? `تمرین ${exerciseIdx + 1} از ${filteredExercises.length}`
                      : 'همه تمرین‌های این فیلتر حل شدند'}
                  </span>

                  {exercises.length >= 3 && (
                    <div
                      className="inline-flex items-center gap-1 p-0.5 rounded-xl"
                      style={{ backgroundColor: 'var(--bg-subtle)' }}
                    >
                      {(
                        [
                          { id: 'all', label: 'همه' },
                          ...(hasExamExercises ? [{ id: 'exam' as const, label: 'امتحانی' }] : []),
                          { id: 'unsolved', label: 'حل‌نشده' },
                        ] as const
                      ).map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setExerciseFilter(tab.id)}
                          className="relative px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer"
                          style={{
                            color: exerciseFilter === tab.id ? onAccent : 'var(--text-secondary)',
                          }}
                        >
                          {exerciseFilter === tab.id && (
                            <motion.span
                              layoutId={`ex-filter-${step.id}`}
                              className="absolute inset-0 rounded-lg"
                              style={{ backgroundColor: accentSolid }}
                              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                            />
                          )}
                          <span className="relative z-10">{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {filteredExercises.length > 0 && (
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {filteredExercises.map((pr, i) => {
                      const active = i === exerciseIdx;
                      const solved = progress.solvedExercises.includes(pr.id);
                      return (
                        <button
                          key={pr.id}
                          type="button"
                          onClick={() => jumpExercise(i)}
                          className="shrink-0 min-w-[36px] h-9 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                          style={{
                            backgroundColor: active
                              ? accentSolid
                              : solved
                                ? 'var(--success-bg)'
                                : 'var(--bg-subtle)',
                            color: active
                              ? onAccent
                              : solved
                                ? 'var(--success-text)'
                                : 'var(--text-secondary)',
                            border: solved && !active ? '1px solid var(--success-border)' : '1px solid transparent',
                          }}
                        >
                          {pr.number}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Single Focused Exercise Card */}
              {filteredExercises.length === 0 ? (
                <div className="surface-card rounded-2xl p-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                  همه تمرین‌های این دسته را حل کرده‌اید!
                </div>
              ) : (
                <>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={filteredExercises[exerciseIdx].id}
                      initial={{ opacity: 0, x: exerciseDir > 0 ? -18 : 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: exerciseDir > 0 ? 18 : -18 }}
                      transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                    >
                      <ProgressiveWorkedCard
                        badge={`تمرین ${filteredExercises[exerciseIdx].number}`}
                        examTag={filteredExercises[exerciseIdx].examTag}
                        difficulty={filteredExercises[exerciseIdx].difficulty}
                        question={filteredExercises[exerciseIdx].question}
                        questionLatex={filteredExercises[exerciseIdx].questionLatex}
                        hint={filteredExercises[exerciseIdx].hint}
                        steps={filteredExercises[exerciseIdx].steps}
                        answerLatex={filteredExercises[exerciseIdx].answerLatex}
                        accent={accent}
                        accentSolid={accentSolid}
                        accentSoft={accentSoft}
                        onAccent={onAccent}
                        solved={progress.solvedExercises.includes(filteredExercises[exerciseIdx].id)}
                        onToggleSolved={() => onToggleExercise(filteredExercises[exerciseIdx].id)}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* One-by-One Exercise Navigation */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      type="button"
                      disabled={exerciseIdx === 0}
                      onClick={() => jumpExercise(exerciseIdx - 1)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                      style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
                    >
                      <ArrowRight className="w-4 h-4" />
                      تمرین قبلی
                    </button>

                    {exerciseIdx < filteredExercises.length - 1 ? (
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => jumpExercise(exerciseIdx + 1)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer"
                        style={{ backgroundColor: accentSolid, color: onAccent }}
                      >
                        تمرین بعدی
                        <ArrowLeft className="w-4 h-4" />
                      </motion.button>
                    ) : (
                      <span className="text-xs font-bold" style={{ color: 'var(--success-text)' }}>
                        آخرین تمرین این گام
                      </span>
                    )}
                  </div>
                </>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      )}
    </article>
  );
}
