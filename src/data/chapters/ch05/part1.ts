import type { LessonStep } from '../../../types';

/**
 * فصل پنجم (کاربرد انتگرال) — بخش اول:
 * گام ۱: انتگرال معین، مساحت و تقارن زوج/فرد (مثال ۱ تا ۵ + تمرین ۱-۱ تا ۱-۷)
 * گام ۲: محاسبه حد به کمک انتگرال معین (مثال ۶-۱ تا ۶-۵ + تمرین ۲-۱ تا ۲-۷)
 * گام ۳: مشتق انتگرال — قضیه اول حساب و لایب‌نیتس (مثال ۷، ۸-۱ تا ۸-۳، ۹ + تمرین ۳-۱ تا ۳-۴، ۴ تا ۶)
 */
export const ch05Part1Steps: LessonStep[] = [
  {
    id: 'ch5-s1',
    title: 'انتگرال معین، مساحت بین دو منحنی و تقارن زوج و فرد',
    tag: 'معین و مساحت',
    intuition:
      'در انتگرال معینِ قدرمطلق، اول ریشه‌های داخل قدرمطلق را پیدا کرده بازه را می‌شکنیم. اگر بازه انتگرال نسبت به مبدأ متقارن باشد ($[-a,a]$)، انتگرال هر تابع **فرد** صفر است و انتگرال هر تابع **زوج** دو برابر انتگرال روی $[0,a]$ می‌شود.',
    formulas: [
      {
        title: 'قضیه دوم حساب، مساحت و تقارن',
        latex: '\\int_a^b f(x)\\,dx = F(b)-F(a), \\quad S = \\int_a^b |f(x)-g(x)|\\,dx, \\quad \\int_{-a}^a f_{\\text{فرد}}(x)\\,dx = 0',
        plainExplain: 'در انتگرال روی $[-a,a]$ قبل از هر محاسبه‌ای چک کنید که آیا تابع فرد است یا با تغییر متغیر ساده فرد می‌شود.',
      },
    ],
    examples: [
      { id: 'ch5-ex1', number: '۱', question: 'حاصل $\\int_{-1}^1 |xe^x|\\,dx$ را بیابید.', hint: 'در $[-1,0]$ منفی و در $[0,1]$ مثبت است؛ سپس جزبه‌جز بزنید.', steps: [{ label: 'شکستن بازه در x=0', text: '$[-e^x(x-1)]_{-1}^0 + [e^x(x-1)]_0^1 = (1-\\frac{2}{e}) + (0+1)$:' }], answerLatex: '2 - \\frac{2}{e}' },
      { id: 'ch5-ex2', number: '۲', question: 'مساحت محصور به دو منحنی $f(x)=e^x$ و $g(x)=e^{e^x+x}$ در بازه $[0,1]$ را بیابید.', hint: 'در $[0,1]$ داریم $g(x) > f(x)$؛ تغییر متغیر $u=e^x$ بزنید.', steps: [{ label: 'تغییر متغیر u=e^x', text: '$\\int_1^e(e^u-1)du = [e^u-u]_1^e = e^e - e - (e-1)$:' }], answerLatex: 'e^e - 2e + 1' },
      { id: 'ch5-ex3', number: '۳', question: 'مقدار $\\int_{-\\pi}^\\pi x\\cos(x+|x|)\\,dx$ را بیابید.', hint: 'در $[-\\pi,0]$ داریم $x+|x|=0$ و در $[0,\\pi]$ داریم $x+|x|=2x$.', steps: [{ label: 'تفکیک بازه و جزبه‌جز', text: '$\\int_{-\\pi}^0 x\\,dx + \\int_0^\\pi x\\cos 2x\\,dx = -\\frac{\\pi^2}{2} + 0$:' }], answerLatex: '-\\frac{\\pi^2}{2}' },
      { id: 'ch5-ex4', number: '۴', question: 'حاصل $\\int_{-5}^1 \\ln(\\sqrt{x^2+4x+5} - x - 2)\\,dx$ را بیابید.', hint: '$u=x+2$ بگذارید تا بازه به $[-3,3]$ تبدیل شود؛ تابع $\\ln(\\sqrt{u^2+1}-u)$ فرد است!', steps: [{ label: 'تغییر متغیر متقارن', text: '$\\int_{-3}^3 \\ln(\\sqrt{u^2+1}-u)\\,du = 0$ چون $f(-u) = \\ln(\\sqrt{u^2+1}+u) = -f(u)$:' }], answerLatex: '0' },
      { id: 'ch5-ex5', number: '۵', question: 'حاصل $\\int_{-1}^1\\frac{dx}{1+x^5+\\sqrt{1+x^{10}}}$ را بیابید.', hint: 'صورت و مخرج را در مزدوج $(1+x^5) - \\sqrt{1+x^{10}}$ ضرب کنید.', steps: [{ label: 'گویاسازی و حذف بخش فرد', text: '$\\int_{-1}^1\\frac{1}{2}dx + \\int_{-1}^1\\frac{1-\\sqrt{1+x^{10}}}{2x^5}dx = 1 + 0$:' }], answerLatex: '1' },
    ],
    exercises: [
      { id: 'ch5-pr1-1', number: '۱-۱', difficulty: 'امتحانی', question: 'حاصل $\\int_0^{\\ln 2}\\sqrt{e^x-1}\\,dx$ را بیابید.', hint: '$u=\\sqrt{e^x-1} \\Rightarrow 2\\int_0^1\\frac{u^2}{u^2+1}du$.', steps: [{ label: 'تغییر متغیر رادیکالی', text: '$2\\int_0^1(1 - \\frac{1}{u^2+1})du = 2[u-\\tan^{-1}u]_0^1$:' }], answerLatex: '2 - \\frac{\\pi}{2}' },
      { id: 'ch5-pr1-2', number: '۱-۲', difficulty: 'امتحانی', question: 'حاصل $\\int_{\\ln 2}^{\\ln 3}\\frac{1-e^{-2x}}{1+e^{-2x}}\\,dx$ را بیابید.', hint: 'صورت و مخرج را در $e^x$ ضرب کنید: $\\frac{e^x-e^{-x}}{e^x+e^{-x}}$ که دقیقاً مشتق $\\ln(e^x+e^{-x})$ است.', steps: [{ label: 'تغییر متغیر u=e^x+e^{-x}', text: '$[\\ln(e^x+e^{-x})]_{\\ln 2}^{\\ln 3} = \\ln(3+\\frac{1}{3}) - \\ln(2+\\frac{1}{2}) = \\ln\\frac{10/3}{5/2}$:' }], answerLatex: '\\ln\\left(\\frac{4}{3}\\right)' },
      { id: 'ch5-pr1-3', number: '۱-۳', difficulty: 'امتحانی', question: 'حاصل $\\int_0^{\\pi/2}\\frac{2\\sin x+\\cos x}{2\\sin x-3\\cos x}\\,dx$ (در صورت پیوستگی یا مقدار اصلی با علامت $+3\\cos x$ در مخرج) را بررسی کنید.', hint: 'با مخرج $2\\sin x-3\\cos x$ در $\\tan x=\\frac{3}{2}$ مجانب دارد (ناسره واگرا)؛ اگر مخرج $2\\sin x+3\\cos x$ باشد با روش $A(\\text{مخرج})+B(\\text{مشتق مخرج})$ حل می‌شود.', steps: [{ label: 'بررسی ناپیوستگی', text: 'چون در $x_0 = \\tan^{-1}(3/2) \\in (0,\\pi/2)$ مخرج صفر ساده دارد و صورت غیرصفر است، انتگرال واگراست.' }], answerLatex: '\\text{واگرا (مجانب در } x = \\tan^{-1}\\tfrac{3}{2}\\text{)}' },
      { id: 'ch5-pr1-4', number: '۱-۴', difficulty: 'پایه', question: 'حاصل $\\int_1^e\\frac{1}{x}\\sqrt{(\\ln x)^2+(\\ln x)^3}\\,dx$ را بیابید.', hint: '$u=\\ln x \\in [0,1]$ و سپس $\\int_0^1 u\\sqrt{1+u}\\,du$.', steps: [{ label: 'تغییر متغیر u=ln x و t=1+u', text: '$\\int_1^2(t-1)\\sqrt{t}\\,dt = [\\frac{2}{5}t^{5/2}-\\frac{2}{3}t^{3/2}]_1^2$:' }], answerLatex: '\\frac{4\\sqrt{2}+4}{15}' },
      { id: 'ch5-pr1-5', number: '۱-۵', difficulty: 'پایه', question: 'حاصل $\\int_0^1\\ln(1+x^2)\\,dx$ را بیابید.', hint: 'جزبه‌جز با $u=\\ln(1+x^2), dv=dx$.', steps: [{ label: 'جزبه‌جز', text: '$[x\\ln(1+x^2)]_0^1 - 2\\int_0^1(1 - \\frac{1}{1+x^2})dx$:' }], answerLatex: '\\ln 2 - 2 + \\frac{\\pi}{2}' },
      { id: 'ch5-pr1-6', number: '۱-۶', difficulty: 'پایه', question: 'حاصل $\\int_{-1}^1 2|x|e^{-x^2}\\,dx$ را بیابید.', hint: 'تابع زوج است: $4\\int_0^1 x e^{-x^2}dx$.', steps: [{ label: 'تقارن زوج و تغییر متغیر u=-x^2', text: '$[-2e^{-x^2}]_0^1 = 2(1 - e^{-1})$:' }], answerLatex: '2\\left(1 - \\frac{1}{e}\\right)' },
      { id: 'ch5-pr1-7', number: '۱-۷', difficulty: 'پایه', question: 'حاصل $\\int_{-1/2}^{1/2}\\ln\\left(\\frac{1+x}{1-x}\\right)\\sin^2 x\\,dx$ را بیابید.', hint: '$\\ln\\frac{1+x}{1-x}$ فرد و $\\sin^2 x$ زوج است؛ حاصل‌ضربشان فرد است!', steps: [{ label: 'تقارن فرد روی بازه متقارن', text: 'انتگرال تابع فرد روی $[-\\frac{1}{2},\\frac{1}{2}]$ برابر صفر است:' }], answerLatex: '0' },
    ],
  },
  {
    id: 'ch5-s2',
    title: 'محاسبه حد مجموع‌ها به کمک انتگرال معین (مجموع ریمان)',
    tag: 'حد با انتگرال',
    intuition:
      'هر وقت حد مجموع $n$ جمله را در $n\\to\\infty$ خواستند، از یک $\\frac{1}{n}$ فاکتور بگیرید و بقیه جملات را بر حسب $\\frac{i}{n}$ بنویسید. آنگاه $\\frac{1}{n}$ تبدیل به $dx$، $\\frac{i}{n}$ تبدیل به $x$ و سیگما تبدیل به $\\int_0^1$ می‌شود.',
    formulas: [
      {
        title: 'تبدیل مجموع ریمان به انتگرال معین',
        latex: '\\lim_{n\\to\\infty}\\frac{1}{n}\\sum_{i=1}^n f\\left(\\frac{i}{n}\\right) = \\int_0^1 f(x)\\,dx',
        plainExplain: 'اگر به جای جمع، حاصل‌ضرب $\\prod$ و ریشه $n$ام بود، ابتدا $\\ln$ بگیرید تا ضرب به جمع تبدیل شود.',
      },
    ],
    examples: [
      { id: 'ch5-ex6-1', number: '۶-۱', question: 'حاصل $\\lim_{n\\to\\infty}\\left(\\frac{n}{(n+1)^2}+\\frac{n}{(n+2)^2}+\\dots+\\frac{n}{(n+n)^2}\\right)$ را بیابید.', hint: 'مخرج را از $n^2$ فاکتور بگیرید تا $\\frac{1}{n}\\sum\\frac{1}{(1+i/n)^2}$ شود.', steps: [{ label: 'تبدیل به انتگرال', text: '$\\int_0^1\\frac{dx}{(1+x)^2} = [-\\frac{1}{1+x}]_0^1 = \\frac{1}{2}$:' }], answerLatex: '\\frac{1}{2}' },
      { id: 'ch5-ex6-2', number: '۶-۲', question: 'حاصل $\\lim_{n\\to\\infty}\\left(\\frac{n^3}{(n^2+1)^2}+\\frac{n^3}{(n^2+4)^2}+\\dots+\\frac{n^3}{4n^4}\\right)$ را بیابید.', hint: 'از $n^4$ در مخرج فاکتور بگیرید: $\\int_0^1\\frac{dx}{(1+x^2)^2}$ با $x=\\tan\\theta$.', steps: [{ label: 'تغییر متغیر مثلثاتی', text: '$\\int_0^{\\pi/4}\\cos^2\\theta\\,d\\theta = [\\frac{1}{2}(\\theta+\\frac{1}{2}\\sin 2\\theta)]_0^{\\pi/4}$:' }], answerLatex: '\\frac{\\pi}{8} + \\frac{1}{4}' },
      { id: 'ch5-ex6-3', number: '۶-۳', examTag: 'خواجه نصیر — دی ۹۷', question: 'حاصل $\\lim_{n\\to\\infty}\\frac{1}{n^2}\\left(e^{-1/n}+2e^{-2/n}+\\dots+ne^{-n/n}\\right)$ را بیابید.', hint: '$\\frac{1}{n}\\sum\\frac{i}{n}e^{-i/n} = \\int_0^1 x e^{-x}dx$.', steps: [{ label: 'جزبه‌جز روی [0,1]', text: '$[-xe^{-x}-e^{-x}]_0^1 = 1 - \\frac{2}{e}$:' }], answerLatex: '1 - \\frac{2}{e}' },
      { id: 'ch5-ex6-4', number: '۶-۴', examTag: 'خواجه نصیر — دی ۹۶', question: 'حاصل $\\lim_{n\\to\\infty}\\frac{1}{n^2}\\left(\\sin\\frac{\\pi}{n}+2\\sin\\frac{2\\pi}{n}+\\dots+(n-1)\\sin\\frac{(n-1)\\pi}{n}\\right)$ را بیابید.', hint: '$\\int_0^1 x\\sin(\\pi x)\\,dx$ با جزبه‌جز.', steps: [{ label: 'جزبه‌جز', text: '$[-\\frac{x}{\\pi}\\cos\\pi x + \\frac{1}{\\pi^2}\\sin\\pi x]_0^1$:' }], answerLatex: '\\frac{1}{\\pi}' },
      { id: 'ch5-ex6-5', number: '۶-۵', examTag: 'خواجه نصیر — دی ۹۰', question: 'حاصل $\\lim_{n\\to\\infty}\\frac{1}{n}\\left((n+1)(n+2)\\dots(n+n)\\right)^{1/n}$ را بیابید.', hint: '$\\ln A = \\int_0^1\\ln(1+x)\\,dx = 2\\ln 2 - 1 = \\ln(4/e)$.', steps: [{ label: 'لگاریتم‌گیری و انتگرال', text: '$A = e^{\\ln 4 - 1} = \\frac{4}{e}$:' }], answerLatex: '\\frac{4}{e}' },
    ],
    exercises: [
      { id: 'ch5-pr2-1', number: '۲-۱', examTag: 'خواجه نصیر — دی ۹۲', difficulty: 'امتحانی', question: 'حاصل $\\lim_{n\\to\\infty}\\sum_{i=1}^n\\sqrt[3]{\\frac{2i+4n}{n^4}}$ را بیابید.', hint: 'از $n^3$ مخرج $\\frac{1}{n}$ بیرون می‌آید: $\\int_0^1(2x+4)^{1/3}dx$.', steps: [{ label: 'انتگرال ریمان', text: '$[\\frac{3}{8}(2x+4)^{4/3}]_0^1 = \\frac{3}{8}(6^{4/3} - 4^{4/3})$:' }], answerLatex: '\\frac{3}{8}\\left(6^{4/3} - 4^{4/3}\\right)' },
      { id: 'ch5-pr2-2', number: '۲-۲', examTag: 'خواجه نصیر — دی ۸۴', difficulty: 'امتحانی', question: 'حاصل $\\lim_{n\\to\\infty}\\frac{\\sqrt[n]{n!}}{n}$ را بیابید.', hint: '$\\ln A = \\frac{1}{n}\\sum_{i=1}^n\\ln\\left(\\frac{i}{n}\\right) \\to \\int_0^1\\ln x\\,dx = -1$.', steps: [{ label: 'لگاریتم‌گیری', text: '$\\ln A = -1 \\implies A = e^{-1}$:' }], answerLatex: '\\frac{1}{e}' },
      { id: 'ch5-pr2-3', number: '۲-۳', examTag: 'خواجه نصیر — دی ۸۴', difficulty: 'چالشی', question: 'حاصل $\\lim_{n\\to\\infty}\\prod_{i=1}^n\\left(1+\\frac{i}{n}\\right)^{\\frac{1}{n}\\sqrt{1+i/n}}$ را بیابید.', hint: '$\\ln A = \\int_0^1\\sqrt{1+x}\\ln(1+x)\\,dx$؛ تغییر متغیر $u=1+x$ و جزبه‌جز.', steps: [{ label: 'انتگرال‌گیری جزبه‌جز', text: '$[\\frac{2}{3}u^{3/2}\\ln u - \\frac{4}{9}u^{3/2}]_1^2 = \\frac{4\\sqrt{2}}{3}\\ln 2 - \\frac{8\\sqrt{2}-4}{9}$:' }], answerLatex: '\\exp\\left(\\frac{4\\sqrt{2}}{3}\\ln 2 - \\frac{8\\sqrt{2}-4}{9}\\right)' },
      { id: 'ch5-pr2-4', number: '۲-۴', difficulty: 'پایه', question: 'حاصل $\\lim_{n\\to\\infty}\\frac{\\sum_{i=1}^n\\sinh(i/n)}{\\sum_{i=1}^n\\cosh(i/n)}$ را بیابید.', hint: 'صورت و مخرج را در $\\frac{1}{n}$ ضرب کنید تا نسبت دو انتگرال روی $[0,1]$ شود.', steps: [{ label: 'نسبت دو انتگرال', text: '$\\frac{\\int_0^1\\sinh x\\,dx}{\\int_0^1\\cosh x\\,dx} = \\frac{\\cosh 1 - 1}{\\sinh 1} = \\tanh\\left(\\frac{1}{2}\\right)$:' }], answerLatex: '\\frac{\\cosh 1 - 1}{\\sinh 1} = \\tanh\\left(\\frac{1}{2}\\right)' },
      { id: 'ch5-pr2-5', number: '۲-۵', difficulty: 'امتحانی', question: 'حاصل $\\lim_{n\\to\\infty}\\sum_{i=1}^n\\frac{i}{n^2}\\tan^{-1}\\left(\\frac{i}{n}\\right)$ را بیابید.', hint: '$\\int_0^1 x\\tan^{-1}x\\,dx$ با جزبه‌جز ($u=\\tan^{-1}x, dv=xdx$).', steps: [{ label: 'جزبه‌جز', text: '$[\\frac{x^2+1}{2}\\tan^{-1}x - \\frac{x}{2}]_0^1 = \\frac{\\pi}{4} - \\frac{1}{2}$:' }], answerLatex: '\\frac{\\pi}{4} - \\frac{1}{2}' },
      { id: 'ch5-pr2-6', number: '۲-۶', difficulty: 'امتحانی', question: 'حاصل $\\lim_{n\\to\\infty}\\sum_{k=1}^n\\sqrt{\\frac{\\sqrt{k}+\\sqrt{n}}{n^2\\sqrt{n}}}$ را بیابید.', hint: '$\\frac{1}{n}\\sum\\sqrt{\\sqrt{k/n}+1} \\to \\int_0^1\\sqrt{1+\\sqrt{x}}\\,dx$ با $u=\\sqrt{x}$.', steps: [{ label: 'تغییر متغیر u=√x و t=1+u', text: '$2\\int_1^2(t-1)\\sqrt{t}\\,dt = \\frac{8\\sqrt{2}+8}{15}$:' }], answerLatex: '\\frac{8\\sqrt{2}+8}{15}' },
      { id: 'ch5-pr2-7', number: '۲-۷', difficulty: 'امتحانی', question: 'حاصل $\\lim_{n\\to\\infty}\\frac{2^{1/n}+2^{2/n}+\\dots+2^{n/n}}{3^{1/n}+3^{2/n}+\\dots+3^{n/n}}$ را بیابید.', hint: 'ضرب صورت و مخرج در $\\frac{1}{n}$: $\\frac{\\int_0^1 2^x dx}{\\int_0^1 3^x dx}$.', steps: [{ label: 'نسبت دو انتگرال نمایی', text: '$\\frac{1/\\ln 2}{2/\\ln 3} = \\frac{\\ln 3}{2\\ln 2}$:' }], answerLatex: '\\frac{\\ln 3}{2\\ln 2}' },
    ],
  },
  {
    id: 'ch5-s3',
    title: 'قضیه اول حساب دیفرانسیل و مشتق انتگرال (قانون لایب‌نیتس)',
    tag: 'مشتق انتگرال',
    intuition:
      'اگر کران‌های انتگرال تابع $x$ باشند، برای مشتق گرفتن نیازی به محاسبه خود انتگرال نیست! کافی است کران بالا را در تابع بگذارید و در مشتق کران بالا ضرب کنید، منهای کران پایین در مشتق کران پایین.',
    formulas: [
      {
        title: 'فرمول لایب‌نیتس',
        latex: '\\frac{d}{dx}\\int_{v(x)}^{u(x)} f(t)\\,dt = u\'(x)f(u(x)) - v\'(x)f(v(x))',
        plainExplain: 'در حدهای $\\frac{0}{0}$ که صورت انتگرال با کران متغیر است، هوپیتال + لایب‌نیتس سریع‌ترین راه حل است.',
      },
    ],
    examples: [
      { id: 'ch5-ex7', number: '۷', examTag: 'خواجه نصیر — دی ۸۵', question: 'اولین قضیه اساسی حساب دیفرانسیل و انتگرال را بیان و اثبات کنید.', hint: 'از تعریف مشتق و قضیه مقدار میانگین انتگرال‌ها روی $[x, x+\\Delta x]$ استفاده کنید.', steps: [{ label: 'بیان و اثبات', text: 'اگر $f$ روی $[a,b]$ پیوسته و $F(x)=\\int_a^x f(t)dt$ باشد، آنگاه $F\'(x) = \\lim_{\\Delta x\\to 0}\\frac{1}{\\Delta x}\\int_x^{x+\\Delta x}f(t)dt = \\lim_{\\Delta x\\to 0}f(c) = f(x)$.' }], answerLatex: 'F\'(x) = f(x)' },
      { id: 'ch5-ex8-1', number: '۸-۱', examTag: 'خواجه نصیر — دی ۹۷', question: 'حاصل $\\lim_{x\\to 0^+}\\frac{\\int_x^{\\sqrt{x}} e^{t^2}dt}{2\\sqrt{x}}$ را بیابید.', hint: 'ابهام $\\frac{0}{0}$؛ هوپیتال و لایب‌نیتس بزنید.', steps: [{ label: 'هوپیتال + لایب‌نیتس', text: '$\\lim_{x\\to 0^+}\\frac{\\frac{1}{2\\sqrt{x}}e^x - e^{x^2}}{1/\\sqrt{x}} = \\lim(\\frac{1}{2}e^x - \\sqrt{x}e^{x^2})$:' }], answerLatex: '\\frac{1}{2}' },
      { id: 'ch5-ex8-2', number: '۸-۲', examTag: 'خواجه نصیر — دی ۸۸', question: 'حاصل $\\lim_{x\\to\\infty} x\\int_x^{x+1}\\frac{\\arctan t}{t^2}\\,dt$ را بیابید.', hint: '$x$ را به شکل $\\frac{1}{x}$ به مخرج ببرید و هوپیتال بزنید.', steps: [{ label: 'هوپیتال', text: '$\\lim_{x\\to\\infty}\\left(-\\frac{x^2}{(x+1)^2}\\arctan(x+1) + \\arctan x\\right) = -\\frac{\\pi}{2}+\\frac{\\pi}{2}$:' }], answerLatex: '0' },
      { id: 'ch5-ex8-3', number: '۸-۳', examTag: 'خواجه نصیر — دی ۹۷', question: 'حاصل $\\lim_{x\\to 0}\\frac{\\int_x^{2x}(e - (1+t)^{1/t})dt}{x}$ را بیابید.', hint: 'هوپیتال بزنید و از $\\lim_{u\\to 0}(1+u)^{1/u} = e$ استفاده کنید.', steps: [{ label: 'هوپیتال', text: '$\\lim_{x\\to 0}[2(e-(1+2x)^{1/(2x)}) - (e-(1+x)^{1/x})] = 2(0)-0$:' }], answerLatex: '0' },
      { id: 'ch5-ex9', number: '۹', examTag: 'خواجه نصیر — دی ۹۳', question: 'تابع پیوسته و ناصفر $f$ را بیابید که در $(f(x))^2 = \\int_0^x f(t)\\frac{e^t}{1+e^{2t}}\\,dt$ صدق کند.', hint: 'از دو طرف مشتق بگیرید و دو طرف را بر $f(x)$ تقسیم کنید.', steps: [{ label: 'مشتق و انتگرال‌گیری', text: '$2f(x)f\'(x) = f(x)\\frac{e^x}{1+e^{2x}} \\Rightarrow f\'(x)=\\frac{1}{2}\\frac{e^x}{1+e^{2x}}$ و از $f(0)=0$ داریم $C=-\\frac{\\pi}{8}$:' }], answerLatex: 'f(x) = \\frac{1}{2}\\tan^{-1}(e^x) - \\frac{\\pi}{8}' },
    ],
    exercises: [
      { id: 'ch5-pr3-1', number: '۳-۱', difficulty: 'پایه', question: 'حاصل $\\lim_{x\\to 0}\\frac{\\int_0^x z e^z\\,dz}{x^2}$ را بیابید.', hint: 'هوپیتال بزنید: $\\frac{xe^x}{2x}$.', steps: [{ label: 'هوپیتال', text: '$\\lim_{x\\to 0}\\frac{e^x}{2} = \\frac{1}{2}$:' }], answerLatex: '\\frac{1}{2}' },
      { id: 'ch5-pr3-2', number: '۳-۲', difficulty: 'امتحانی', question: 'حاصل $\\lim_{x\\to 1}\\frac{\\int_{(x^2-1)^2}^{(x-1)^2}\\frac{dt}{1+\\sqrt{t}}}{x-1}$ را بیابید.', hint: 'هوپیتال بزنید؛ مشتق هر دو کران در $x=1$ برابر صفر است!', steps: [{ label: 'هوپیتال + لایب‌نیتس', text: 'صورت برابر $\\frac{2(x-1)}{1+|x-1|} - \\frac{4x(x^2-1)}{1+|x^2-1|}$ که در $x=1$ برابر صفر است:' }], answerLatex: '0' },
      { id: 'ch5-pr3-3', number: '۳-۳', difficulty: 'امتحانی', question: 'حاصل $\\lim_{x\\to 0}\\frac{\\int_{x^3}^{x^2}\\sin(t^2)\\,dt}{x^6}$ را بیابید.', hint: 'هوپیتال و هم‌ارزی $\\sin(u)\\sim u$.', steps: [{ label: 'هوپیتال', text: '$\\lim_{x\\to 0}\\frac{2x\\sin(x^4) - 3x^2\\sin(x^6)}{6x^5} = \\lim\\frac{2x^5}{6x^5}$:' }], answerLatex: '\\frac{1}{3}' },
      { id: 'ch5-pr3-4', number: '۳-۴', difficulty: 'امتحانی', question: 'حاصل $\\lim_{x\\to 1}\\frac{1}{\\ln x}\\int_{x^2}^{x^3}\\frac{e^t}{t}\\,dt$ را بیابید.', hint: 'هوپیتال روی صورت و مخرج.', steps: [{ label: 'هوپیتال', text: '$\\lim_{x\\to 1}\\frac{3x^2\\frac{e^{x^3}}{x^3} - 2x\\frac{e^{x^2}}{x^2}}{1/x} = 3e - 2e = e$:' }], answerLatex: 'e' },
      { id: 'ch5-pr4', number: '۴', examTag: 'خواجه نصیر', difficulty: 'امتحانی', question: 'الف) اگر $\\int_0^x f(t)dt = x^2(1+x^2)$، حاصل $\\lim_{x\\to 2}\\frac{x}{x-2}\\int_2^x f(t)dt$ را بیابید. ب) اگر $x=\\int_0^y\\frac{dt}{\\sqrt{1+4t^2}}$، حاصل $\\frac{d^2y}{dx^2}$ را بر حسب $y$ بیابید.', hint: 'در الف هوپیتال می‌دهد $2f(2)$ و $f(x)=2x+4x^3$. در ب $\\frac{dx}{dy}=\\frac{1}{\\sqrt{1+4y^2}}$.', steps: [{ label: 'حل الف و ب', text: 'الف) $f(2)=4+32=36 \\Rightarrow \\text{حد} = 2(36)=72$. ب) $\\frac{dy}{dx}=\\sqrt{1+4y^2} \\Rightarrow \\frac{d^2y}{dx^2} = \\frac{4y}{\\sqrt{1+4y^2}}\\cdot\\frac{dy}{dx} = 4y$.' }], answerLatex: '\\text{الف) } 72, \\qquad \\text{ب) } \\frac{d^2y}{dx^2} = 4y' },
      { id: 'ch5-pr5', number: '۵', examTag: 'خواجه نصیر', difficulty: 'امتحانی', question: 'نقاط اکسترمم تابع $F(x)=\\int_0^{x^2}\\frac{t^2-5t+4}{2+e^t}\\,dt$ را بیابید.', hint: '$F\'(x) = 2x\\frac{(x^2-1)(x^2-4)}{2+e^{x^2}} = 0$.', steps: [{ label: 'ریشه‌های مشتق و تعیین علامت', text: 'ریشه‌ها $x = 0, \\pm 1, \\pm 2$: مینیمم در $x = \\pm 2, 0$ و ماکزیمم در $x = \\pm 1$.' }], answerLatex: '\\text{مینیمم: } x=0,\\pm 2, \\quad \\text{ماکزیمم: } x=\\pm 1' },
      { id: 'ch5-pr6', number: '۶', examTag: 'خواجه نصیر — دی ۹۲', difficulty: 'امتحانی', question: 'اگر $f:[0,1]\\to(0,1)$ پیوسته باشد، نشان دهید $2x - \\int_0^x f(t)dt = 1$ در $[0,1]$ دقیقاً یک جواب دارد.', hint: '$g(x)=2x-\\int_0^x f(t)dt - 1$؛ داریم $g(0)=-1<0$ و $g(1)>0$ (چون $f<1$) و $g\'(x)=2-f(x)>0$.', steps: [{ label: 'بولتزانو + یکنوایی صعودی', text: '$g(0)=-1 < 0$، $g(1)=1-\\int_0^1 f(t)dt > 0$ و $g\'(x)=2-f(x) > 1 > 0$:' }], answerLatex: '\\text{دقیقاً یک جواب در } (0,1)' },
    ],
  },
];
