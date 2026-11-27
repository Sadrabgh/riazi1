import type { ChapterData } from '../../types';
import { LESSONS_PART1 } from '../lessons/part1';
import { LESSONS_PART2 } from '../lessons/part2';
import { ch01 } from './ch01';
import { ch02 } from './ch02';
import { ch03 } from './ch03';
import { ch04 } from './ch04';
import { ch05 } from './ch05';
import { ch06 } from './ch06';
import { ch07 } from './ch07';

const ALL_LESSONS = { ...LESSONS_PART1, ...LESSONS_PART2 };

const RAW_CHAPTERS: ChapterData[] = [ch01, ch02, ch03, ch04, ch05, ch06, ch07];

export const CHAPTERS: ChapterData[] = RAW_CHAPTERS.map((chapter) => ({
  ...chapter,
  steps: chapter.steps.map((step) => {
    const upgrade = ALL_LESSONS[step.id];
    if (!upgrade) return step;
    return {
      ...step,
      intuition: upgrade.intuition,
      formulas: upgrade.formulas ?? step.formulas,
      table: upgrade.table ?? step.table,
      tip: upgrade.tip ?? step.tip,
      trap: upgrade.trap ?? step.trap,
      checkpoint: upgrade.checkpoint ?? step.checkpoint,
    };
  }),
}));
