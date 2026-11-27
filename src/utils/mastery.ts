import type { ChapterData, LessonStep, MasteryTier, StudyProgress } from '../types';

export const INITIAL_PROGRESS: StudyProgress = {
  visitedSteps: [],
  solvedCheckpoints: [],
  viewedExamples: [],
  solvedExercises: [],
  lastChapterId: null,
  lastStepIndex: {},
};

export interface StepMastery {
  percent: number;
  visited: boolean;
  checkpointSolved: boolean;
  hasCheckpoint: boolean;
  solvedExercises: number;
  totalExercises: number;
  viewedExamples: number;
  totalExamples: number;
}

export interface ChapterMastery {
  percent: number;
  tier: MasteryTier;
  solvedCheckpoints: number;
  totalCheckpoints: number;
  solvedExercises: number;
  totalExercises: number;
  viewedExamples: number;
  totalExamples: number;
  visitedSteps: number;
  totalSteps: number;
}

export function computeStepMastery(step: LessonStep, progress: StudyProgress): StepMastery {
  const visited = progress.visitedSteps.includes(step.id);
  const hasCheckpoint = Boolean(step.checkpoint);
  const checkpointSolved = step.checkpoint
    ? progress.solvedCheckpoints.includes(step.checkpoint.id)
    : false;

  const examples = step.examples ?? [];
  const totalExamples = examples.length;
  const viewedExamples = examples.filter((e) => progress.viewedExamples.includes(e.id)).length;

  const exercises = step.exercises ?? [];
  const totalExercises = exercises.length;
  const solvedExercises = exercises.filter((e) => progress.solvedExercises.includes(e.id)).length;

  let weightTotal = 15; // visiting the step
  let earned = visited ? 15 : 0;

  if (hasCheckpoint) {
    weightTotal += 35;
    if (checkpointSolved) earned += 35;
  }
  if (totalExamples > 0) {
    weightTotal += 15;
    earned += (viewedExamples / totalExamples) * 15;
  }
  if (totalExercises > 0) {
    weightTotal += 35;
    earned += (solvedExercises / totalExercises) * 35;
  }

  const percent = weightTotal > 0 ? Math.round((earned / weightTotal) * 100) : 0;

  return {
    percent,
    visited,
    checkpointSolved,
    hasCheckpoint,
    solvedExercises,
    totalExercises,
    viewedExamples,
    totalExamples,
  };
}

export function computeChapterMastery(chapter: ChapterData, progress: StudyProgress): ChapterMastery {
  const totalSteps = chapter.steps.length;
  const visitedSteps = chapter.steps.filter((s) => progress.visitedSteps.includes(s.id)).length;

  const checkpoints = chapter.steps.map((s) => s.checkpoint).filter(Boolean);
  const totalCheckpoints = checkpoints.length;
  const solvedCheckpoints = checkpoints.filter((c) => c && progress.solvedCheckpoints.includes(c.id)).length;

  const examples = chapter.steps.flatMap((s) => s.examples ?? []);
  const totalExamples = examples.length;
  const viewedExamples = examples.filter((e) => progress.viewedExamples.includes(e.id)).length;

  const exercises = chapter.steps.flatMap((s) => s.exercises ?? []);
  const totalExercises = exercises.length;
  const solvedExercises = exercises.filter((e) => progress.solvedExercises.includes(e.id)).length;

  const stepScore = totalSteps > 0 ? (visitedSteps / totalSteps) * 15 : 15;
  const cpScore = totalCheckpoints > 0 ? (solvedCheckpoints / totalCheckpoints) * 35 : 35;
  const exViewScore = totalExamples > 0 ? (viewedExamples / totalExamples) * 10 : 10;
  const prScore = totalExercises > 0 ? (solvedExercises / totalExercises) * 40 : 40;

  const percent = Math.round(stepScore + cpScore + exViewScore + prScore);

  let tier: MasteryTier = 'شروع‌نشده';
  if (percent >= 90) tier = 'تسلط کامل';
  else if (percent >= 60) tier = 'مسلط';
  else if (percent > 0) tier = 'آشنا';

  return {
    percent,
    tier,
    solvedCheckpoints,
    totalCheckpoints,
    solvedExercises,
    totalExercises,
    viewedExamples,
    totalExamples,
    visitedSteps,
    totalSteps,
  };
}

export function computeOverallMastery(chapters: ChapterData[], progress: StudyProgress): number {
  if (!chapters.length) return 0;
  const sum = chapters.reduce((acc, ch) => acc + computeChapterMastery(ch, progress).percent, 0);
  return Math.round(sum / chapters.length);
}
