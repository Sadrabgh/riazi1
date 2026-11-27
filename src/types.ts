export type ThemeMode = 'light' | 'dark';

export interface FormulaItem {
  title: string;
  latex: string;
  plainExplain: string;
}

export interface StepCheckpoint {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  feedback: string;
}

export interface WorkedStep {
  label: string;
  text: string;
  latex?: string;
}

export interface WorkedExample {
  id: string;
  number: string;
  examTag?: string;
  question: string;
  questionLatex?: string;
  hint: string;
  steps: WorkedStep[];
  answerLatex: string;
}

export interface PracticeExercise {
  id: string;
  number: string;
  examTag?: string;
  difficulty: 'پایه' | 'امتحانی' | 'چالشی';
  question: string;
  questionLatex?: string;
  hint: string;
  steps: WorkedStep[];
  answerLatex: string;
}

export interface LessonStep {
  id: string;
  title: string;
  tag: string;
  intuition: string;
  formulas?: FormulaItem[];
  table?: { headers: string[]; rows: string[][] };
  trap?: { title: string; body: string };
  tip?: { title: string; body: string };
  checkpoint?: StepCheckpoint;
  examples?: WorkedExample[];
  exercises?: PracticeExercise[];
}

export interface CheatSheetEntry {
  title: string;
  latex: string;
  note?: string;
}

export interface ChapterData {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  pdfPages: string;
  accent: string;
  accentSoft: string;
  estimatedMinutes: number;
  cheatSheet: CheatSheetEntry[];
  steps: LessonStep[];
}

export interface StudyProgress {
  visitedSteps: string[];
  solvedCheckpoints: string[];
  viewedExamples: string[];
  solvedExercises: string[];
  lastChapterId: string | null;
  lastStepIndex: Record<string, number>;
}

export type MasteryTier = 'شروع‌نشده' | 'آشنا' | 'مسلط' | 'تسلط کامل';

export interface SearchHit {
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  stepIndex: number;
  stepTitle: string;
  kind: 'گام درس' | 'مثال' | 'تمرین' | 'فرمول';
  snippet: string;
}
