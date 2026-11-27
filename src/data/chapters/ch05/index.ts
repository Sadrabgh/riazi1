import type { ChapterData } from '../../../types';
import { ch05Part1Steps } from './part1';
import { ch05Part2Steps } from './part2';

export const ch05: ChapterData = {
  id: 'integral-applications',
  number: 5,
  title: 'کاربرد انتگرال',
  subtitle: 'انتگرال معین، مساحت، مجموع ریمان، لایب‌نیتس، طول قوس، حجم و ناسره',
  pdfPages: 'ص ۵۲ تا ۶۶',
  accent: '#D97706',
  accentSoft: 'rgba(217, 119, 6, 0.11)',
  estimatedMinutes: 75,
  cheatSheet: [
    { title: 'قانون لایب‌نیتس (مشتق انتگرال)', latex: '\\left(\\int_{v(x)}^{u(x)} f(t)\\,dt\\right)\' = u\'(x)f(u(x)) - v\'(x)f(v(x))' },
    { title: 'حد با مجموع ریمان', latex: '\\lim_{n\\to\\infty}\\frac{1}{n}\\sum_{i=1}^n f\\left(\\frac{i}{n}\\right) = \\int_0^1 f(x)\\,dx' },
    { title: 'حجم دوران (دیسک/واشر و پوسته)', latex: 'V_x = \\pi\\int_a^b (f^2-g^2)dx, \\qquad V_y = 2\\pi\\int_a^b x(f-g)dx' },
    { title: 'طول قوس (دکارتی و پارامتری)', latex: 'L = \\int_a^b\\sqrt{1+y\'^2}\\,dx = \\int_{t_1}^{t_2}\\sqrt{x\'^2+y\'^2}\\,dt' },
    { title: 'ناسره نوع ۱ و ۲', latex: '\\int_1^\\infty\\frac{dx}{x^p}\\;(\\text{همگرا}\\iff p>1), \\qquad \\int_0^1\\frac{dx}{x^p}\\;(\\text{همگرا}\\iff p<1)' },
  ],
  steps: [...ch05Part1Steps, ...ch05Part2Steps],
};
