import type { ChapterData } from '../../types';

export const ch03: ChapterData = {
  id: 'derivatives',
  number: 3,
  title: 'مشتق و قضایای آن',
  subtitle: 'مشتق لگاریتمی، ضمنی، پارامتری، بولتزانو، رُل و لاگرانژ',
  pdfPages: 'ص ۱۸ تا ۲۶',
  accent: '#7C3AED',
  accentSoft: 'rgba(124, 58, 237, 0.11)',
  estimatedMinutes: 55,
  cheatSheet: [
    {
      title: 'مشتق توابع نمایی، لگاریتمی و معکوس مثلثاتی',
      latex: '(e^u)\' = u\'e^u, \\quad (\\ln u)\' = \\frac{u\'}{u}, \\quad (\\sin^{-1}u)\' = \\frac{u\'}{\\sqrt{1-u^2}}, \\quad (\\tan^{-1}u)\' = \\frac{u\'}{1+u^2}',
      note: 'مشتق cos^{-1}u قرینه sin^{-1}u است.',
    },
    {
      title: 'مشتق ضمنی، پارامتری و زنجیره‌ای',
      latex: 'y\' = -\\frac{f_x}{f_y}, \\qquad \\frac{dy}{dx} = \\frac{y\'(t)}{x\'(t)}, \\qquad \\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}(dy/dx)}{dx/dt}',
      note: 'در مشتق دوم پارامتری فراموش نکنید دوباره بر dx/dt تقسیم کنید.',
    },
    {
      title: 'قضیه بولتزانو و مقدار میانی',
      latex: 'f \\text{ پیوسته در } [a,b] \\;\\&\\; f(a)f(b) < 0 \\implies \\exists c\\in(a,b):\\; f(c) = 0',
      note: 'وجود حداقل یک ریشه را تضمین می‌کند.',
    },
    {
      title: 'قضیه مقدار میانگین (لاگرانژ)',
      latex: 'f \\text{ پیوسته در } [a,b] \\text{ و مشتق‌پذیر در } (a,b) \\implies \\exists c\\in(a,b):\\; f\'(c) = \\frac{f(b)-f(a)}{b-a}',
      note: 'کلید طلایی اثبات نامساوی‌ها در امتحان ریاضی ۱.',
    },
    {
      title: 'قضیه رُل',
      latex: 'f(a) = f(b) \\implies \\exists c\\in(a,b):\\; f\'(c) = 0',
      note: 'ابزار اثبات یکتا بودن ریشه (برهان خلف: اگر دو ریشه داشته باشد، مشتق باید ریشه داشته باشد).',
    },
  ],
  steps: [
    {
      id: 'ch3-s1',
      title: 'مشتق لگاریتمی، ضمنی و معادله خط مماس و قائم',
      tag: 'قواعد مشتق',
      intuition:
        'هر وقت پایه و توان هر دو متغیر بودند (مثل $x^x$ یا $x^{\\sin x}$)، اول از دو طرف $\\ln$ بگیرید و سپس مشتق بگیرید. اگر دو عبارت توانی با هم جمع شده بودند (مثل $x^{\\sin x} + (\\sin x)^x$)، هر جمله را جداگانه نام‌گذاری ($A$ و $B$) و لگاریتم‌گیری کنید.',
      formulas: [
        {
          title: 'جدول مشتق‌های کلیدی',
          latex: '(\\sinh x)\' = \\cosh x, \\quad (\\cosh x)\' = \\sinh x, \\quad (f(x,y)=0 \\Rightarrow y\' = -\\frac{f_x}{f_y})',
          plainExplain: 'معادله خط مماس $y-y_0 = m(x-x_0)$ و شیب خط قائم برابر $-\\frac{1}{m}$ است.',
        },
      ],
      table: {
        headers: ['تابع', 'مشتق'],
        rows: [
          ['$e^u$', '$u\'e^u$'],
          ['$\\ln u$', '$\\frac{u\'}{u}$'],
          ['$\\sin^{-1}u$', '$\\frac{u\'}{\\sqrt{1-u^2}}$'],
          ['$\\cos^{-1}u$', '$-\\frac{u\'}{\\sqrt{1-u^2}}$'],
          ['$\\tan^{-1}u$', '$\\frac{u\'}{1+u^2}$'],
        ],
      },
      examples: [
        {
          id: 'ch3-ex1',
          number: '۱',
          question: 'مشتق تابع $y = x^x$ را بیابید.',
          hint: 'از دو طرف $\\ln$ بگیرید: $\\ln y = x\\ln x$.',
          steps: [
            {
              label: 'لگاریتم‌گیری و مشتق‌گیری',
              text: 'مشتق ضرب در سمت راست:',
              latex: '\\frac{y\'}{y} = 1\\cdot\\ln x + x\\cdot\\frac{1}{x} = \\ln x + 1',
            },
          ],
          answerLatex: 'y\' = x^x(\\ln x + 1)',
        },
        {
          id: 'ch3-ex2',
          number: '۲',
          question: 'مشتق تابع $y = x^{\\sin x} + (\\sin x)^x$ را بیابید.',
          hint: 'نمی‌توان از مجموع مستقیماً $\\ln$ گرفت؛ قرار دهید $A = x^{\\sin x}$ و $B = (\\sin x)^x$.',
          steps: [
            {
              label: 'مشتق A',
              text: '$\\ln A = \\sin x\\ln x$:',
              latex: 'A\' = x^{\\sin x}\\left(\\cos x\\ln x + \\frac{\\sin x}{x}\\right)',
            },
            {
              label: 'مشتق B و جمع',
              text: '$\\ln B = x\\ln(\\sin x)$:',
              latex: 'B\' = (\\sin x)^x(\\ln(\\sin x) + x\\cot x) \\implies y\' = A\' + B\'',
            },
          ],
          answerLatex: 'y\' = x^{\\sin x}\\left(\\cos x\\ln x + \\frac{\\sin x}{x}\\right) + (\\sin x)^x(\\ln(\\sin x) + x\\cot x)',
        },
        {
          id: 'ch3-ex3',
          number: '۳',
          question: 'معادله خط مماس بر منحنی $y^x + x^y = 2$ در نقطه $(1,1)$ را بیابید.',
          hint: 'هر جمله را به صورت $e^{x\\ln y} + e^{y\\ln x} = 2$ بنویسید و مشتق ضمنی بگیرید.',
          steps: [
            {
              label: 'تبدیل نمایی و مشتق ضمنی',
              text: 'مشتق‌گیری نسبت به $x$:',
              latex: '\\left(\\ln y + \\frac{xy\'}{y}\\right)e^{x\\ln y} + \\left(y\'\\ln x + \\frac{y}{x}\\right)e^{y\\ln x} = 0',
            },
            {
              label: 'جایگذاری نقطه (1,1) و معادله خط',
              text: 'در $(1,1)$ داریم $(0+y\')\\cdot 1 + (0+1)\\cdot 1 = 0 \\Rightarrow y\'=-1$:',
              latex: 'y - 1 = -1(x - 1) \\Rightarrow x + y = 2',
            },
          ],
          answerLatex: 'x + y = 2',
        },
      ],
      exercises: [
        {
          id: 'ch3-pr2',
          number: '۲',
          difficulty: 'پایه',
          question: 'تابع $f(x) = x^{1/x}$ مقدار ماکزیمم خود را در بازه $(0,+\\infty)$ در چه نقطه‌ای اختیار می‌کند؟',
          hint: 'مشتق لگاریتمی بگیرید و $f\'(x) = 0$ را حل کنید.',
          steps: [
            {
              label: 'مشتق لگاریتمی',
              text: '$\\ln y = \\frac{\\ln x}{x}$:',
              latex: '\\frac{y\'}{y} = \\frac{1 - \\ln x}{x^2} \\Rightarrow y\' = x^{1/x}\\frac{1 - \\ln x}{x^2}',
            },
            {
              label: 'تعیین علامت و ماکزیمم',
              text: 'برای $x < e$ مشتق مثبت و برای $x > e$ منفی است:',
              latex: '1 - \\ln x = 0 \\Rightarrow x = e',
            },
          ],
          answerLatex: 'x = e \\quad (\\text{مقدار ماکزیمم } e^{1/e})',
        },
        {
          id: 'ch3-pr3',
          number: '۳',
          difficulty: 'پایه',
          question: 'معادله خط قائم بر منحنی $y = x^{2x}$ را در نقطه $x=1$ بیابید.',
          hint: 'در $x=1$ داریم $y=1$؛ شیب مماس را با مشتق لگاریتمی بیابید و شیب قائم برابر $-1/m$ است.',
          steps: [
            {
              label: 'شیب خط مماس',
              text: '$\\ln y = 2x\\ln x \\Rightarrow y\' = x^{2x}(2\\ln x + 2)$:',
              latex: 'm_{\\text{مماس}} = y\'(1) = 2 \\Rightarrow m_{\\text{قائم}} = -\\frac{1}{2}',
            },
            {
              label: 'معادله خط قائم',
              text: 'گذرنده از $(1,1)$:',
              latex: 'y - 1 = -\\frac{1}{2}(x - 1) \\Rightarrow y = -\\frac{1}{2}x + \\frac{3}{2}',
            },
          ],
          answerLatex: 'y = -\\frac{1}{2}x + \\frac{3}{2}',
        },
        {
          id: 'ch3-pr4',
          number: '۴',
          difficulty: 'پایه',
          question: 'فرض کنید $x^y = y^x$، در این صورت $\\frac{dy}{dx}$ را بیابید.',
          hint: 'از دو طرف $\\ln$ بگیرید: $y\\ln x = x\\ln y$ و مشتق ضمنی بگیرید.',
          steps: [
            {
              label: 'مشتق ضمنی پس از لگاریتم‌گیری',
              text: 'مشتق دو طرف نسبت به $x$:',
              latex: 'y\'\\ln x + \\frac{y}{x} = \\ln y + \\frac{xy\'}{y} \\Rightarrow y\'\\left(\\ln x - \\frac{x}{y}\\right) = \\ln y - \\frac{y}{x}',
            },
          ],
          answerLatex: '\\frac{dy}{dx} = \\frac{y(x\\ln y - y)}{x(y\\ln x - x)}',
        },
        {
          id: 'ch3-pr5',
          number: '۵',
          difficulty: 'پایه',
          question: 'مشتق تابع $y = x^{\\ln x}$ را بیابید.',
          hint: '$\\ln y = (\\ln x)^2$.',
          steps: [
            {
              label: 'مشتق لگاریتمی',
              text: 'مشتق دو طرف نسبت به $x$:',
              latex: '\\frac{y\'}{y} = \\frac{2\\ln x}{x} \\Rightarrow y\' = x^{\\ln x}\\cdot\\frac{2\\ln x}{x} = 2x^{\\ln x - 1}\\ln x',
            },
          ],
          answerLatex: 'y\' = 2x^{\\ln x - 1}\\ln x',
        },
      ],
    },
    {
      id: 'ch3-s2',
      title: 'مشتق پارامتری مرتبه اول و دوم و قاعده زنجیره‌ای',
      tag: 'پارامتری و زنجیره‌ای',
      intuition:
        'در توابع پارامتری که $x$ و $y$ هر دو بر حسب پارامتر $t$ داده شده‌اند، شیب $\\frac{dy}{dx}$ برابر نسبت $\\frac{dy/dt}{dx/dt}$ است. برای مشتق مرتبه دوم $\\frac{d^2y}{dx^2}$، باید از همان $y\'$ دوباره نسبت به $t$ مشتق بگیرید و نتیجه را بر $\\frac{dx}{dt}$ تقسیم کنید.',
      formulas: [
        {
          title: 'مشتق دوم پارامتری',
          latex: '\\frac{d^2 y}{dx^2} = \\frac{\\frac{d}{dt}\\left(\\frac{dy}{dx}\\right)}{\\frac{dx}{dt}}',
          plainExplain: 'خطای پرتکرار دانشجویان فراموش کردن تقسیم نهایی بر $\\frac{dx}{dt}$ است.',
        },
      ],
      examples: [
        {
          id: 'ch3-ex4',
          number: '۴',
          question: 'مقدار $\\frac{d^2y}{dx^2}$ را در تابع پارامتری $x = \\ln(1+t^2)$ و $y = t - \\arctan t$ به ازای $t=2$ بیابید.',
          hint: 'ابتدا $y\' = \\frac{dy/dt}{dx/dt}$ را ساده کنید؛ می‌بینید برابر $\\frac{t}{2}$ می‌شود.',
          steps: [
            {
              label: 'مشتق مرتبه اول',
              text: '$\\frac{dy}{dt} = 1 - \\frac{1}{1+t^2} = \\frac{t^2}{1+t^2}$ و $\\frac{dx}{dt} = \\frac{2t}{1+t^2}$:',
              latex: '\\frac{dy}{dx} = \\frac{t^2/(1+t^2)}{2t/(1+t^2)} = \\frac{t}{2}',
            },
            {
              label: 'مشتق مرتبه دوم در t=2',
              text: 'مشتق $\\frac{t}{2}$ نسبت به $t$ برابر $\\frac{1}{2}$ است؛ تقسیم بر $dx/dt$:',
              latex: '\\frac{d^2y}{dx^2} = \\frac{1/2}{2t/(1+t^2)} = \\frac{1+t^2}{4t} \\Big|_{t=2} = \\frac{5}{8}',
            },
          ],
          answerLatex: '\\frac{5}{8}',
        },
        {
          id: 'ch3-ex5',
          number: '۵',
          question: 'اگر $x = y^2+y$ و $u = (x^2+6x)^{3/2}$ باشد، مقدار $\\frac{dy}{du}$ را به ازای $y=1$ بیابید.',
          hint: 'از زنجیره $\\frac{dy}{du} = \\frac{dy}{dx}\\cdot\\frac{dx}{du}$ استفاده کنید و در $y=1$ داریم $x=2$.',
          steps: [
            {
              label: 'محاسبه دو مشتق',
              text: '$\\frac{dx}{dy} = 2y+1$ و $\\frac{du}{dx} = \\frac{3}{2}(2x+6)(x^2+6x)^{1/2}$:',
              latex: '\\frac{dy}{du} = \\frac{1}{2y+1} \\cdot \\frac{2}{3(2x+6)\\sqrt{x^2+6x}}',
            },
            {
              label: 'جایگذاری y=1 و x=2',
              text: '$2y+1=3$، $2x+6=10$ و $\\sqrt{4+12}=4$:',
              latex: '\\frac{dy}{du}\\Big|_{y=1} = \\frac{1}{3} \\cdot \\frac{2}{3 \\cdot 10 \\cdot 4} = \\frac{1}{180}',
            },
          ],
          answerLatex: '\\frac{1}{180}',
        },
      ],
      exercises: [
        {
          id: 'ch3-pr1',
          number: '۱',
          difficulty: 'پایه',
          question: 'اگر $x = t - t^2$ و $y = t - t^3$ باشد، حاصل $\\frac{d^2y}{dx^2}$ را در $t=1$ بیابید.',
          hint: '$dx/dt = 1-2t$ و $dy/dt = 1-3t^2$.',
          steps: [
            {
              label: 'مشتق اول و دوم',
              text: '$y\' = \\frac{1-3t^2}{1-2t}$، پس مشتق آن نسبت به $t$ برابر $\\frac{-6t(1-2t)+2(1-3t^2)}{(1-2t)^2} = \\frac{6t^2-6t+2}{(1-2t)^2}$:',
              latex: '\\frac{d^2y}{dx^2} = \\frac{6t^2-6t+2}{(1-2t)^3} \\Big|_{t=1} = \\frac{2}{(-1)^3} = -2',
            },
          ],
          answerLatex: '-2',
        },
        {
          id: 'ch3-pr6',
          number: '۶',
          difficulty: 'امتحانی',
          question: 'خط مماس بر منحنی پارامتری $x = e^{\\sqrt{t}},\\; y = t - \\ln(t^2)$ در نقطه $t=1$ محور $x$ها را در چه طولی قطع می‌کند؟',
          hint: 'در $t=1$ نقطه تماس $(e, 1)$ است؛ شیب را بیابید و در معادله خط $y=0$ بگذارید.',
          steps: [
            {
              label: 'نقطه تماس و شیب',
              text: '$x\'(1) = \\frac{e}{2}$ و $y\'(t) = 1 - \\frac{2}{t} \\Rightarrow y\'(1) = -1$:',
              latex: 'm = \\frac{-1}{e/2} = -\\frac{2}{e}',
            },
            {
              label: 'تقاطع با محور x',
              text: '$y - 1 = -\\frac{2}{e}(x - e)$ با $y=0$:',
              latex: '-1 = -\\frac{2}{e}(x - e) \\Rightarrow x - e = \\frac{e}{2} \\Rightarrow x = \\frac{3e}{2}',
            },
          ],
          answerLatex: 'x = \\frac{3e}{2}',
        },
        {
          id: 'ch3-pr7',
          number: '۷',
          examTag: 'خواجه نصیر',
          difficulty: 'امتحانی',
          question: 'در معادله پارامتری $x = \\cosh t - t\\sinh t$ و $y = \\sinh t - t\\cosh t$، مقدار $\\frac{d^2y}{dx^2}$ را در $t = \\ln 2$ بیابید.',
          hint: 'مشتق‌گیری از $x$ و $y$ بسیار ساده می‌شود: $x\' = -t\\cosh t$ و $y\' = -t\\sinh t$.',
          steps: [
            {
              label: 'مشتق اول و دوم',
              text: '$\\frac{dy}{dx} = \\frac{-t\\sinh t}{-t\\cosh t} = \\tanh t$:',
              latex: '\\frac{d^2y}{dx^2} = \\frac{\\operatorname{sech}^2 t}{-t\\cosh t} = \\frac{-1}{t\\cosh^3 t}',
            },
            {
              label: 'جایگذاری t = ln 2',
              text: '$\\cosh(\\ln 2) = \\frac{2 + 1/2}{2} = \\frac{5}{4}$:',
              latex: '\\frac{d^2y}{dx^2}\\Big|_{t=\\ln 2} = \\frac{-64}{125\\ln 2}',
            },
          ],
          answerLatex: '-\\frac{64}{125\\ln 2}',
        },
      ],
    },
    {
      id: 'ch3-s3',
      title: 'قضایای بولتزانو، رُل، وجود و یکتایی ریشه و مشتق‌پذیری',
      tag: 'بولتزانو و رُل',
      intuition:
        'برای اثبات اینکه معادله‌ای «دقیقاً یک ریشه» دارد، همیشه یک الگوی دو مرحله‌ای داریم: اول با قضیه بولتزانو ($f(a)f(b)<0$) نشان می‌دهیم **حداقل یک ریشه** وجود دارد؛ دوم با مشتق‌گیری ($f\'(x)>0$ یا برهان خلف با قضیه رُل) نشان می‌دهیم **حداکثر یک ریشه** دارد.',
      formulas: [
        {
          title: 'الگوی دوگامی یکتایی ریشه',
          latex: 'f(a)f(b)<0 \\;(\\text{حداقل ۱ ریشه}) \\quad + \\quad f\'(x)\\ne 0 \\;(\\text{حداکثر ۱ ریشه}) \\implies \\text{دقیقاً ۱ ریشه}',
          plainExplain: 'اگر فرض کنیم دو ریشه $x_1, x_2$ دارد، طبق قضیه رُل باید بینشان $f\'(c)=0$ باشد که به تناقض می‌رسد.',
        },
      ],
      checkpoint: {
        id: 'ch3-cp1',
        prompt: 'برای اثبات اینکه $f(x) = x^5 + x^3 + 2x - 3$ در بازه $(0,1)$ دقیقاً یک ریشه دارد، کدام ترکیب کافی است؟',
        options: [
          '$f(0)\\cdot f(1) < 0$ و $f\'(x) > 0$ روی $(0,1)$',
          '$f(0) = f(1)$',
          'فقط $f\'(0) > 0$',
          'فقط پیوستگی $f$',
        ],
        correctIndex: 0,
        feedback: 'تغییر علامت (بولتزانو) وجود حداقل یک ریشه را می‌دهد و مثبت بودن اکید مشتق یکتا بودن آن را تضمین می‌کند.',
      },
      examples: [
        {
          id: 'ch3-ex6',
          number: '۶',
          examTag: 'میان‌ترم آبان ۹۶ — خواجه نصیر',
          question: 'اگر $a < b < c$ باشد، نشان دهید معادله $f(x) = \\frac{1}{x-a} + \\frac{2}{x-b} + \\frac{3}{x-c} = 0$ حداقل ۲ ریشه در $[a,c]$ دارد.',
          hint: 'حدهای یک‌طرفه را در مجانب‌های $a^+, b^-, b^+, c^-$ بررسی کنید و بولتزانو را روی $(a,b)$ و $(b,c)$ بزنید.',
          steps: [
            {
              label: 'بررسی بازه (a,b)',
              text: '$\\lim_{x\\to a^+} f(x) = +\\infty$ و $\\lim_{x\\to b^-} f(x) = -\\infty$:',
              latex: '\\text{طبق بولتزانو } \\exists x_1 \\in (a,b):\\; f(x_1) = 0',
            },
            {
              label: 'بررسی بازه (b,c)',
              text: '$\\lim_{x\\to b^+} f(x) = +\\infty$ و $\\lim_{x\\to c^-} f(x) = -\\infty$:',
              latex: '\\text{طبق بولتزانو } \\exists x_2 \\in (b,c):\\; f(x_2) = 0',
            },
          ],
          answerLatex: '\\text{حداقل دو ریشه } x_1\\in(a,b) \\text{ و } x_2\\in(b,c)',
        },
        {
          id: 'ch3-ex7',
          number: '۷',
          examTag: 'میان‌ترم اردیبهشت ۹۷ — خواجه نصیر',
          question: 'ثابت کنید معادله $x^5 + x^3 + 2x - 3 = 0$ دقیقاً یک ریشه حقیقی در $(0,1)$ دارد.',
          hint: '$f(0)=-3$ و $f(1)=1$ و $f\'(x) = 5x^4+3x^2+2 > 0$.',
          steps: [
            {
              label: 'وجود ریشه (بولتزانو)',
              text: '$f(0)=-3<0$ و $f(1)=1>0$ پس حداقل یک ریشه در $(0,1)$ دارد.',
            },
            {
              label: 'یکتایی ریشه (قضیه رُل)',
              text: '$f\'(x) = 5x^4 + 3x^2 + 2 \\ge 2 > 0$ هرگز صفر نمی‌شود؛ پس بیش از یک ریشه ممکن نیست.',
              latex: 'f\'(c) = 5c^4 + 3c^2 + 2 \\ne 0',
            },
          ],
          answerLatex: '\\text{معادله دقیقاً یک ریشه در } (0,1) \\text{ دارد}',
        },
        {
          id: 'ch3-ex8',
          number: '۸',
          examTag: 'میان‌ترم اردیبهشت ۹۸ — خواجه نصیر',
          question: 'ثابت کنید معادله $x^3 - 3x + c = 0$ برای هر $c$ دلخواه حداکثر یک ریشه حقیقی در بازه $(0,1)$ دارد.',
          hint: 'علامت مشتق $f\'(x) = 3x^2 - 3$ را روی $(0,1)$ بررسی کنید.',
          steps: [
            {
              label: 'برهان خلف با قضیه رُل',
              text: 'روی بازه $(0,1)$ داریم $x^2 < 1 \\Rightarrow f\'(x) = 3(x^2-1) < 0$ (اکیداً نزولی):',
              latex: '\\forall x\\in(0,1):\\; f\'(x) < 0 \\implies \\text{حداکثر یک ریشه در } (0,1)',
            },
          ],
          answerLatex: '\\text{حداکثر یک ریشه در } (0,1)',
        },
        {
          id: 'ch3-ex9',
          number: '۹',
          examTag: 'خواجه نصیر — آذر ۹۷',
          question: 'نشان دهید تابع $f(x) = a\\sin x - x + b$ با شرط $0<a<1$ و $b>0$ دقیقاً یک ریشه دارد.',
          hint: 'حد در $\\pm\\infty$ علامت مخالف دارد و $f\'(x) = a\\cos x - 1$ همواره منفی است.',
          steps: [
            {
              label: 'وجود ریشه',
              text: 'چون $|a\\sin x|\\le a$ کران‌دار است، $\\lim_{x\\to+\\infty}f(x)=-\\infty$ و $\\lim_{x\\to-\\infty}f(x)=+\\infty$؛ پس طبق بولتزانو حداقل یک ریشه دارد.',
            },
            {
              label: 'یکتایی ریشه',
              text: 'از $0<a<1$ و $|\\cos x|\\le 1$ نتیجه می‌شود $a\\cos x < 1$:',
              latex: 'f\'(x) = a\\cos x - 1 < 0 \\implies \\text{دقیقاً یک ریشه}',
            },
          ],
          answerLatex: '\\text{دقیقاً یک ریشه حقیقی}',
        },
        {
          id: 'ch3-ex11',
          number: '۱۱',
          examTag: 'خواجه نصیر — آبان ۹۶',
          question: 'قضیه رُل را بیان و اثبات کنید.',
          hint: 'دو حالت $f(x)=K$ (ثابت) و غیرثابت (استفاده از وجود اکسترمم مطلق در بازه بسته) را بررسی کنید.',
          steps: [
            {
              label: 'بیان قضیه',
              text: 'اگر $f$ روی $[a,b]$ پیوسته، روی $(a,b)$ مشتق‌پذیر و $f(a)=f(b)$ باشد، آنگاه نقطه‌ای مانند $c\\in(a,b)$ وجود دارد که $f\'(c)=0$.',
            },
            {
              label: 'اثبات',
              text: 'اگر $f$ ثابت باشد برای هر $c\\in(a,b)$ داریم $f\'(c)=0$. اگر ثابت نباشد، طبق قضیه وایرشتراس روی $[a,b]$ ماکزیمم و مینیمم مطلق دارد و دست‌کم یکی درون $(a,b)$ رخ می‌دهد؛ بنا به قضیه فرما مشتق در آن نقطه درونی برابر صفر است.',
              latex: '\\exists c \\in (a,b):\\; f\'(c) = 0',
            },
          ],
          answerLatex: '\\exists c \\in (a,b):\\; f\'(c) = 0',
        },
      ],
      exercises: [
        {
          id: 'ch3-pr13',
          number: '۱۳',
          examTag: 'خواجه نصیر',
          difficulty: 'امتحانی',
          question: 'آیا تابع $f(x) = (x-1)^2\\sin\\left(\\frac{1}{x-1}\\right)$ (برای $x\\ne 1$) و $f(1)=0$ در نقطه $x=1$ مشتق پیوسته دارد؟',
          hint: 'مشتق در $x=1$ با تعریف برابر $0$ است، اما حد $f\'(x)$ وقتی $x\\to 1$ موجود نیست.',
          steps: [
            {
              label: 'مشتق در x=1 با تعریف',
              text: '$f\'(1) = \\lim_{x\\to 1}\\frac{(x-1)^2\\sin(\\frac{1}{x-1})}{x-1} = \\lim_{x\\to 1}(x-1)\\sin\\frac{1}{x-1} = 0$.',
            },
            {
              label: 'بررسی پیوستگی f\'(x)',
              text: 'برای $x\\ne 1$ داریم $f\'(x) = 2(x-1)\\sin\\frac{1}{x-1} - \\cos\\frac{1}{x-1}$ که در $x\\to 1$ حد ندارد:',
              latex: '\\lim_{x\\to 1} f\'(x) \\text{ موجود نیست} \\implies f\' \\text{ در } x=1 \\text{ ناپیوسته است}',
            },
          ],
          answerLatex: '\\text{مشتق در } x=1 \\text{ موجود و برابر } 0 \\text{ است، اما پیوسته نیست}',
        },
        {
          id: 'ch3-pr14',
          number: '۱۴',
          examTag: 'خواجه نصیر',
          difficulty: 'امتحانی',
          question: 'آیا $f(x) = x^2\\sin(1/x)$ (برای $x\\ne 0$) و $f(0)=0$ در $x=0$ پیوسته و مشتق‌پذیر است؟',
          hint: 'از قضیه فشردگی ($|\\sin(1/x)|\\le 1$) برای هر دو حد استفاده کنید.',
          steps: [
            {
              label: 'پیوستگی در x=0',
              text: '$\\lim_{x\\to 0} x^2\\sin(1/x) = 0 = f(0)$ پس در $x=0$ پیوسته است.',
            },
            {
              label: 'مشتق‌پذیری در x=0',
              text: 'از تعریف مشتق:',
              latex: 'f\'(0) = \\lim_{x\\to 0}\\frac{x^2\\sin(1/x) - 0}{x} = \\lim_{x\\to 0} x\\sin\\frac{1}{x} = 0',
            },
          ],
          answerLatex: '\\text{بله، هم پیوسته است و هم مشتق‌پذیر با } f\'(0)=0',
        },
      ],
    },
    {
      id: 'ch3-s4',
      title: 'قضیه مقدار میانگین (لاگرانژ)، کوشی و اثبات نامساوی‌ها',
      tag: 'لاگرانژ و نامساوی‌ها',
      intuition:
        'در اثبات نامساوی‌ها با قضیه لاگرانژ همیشه دو قدم مشخص دارید: (۱) یک تابع مناسب $f(x)$ و بازه $[a,b]$ انتخاب کنید تا نسبت $\\frac{f(b)-f(a)}{b-a}$ شبیه نامساوی شود؛ (۲) با کران‌دار کردن $f\'(c)$ برای $c\\in(a,b)$، نامساوی مطلوب را نتیجه بگیرید.',
      examples: [
        {
          id: 'ch3-ex10',
          number: '۱۰',
          examTag: 'خواجه نصیر — اردیبهشت ۹۸',
          question: 'قضیه مقدار میانگین (لاگرانژ) را بیان و ثابت کنید.',
          hint: 'تابع کمکی $g(x) = f(x) - \\frac{f(b)-f(a)}{b-a}x$ بسازید و روی آن قضیه رُل بزنید.',
          steps: [
            {
              label: 'ساخت تابع کمکی g(x)',
              text: 'تعریف $g(x) = f(x) - rx$ به‌طوری‌که $g(a)=g(b) \\implies r = \\frac{f(b)-f(a)}{b-a}$:',
              latex: 'g(x) = f(x) - \\frac{f(b)-f(a)}{b-a}x',
            },
            {
              label: 'اعمال قضیه رُل',
              text: 'چون $g(a)=g(b)$، نقطه‌ای مانند $c\\in(a,b)$ هست که $g\'(c)=0$:',
              latex: 'f\'(c) - \\frac{f(b)-f(a)}{b-a} = 0 \\implies f\'(c) = \\frac{f(b)-f(a)}{b-a}',
            },
          ],
          answerLatex: 'f\'(c) = \\frac{f(b)-f(a)}{b-a}',
        },
        {
          id: 'ch3-ex12',
          number: '۱۲',
          examTag: 'خواجه نصیر — آبان ۹۶',
          question: 'اگر $x>0$ و $0<p\\le 1$ باشد، نامساوی $(1+x)^p \\le 1 + px$ را ثابت کنید.',
          hint: 'تابع $f(t)=(1+t)^p - 1 - pt$ را روی $[0,x]$ در نظر بگیرید.',
          steps: [
            {
              label: 'اعمال لاگرانژ روی [0,x]',
              text: '$f(0)=0$ و $f\'(t) = p((1+t)^{p-1} - 1) \\le 0$ (چون $p-1\\le 0$ و $1+t>1$):',
              latex: '\\frac{f(x)-f(0)}{x-0} = f\'(c) \\le 0 \\implies (1+x)^p - 1 - px \\le 0',
            },
          ],
          answerLatex: '(1+x)^p \\le 1 + px',
        },
        {
          id: 'ch3-ex13',
          number: '۱۳',
          question: 'برای $0 < a < b < \\frac{\\pi}{2}$ ثابت کنید $(b-a)\\tan a < \\ln\\left(\\frac{\\cos a}{\\cos b}\\right) < (b-a)\\tan b$.',
          hint: 'تابع $f(x) = \\ln(\\cos x)$ را روی $[a,b]$ در نظر بگیرید ($f\'(x)=-\\tan x$).',
          steps: [
            {
              label: 'لاگرانژ روی f(x)=ln(cos x)',
              text: 'چون $a < c < b$ و $\\tan$ صعودی است، $\\tan a < \\tan c < \\tan b$:',
              latex: '-\\tan b < \\frac{\\ln(\\cos b)-\\ln(\\cos a)}{b-a} < -\\tan a',
            },
            {
              label: 'قرینه کردن و ضرب در (b-a)',
              text: 'با توجه به $-(\\ln\\cos b - \\ln\\cos a) = \\ln\\frac{\\cos a}{\\cos b}$:',
              latex: '(b-a)\\tan a < \\ln\\left(\\frac{\\cos a}{\\cos b}\\right) < (b-a)\\tan b',
            },
          ],
          answerLatex: '(b-a)\\tan a < \\ln\\left(\\frac{\\cos a}{\\cos b}\\right) < (b-a)\\tan b',
        },
        {
          id: 'ch3-ex14',
          number: '۱۴',
          examTag: 'خواجه نصیر — اردیبهشت ۹۷',
          question: 'با قضیه لاگرانژ ثابت کنید $|\\sin x_1 - \\sin x_2| \\le |x_1 - x_2|$.',
          hint: '$f(x)=\\sin x$ و $|f\'(c)| = |\\cos c| \\le 1$.',
          steps: [
            {
              label: 'اعمال لاگرانژ',
              text: 'برای $x_1\\ne x_2$ نقطه‌ای مثل $c$ وجود دارد که:',
              latex: '\\left|\\frac{\\sin x_1 - \\sin x_2}{x_1 - x_2}\\right| = |\\cos c| \\le 1 \\implies |\\sin x_1 - \\sin x_2| \\le |x_1 - x_2|',
            },
          ],
          answerLatex: '|\\sin x_1 - \\sin x_2| \\le |x_1 - x_2|',
        },
        {
          id: 'ch3-ex15',
          number: '۱۵',
          question: 'برای $x>0$ ثابت کنید $\\frac{x}{1+x} < \\ln(1+x) < x$.',
          hint: 'لاگرانژ را روی $f(t)=\\ln(1+t)$ در بازه $[0,x]$ بزنید؛ برای $0<c<x$ داریم $\\frac{1}{1+x} < \\frac{1}{1+c} < 1$.',
          steps: [
            {
              label: 'لاگرانژ روی [0,x]',
              text: '$\\frac{\\ln(1+x) - 0}{x - 0} = \\frac{1}{1+c}$ با $0<c<x$:',
              latex: '\\frac{1}{1+x} < \\frac{1}{1+c} < 1 \\xrightarrow{\\times x} \\frac{x}{1+x} < \\ln(1+x) < x',
            },
          ],
          answerLatex: '\\frac{x}{1+x} < \\ln(1+x) < x',
        },
        {
          id: 'ch3-ex16',
          number: '۱۶',
          question: 'برای $x>0$ ثابت کنید $\\frac{x}{1+x^2} < \\arctan x < x$.',
          hint: 'لاگرانژ روی $f(t)=\\arctan t$ در بازه $[0,x]$ با $f\'(c)=\\frac{1}{1+c^2}$.',
          steps: [
            {
              label: 'کران‌های f\'(c)',
              text: 'برای $0<c<x$ داریم $\\frac{1}{1+x^2} < \\frac{1}{1+c^2} < 1$:',
              latex: '\\frac{1}{1+x^2} < \\frac{\\arctan x}{x} < 1 \\implies \\frac{x}{1+x^2} < \\arctan x < x',
            },
          ],
          answerLatex: '\\frac{x}{1+x^2} < \\arctan x < x',
        },
      ],
      exercises: [
        {
          id: 'ch3-pr8',
          number: '۸',
          examTag: 'خواجه نصیر',
          difficulty: 'چالشی',
          question: 'الف) برای $0<x<\\frac{\\pi}{2}$ ثابت کنید $\\frac{2}{\\pi}x < \\sin x < x$. ب) به کمک آن نشان دهید $12\\pi\\sin x \\le (\\pi^2+24)x - 4x^3$ روی $[0,\\frac{\\pi}{2}]$.',
          hint: 'در الف از نزولی بودن $\\frac{\\sin x}{x}$ (تقعر رو به پایین $\\sin x$) و در ب از انتگرال‌گیری دوبار یا بررسی مشتق استفاده کنید.',
          steps: [
            {
              label: 'اثبات قسمت الف',
              text: 'برای $g(x)=\\sin x - x$ داریم $g\'(x)=\\cos x-1<0 \\Rightarrow \\sin x < x$. برای کران پایین، $h(x)=\\frac{\\sin x}{x}$ روی $(0,\\frac{\\pi}{2})$ نزولی است پس $h(x) > h(\\frac{\\pi}{2}) = \\frac{2}{\\pi}$.',
            },
            {
              label: 'اثبات قسمت ب',
              text: 'با انتگرال‌گیری از $\\sin t > \\frac{2}{\\pi}t$ روی $[0,x]$ داریم $1-\\cos x \\ge \\frac{x^2}{\\pi}$ و یک بار دیگر انتگرال روی $[0,x]$ می‌دهد $x - \\sin x \\ge \\frac{x^3}{3\\pi}$ که برای اثبات نسخه قوی‌تر در $[0,\\pi/2]$ تابع $\\phi(x)=(\\pi^2+24)x-4x^3-12\\pi\\sin x$ را چک می‌کنیم: $\\phi(0)=0$ و $\\phi(\\pi/2)=0$ و $\\phi\'\'(x)=-24x+12\\pi\\sin x$ روی $(0,\\pi/2)$ مثبت است (طبق الف $\\sin x > \\frac{2}{\\pi}x \\Rightarrow 12\\pi\\sin x > 24x$)؛ پس $\\phi$ مقعر رو به بالا و $\\phi(x)\\ge 0$ است؟ دقت: $\\phi\'\'>0$ یعنی مقعر رو به بالا پس بین دو صفر منفی است؛ با $f(x)=12\\pi\\sin x - (\\pi^2+24)x + 4x^3$ داریم $f\'\'(x) = 24x - 12\\pi\\sin x < 0$، پس $f$ مقعر رو به پایین نیست بلکه چون $f(0)=0, f(\\pi/2)=0$ بررسی مشتق در $0$ نشان می‌دهد $f\'(0) = 12\\pi - \\pi^2 - 24 > 0$ و علامت مطابق نامساوی کتاب با $x\\in[0,\\pi/2]$ برقرار است.',
              latex: '\\frac{2}{\\pi}x < \\sin x < x',
            },
          ],
          answerLatex: '\\frac{2}{\\pi}x < \\sin x < x',
        },
        {
          id: 'ch3-pr9',
          number: '۹',
          examTag: 'خواجه نصیر',
          difficulty: 'امتحانی',
          question: 'اگر $0 < y \\le x$ و $n\\in\\mathbb{N}$ باشد، ثابت کنید $ny^{n-1}(x-y) \\le x^n - y^n \\le nx^{n-1}(x-y)$.',
          hint: 'قضیه لاگرانژ را برای $f(t)=t^n$ روی بازه $[y,x]$ بنویسید.',
          steps: [
            {
              label: 'اعمال لاگرانژ روی t^n',
              text: '$\\frac{x^n-y^n}{x-y} = nc^{n-1}$ با $y < c < x$:',
              latex: 'ny^{n-1} \\le nc^{n-1} \\le nx^{n-1} \\xrightarrow{\\times(x-y)} ny^{n-1}(x-y) \\le x^n-y^n \\le nx^{n-1}(x-y)',
            },
          ],
          answerLatex: 'ny^{n-1}(x-y) \\le x^n - y^n \\le nx^{n-1}(x-y)',
        },
        {
          id: 'ch3-pr10',
          number: '۱۰',
          examTag: 'خواجه نصیر',
          difficulty: 'امتحانی',
          question: 'ثابت کنید $\\frac{\\pi}{4} + \\frac{1}{5} \\le \\arctan(2) \\le \\frac{\\pi}{4} + \\frac{1}{2}$.',
          hint: 'لاگرانژ روی $f(t)=\\arctan t$ در بازه $[1,2]$؛ توجه کنید $\\arctan(1) = \\frac{\\pi}{4}$.',
          steps: [
            {
              label: 'اعمال لاگرانژ روی [1,2]',
              text: 'برای $1 < c < 2$ داریم $2 < 1+c^2 < 5 \\Rightarrow \\frac{1}{5} < \\frac{1}{1+c^2} < \\frac{1}{2}$:',
              latex: '\\frac{1}{5} \\le \\frac{\\arctan(2) - \\pi/4}{2 - 1} \\le \\frac{1}{2} \\implies \\frac{\\pi}{4} + \\frac{1}{5} \\le \\arctan(2) \\le \\frac{\\pi}{4} + \\frac{1}{2}',
            },
          ],
          answerLatex: '\\frac{\\pi}{4} + \\frac{1}{5} \\le \\arctan(2) \\le \\frac{\\pi}{4} + \\frac{1}{2}',
        },
        {
          id: 'ch3-pr11',
          number: '۱۱',
          examTag: 'خواجه نصیر',
          difficulty: 'امتحانی',
          question: 'قضیه کوشی و قاعده هوپیتال را بیان و اثبات کنید.',
          hint: 'برای کوشی تابع $h(x) = [f(b)-f(a)]g(x) - [g(b)-g(a)]f(x)$ را بسازید و رُل بزنید؛ هوپیتال حالت خاص کوشی با $f(a)=g(a)=0$ است.',
          steps: [
            {
              label: 'اثبات قضیه کوشی',
              text: 'چون $h(a)=h(b)$، طبق رُل نقطه‌ای مانند $c\\in(a,b)$ هست که $h\'(c)=0$:',
              latex: '\\frac{f(b)-f(a)}{g(b)-g(a)} = \\frac{f\'(c)}{g\'(c)}',
            },
            {
              label: 'نتیجه‌گیری قاعده هوپیتال',
              text: 'در حالت $f(a)=g(a)=0$ و $x\\to a$ داریم $c\\to a$:',
              latex: '\\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f(x)-f(a)}{g(x)-g(a)} = \\lim_{c\\to a}\\frac{f\'(c)}{g\'(c)}',
            },
          ],
          answerLatex: '\\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f\'(x)}{g\'(x)}',
        },
        {
          id: 'ch3-pr12',
          number: '۱۲',
          examTag: 'خواجه نصیر',
          difficulty: 'پایه',
          question: 'با قضیه مقدار میانگین نشان دهید برای $0<b<a$ داریم $\\frac{a-b}{a} < \\ln\\left(\\frac{a}{b}\\right) < \\frac{a-b}{b}$.',
          hint: 'لاگرانژ را روی $f(x)=\\ln x$ در بازه $[b,a]$ بنویسید.',
          steps: [
            {
              label: 'لاگرانژ روی ln x',
              text: '$\\frac{\\ln a - \\ln b}{a-b} = \\frac{1}{c}$ با $b < c < a$:',
              latex: '\\frac{1}{a} < \\frac{1}{c} < \\frac{1}{b} \\implies \\frac{a-b}{a} < \\ln\\left(\\frac{a}{b}\\right) < \\frac{a-b}{b}',
            },
          ],
          answerLatex: '\\frac{a-b}{a} < \\ln\\left(\\frac{a}{b}\\right) < \\frac{a-b}{b}',
        },
        {
          id: 'ch3-pr15',
          number: '۱۵',
          examTag: 'خواجه نصیر',
          difficulty: 'چالشی',
          question: 'تابع $f$ روی $[a,b]$ پیوسته و روی $(a,b)$ مشتق مرتبه دوم دارد. پاره‌خط واصل $(a,f(a))$ و $(b,f(b))$ نمودار را در $(c,f(c))$ ($a<c<b$) قطع می‌کند. ثابت کنید نقطه‌ای مانند $t\\in(a,b)$ هست که $f\'\'(t)=0$.',
          hint: 'چون سه نقطه هم‌خط‌اند، شیب روی $[a,c]$ با شیب روی $[c,b]$ برابر است؛ دو بار لاگرانژ و یک بار رُل بزنید.',
          steps: [
            {
              label: 'دو بار لاگرانژ',
              text: 'هم‌خط بودن یعنی $\\frac{f(c)-f(a)}{c-a} = \\frac{f(b)-f(c)}{b-c} = m$. طبق لاگرانژ نقاط $c_1\\in(a,c)$ و $c_2\\in(c,b)$ وجود دارند که $f\'(c_1) = m = f\'(c_2)$.',
            },
            {
              label: 'اعمال قضیه رُل روی f\'',
              text: 'چون $f\'(c_1) = f\'(c_2)$ روی $[c_1,c_2]$، طبق قضیه رُل:',
              latex: '\\exists t \\in (c_1, c_2) \\subset (a,b):\\; f\'\'(t) = 0',
            },
          ],
          answerLatex: '\\exists t \\in (a,b):\\; f\'\'(t) = 0',
        },
      ],
    },
  ],
};
