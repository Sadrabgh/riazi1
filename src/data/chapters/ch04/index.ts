import type { ChapterData } from '../../../types';
import { ch04Part1Steps } from './part1';
import { ch04Part2Steps } from './part2';
import { ch04Part3Steps } from './part3';

export const ch04: ChapterData = {
  id: 'integration',
  number: 4,
  title: 'انتگرال نامعین',
  subtitle: '۱ تعریف، ۷ قانون پایه و ۷ تکنیک کامل انتگرال‌گیری جزوه',
  pdfPages: 'ص ۲۷ تا ۵۱',
  accent: '#059669',
  accentSoft: 'rgba(5, 150, 105, 0.11)',
  estimatedMinutes: 95,
  cheatSheet: [
    {
      title: 'قوانین پایه ۱ تا ۳',
      latex: '\\int x^n dx = \\frac{x^{n+1}}{n+1}+C, \\quad \\int e^x dx = e^x+C, \\quad \\int\\frac{dx}{x}=\\ln|x|+C',
    },
    {
      title: 'قوانین مثلثاتی ۴ تا ۶',
      latex: '\\int\\tan x\\,dx = -\\ln|\\cos x|+C, \\quad \\int\\sec x\\,dx = \\ln|\\sec x+\\tan x|+C, \\quad \\int\\csc x\\,dx = \\ln|\\csc x-\\cot x|+C',
    },
    {
      title: 'قانون ۷ (درجه ۲)',
      latex: '\\int\\frac{dx}{x^2+a^2} = \\frac{1}{a}\\tan^{-1}\\frac{x}{a}+C, \\qquad \\int\\frac{dx}{x^2-a^2} = \\frac{1}{2a}\\ln\\left|\\frac{x-a}{x+a}\\right|+C',
    },
    {
      title: 'جزبه‌جز و لوچمن',
      latex: '\\int u\\,dv = uv - \\int v\\,du \\qquad (\\text{لگاریتمی ← وارون ← چندجمله‌ای ← مثلثاتی ← نمایی})',
    },
    {
      title: 'تغییر متغیر مثلثاتی',
      latex: '\\sqrt{x^2+a^2}\\to a\\tan\\theta, \\quad \\sqrt{x^2-a^2}\\to a\\sec\\theta, \\quad \\sqrt{a^2-x^2}\\to a\\sin\\theta',
    },
    {
      title: 'تغییر متغیر وایرشتراس',
      latex: 'z=\\tan\\frac{x}{2}\\implies \\sin x=\\frac{2z}{1+z^2},\\; \\cos x=\\frac{1-z^2}{1+z^2},\\; dx=\\frac{2dz}{1+z^2}',
    },
  ],
  steps: [...ch04Part1Steps, ...ch04Part2Steps, ...ch04Part3Steps],
};
