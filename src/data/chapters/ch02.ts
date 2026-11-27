import type { ChapterData } from '../../types';

export const ch02: ChapterData = {
  id: 'limits-continuity',
  number: 2,
  title: 'حد و پیوستگی',
  subtitle: 'هوپیتال، رفع ابهام‌های نمایی، هم‌ارزی با مک‌لورن و قضیه فشردگی',
  pdfPages: 'ص ۱۱ تا ۱۷',
  accent: '#2563EB',
  accentSoft: 'rgba(37, 99, 235, 0.11)',
  estimatedMinutes: 45,
  cheatSheet: [
    {
      title: 'قاعده هوپیتال',
      latex: '\\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f\'(x)}{g\'(x)} \\quad \\left(\\text{فقط برای } \\frac{0}{0},\\; \\frac{\\infty}{\\infty}\\right)',
      note: 'مشتق صورت و مخرج را جداگانه بگیرید (نه مشتق کسر!).',
    },
    {
      title: 'ابهام‌های نمایی (1^∞, 0^0, ∞^0)',
      latex: 'y = f(x)^{g(x)} \\implies \\ln y = g(x)\\ln f(x) = \\frac{\\ln f(x)}{1/g(x)}',
      note: 'در پایان حتماً جواب را به شکل y = e^L برگردانید.',
    },
    {
      title: 'بسط مک‌لورن‌های پرکاربرد',
      latex: 'e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\dots \\\\ \\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\dots, \\quad \\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\dots',
      note: 'بسط را تا اولین توانی ادامه دهید که در صورت و مخرج حذف نشود.',
    },
    {
      title: 'بسط مک‌لورن لگاریتم و تانژانت',
      latex: '\\ln(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\dots, \\qquad \\tan x = x + \\frac{x^3}{3} + \\dots',
      note: 'برای حدهای $x\\to 0$ سرعت حل را چند برابر می‌کنند.',
    },
    {
      title: 'قضیه فشردگی (ساندویچ) و جزء صحیح',
      latex: 'x - 1 < [x] \\le x, \\qquad g(x) \\le f(x) \\le h(x) \\;\\&\\; \\lim g = \\lim h = L \\implies \\lim f = L',
      note: 'ابزار اصلی حدهای شامل $[x]$ و مجموع‌های $n$جمله‌ای.',
    },
  ],
  steps: [
    {
      id: 'ch2-s1',
      title: 'رفع ابهام‌های نمایی با لگاریتم و قاعده هوپیتال',
      tag: 'ابهام‌های نمایی',
      intuition:
        'وقتی پایه و توان هر دو به $x$ وابسته‌اند و با ابهام $1^\\infty$، $0^0$ یا $\\infty^0$ روبه‌رو می‌شوید، اول از دو طرف $\\ln$ بگیرید تا توان بیاید پایین. بعد حاصل‌ضرب را به کسر $\\frac{0}{0}$ یا $\\frac{\\infty}{\\infty}$ تبدیل کنید و هوپیتال بزنید.',
      formulas: [
        {
          title: 'دستورالعمل استاندارد ابهام نمایی',
          latex: 'L = \\lim_{x\\to a} f(x)^{g(x)} \\implies \\ln L = \\lim_{x\\to a} \\frac{\\ln f(x)}{1/g(x)} \\implies L = e^{\\ln L}',
          plainExplain: 'در پیوستگی نیز شرط اساسی برابری حد چپ، حد راست و مقدار تابع در نقطه است.',
        },
      ],
      trap: {
        title: 'فراموش کردن e به توان جواب',
        body: 'وقتی $\\ln y = -1$ به دست آمد، جواب نهایی حد برابر $y = e^{-1}$ است نه $-1$.',
      },
      checkpoint: {
        id: 'ch2-cp1',
        prompt: 'حاصل $\\lim_{x\\to +\\infty} \\left(1 + \\frac{3}{x}\\right)^{2x}$ کدام است؟',
        options: ['$e^6$', '$e^5$', '$1$', '$e^{3/2}$'],
        correctIndex: 0,
        feedback: 'طبق فرمول $\\lim_{x\\to\\infty}(1+\\frac{a}{x})^{bx} = e^{ab}$ داریم $e^{3\\times 2} = e^6$.',
      },
      examples: [
        {
          id: 'ch2-ex1-1',
          number: '۱-۱',
          question: 'حاصل حد $\\lim_{x\\to+\\infty}\\left(1+\\frac{a}{x}\\right)^{bx}$ را بیابید.',
          hint: 'ابهام $1^\\infty$ است؛ $\\ln$ بگیرید و $bx$ را به صورت $\\frac{1}{bx}$ به مخرج ببرید.',
          steps: [
            {
              label: 'لگاریتم‌گیری و تبدیل به کسر',
              text: 'ایجاد ابهام $\\frac{0}{0}$:',
              latex: '\\ln y = \\lim_{x\\to+\\infty}\\frac{\\ln(1+a/x)}{1/(bx)}',
            },
            {
              label: 'اعمال هوپیتال',
              text: 'مشتق صورت و مخرج نسبت به $x$:',
              latex: '\\ln y = \\lim_{x\\to+\\infty}\\frac{\\frac{-a/x^2}{1+a/x}}{-1/(bx^2)} = \\lim_{x\\to+\\infty}\\frac{ab}{1+a/x} = ab',
            },
          ],
          answerLatex: 'y = e^{ab}',
        },
        {
          id: 'ch2-ex1-2',
          number: '۱-۲',
          question: 'حاصل حد $\\lim_{x\\to+\\infty}\\left(1-\\frac{1}{x}\\right)^x$ را بیابید.',
          hint: 'با $\\ln$ گرفتن به فرم $\\frac{\\ln(1-1/x)}{1/x}$ می‌رسد.',
          steps: [
            {
              label: 'لگاریتم‌گیری و هوپیتال',
              text: 'مشتق‌گیری از صورت و مخرج:',
              latex: '\\ln y = \\lim_{x\\to+\\infty}\\frac{\\frac{1/x^2}{1-1/x}}{-1/x^2} = \\lim_{x\\to+\\infty}\\frac{-1}{1-1/x} = -1',
            },
          ],
          answerLatex: 'y = e^{-1}',
        },
        {
          id: 'ch2-ex1-3',
          number: '۱-۳',
          question: 'حاصل حد $\\lim_{x\\to 1}(1+\\sin(\\pi x))^{\\cot(\\pi x)}$ را بیابید.',
          hint: '$\\cot(\\pi x) = \\frac{1}{\\tan(\\pi x)}$ را به مخرج ببرید و هوپیتال بزنید.',
          steps: [
            {
              label: 'تبدیل به کسر 0/0 و هوپیتال',
              text: 'چون $\\sin\\pi=0$ و $\\tan\\pi=0$:',
              latex: '\\ln y = \\lim_{x\\to 1}\\frac{\\ln(1+\\sin\\pi x)}{\\tan\\pi x} \\stackrel{\\text{HOP}}{=} \\lim_{x\\to 1}\\frac{\\frac{\\pi\\cos\\pi x}{1+\\sin\\pi x}}{\\pi(1+\\tan^2\\pi x)} = \\frac{-\\pi}{\\pi} = -1',
            },
          ],
          answerLatex: 'y = e^{-1}',
        },
        {
          id: 'ch2-ex1-4',
          number: '۱-۴',
          examTag: 'خواجه نصیر — آبان ۹۶',
          question: 'حاصل حد $\\lim_{x\\to\\frac{\\pi}{4}}(\\sin 2x)^{\\tan 2x}$ را بیابید.',
          hint: '$\\tan 2x = \\frac{1}{\\cot 2x}$ بنویسید.',
          steps: [
            {
              label: 'لگاریتم‌گیری و هوپیتال',
              text: 'مشتق صورت و مخرج در $x\\to\\frac{\\pi}{4}$:',
              latex: '\\ln y = \\lim_{x\\to\\frac{\\pi}{4}}\\frac{\\ln(\\sin 2x)}{\\cot 2x} \\stackrel{\\text{HOP}}{=} \\lim_{x\\to\\frac{\\pi}{4}}\\frac{2\\cos 2x / \\sin 2x}{-2(1+\\cot^2 2x)} = \\frac{0}{-2} = 0',
            },
          ],
          answerLatex: 'y = e^0 = 1',
        },
        {
          id: 'ch2-ex2',
          number: '۲',
          question: 'به ازای چه مقداری از $n$ حاصل $\\lim_{x\\to\\infty}\\left(\\frac{nx+1}{nx-1}\\right)^x$ برابر $\\sqrt{e}$ می‌شود؟',
          hint: 'حد را بر حسب $n$ با $\\ln$ و هوپیتال حساب کنید و برابر $e^{1/2}$ قرار دهید.',
          steps: [
            {
              label: 'لگاریتم‌گیری و هوپیتال',
              text: 'مشتق $\\ln\\frac{nx+1}{nx-1}$ برابر $\\frac{-2n}{(nx-1)(nx+1)}$ است:',
              latex: '\\ln y = \\lim_{x\\to\\infty}\\frac{\\frac{-2n}{(nx-1)(nx+1)}}{-1/x^2} = \\lim_{x\\to\\infty}\\frac{2nx^2}{n^2x^2 - 1} = \\frac{2}{n}',
            },
            {
              label: 'مساوی قرار دادن با ریشه e',
              text: '$e^{2/n} = e^{1/2}$:',
              latex: '\\frac{2}{n} = \\frac{1}{2} \\Rightarrow n = 4',
            },
          ],
          answerLatex: 'n = 4',
        },
      ],
      exercises: [
        {
          id: 'ch2-pr1-1',
          number: '۱-۱',
          difficulty: 'پایه',
          question: 'حاصل $\\lim_{x\\to 0^+}(\\cot x)^{\\sin x}$ را بیابید.',
          hint: 'ابهام $\\infty^0$ است؛ $\\ln y = \\frac{\\ln(\\cot x)}{\\csc x}$ بنویسید.',
          steps: [
            {
              label: 'لگاریتم‌گیری و هوپیتال',
              text: 'مشتق $\\ln(\\cot x)$ برابر $\\frac{-\\csc^2 x}{\\cot x}$ و مشتق $\\csc x$ برابر $-\\csc x\\cot x$ است:',
              latex: '\\ln y = \\lim_{x\\to 0^+}\\frac{-\\csc^2 x / \\cot x}{-\\csc x\\cot x} = \\lim_{x\\to 0^+}\\frac{\\sin x}{\\cos^2 x} = 0',
            },
          ],
          answerLatex: 'y = e^0 = 1',
        },
        {
          id: 'ch2-pr1-2',
          number: '۱-۲',
          difficulty: 'امتحانی',
          question: 'حاصل $\\lim_{x\\to+\\infty}\\left(\\sin\\frac{1}{x} + \\cos\\frac{1}{\\sqrt{x}}\\right)^x$ را بیابید.',
          hint: 'تغییر متغیر $t = 1/x \\to 0^+$ بدهید و از بسط $\\sin t \\approx t$ و $\\cos\\sqrt{t} \\approx 1 - \\frac{t}{2}$ استفاده کنید.',
          steps: [
            {
              label: 'تغییر متغیر و هم‌ارزی',
              text: 'با $t = 1/x \\to 0^+$:',
              latex: '\\sin t + \\cos\\sqrt{t} - 1 \\approx t + \\left(1 - \\frac{t}{2}\\right) - 1 = \\frac{t}{2}',
            },
            {
              label: 'محاسبه لگاریتم حد',
              text: 'از $\\ln(1+u) \\sim u$:',
              latex: '\\ln y = \\lim_{t\\to 0^+}\\frac{1}{t}\\cdot\\frac{t}{2} = \\frac{1}{2} \\Rightarrow y = e^{1/2}',
            },
          ],
          answerLatex: '\\sqrt{e}',
        },
        {
          id: 'ch2-pr1-3',
          number: '۱-۳',
          difficulty: 'پایه',
          question: 'حاصل $\\lim_{x\\to 0^+}(\\sin x + \\cos x)^{\\frac{1}{x}}$ را بیابید.',
          hint: 'در $\\ln y = \\frac{\\ln(\\sin x + \\cos x)}{x}$ هوپیتال بزنید.',
          steps: [
            {
              label: 'هوپیتال روی کسر 0/0',
              text: 'مشتق صورت و مخرج در $x=0$:',
              latex: '\\ln y = \\lim_{x\\to 0^+}\\frac{\\cos x - \\sin x}{\\sin x + \\cos x} = 1 \\Rightarrow y = e',
            },
          ],
          answerLatex: 'e',
        },
        {
          id: 'ch2-pr1-4',
          number: '۱-۴',
          difficulty: 'پایه',
          question: 'حاصل $\\lim_{x\\to 0^-}(1+x)^{\\cot x}$ را بیابید.',
          hint: '$\\ln y = \\frac{\\ln(1+x)}{\\tan x}$ و در $x\\to 0$ داریم $\\ln(1+x)\\sim x$ و $\\tan x\\sim x$.',
          steps: [
            {
              label: 'هم‌ارزی یا هوپیتال',
              text: 'نسبت برابر ۱ می‌شود:',
              latex: '\\ln y = \\lim_{x\\to 0^-}\\frac{\\ln(1+x)}{\\tan x} = 1 \\Rightarrow y = e',
            },
          ],
          answerLatex: 'e',
        },
        {
          id: 'ch2-pr1-5',
          number: '۱-۵',
          difficulty: 'چالشی',
          question: 'حاصل $\\lim_{x\\to 0^+}\\left(\\frac{1+\\tan x}{1+\\sin x}\\right)^{\\frac{1}{\\sin^3 x}}$ را بیابید.',
          hint: 'چون پایه به ۱ میل می‌کند، $\\ln y \\sim \\frac{1}{x^3}\\left(\\frac{1+\\tan x}{1+\\sin x} - 1\\right) = \\frac{\\tan x - \\sin x}{x^3(1+\\sin x)}$.',
          steps: [
            {
              label: 'ساده‌سازی اختلاف پایه از ۱',
              text: 'از $\\tan x - \\sin x = \\tan x(1-\\cos x) \\sim x\\cdot\\frac{x^2}{2} = \\frac{x^3}{2}$:',
              latex: '\\ln y = \\lim_{x\\to 0^+}\\frac{\\tan x - \\sin x}{x^3(1+\\sin x)} = \\lim_{x\\to 0^+}\\frac{x^3/2}{x^3 \\cdot 1} = \\frac{1}{2}',
            },
          ],
          answerLatex: '\\sqrt{e}',
        },
        {
          id: 'ch2-pr1-6',
          number: '۱-۶',
          examTag: 'خواجه نصیر — اردیبهشت ۹۸',
          difficulty: 'امتحانی',
          question: 'حاصل $\\lim_{x\\to 0}\\left(\\frac{\\sin x}{x}\\right)^{\\frac{1}{x^2}}$ را بیابید.',
          hint: 'بسط $\\frac{\\sin x}{x} = 1 - \\frac{x^2}{6} + \\dots$ را جایگذاری کنید.',
          steps: [
            {
              label: 'لگاریتم‌گیری با مک‌لورن',
              text: 'چون $\\ln(1-u) \\sim -u$:',
              latex: '\\ln y = \\lim_{x\\to 0}\\frac{\\ln\\left(1 - \\frac{x^2}{6} + \\dots\\right)}{x^2} = -\\frac{1}{6}',
            },
          ],
          answerLatex: 'e^{-1/6}',
        },
        {
          id: 'ch2-pr1-7',
          number: '۱-۷',
          examTag: 'خواجه نصیر — آذر ۹۷',
          difficulty: 'امتحانی',
          question: 'حاصل $\\lim_{x\\to 0^+}\\left(\\left(\\frac{1}{x}\\right)^{\\sin x} + (\\sin x)^{\\frac{1}{x}}\\right)$ را بیابید.',
          hint: 'دو جمله را جداگانه حساب کنید: جمله اول $1$ و جمله دوم از نوع $0^{+\\infty} = 0$ است (اصلاً مبهم نیست!).',
          steps: [
            {
              label: 'جمله اول',
              text: 'با $\\ln$ و هوپیتال:',
              latex: '\\lim_{x\\to 0^+}(-\\sin x\\ln x) = 0 \\Rightarrow \\lim_{x\\to 0^+}(1/x)^{\\sin x} = e^0 = 1',
            },
            {
              label: 'جمله دوم (غیرمبهم)',
              text: 'پایه به $0^+$ و توان به $+\\infty$ میل می‌کند پس حاصل $0$ است:',
              latex: '1 + 0 = 1',
            },
          ],
          answerLatex: '1',
        },
        {
          id: 'ch2-pr1-8',
          number: '۱-۸',
          examTag: 'خواجه نصیر — اردیبهشت ۹۷',
          difficulty: 'پایه',
          question: 'حاصل $\\lim_{x\\to+\\infty}\\left(\\frac{x+1}{x+2}\\right)^x$ را بیابید.',
          hint: 'کسر را به صورت $1 - \\frac{1}{x+2}$ بنویسید.',
          steps: [
            {
              label: 'تبدیل به فرم استاندارد e',
              text: 'ضرب توان در اختلاف پایه از ۱:',
              latex: '\\ln y = \\lim_{x\\to+\\infty} x\\cdot\\left(\\frac{-1}{x+2}\\right) = -1 \\Rightarrow y = e^{-1}',
            },
          ],
          answerLatex: 'e^{-1}',
        },
        {
          id: 'ch2-pr2',
          number: '۲',
          difficulty: 'امتحانی',
          question: 'به ازای چه مقداری از $\\alpha \\ne 0$ رابطه $\\lim_{x\\to\\infty}\\left(\\frac{-4x+2\\alpha}{-4x-8}\\right)^{\\alpha x - 6} = 1$ برقرار است؟',
          hint: 'کسر برابر $1 + \\frac{2\\alpha+8}{-4x-8}$ است؛ لگاریتم حد را برابر $0$ بگذارید.',
          steps: [
            {
              label: 'محاسبه لگاریتم حد',
              text: 'با $\\ln(1+u) \\sim u$:',
              latex: '\\ln y = \\lim_{x\\to\\infty}(\\alpha x - 6)\\frac{2\\alpha + 8}{-4x - 8} = \\frac{\\alpha(2\\alpha+8)}{-4} = 0',
            },
            {
              label: 'حل معادله با شرط α ≠ 0',
              text: 'چون $\\alpha \\ne 0$ است، پس $2\\alpha+8=0$:',
              latex: '\\alpha = -4',
            },
          ],
          answerLatex: '\\alpha = -4',
        },
      ],
    },
    {
      id: 'ch2-s2',
      title: 'هم‌ارزی و بسط مک‌لورن در حدهای سنگین',
      tag: 'بسط مک‌لورن',
      intuition:
        'وقتی در حدهای $x\\to 0$ توان مخرج بالاست (مثل $x^4$ یا $x^6$ یا $x^{16}$)، زدن ۶ بار هوپیتال هم وقت‌گیر است هم پرخطا. با جایگذاری چند جمله اول بسط مک‌لورن توابع، صورت و مخرج در دو خط ساده می‌شوند.',
      formulas: [
        {
          title: 'فرمول عمومی مک‌لورن',
          latex: 'f(x) = \\sum_{n=0}^{\\infty} f^{(n)}(0)\\frac{x^n}{n!}',
          plainExplain: 'اگر به جای $x$ عبارتی مثل $x^2$ یا $2x$ باشد، دقیقاً همان عبارت را جایگزین $x$ در بسط استاندارد می‌کنیم.',
        },
      ],
      examples: [
        {
          id: 'ch2-ex3-1',
          number: '۳-۱',
          examTag: 'خواجه نصیر — اردیبهشت ۹۸',
          question: 'حاصل $\\lim_{x\\to 0}\\frac{\\cos(x^2) - e^{x^4}}{\\sin(x^4)}$ را بیابید.',
          hint: 'مخرج از مرتبه $x^4$ است؛ پس بسط صورت را هم تا جمله $x^4$ بنویسید.',
          steps: [
            {
              label: 'نوشتن بسط‌ها تا مرتبه x^4',
              text: 'جایگذاری $x^2$ در $\\cos$ و $x^4$ در $e^u$ و $\\sin u$:',
              latex: '\\cos(x^2) \\approx 1 - \\frac{x^4}{2}, \\quad e^{x^4} \\approx 1 + x^4, \\quad \\sin(x^4) \\approx x^4',
            },
            {
              label: 'جایگذاری در کسر',
              text: 'ساده‌سازی صورت:',
              latex: '\\lim_{x\\to 0}\\frac{(1 - \\frac{1}{2}x^4) - (1 + x^4)}{x^4} = -\\frac{3}{2}',
            },
          ],
          answerLatex: '-\\frac{3}{2}',
        },
        {
          id: 'ch2-ex3-2',
          number: '۳-۲',
          examTag: 'خواجه نصیر — آبان ۹۶',
          question: 'حاصل $\\lim_{x\\to 0}\\frac{\\sin(2x) - 2x + \\frac{4}{3}x^3}{x\\cos x - x + \\frac{1}{2}x^3}$ را بیابید.',
          hint: 'جملات درجه ۱ و ۳ در صورت و مخرج حذف می‌شوند؛ پس بسط را تا درجه ۵ ادامه دهید.',
          steps: [
            {
              label: 'بسط تا مرتبه ۵',
              text: 'محاسبه جملات $x^5$:',
              latex: '\\sin(2x) \\approx 2x - \\frac{4}{3}x^3 + \\frac{4}{15}x^5, \\qquad x\\cos x \\approx x - \\frac{1}{2}x^3 + \\frac{1}{24}x^5',
            },
            {
              label: 'تقسیم ضرایب x^5',
              text: 'پس از حذف جملات درجه‌پایین:',
              latex: '\\frac{4/15}{1/24} = \\frac{96}{15} = \\frac{32}{5}',
            },
          ],
          answerLatex: '\\frac{32}{5}',
        },
        {
          id: 'ch2-ex3-3',
          number: '۳-۳',
          examTag: 'خواجه نصیر — آذر ۹۷',
          question: 'حاصل $\\lim_{x\\to 0}\\frac{\\sin^2 x - x^2 + \\frac{1}{3}x^4}{x^6}$ را بیابید.',
          hint: 'به جای به توان ۲ رساندن بسط $\\sin x$، از اتحاد $\\sin^2 x = \\frac{1-\\cos 2x}{2}$ استفاده کنید.',
          steps: [
            {
              label: 'بسط sin^2 x تا مرتبه ۶',
              text: 'بسط $\\cos(2x) \\approx 1 - \\frac{4x^2}{2!} + \\frac{16x^4}{4!} - \\frac{64x^6}{6!}$:',
              latex: '\\sin^2 x \\approx x^2 - \\frac{1}{3}x^4 + \\frac{2}{45}x^6',
            },
            {
              label: 'محاسبه حد',
              text: 'جایگذاری در صورت:',
              latex: '\\lim_{x\\to 0}\\frac{\\frac{2}{45}x^6}{x^6} = \\frac{2}{45}',
            },
          ],
          answerLatex: '\\frac{2}{45}',
        },
      ],
      exercises: [
        {
          id: 'ch2-pr4-1',
          number: '۴-۱',
          difficulty: 'پایه',
          question: 'حاصل $\\lim_{x\\to 0}\\frac{\\sin^2 x - x^2}{x^4}$ را بیابید.',
          hint: 'از بسط $\\sin^2 x \\approx x^2 - \\frac{1}{3}x^4$ استفاده کنید.',
          steps: [
            {
              label: 'جایگذاری بسط مک‌لورن',
              text: 'با $\\sin^2 x = x^2 - \\frac{1}{3}x^4 + O(x^6)$:',
              latex: '\\lim_{x\\to 0}\\frac{(x^2 - \\frac{1}{3}x^4) - x^2}{x^4} = -\\frac{1}{3}',
            },
          ],
          answerLatex: '-\\frac{1}{3}',
        },
        {
          id: 'ch2-pr4-2',
          number: '۴-۲',
          difficulty: 'امتحانی',
          question: 'حاصل $\\lim_{x\\to 0}\\frac{x - \\sin(\\sin x)}{x^3}$ را بیابید.',
          hint: 'دو بار بسط $\\sin u \\approx u - \\frac{u^3}{6}$ را تو در تو به کار ببرید.',
          steps: [
            {
              label: 'بسط تو در تو تا x^3',
              text: 'با $u = \\sin x \\approx x - \\frac{x^3}{6}$:',
              latex: '\\sin(\\sin x) \\approx \\left(x - \\frac{x^3}{6}\\right) - \\frac{1}{6}\\left(x - \\frac{x^3}{6}\\right)^3 \\approx x - \\frac{1}{3}x^3',
            },
            {
              label: 'محاسبه حد',
              text: 'جایگذاری در صورت:',
              latex: '\\lim_{x\\to 0}\\frac{x - (x - \\frac{1}{3}x^3)}{x^3} = \\frac{1}{3}',
            },
          ],
          answerLatex: '\\frac{1}{3}',
        },
        {
          id: 'ch2-pr4-3',
          number: '۴-۳',
          difficulty: 'امتحانی',
          question: 'حاصل $\\lim_{x\\to 0}\\frac{(e^x - 1 - x)^2\\cos x}{x(\\sin x - x)}$ را بیابید.',
          hint: '$e^x - 1 - x \\sim \\frac{x^2}{2}$ و $\\sin x - x \\sim -\\frac{x^3}{6}$.',
          steps: [
            {
              label: 'جایگذاری هم‌ارزی‌ها',
              text: 'صورت از مرتبه $x^4$ و مخرج نیز از مرتبه $x^4$ است:',
              latex: '\\lim_{x\\to 0}\\frac{(x^2/2)^2 \\cdot 1}{x(-x^3/6)} = \\frac{1/4}{-1/6} = -\\frac{3}{2}',
            },
          ],
          answerLatex: '-\\frac{3}{2}',
        },
        {
          id: 'ch2-pr4-4',
          number: '۴-۴',
          difficulty: 'امتحانی',
          question: 'حاصل $\\lim_{x\\to 0}\\frac{\\cos(x^4) - 1 + \\frac{1}{2}x^8}{x^{16}}$ را بیابید.',
          hint: 'در بسط $\\cos u = 1 - \\frac{u^2}{2!} + \\frac{u^4}{4!} - \\dots$، مقدار $u = x^4$ بگذارید.',
          steps: [
            {
              label: 'جایگذاری u = x^4',
              text: 'دو جمله اول با $-1 + \\frac{1}{2}x^8$ حذف می‌شوند:',
              latex: '\\cos(x^4) \\approx 1 - \\frac{x^8}{2} + \\frac{x^{16}}{24} \\Rightarrow \\lim_{x\\to 0}\\frac{x^{16}/24}{x^{16}} = \\frac{1}{24}',
            },
          ],
          answerLatex: '\\frac{1}{24}',
        },
        {
          id: 'ch2-pr4-5',
          number: '۴-۵',
          difficulty: 'چالشی',
          question: 'حاصل $\\lim_{x\\to 0}\\frac{\\cos x - 1 + \\frac{1}{2}x\\sin x}{[\\ln(1+x)]^4}$ را بیابید.',
          hint: 'مخرج هم‌ارز $x^4$ است؛ بسط صورت را تا $x^4$ بنویسید.',
          steps: [
            {
              label: 'بسط صورت تا x^4',
              text: '$\\cos x \\approx 1 - \\frac{x^2}{2} + \\frac{x^4}{24}$ و $\\frac{1}{2}x\\sin x \\approx \\frac{x^2}{2} - \\frac{x^4}{12}$:',
              latex: '\\text{صورت} \\approx \\left(\\frac{1}{24} - \\frac{1}{12}\\right)x^4 = -\\frac{1}{24}x^4',
            },
            {
              label: 'تقسیم بر مخرج هم‌ارز x^4',
              text: 'چون $\\ln(1+x) \\sim x$:',
              latex: '\\lim_{x\\to 0}\\frac{-x^4/24}{x^4} = -\\frac{1}{24}',
            },
          ],
          answerLatex: '-\\frac{1}{24}',
        },
        {
          id: 'ch2-pr4-6',
          number: '۴-۶',
          difficulty: 'امتحانی',
          question: 'حاصل $\\lim_{x\\to 0}\\left(\\frac{a^{x+1}+b^{x+1}}{a+b}\\right)^{\\frac{1}{x}}$ را بیابید ($a,b>0$).',
          hint: 'ابهام $1^\\infty$ است؛ $\\ln$ بگیرید و یک بار هوپیتال بزنید.',
          steps: [
            {
              label: 'لگاریتم‌گیری و هوپیتال',
              text: 'مشتق $a^{x+1}$ برابر $a^{x+1}\\ln a$ است:',
              latex: '\\ln y = \\lim_{x\\to 0}\\frac{a^{x+1}\\ln a + b^{x+1}\\ln b}{a^{x+1}+b^{x+1}} = \\frac{a\\ln a + b\\ln b}{a+b}',
            },
            {
              label: 'تبدیل به فرم نمایی',
              text: 'نوشتن به صورت $y = e^{\\ln y}$:',
              latex: 'y = \\left(a^a b^b\\right)^{\\frac{1}{a+b}}',
            },
          ],
          answerLatex: '\\left(a^a b^b\\right)^{\\frac{1}{a+b}}',
        },
      ],
    },
    {
      id: 'ch2-s3',
      title: 'قضیه فشردگی (ساندویچ) برای جزء صحیح و مجموع‌ها',
      tag: 'قضیه فشردگی',
      intuition:
        'هر وقت در حد $n\\to\\infty$ با جزء صحیح $[u]$ یا جمع $n$ جمله روبه‌رو شدید که فرمول بسته ندارند، عبارت را بین دو کران پایین و بالا محصور کنید؛ برای جزء صحیح همیشه نامساوی $u - 1 < [u] \\le u$ کلید حل است.',
      formulas: [
        {
          title: 'نامساوی پایه جزء صحیح',
          latex: 'u - 1 < [u] \\le u',
          plainExplain: 'این نامساوی را برای هر جمله بنویسید، با هم جمع کنید و از طرفین حد بگیرید.',
        },
      ],
      examples: [
        {
          id: 'ch2-ex4',
          number: '۴',
          question: 'ثابت کنید به ازای $x>1$ مقدار $\\lim_{n\\to\\infty}\\frac{[x]+[x^2]+\\dots+[x^n]}{x^n}$ برابر $\\frac{x}{x-1}$ است.',
          hint: 'برای هر $k$ بنویسید $x^k - 1 < [x^k] \\le x^k$ و از مجموع تصاعد هندسی استفاده کنید.',
          steps: [
            {
              label: 'جمع نامساوی‌ها',
              text: 'مجموع $x+x^2+\\dots+x^n$ برابر $\\frac{x(x^n-1)}{x-1}$ است:',
              latex: '\\frac{x(x^n-1)}{x-1} - n < \\sum_{k=1}^n [x^k] \\le \\frac{x(x^n-1)}{x-1}',
            },
            {
              label: 'تقسیم بر x^n و حدگیری',
              text: 'چون $x>1$، داریم $\\lim \\frac{n}{x^n}=0$ و $\\lim \\frac{x^n-1}{x^n}=1$:',
              latex: '\\frac{x}{x-1} \\le \\lim_{n\\to\\infty}\\frac{\\sum_{k=1}^n [x^k]}{x^n} \\le \\frac{x}{x-1}',
            },
          ],
          answerLatex: '\\frac{x}{x-1}',
        },
        {
          id: 'ch2-ex5',
          number: '۵',
          question: 'مقدار حد $\\lim_{n\\to+\\infty}\\left[\\left(\\frac{1}{n}\\right)^1 + \\left(\\frac{2}{n}\\right)^2 + \\dots + \\left(\\frac{n}{n}\\right)^n\\right]^{\\frac{1}{n}}$ را بیابید.',
          hint: 'جمله آخر برابر ۱ است و هر $n$ جمله حداکثر ۱ هستند؛ پس کل مجموع بین $1$ و $n$ است.',
          steps: [
            {
              label: 'محصور کردن مجموع',
              text: 'مجموع بزرگ‌تر یا مساوی آخرین جمله ($1$) و کوچک‌تر یا مساوی $n$ است:',
              latex: '1 \\le \\sum_{k=1}^n \\left(\\frac{k}{n}\\right)^k \\le n \\implies 1 \\le \\left[\\sum_{k=1}^n \\left(\\frac{k}{n}\\right)^k\\right]^{1/n} \\le n^{1/n}',
            },
            {
              label: 'حد کران بالا',
              text: 'چون $\\lim_{n\\to\\infty} n^{1/n} = e^{\\lim \\frac{\\ln n}{n}} = e^0 = 1$، طبق قضیه فشردگی:',
              latex: '\\lim_{n\\to+\\infty} \\left[\\dots\\right]^{1/n} = 1',
            },
          ],
          answerLatex: '1',
        },
      ],
      exercises: [
        {
          id: 'ch2-pr3',
          number: '۳',
          difficulty: 'امتحانی',
          question: 'اگر $A = \\lim_{n\\to+\\infty}\\frac{\\sum_{m=1}^n [mx]}{n^2}$ باشد، نشان دهید $A = \\frac{x}{2}$.',
          hint: 'برای هر $m$ بنویسید $mx - 1 < [mx] \\le mx$ و از $\\sum_{m=1}^n m = \\frac{n(n+1)}{2}$ استفاده کنید.',
          steps: [
            {
              label: 'جمع‌زدن نامساوی‌ها از m=1 تا n',
              text: 'تشکیل کران پایین و بالا:',
              latex: 'x\\frac{n(n+1)}{2} - n < \\sum_{m=1}^n [mx] \\le x\\frac{n(n+1)}{2}',
            },
            {
              label: 'تقسیم بر n^2 و حدگیری',
              text: 'هر دو کران در $n\\to\\infty$ به $\\frac{x}{2}$ میل می‌کنند:',
              latex: '\\lim_{n\\to+\\infty}\\left(\\frac{x(n+1)}{2n} - \\frac{1}{n}\\right) = \\frac{x}{2} \\implies A = \\frac{x}{2}',
            },
          ],
          answerLatex: 'A = \\frac{x}{2}',
        },
      ],
    },
  ],
};
