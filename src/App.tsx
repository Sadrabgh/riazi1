import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookMarked,
  Moon,
  Play,
  Search,
  Sigma,
  Sun,
} from 'lucide-react';
import { CHAPTERS } from './data/chapters';
import { useStudyProgress } from './hooks/useStudyProgress';
import type { SearchHit, ThemeMode } from './types';
import { computeChapterMastery, computeOverallMastery } from './utils/mastery';
import { getChapterPalette } from './utils/themePalette';
import { ChapterArtwork } from './components/visuals/ChapterArtwork';
import { GuidedChapterView } from './components/lesson/GuidedChapterView';
import { SearchModal } from './components/ui/SearchModal';
import { ConfirmResetButton } from './components/ui/ConfirmResetButton';
import { CheatSheetPage } from './pages/CheatSheetPage';

type RouteState =
  | { page: 'home' }
  | { page: 'cheatsheet' }
  | { page: 'chapter'; chapterId: string; stepIndex: number };

const THEME_KEY = 'math1-v5-theme';

function parseHash(): RouteState {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return { page: 'home' };
  if (hash === 'cheatsheet') return { page: 'cheatsheet' };
  const parts = hash.split('/');
  if (parts[0] === 'chapter' && parts[1]) {
    const exists = CHAPTERS.some((c) => c.id === parts[1]);
    if (exists) {
      const idx = Number.parseInt(parts[2] ?? '0', 10);
      return {
        page: 'chapter',
        chapterId: parts[1],
        stepIndex: Number.isNaN(idx) ? 0 : Math.max(0, idx),
      };
    }
  }
  return { page: 'home' };
}

