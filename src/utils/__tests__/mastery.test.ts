import { describe, expect, it } from 'vitest';
import { CHAPTERS } from '../../data/chapters';
import {
  INITIAL_PROGRESS,
  computeChapterMastery,
  computeOverallMastery,
  computeStepMastery,
} from '../mastery';

describe('mastery & reset calculations (v5)', () => {
  const ch1 = CHAPTERS[0];
  const step1 = ch1.steps[0];

  it('starts at 0% for both step and chapter', () => {
    expect(computeStepMastery(step1, INITIAL_PROGRESS).percent).toBe(0);
    expect(computeChapterMastery(ch1, INITIAL_PROGRESS).percent).toBe(0);
    expect(computeOverallMastery(CHAPTERS, INITIAL_PROGRESS)).toBe(0);
  });

  it('reaches 100% step mastery when visited, checkpoint solved, examples viewed, and exercises solved', () => {
    const progress = {
      ...INITIAL_PROGRESS,
      visitedSteps: [step1.id],
      solvedCheckpoints: step1.checkpoint ? [step1.checkpoint.id] : [],
      viewedExamples: (step1.examples ?? []).map((e) => e.id),
      solvedExercises: (step1.exercises ?? []).map((p) => p.id),
    };
    expect(computeStepMastery(step1, progress).percent).toBe(100);
  });
});
