import type { ChapterData, SearchHit } from '../types';

function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/\u200c/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function searchAllContent(chapters: ChapterData[], rawQuery: string): SearchHit[] {
  const q = norm(rawQuery);
  if (!q) return [];

  const hits: SearchHit[] = [];

  for (const ch of chapters) {
    ch.steps.forEach((step, stepIndex) => {
      const stepHay = norm(`${ch.title} ${step.title} ${step.tag} ${step.intuition} ${step.trap?.body ?? ''}`);
      if (stepHay.includes(q)) {
        hits.push({
          chapterId: ch.id,
          chapterNumber: ch.number,
          chapterTitle: ch.title,
          stepIndex,
          stepTitle: step.title,
          kind: 'گام درس',
          snippet: step.intuition.slice(0, 110),
        });
      }

      for (const f of step.formulas ?? []) {
        if (norm(`${f.title} ${f.plainExplain} ${f.latex}`).includes(q)) {
          hits.push({
            chapterId: ch.id,
            chapterNumber: ch.number,
            chapterTitle: ch.title,
            stepIndex,
            stepTitle: f.title,
            kind: 'فرمول',
            snippet: f.plainExplain.slice(0, 110),
          });
        }
      }

      for (const ex of step.examples ?? []) {
        if (norm(`${ex.number} ${ex.question} ${ex.examTag ?? ''} ${ex.hint}`).includes(q)) {
          hits.push({
            chapterId: ch.id,
            chapterNumber: ch.number,
            chapterTitle: ch.title,
            stepIndex,
            stepTitle: `مثال ${ex.number}${ex.examTag ? ` (${ex.examTag})` : ''}`,
            kind: 'مثال',
            snippet: ex.question.slice(0, 110),
          });
        }
      }

      for (const pr of step.exercises ?? []) {
        if (norm(`${pr.number} ${pr.question} ${pr.examTag ?? ''} ${pr.hint}`).includes(q)) {
          hits.push({
            chapterId: ch.id,
            chapterNumber: ch.number,
            chapterTitle: ch.title,
            stepIndex,
            stepTitle: `تمرین ${pr.number}${pr.examTag ? ` (${pr.examTag})` : ''}`,
            kind: 'تمرین',
            snippet: pr.question.slice(0, 110),
          });
        }
      }
    });
  }

  return hits.slice(0, 28);
}
