import { describe, expect, it } from 'vitest';
import { CHAPTERS } from '../../data/chapters';
import { searchAllContent } from '../search';

describe('searchAllContent (v5)', () => {
  it('normalizes Arabic yeh/kaf and finds theorems, examples, and exercises', () => {
    expect(searchAllContent(CHAPTERS, '   ')).toEqual([]);
    const hits = searchAllContent(CHAPTERS, 'لوچمن');
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].chapterNumber).toBe(4);
  });
});
