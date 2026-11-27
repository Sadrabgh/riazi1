import { describe, expect, it } from 'vitest';
import { CHAPTERS } from '../chapters';

describe('Chapters Data Integrity (v5 Full Coverage)', () => {
  it('contains all 7 chapters in order', () => {
    expect(CHAPTERS).toHaveLength(7);
    expect(CHAPTERS.map((c) => c.number)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('has unique IDs and full step-by-step solutions for EVERY example AND exercise', () => {
    const stepIds = new Set<string>();
    const exIds = new Set<string>();
    const prIds = new Set<string>();
    let totalExamples = 0;
    let totalExercises = 0;

    for (const ch of CHAPTERS) {
      expect(ch.steps.length).toBeGreaterThanOrEqual(2);
      expect(ch.cheatSheet.length).toBeGreaterThanOrEqual(5);

      for (const st of ch.steps) {
        expect(stepIds.has(st.id)).toBe(false);
        stepIds.add(st.id);

        for (const ex of st.examples ?? []) {
          expect(exIds.has(ex.id)).toBe(false);
          exIds.add(ex.id);
          expect(ex.steps.length).toBeGreaterThanOrEqual(1);
          expect(ex.answerLatex.trim().length).toBeGreaterThan(0);
          totalExamples++;
        }

        for (const pr of st.exercises ?? []) {
          expect(prIds.has(pr.id)).toBe(false);
          prIds.add(pr.id);
          expect(pr.steps.length).toBeGreaterThanOrEqual(1);
          expect(pr.answerLatex.trim().length).toBeGreaterThan(0);
          totalExercises++;
        }
      }
    }

    expect(totalExamples).toBeGreaterThanOrEqual(190);
    expect(totalExercises).toBeGreaterThanOrEqual(200);
  });

  it('contains zero psychology jargon in user-facing text', () => {
    const serialized = JSON.stringify(CHAPTERS);
    expect(serialized).not.toContain('زیگارنیک');
    expect(serialized).not.toContain('فن رستورف');
    expect(serialized).not.toContain('قانون میلر');
  });
});