function getInitialTheme(): ThemeMode {
  if (typeof document !== 'undefined') {
    const current = document.documentElement.dataset.theme;
    if (current === 'dark' || current === 'light') return current;
  }
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch {
    /* ignore */
  }
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(() => parseHash());
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  const {
    progress,
    markStepVisited,
    markCheckpointSolved,
    markExampleViewed,
    toggleExerciseSolved,
    resetStepProgress,
    resetChapterProgress,
    resetAllProgress,
  } = useStudyProgress();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navigateHome = useCallback(() => {
    window.location.hash = '#/';
    setRoute({ page: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateCheatSheet = useCallback(() => {
    window.location.hash = '#/cheatsheet';
    setRoute({ page: 'cheatsheet' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateChapter = useCallback((chapterId: string, stepIndex = 0) => {
    window.location.hash = `#/chapter/${chapterId}/${stepIndex}`;
    setRoute({ page: 'chapter', chapterId, stepIndex });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearchHit = useCallback(
    (hit: SearchHit) => {
      navigateChapter(hit.chapterId, hit.stepIndex);
    },
    [navigateChapter]
  );

  const overallMastery = useMemo(
    () => computeOverallMastery(CHAPTERS, progress),
    [progress]
  );

  const hasAnyProgress =
    progress.visitedSteps.length > 0 ||
    progress.solvedCheckpoints.length > 0 ||
    progress.viewedExamples.length > 0 ||
    progress.solvedExercises.length > 0;

  const totals = useMemo(() => {
    let steps = 0;
    let examples = 0;
    let exercises = 0;
    for (const ch of CHAPTERS) {
      steps += ch.steps.length;
      for (const st of ch.steps) {
        examples += st.examples?.length ?? 0;
        exercises += st.exercises?.length ?? 0;
      }
    }
    return { steps, examples, exercises };
  }, []);

  const resumeChapter = progress.lastChapterId
    ? CHAPTERS.find((c) => c.id === progress.lastChapterId) ?? null
    : null;
  const resumeStepIndex = resumeChapter ? (progress.lastStepIndex[resumeChapter.id] ?? 0) : 0;

  const activeChapterIndex =
    route.page === 'chapter'
      ? CHAPTERS.findIndex((c) => c.id === route.chapterId)
      : -1;
  const activeChapter = activeChapterIndex >= 0 ? CHAPTERS[activeChapterIndex] : null;
  const nextChapter =
    activeChapterIndex >= 0 && activeChapterIndex < CHAPTERS.length - 1
      ? CHAPTERS[activeChapterIndex + 1]
      : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Minimalist Sticky Glass Header */}
      <header
        className="no-print sticky top-0 z-40 border-b backdrop-blur-md"
        style={{
          backgroundColor: 'var(--bg-glass)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-15 sm:h-16 flex items-center justify-between gap-2">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              navigateHome();
            }}
            className="flex items-center gap-2.5 no-underline shrink-0"
            style={{ color: 'var(--text-primary)' }}
          >
            <span
              className="w-9 h-9 rounded-xl inline-flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'var(--brand-solid)', color: 'var(--on-brand)' }}
            >
              <Sigma className="w-5 h-5" />
            </span>
            <div className="leading-tight">
              <div className="text-sm sm:text-base font-bold">ریاضی عمومی ۱</div>
              <div className="text-[11px] hidden sm:block" style={{ color: 'var(--text-muted)' }}>
                درسنامه جامع و مرحله‌به‌مرحله
              </div>
            </div>
          </a>

          <nav className="flex items-center gap-1.5 sm:gap-2">
            <a
              href="#/cheatsheet"
              onClick={(e) => {
                e.preventDefault();
                navigateCheatSheet();
              }}
              aria-label="برگه فرمول‌ها"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium no-underline transition-colors min-h-[40px]"
              style={{
                backgroundColor:
                  route.page === 'cheatsheet' ? 'var(--brand-soft)' : 'transparent',
                color:
                  route.page === 'cheatsheet' ? 'var(--brand)' : 'var(--text-secondary)',
              }}
            >
              <BookMarked className="w-4 h-4" />
              <span className="hidden sm:inline">برگه فرمول‌ها</span>
            </a>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="جستجو در درسنامه"
              className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer min-h-[40px]"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">جستجو</span>
              <kbd
                className="hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded border font-sans"
                style={{
                  borderColor: 'var(--border-strong)',
                  color: 'var(--text-muted)',
                }}
              >
                Ctrl K
              </kbd>
            </button>

            <div
              className="inline-flex items-center px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold"
              style={{
                backgroundColor: 'var(--brand-soft)',
                color: 'var(--brand)',
              }}
              title="میانگین تسلط کل بر ۷ فصل"
            >
              {overallMastery}٪
            </div>

            <button
              type="button"
              onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
              aria-label={theme === 'light' ? 'تغییر به حالت تاریک' : 'تغییر به حالت روشن'}
              className="p-2 rounded-xl transition-colors cursor-pointer min-w-[40px] min-h-[40px] inline-flex items-center justify-center"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {route.page === 'home' && (
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-6 sm:py-11">
            {/* Editorial Hero */}
            <motion.section
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="surface-card math-grid-bg rounded-3xl p-5 sm:p-10 mb-9 relative overflow-hidden"
            >
              <div className="max-w-2xl relative z-10">
                <h1
                  className="text-xl sm:text-4xl font-bold leading-snug sm:leading-tight mb-3.5 m-0"
                  style={{ color: 'var(--text-primary)' }}
                >
                  ریاضی عمومی ۱ را کامل، مرحله‌به‌مرحله و با حل تشریحی تمام مسائل یاد بگیرید
                </h1>

                <p
                  className="text-xs sm:text-base leading-7 sm:leading-8 mb-6"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  پوشش کامل هر ۷ فصل جزوه بدون حاشیه‌گویی: شهود ساده هر مبحث، فرمول‌های کلیدی، مثال‌های حل‌شده و تمام تمرین‌های جزوه با راهنما و راه‌حل کامل گام‌به‌گام.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  {resumeChapter ? (
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigateChapter(resumeChapter.id, resumeStepIndex)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer"
                      style={{ backgroundColor: 'var(--brand-solid)', color: 'var(--on-brand)' }}
                    >
                      <Play className="w-4 h-4 fill-current" />
                      ادامه: فصل {resumeChapter.number} (گام {resumeStepIndex + 1})
                    </motion.button>
                  ) : (
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigateChapter(CHAPTERS[0].id, 0)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer"
                      style={{ backgroundColor: 'var(--brand-solid)', color: 'var(--on-brand)' }}
                    >
                      شروع یادگیری از فصل اول
                      <ArrowLeft className="w-4 h-4" />
                    </motion.button>
                  )}

                  <button
                    type="button"
                    onClick={navigateCheatSheet}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium cursor-pointer"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-strong)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <BookMarked className="w-4 h-4" />
                    برگه فرمول‌ها
                  </button>

                  <ConfirmResetButton
                    label="ریست کل پیشرفت"
                    confirmLabel="پاک کردن کل اطلاعات؟"
                    disabled={!hasAnyProgress}
                    onConfirm={resetAllProgress}
                  />
                </div>
              </div>

              {/* Clean Stats Strip */}
              <div
                className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-7 pt-6 border-t"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <div>
                  <div className="text-lg sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {CHAPTERS.length} فصل
                  </div>
                  <div className="text-[11px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
                    پوشش کامل ۸۳ صفحه علمی
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {totals.steps} گام
                  </div>
                  <div className="text-[11px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
                    ساختار مرحله‌به‌مرحله
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    {totals.examples + totals.exercises} مسئله
                  </div>
                  <div className="text-[11px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
                    {totals.examples} مثال + {totals.exercises} تمرین با حل کامل
                  </div>
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-bold" style={{ color: 'var(--brand)' }}>
                    {overallMastery}٪
                  </div>
                  <div className="text-[11px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
                    میزان تسلط ثبت‌شده شما
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Chapters Grid */}
            <section aria-label="فهرست فصل‌های ریاضی عمومی ۱">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                <h2 className="text-base sm:text-xl font-bold m-0" style={{ color: 'var(--text-primary)' }}>
                  مسیر یادگیری فصل‌ها
                </h2>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  روی هر فصل بزنید تا وارد گام اول آن شوید
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {CHAPTERS.map((ch, idx) => {
                  const m = computeChapterMastery(ch, progress);
                  const savedStep = progress.lastStepIndex[ch.id] ?? 0;
                  const p = getChapterPalette(ch.number, theme);

                  return (
                    <motion.a
                      key={ch.id}
                      href={`#/chapter/${ch.id}/${savedStep}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateChapter(ch.id, savedStep);
                      }}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.28 }}
                      whileHover={{ y: -4 }}
                      className="surface-card rounded-2xl overflow-hidden flex flex-col no-underline group transition-shadow hover:shadow-md"
                    >
                      <div
                        className="relative h-34 sm:h-36 px-4 pt-3 overflow-hidden border-b"
                        style={{
                          background:
                            theme === 'dark'
                              ? `radial-gradient(circle at 80% 22%, ${p.glow}, transparent 70%), var(--bg-recessed)`
                              : p.accentSoft,
                          borderColor: 'var(--border-subtle)',
                        }}
                      >
                        <div
                          className="absolute top-0 left-0 right-0 h-1"
                          style={{ backgroundColor: p.accent }}
                        />
                        <div className="flex items-center justify-between relative z-10">
                          <span
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold"
                            style={{ backgroundColor: p.accentSolid, color: p.onAccent }}
                          >
                            فصل {ch.number}
                          </span>
                          <span
                            className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: 'var(--bg-surface)',
                              color: 'var(--text-secondary)',
                              border: theme === 'dark' ? '1px solid var(--border-subtle)' : undefined,
                            }}
                          >
                            {m.tier}
                          </span>
                        </div>
                        <div className="h-24 sm:h-28 flex items-center justify-center">
                          <ChapterArtwork chapterNumber={ch.number} accent={p.accent} />
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3
                            className="text-sm sm:text-base font-bold mb-1.5 group-hover:underline"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {ch.title}
                          </h3>
                          <p
                            className="text-xs leading-6 mb-4"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            {ch.subtitle}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[11px]" style={{ color: 'var(--text-muted)' }}>
                            <span>
                              {ch.steps.length} گام • {ch.pdfPages}
                            </span>
                            <span className="font-bold" style={{ color: p.accent }}>
                              {m.percent}٪
                            </span>
                          </div>
                          <div
                            className="h-1.5 rounded-full overflow-hidden"
                            style={{ backgroundColor: 'var(--bg-subtle)' }}
                          >
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${m.percent}%`,
                                backgroundColor: p.accent,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {route.page === 'chapter' && activeChapter && (
          <GuidedChapterView
            chapter={activeChapter}
            nextChapter={nextChapter}
            initialStepIndex={route.stepIndex}
            progress={progress}
            theme={theme}
            onStepChange={(idx) => {
              window.history.replaceState(null, '', `#/chapter/${activeChapter.id}/${idx}`);
            }}
            onMarkStepVisited={markStepVisited}
            onCheckpointSolved={markCheckpointSolved}
            onExampleViewed={markExampleViewed}
            onToggleExercise={toggleExerciseSolved}
            onResetStep={resetStepProgress}
            onResetChapter={resetChapterProgress}
            onNavigateChapter={navigateChapter}
            onBackHome={navigateHome}
          />
        )}

        {route.page === 'cheatsheet' && (
          <CheatSheetPage
            chapters={CHAPTERS}
            theme={theme}
            onBackHome={navigateHome}
            onOpenChapter={(id) => navigateChapter(id, 0)}
          />
        )}
      </main>

      <SearchModal
        open={searchOpen}
        chapters={CHAPTERS}
        onClose={() => setSearchOpen(false)}
        onSelectHit={handleSearchHit}
      />
    </div>
  );
}
