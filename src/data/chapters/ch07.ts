import type { ChapterData } from '../../types';

export const ch07: ChapterData = {
  id: 'polar-hyperbolic',
  number: 7,
  title: 'پیوست: قطبی و هایپربولیک',
  subtitle: 'مختصات قطبی، شیب مماس، مساحت و طول قوس قطبی، و توابع هایپربولیک و معکوس آن‌ها',
  pdfPages: 'ص ۷۷ تا ۸۳',
  accent: '#DB2777',
  accentSoft: 'rgba(219, 39, 119, 0.11)',
  estimatedMinutes: 45,
  cheatSheet: [
    { title: 'تبدیل دکارتی ↔ قطبی', latex: 'x = r\\cos\\theta, \\quad y = r\\sin\\theta, \\quad x^2+y^2 = r^2' },
    { title: 'شیب خط مماس در قطبی', latex: '\\frac{dy}{dx} = \\frac{r\'\\sin\\theta + r\\cos\\theta}{r\'\\cos\\theta - r\\sin\\theta}' },
    { title: 'مساحت و طول قوس در قطبی', latex: 'A = \\frac{1}{2}\\int_a^b r^2\\,d\\theta, \\qquad L = \\int_a^b \\sqrt{r^2 + (r\')^2}\\,d\\theta' },
    { title: 'توابع هایپربولیک و اتحاد پایه', latex: '\\sinh x = \\frac{e^x-e^{-x}}{2}, \\quad \\cosh x = \\frac{e^x+e^{-x}}{2}, \\quad \\cosh^2 x - \\sinh^2 x = 1' },
    { title: 'معکوس هایپربولیک به فرم لگاریتمی', latex: '\\sinh^{-1}x = \\ln(x+\\sqrt{x^2+1}), \\quad \\cosh^{-1}x = \\ln(x+\\sqrt{x^2-1}), \\quad \\tanh^{-1}x = \\frac{1}{2}\\ln\\frac{1+x}{1-x}' },
  ],
  steps: [
    {
      id: 'ch7-s1',
      title: 'مختصات قطبی، منحنی‌های معروف، مماس، مساحت و طول قوس',
      tag: 'مختصات قطبی',
      intuition:
        'هر وقت در معادله دکارتی عبارت $x^2+y^2$ دیدید، کد ورود به مختصات قطبی است! دایره‌های گذرنده از مبدأ ($r=2a\\cos\\theta$ و $r=2a\\sin\\theta$) در یک نیم‌دور (بازه به طول $\\pi$) کامل رسم می‌شوند، در حالی که دایره هم‌مرکز با مبدأ $r=c$ بازه $[0,2\\pi]$ دارد.',
      table: {
        headers: ['معادله قطبی', 'نام منحنی'],
        rows: [
          ['$\\theta = c$', 'خط مبدأگذر'],
          ['$r = c$', 'دایره به مرکز مبدأ'],
          ['$r = \\theta$', 'مارپیچ'],
          ['$r\\sin\\theta = b$', 'خط افقی ($y=b$)'],
          ['$r\\cos\\theta = a$', 'خط عمودی ($x=a$)'],
          ['$r = a + b\\cos\\theta$ یا $a + b\\sin\\theta$', 'دلگون / دلوار'],
          ['$r^2 = a\\cos 2\\theta$ یا $a\\sin 2\\theta$', 'پروانه (لمنیسکات)'],
        ],
      },
      examples: [
        { id: 'ch7-ex1', number: '۱', question: 'تبدیل دکارتی به قطبی و برعکس: الف) $(x^2+y^2)^2 = 4(x^2-y^2)$، ب) $r=\\cos 2\\theta$، ج) $r=1-\\cos\\theta$.', hint: 'طرفین را در صورت نیاز در $r$ یا $r^2$ ضرب کنید تا $r^2, r\\cos\\theta, r\\sin\\theta$ ظاهر شوند.', steps: [{ label: 'تبدیل هر سه عبارت', text: 'الف) $r^4 = 4r^2\\cos 2\\theta \\Rightarrow r^2=4\\cos 2\\theta$ (یا $r=0$). ب) $(x^2+y^2)^{3/2} = x^2-y^2$. ج) $x^2+y^2 = \\sqrt{x^2+y^2} - x$.' }], answerLatex: '\\text{الف) } r^2=4\\cos 2\\theta, \\; \\text{ب) } (x^2+y^2)^{3/2}=x^2-y^2, \\; \\text{ج) } x^2+y^2=\\sqrt{x^2+y^2}-x' },
        { id: 'ch7-ex2', number: '۲', question: 'معادله دکارتی و شکل دایره‌های الف) $r=7$، ب) $r=4\\cos\\theta$، ج) $r=-7\\sin\\theta$ را بیابید.', hint: 'طرفین را در $r$ ضرب کنید و مربع کامل بسازید.', steps: [{ label: 'تبدیل به دکارتی', text: 'الف) $x^2+y^2=49$؛ ب) $(x-2)^2+y^2=4$؛ ج) $x^2+(y+3.5)^2 = 3.5^2$.' }], answerLatex: 'x^2+y^2=49,\\; (x-2)^2+y^2=4,\\; x^2+(y+3.5)^2=12.25' },
        { id: 'ch7-ex3', number: '۳', examTag: 'خواجه نصیر — آذر ۹۷', question: 'شیب خط مماس بر $r=\\cos^2\\theta$ در نقطه $\\theta=\\frac{\\pi}{4}$ را بیابید.', hint: '$r(\\pi/4)=\\frac{1}{2}$ و $r\'(\\theta)=-\\sin 2\\theta \\Rightarrow r\'(\\pi/4)=-1$.', steps: [{ label: 'جایگذاری در فرمول dy/dx', text: '$\\frac{(-1)(\\frac{\\sqrt{2}}{2}) + (\\frac{1}{2})(\\frac{\\sqrt{2}}{2})}{(-1)(\\frac{\\sqrt{2}}{2}) - (\\frac{1}{2})(\\frac{\\sqrt{2}}{2})} = \\frac{-1/2}{-3/2} = \\frac{1}{3}$:' }], answerLatex: '\\frac{1}{3}' },
        { id: 'ch7-ex4', number: '۴', question: 'مساحت محدود به $r=\\cos\\theta$ و محور طول‌ها در ربع اول را بیابید.', hint: 'در ربع اول $\\theta$ از $0$ تا $\\frac{\\pi}{2}$ است: $\\frac{1}{2}\\int_0^{\\pi/2}\\cos^2\\theta\\,d\\theta$.', steps: [{ label: 'محاسبه مساحت', text: '$\\frac{1}{4}[\\theta + \\frac{1}{2}\\sin 2\\theta]_0^{\\pi/2} = \\frac{\\pi}{8}$ (نیم‌دایره‌ای به شعاع $\\frac{1}{2}$):' }], answerLatex: '\\frac{\\pi}{8}' },
        { id: 'ch7-ex5', number: '۵', question: 'مساحت داخل دلوار $r=2(1+\\cos\\theta)$ و خارج از دایره $r=3$ را بیابید.', hint: 'تلاقی: $2+2\\cos\\theta=3 \\Rightarrow \\theta=\\pm\\frac{\\pi}{3}$؛ به دلیل تقارن ۲ برابر $[0,\\frac{\\pi}{3}]$ بگیرید.', steps: [{ label: 'انتگرال مساحت بین دو منحنی', text: '$\\int_0^{\\pi/3}[(2+2\\cos\\theta)^2 - 9]d\\theta = [\\sin 2\\theta + 8\\sin\\theta - 3\\theta]_0^{\\pi/3}$:' }], answerLatex: '\\frac{9\\sqrt{3}}{2} - \\pi' },
        { id: 'ch7-ex6', number: '۶', question: 'طول منحنی قطبی $r = e^{\\theta/2}$ از $\\theta=1$ تا $\\theta=2$ را بیابید.', hint: '$r\' = \\frac{1}{2}e^{\\theta/2} \\Rightarrow ds = \\frac{\\sqrt{5}}{2}e^{\\theta/2}d\\theta$.', steps: [{ label: 'انتگرال طول قوس', text: '$\\int_1^2\\frac{\\sqrt{5}}{2}e^{\\theta/2}d\\theta = [\\sqrt{5}e^{\\theta/2}]_1^2$:' }], answerLatex: '\\sqrt{5}(e - \\sqrt{e})' },
      ],
      exercises: [
        { id: 'ch7-pr1', number: '۱', difficulty: 'امتحانی', question: 'برای دلوار $r=1+\\sin\\theta$: الف) شیب مماس در $\\theta=\\frac{\\pi}{3}$ و ب) نقاطی که مماس افقی است را بیابید.', hint: '$dy/d\\theta = \\cos\\theta(1+2\\sin\\theta)$ و $dx/d\\theta = -\\sin\\theta - \\sin 2\\theta$.', steps: [{ label: 'الف) شیب و ب) مماس افقی', text: 'الف) در $\\frac{\\pi}{3}$ داریم $\\frac{dy/d\\theta}{dx/d\\theta} = \\frac{\\frac{1}{2}(1+\\sqrt{3})}{-\\sqrt{3}} = -\\frac{3+\\sqrt{3}}{6}$؟ دقت: $\\frac{dx}{d\\theta} = -\\sin\\theta(1+2\\cos\\theta) = -\\sqrt{3}$ پس شیب $-\\frac{1+\\sqrt{3}}{2\\sqrt{3}} = -\\frac{3+\\sqrt{3}}{6}$؟ نه: $x=(1+\\sin\\theta)\\cos\\theta \\Rightarrow x\'=\\cos^2\\theta-\\sin\\theta-\\sin^2\\theta = \\frac{1}{4}-\\frac{\\sqrt{3}}{2}-\\frac{3}{4} = -\\frac{1+\\sqrt{3}}{2}$ و $y\'=\\frac{1+\\sqrt{3}}{2}$ پس شیب دقیقاً $-1$ است! ب) $y\'=0$ و $x\'\\ne 0$ در $\\theta=\\frac{\\pi}{2},\\; \\frac{7\\pi}{6},\\; \\frac{11\\pi}{6}$.' }], answerLatex: '\\text{الف) } -1, \\qquad \\text{ب) } \\theta = \\frac{\\pi}{2},\\; \\frac{7\\pi}{6},\\; \\frac{11\\pi}{6}' },
        { id: 'ch7-pr2', number: '۲', difficulty: 'پایه', question: 'سطح داخل مارپیچ $r = e^{\\theta/(4\\pi)}$ از $\\theta=0$ تا $\\theta=2\\pi$ چقدر است؟', hint: '$A = \\frac{1}{2}\\int_0^{2\\pi} e^{\\theta/(2\\pi)}d\\theta$.', steps: [{ label: 'محاسبه انتگرال', text: '$\\frac{1}{2}[2\\pi e^{\\theta/(2\\pi)}]_0^{2\\pi} = \\pi(e - 1)$:' }], answerLatex: '\\pi(e - 1)' },
        { id: 'ch7-pr3', number: '۳', difficulty: 'پایه', question: 'مساحت منحنی بسته $r=2\\sin\\theta$ را بیابید.', hint: 'دایره‌ای به شعاع $1$ روی $[0,\\pi]$ است.', steps: [{ label: 'انتگرال روی [0,π]', text: '$\\frac{1}{2}\\int_0^\\pi 4\\sin^2\\theta\\,d\\theta = \\pi$:' }], answerLatex: '\\pi' },
        { id: 'ch7-pr4', number: '۴', difficulty: 'امتحانی', question: 'مساحت ناحیه مشترک بین $r=2\\cos\\theta$ و $r=\\sqrt{2}$ را بیابید.', hint: 'تلاقی در $\\theta=\\pm\\frac{\\pi}{4}$؛ دو برابر $[0,\\frac{\\pi}{4}]$ برای دایره $r=\\sqrt{2}$ به علاوه $[\\frac{\\pi}{4},\\frac{\\pi}{2}]$ برای $r=2\\cos\\theta$.', steps: [{ label: 'جمع دو قطاع متقارن', text: '$\\int_0^{\\pi/4} 2\\,d\\theta + \\int_{\\pi/4}^{\\pi/2} 4\\cos^2\\theta\\,d\\theta = \\frac{\\pi}{2} + (\\frac{\\pi}{2} - 1)$:' }], answerLatex: '\\pi - 1' },
        { id: 'ch7-pr5', number: '۵', difficulty: 'امتحانی', question: 'محیط منحنی قطبی $r=1+\\cos\\theta$ را بیابید.', hint: '$r^2+r\'^2 = 2+2\\cos\\theta = 4\\cos^2(\\theta/2)$ و روی $[0,\\pi]$ دو برابر بگیرید.', steps: [{ label: 'طول قوس دلوار', text: '$2\\int_0^\\pi 2\\cos(\\theta/2)\\,d\\theta = 8[\\sin(\\theta/2)]_0^\\pi = 8$:' }], answerLatex: '8' },
        { id: 'ch7-pr6', number: '۶', difficulty: 'امتحانی', question: 'حجم حاصل از دوران $r=\\cos\\theta$ ($0\\le\\theta\\le\\frac{\\pi}{2}$) حول محور $x$ را بیابید.', hint: 'در دکارتی این همان نیم‌دایره بالایی $(x-\\frac{1}{2})^2+y^2=\\frac{1}{4}$ است که از دورانش کره‌ای به شعاع $\\frac{1}{2}$ ساخته می‌شود!', steps: [{ label: 'تبدیل به دکارتی و حجم کره', text: '$V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi\\left(\\frac{1}{2}\\right)^3 = \\frac{\\pi}{6}$:' }], answerLatex: '\\frac{\\pi}{6}' },
      ],
    },
    {
      id: 'ch7-s2',
      title: 'توابع هایپربولیک، معکوس هایپربولیک و ۸ اتحاد کلیدی',
      tag: 'هایپربولیک',
      intuition:
        'توابع هایپربولیک (هذلولوی) چیزی جز ترکیب ساده $e^x$ و $e^{-x}$ نیستند. نکته مهم در امتحان‌ها: اتحادهای آن‌ها شبیه مثلثات است با این تفاوت کلیدی که در جاهایی که ضرب دو سینوس می‌آید علامت عوض می‌شود (مثلاً $\\cosh^2 x - \\sinh^2 x = 1$ و $1 - \\tanh^2 x = \\operatorname{sech}^2 x$).',
      formulas: [
        {
          title: '۸ اتحاد مهم هایپربولیک',
          latex: '\\cosh^2 x - \\sinh^2 x = 1, \\quad \\cosh x + \\sinh x = e^x, \\quad \\sinh 2x = 2\\sinh x\\cosh x, \\quad \\cosh 2x = \\cosh^2 x + \\sinh^2 x',
          plainExplain: 'همچنین $1-\\tanh^2 x = \\operatorname{sech}^2 x$ و فرمول‌های جمع و تفاضل $\\sinh(x\\pm y)$ و $\\cosh(x\\pm y)$ با همان علامت وسط.',
        },
      ],
      table: {
        headers: ['تابع', 'دامنه ($D_f$)', 'برد ($R_f$)', 'زوج / فرد'],
        rows: [
          ['$\\sinh x$', '$\\mathbb{R}$', '$\\mathbb{R}$', 'فرد'],
          ['$\\cosh x$', '$\\mathbb{R}$', '$[1,+\\infty)$', 'زوج'],
          ['$\\tanh x$', '$\\mathbb{R}$', '$(-1,1)$', 'فرد'],
          ['$\\coth x$', '$\\mathbb{R}-\\{0\\}$', '$(-\\infty,-1)\\cup(1,+\\infty)$', 'فرد'],
          ['$\\operatorname{sech} x$', '$\\mathbb{R}$', '$(0,1]$', 'زوج'],
          ['$\\operatorname{csch} x$', '$\\mathbb{R}-\\{0\\}$', '$\\mathbb{R}-\\{0\\}$', 'فرد'],
        ],
      },
      checkpoint: {
        id: 'ch7-cp1',
        prompt: 'حاصل $\\cosh(\\ln x) + \\sinh(\\ln x)$ برای $x>0$ برابر چیست؟',
        options: ['$x$', '$x^2$', '$1/x$', '$\\ln x$'],
        correctIndex: 0,
        feedback: 'طبق اتحاد $\\cosh u + \\sinh u = e^u$ داریم $e^{\\ln x} = x$.',
      },
      examples: [
        { id: 'ch7-ex7', number: '۷', examTag: 'خواجه نصیر — اردیبهشت ۹۷', question: 'الف) نشان دهید $\\tanh^{-1}x = \\frac{1}{2}\\ln\\frac{1+x}{1-x}$ و دامنه و بردش را بیابید. ب) حاصل $\\frac{\\cosh(\\ln x)+\\sinh(\\ln x)}{\\cosh(\\ln x)-\\sinh(\\ln x)}$ را بیابید.', hint: 'در الف $x=\\frac{e^y-e^{-y}}{e^y+e^{-y}}$ را بر حسب $e^{2y}$ حل کنید؛ در ب صورت $e^{\\ln x}=x$ و مخرج $e^{-\\ln x}=1/x$ است.', steps: [{ label: 'حل الف و ب', text: 'الف) $e^{2y} = \\frac{1+x}{1-x} \\Rightarrow y = \\frac{1}{2}\\ln\\frac{1+x}{1-x}$ با $D=(-1,1)$ و $R=\\mathbb{R}$. ب) $\\frac{x}{1/x} = x^2$.' }], answerLatex: '\\text{الف) } D=(-1,1),\\; R=\\mathbb{R}, \\qquad \\text{ب) } x^2' },
        { id: 'ch7-ex8', number: '۸', question: 'جواب معادله $3\\sinh x + \\frac{9}{5}\\cosh x = -\\frac{9}{5}$ را بیابید.', hint: 'تعریف نمایی را جایگذاری کنید و طرفین را در $e^x$ ضرب کنید تا معادله درجه ۲ بر حسب $e^x$ شود.', steps: [{ label: 'تبدیل به معادله درجه ۲ بر حسب e^x', text: '$4e^{2x}+3e^x-1=0 \\Rightarrow (e^x+1)(4e^x-1)=0 \\Rightarrow e^x=\\frac{1}{4}$:' }], answerLatex: 'x = \\ln\\left(\\frac{1}{4}\\right) = -\\ln 4' },
      ],
      exercises: [
        { id: 'ch7-pr7', number: '۷', examTag: 'خواجه نصیر — دی ۹۶', difficulty: 'امتحانی', question: 'نمایش لگاریتمی تابع $y = \\operatorname{sech}^{-1}x$ ($0<x\\le 1$) را بیابید.', hint: '$x = \\frac{2}{e^y+e^{-y}}$ را به معادله درجه ۲ بر حسب $e^y$ تبدیل کنید (با شرط $y\\ge 0 \\Rightarrow e^y\\ge 1$).', steps: [{ label: 'حل معادله درجه ۲ برای e^y', text: '$x e^{2y} - 2e^y + x = 0 \\Rightarrow e^y = \\frac{1 + \\sqrt{1-x^2}}{x}$:' }], answerLatex: '\\operatorname{sech}^{-1}x = \\ln\\left(\\frac{1+\\sqrt{1-x^2}}{x}\\right), \\quad 0 < x \\le 1' },
      ],
    },
  ],
};
