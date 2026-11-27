import { useCallback, useEffect, useState } from 'react';
import type { ChapterData, LessonStep, StudyProgress } from '../types';
import { INITIAL_PROGRESS } from '../utils/mastery';

const STORAGE_KEY = 'math1-v5-progress';

export function useStudyProgress() {
  const [progress, setProgress] = useState<StudyProgress>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...INITIAL_PROGRESS, ...JSON.parse(raw) } : INITIAL_PROGRESS;
    } catch {
      return INITIAL_PROGRESS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      /* ignore storage errors */
    }
  }, [progress]);

  const markStepVisited = useCallback((chapterId: string, stepId: string, stepIndex: number) => {
    setProgress((prev) => {
      const visitedSteps = prev.visitedSteps.includes(stepId)
        ? prev.visitedSteps
        : [...prev.visitedSteps, stepId];
      return {
        ...prev,
        visitedSteps,
        lastChapterId: chapterId,
        lastStepIndex: { ...prev.lastStepIndex, [chapterId]: stepIndex },
      };
    });
  }, []);

  const markCheckpointSolved = useCallback((checkpointId: string) => {
    setProgress((prev) =>
      prev.solvedCheckpoints.includes(checkpointId)
        ? prev
        : { ...prev, solvedCheckpoints: [...prev.solvedCheckpoints, checkpointId] }
    );
  }, []);

  const markExampleViewed = useCallback((exampleId: string) => {
    setProgress((prev) =>
      prev.viewedExamples.includes(exampleId)
        ? prev
        : { ...prev, viewedExamples: [...prev.viewedExamples, exampleId] }
    );
  }, []);

  const toggleExerciseSolved = useCallback((exerciseId: string) => {
    setProgress((prev) => {
      const exists = prev.solvedExercises.includes(exerciseId);
      const solvedExercises = exists
        ? prev.solvedExercises.filter((id) => id !== exerciseId)
        : [...prev.solvedExercises, exerciseId];
      return { ...prev, solvedExercises };
    });
  }, []);

  /** بازگردانی تسلط یک گام مشخص به صفر */
  const resetStepProgress = useCallback((step: LessonStep) => {
    const cpId = step.checkpoint?.id;
    const exIds = new Set((step.examples ?? []).map((e) => e.id));
    const prIds = new Set((step.exercises ?? []).map((p) => p.id));

    setProgress((prev) => ({
      ...prev,
      visitedSteps: prev.visitedSteps.filter((id) => id !== step.id),
      solvedCheckpoints: cpId
        ? prev.solvedCheckpoints.filter((id) => id !== cpId)
        : prev.solvedCheckpoints,
      viewedExamples: prev.viewedExamples.filter((id) => !exIds.has(id)),
      solvedExercises: prev.solvedExercises.filter((id) => !prIds.has(id)),
    }));
  }, []);

  /** بازگردانی تسلط یک فصل کامل به صفر */
  const resetChapterProgress = useCallback((chapter: ChapterData) => {
    const stepIds = new Set(chapter.steps.map((s) => s.id));
    const cpIds = new Set(chapter.steps.map((s) => s.checkpoint?.id).filter(Boolean) as string[]);
    const exIds = new Set(chapter.steps.flatMap((s) => s.examples ?? []).map((e) => e.id));
    const prIds = new Set(chapter.steps.flatMap((s) => s.exercises ?? []).map((p) => p.id));

    setProgress((prev) => {
      const nextStepIndex = { ...prev.lastStepIndex };
      delete nextStepIndex[chapter.id];
      return {
        visitedSteps: prev.visitedSteps.filter((id) => !stepIds.has(id)),
        solvedCheckpoints: prev.solvedCheckpoints.filter((id) => !cpIds.has(id)),
        viewedExamples: prev.viewedExamples.filter((id) => !exIds.has(id)),
        solvedExercises: prev.solvedExercises.filter((id) => !prIds.has(id)),
        lastChapterId: prev.lastChapterId === chapter.id ? null : prev.lastChapterId,
        lastStepIndex: nextStepIndex,
      };
    });
  }, []);

  /** بازگردانی کل اطلاعات و تسلط تمام فصل‌ها به صفر */
  const resetAllProgress = useCallback(() => {
    setProgress(INITIAL_PROGRESS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return {
    progress,
    markStepVisited,
    markCheckpointSolved,
    markExampleViewed,
    toggleExerciseSolved,
    resetStepProgress,
    resetChapterProgress,
    resetAllProgress,
  };
}
