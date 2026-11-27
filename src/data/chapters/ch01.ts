import type { ChapterData } from '../../types';

export const ch01: ChapterData = {
  id: 'complex-numbers',
  number: 1,
  title: 'اعداد مختلط',
  subtitle: 'جبر مختلط، مکان هندسی، نمایش قطبی، دموآور و ریشه‌های nام',
  pdfPages: 'ص ۱ تا ۱۰',
  accent: '#0F766E',
  accentSoft: 'rgba(15, 118, 110, 0.11)',
  estimatedMinutes: 55,
  cheatSheet: [
    {
      title: 'تعریف و مزدوج عدد مختلط',
      latex: 'z = x + iy, \\quad \\bar{z} = x - iy, \\quad z\\bar{z} = x^2 + y^2 = |z|^2',
      note: 'Re(z) = x و Im(z) = y هر دو عدد حقیقی هستند.',
    },
    {
      title: 'چرخه توان‌های i',
      latex: 'i = \\sqrt{-1}, \\quad i^2 = -1, \\quad i^3 = -i, \\quad i^4 = 1',
      note: 'مجموع هر ۴ توان متوالی i برابر صفر است.',
    },
    {
      title: 'تقسیم دو عدد مختلط',
      latex: '\\frac{z_1}{z_2} = \\frac{z_1 \\bar{z}_2}{|z_2|^2} = \\frac{(x_1 + iy_1)(x_2 - iy_2)}{x_2^2 + y_2^2}',
      note: 'برای حذف i از مخرج، صورت و مخرج را در مزدوج مخرج ضرب می‌کنیم.',
    },
    {
      title: 'نمایش قطبی و اویلر',
      latex: 'z = r e^{i\\theta} = r(\\cos\\theta + i\\sin\\theta), \\quad r = \\sqrt{x^2+y^2}, \\quad \\tan\\theta = \\frac{y}{x}',
      note: 'حتماً ربع مختصاتی نقطه (x, y) را برای تعیین θ چک کنید.',
    },
    {
      title: 'دستور دموآور (توان)',
      latex: 'z^n = r^n e^{in\\theta} = r^n(\\cos n\\theta + i\\sin n\\theta)',
      note: 'در توان رساندن، اندازه به توان n می‌رسد و زاویه در n ضرب می‌شود.',
    },
    {
      title: 'ریشه‌های nام عدد مختلط',
      latex: 'z_k = r^{1/n}\\left(\\cos\\frac{2k\\pi + \\theta}{n} + i\\sin\\frac{2k\\pi + \\theta}{n}\\right), \\quad k = 0,1,\\dots,n-1',
      note: 'مجموع همه ریشه‌های nام یک عدد مختلط همیشه برابر صفر است.',
    },
  ],
  steps: [
    {
      id: 'ch1-s1',
      title: 'تعریف عدد مختلط، مزدوج، توان‌های i و چهار عمل اصلی',
      tag: 'مبانی جبری',
      intuition:
        'عدد مختلط $z = x + iy$ یک نقطه در صفحه است که محور افقی قسمت حقیقی $\\operatorname{Re}(z)=x$ و محور عمودی قسمت موهومی $\\operatorname{Im}(z)=y$ آن است. مزدوج $\\bar{z}=x-iy$ قرینه $z$ نسبت به محور افقی است و ضرب هر عدد در مزدوجش ($z\\bar{z}=x^2+y^2$) همیشه یک عدد حقیقی نامنفی می‌دهد.',
      formulas: [
        {
          title: 'چهار عمل اصلی و توان‌های i',
          latex: 'z_1 \\pm z_2 = (x_1 \\pm x_2) + i(y_1 \\pm y_2), \\qquad \\frac{z_1}{z_2} = \\frac{(x_1+iy_1)(x_2-iy_2)}{x_2^2+y_2^2}',
          plainExplain: 'در جمع و تفریق، حقیقی با حقیقی و موهومی با موهومی عمل می‌کند؛ در ضرب از $i^2=-1$ و در تقسیم از ضرب در مزدوج مخرج استفاده می‌کنیم.',
        },
        {
          title: 'دوره‌تناوب توان‌های i',
          latex: 'i^{4k}=1, \\quad i^{4k+1}=i, \\quad i^{4k+2}=-1, \\quad i^{4k+3}=-i',
          plainExplain: 'باقی‌مانده تقسیم توان بر ۴ مقدار نهایی را مشخص می‌کند و جمع هر چهار توان پشت‌سرهم برابر صفر است.',
        },
      ],
      trap: {
        title: 'تله رایج در Im(z)',
        body: 'قسمت موهومی $z = 3 - 5i$ برابر $-5$ است نه $-5i$. هیچ‌وقت $i$ را داخل $\\operatorname{Im}(z)$ نگذارید.',
      },
      checkpoint: {
        id: 'ch1-cp1',
        prompt: 'حاصل $i^{2023} + i^{2024} + i^{2025} + i^{2026}$ کدام است؟',
        options: ['$0$', '$1$', '$-1$', '$2i$'],
        correctIndex: 0,
        feedback: 'مجموع هر ۴ توان متوالی از $i$ برابر $i^n(1+i-1-i) = 0$ است.',
      },
      examples: [
        {
          id: 'ch1-ex1',
          number: '۱',
          examTag: 'خواجه نصیر — آذر ۹۷',
          question: 'مقادیر $z \\in \\mathbb{C}$ صادق در معادله زیر را بیابید:',
          questionLatex: '\\operatorname{Re}(z^2) + i\\operatorname{Im}(\\bar{z}(1+2i)) = -3',
          hint: '$z=x+iy$ و $\\bar{z}=x-iy$ قرار دهید و دو طرف را به تفکیک حقیقی و موهومی مساوی بگیرید.',
          steps: [
            {
              label: 'جایگذاری x+iy',
              text: 'بسط دو عبارت داخل Re و Im:',
              latex: 'z^2 = (x^2-y^2)+2xyi, \\qquad \\bar{z}(1+2i) = (x+2y) + (2x-y)i',
            },
            {
              label: 'تشکیل دستگاه معادلات',
              text: 'چون سمت راست برابر $-3+0i$ است، قسمت حقیقی برابر $-3$ و قسمت موهومی برابر $0$ می‌شود:',
              latex: '\\begin{cases} x^2 - y^2 = -3 \\\\ 2x - y = 0 \\Rightarrow y = 2x \\end{cases}',
            },
            {
              label: 'حل دستگاه',
              text: 'جایگذاری $y=2x$ در معادله اول:',
              latex: 'x^2 - 4x^2 = -3 \\Rightarrow -3x^2 = -3 \\Rightarrow x = \\pm 1 \\Rightarrow y = \\pm 2',
            },
          ],
          answerLatex: 'z = 1 + 2i \\quad \\text{یا} \\quad z = -1 - 2i',
        },
        {
          id: 'ch1-ex4',
          number: '۴',
          question: 'به ازای چه مقادیری از $\\theta$ عدد مختلط زیر فاقد قسمت حقیقی است؟',
          questionLatex: 'z = \\frac{3 + 2i\\sin\\theta}{1 - 2i\\sin\\theta}',
          hint: 'صورت و مخرج را در مزدوج مخرج ($1+2i\\sin\\theta$) ضرب کنید و سپس $\\operatorname{Re}(z)=0$ بگذارید.',
          steps: [
            {
              label: 'ضرب در مزدوج مخرج',
              text: 'حذف $i$ از مخرج و تفکیک قسمت حقیقی و موهومی:',
              latex: 'z = \\frac{(3+2i\\sin\\theta)(1+2i\\sin\\theta)}{1+4\\sin^2\\theta} = \\frac{(3-4\\sin^2\\theta) + 8i\\sin\\theta}{1+4\\sin^2\\theta}',
            },
            {
              label: 'اعمال شرط Re(z)=0',
              text: 'صورت قسمت حقیقی را برابر صفر قرار می‌دهیم:',
              latex: '3 - 4\\sin^2\\theta = 0 \\Rightarrow \\sin\\theta = \\pm\\frac{\\sqrt{3}}{2}',
            },
          ],
          answerLatex: '\\theta = k\\pi \\pm \\frac{\\pi}{3} \\quad (k \\in \\mathbb{Z})',
        },
      ],
      exercises: [
        {
          id: 'ch1-pr2',
          number: '۲',
          difficulty: 'امتحانی',
          question: 'فرض کنید $z_1$ و $z_2$ دو عدد مختلط غیرصفر باشند به‌طوری‌که $\\left|\\frac{z_1 - \\bar{z}_2}{z_1 + \\bar{z}_2}\\right| = 1$. ثابت کنید $\\operatorname{Re}(z_1 z_2) = 0$.',
          hint: 'طرفین را به توان ۲ برسانید و از $|w|^2 = w\\bar{w}$ استفاده کنید.',
          steps: [
            {
              label: 'توان دوم و ضرب در مزدوج',
              text: 'از تساوی اندازه صورت و مخرج داریم $|z_1 - \\bar{z}_2|^2 = |z_1 + \\bar{z}_2|^2$:',
              latex: '(z_1 - \\bar{z}_2)(\\bar{z}_1 - z_2) = (z_1 + \\bar{z}_2)(\\bar{z}_1 + z_2)',
            },
            {
              label: 'ساده‌سازی دو طرف',
              text: 'جملات $|z_1|^2$ و $|z_2|^2$ از دو طرف خط می‌خورند:',
              latex: '-z_1 z_2 - \\bar{z}_1\\bar{z}_2 = z_1 z_2 + \\bar{z}_1\\bar{z}_2 \\Rightarrow 2(z_1 z_2 + \\overline{z_1 z_2}) = 0',
            },
            {
              label: 'نتیجه‌گیری',
              text: 'چون $w + \\bar{w} = 2\\operatorname{Re}(w)$ است:',
              latex: '4\\operatorname{Re}(z_1 z_2) = 0 \\Rightarrow \\operatorname{Re}(z_1 z_2) = 0',
            },
          ],
          answerLatex: '\\operatorname{Re}(z_1 z_2) = 0',
        },
        {
          id: 'ch1-pr3',
          number: '۳',
          difficulty: 'پایه',
          question: 'اگر $z = \\frac{(1+2i)(1+3i)(1+4i)}{(2-3i)(2-4i)}$ باشد، مقدار $z\\bar{z}$ را بیابید.',
          hint: 'نیازی به ضرب کردن پرانتزها نیست؛ از خاصیت $z\\bar{z} = |z|^2$ و $|\\frac{a\\cdot b}{c}| = \\frac{|a|\\cdot|b|}{|c|}$ استفاده کنید.',
          steps: [
            {
              label: 'محاسبه مجذور اندازه هر عامل',
              text: 'از $|a+bi|^2 = a^2+b^2$ برای هر پرانتز استفاده می‌کنیم:',
              latex: 'z\\bar{z} = |z|^2 = \\frac{(1^2+2^2)(1^2+3^2)(1^2+4^2)}{(2^2+3^2)(2^2+4^2)}',
            },
            {
              label: 'ساده‌سازی عددی',
              text: 'محاسبه کسر:',
              latex: '|z|^2 = \\frac{5 \\times 10 \\times 17}{13 \\times 20} = \\frac{850}{260} = \\frac{85}{26}',
            },
          ],
          answerLatex: 'z\\bar{z} = \\frac{85}{26}',
        },
        {
          id: 'ch1-pr4',
          number: '۴',
          difficulty: 'پایه',
          question: 'حاصل عبارت زیر را بیابید:',
          questionLatex: '\\frac{1 + (i^{1391} + i^{1392} + i^{1393} + i^{1394} + i^{1395})}{1 - (i^{2013} + i^{2014} + i^{2015} + i^{2016} + i^{2017})}',
          hint: 'در هر پرانتز، ۴ توان متوالی با هم صفر می‌شوند و فقط یک توان باقی می‌ماند.',
          steps: [
            {
              label: 'حذف چهار توان متوالی',
              text: 'در صورت $i^{1391}+\\dots+i^{1394}=0$ و $1395 \\equiv 3 \\pmod 4$ پس $i^{1395}=-i$. در مخرج $i^{2013}+\\dots+i^{2016}=0$ و $2017 \\equiv 1 \\pmod 4$ پس $i^{2017}=i$.',
              latex: '\\frac{1 + (-i)}{1 - i} = \\frac{1-i}{1-i} = 1',
            },
          ],
          answerLatex: '1',
        },
        {
          id: 'ch1-pr7',
          number: '۷',
          difficulty: 'امتحانی',
          question: 'مقادیر حقیقی $a$ و $b$ را چنان بیابید که $z = 1+i$ ریشه معادله $z^5 + az^3 + b = 0$ باشد.',
          hint: 'توان‌های $1+i$ را حساب کرده در معادله بگذارید و بخش حقیقی و موهومی را مساوی صفر قرار دهید.',
          steps: [
            {
              label: 'محاسبه توان‌های 1+i',
              text: 'با استفاده از $(1+i)^2 = 2i$:',
              latex: '(1+i)^3 = 2i(1+i) = -2+2i, \\qquad (1+i)^5 = (2i)^2(1+i) = -4 - 4i',
            },
            {
              label: 'جایگذاری در معادله',
              text: 'تفکیک قسمت حقیقی و موهومی:',
              latex: '(-4 - 2a + b) + (-4 + 2a)i = 0 \\Rightarrow \\begin{cases} 2a - 4 = 0 \\Rightarrow a = 2 \\\\ b = 4 + 2a = 8 \\end{cases}',
            },
          ],
          answerLatex: 'a = 2, \\quad b = 8',
        },
      ],
    },
    {
      id: 'ch1-s2',
      title: 'مکان هندسی نقاط در صفحه مختلط',
      tag: 'هندسه مختلط',
      intuition:
        'برای پیدا کردن شکل هندسی یک معادله یا نامعادله مختلط، دو راه سریع دارید: یا مستقیم از تعبیر هندسی فاصله ($|z-z_0|$ یعنی فاصله نقطه $z$ تا $z_0$) استفاده کنید، یا $z=x+iy$ قرار دهید و معادله دکارتی (خط، دایره، سهمی یا لمنیسکات) را به دست آورید.',
      formulas: [
        {
          title: 'معادله دایره و عمودمنصف',
          latex: '|z - z_0| = R \\; (\\text{دایره}), \\qquad |z - z_1| = |z - z_2| \\; (\\text{عمودمنصف})',
          plainExplain: 'مجموعه نقاطی که فاصله‌شان تا $z_0$ ثابت و برابر $R$ است دایره، و نقاط هم‌فاصله از دو نقطه $z_1, z_2$ عمودمنصف پاره‌خط واصل است.',
        },
      ],
      examples: [
        {
          id: 'ch1-ex2',
          number: '۲',
          question: 'مکان هندسی نقاطی از صفحه را بیابید که در نامعادله زیر صدق کنند:',
          questionLatex: '\\operatorname{Re}\\left(\\frac{z}{1-z}\\right) \\ge -\\frac{1}{2}',
          hint: '$z=x+iy$ بگذارید، در مزدوج مخرج ضرب کنید و نامعادله را بر حسب $x, y$ ساده کنید.',
          steps: [
            {
              label: 'حقیقی کردن مخرج',
              text: 'ضرب صورت و مخرج در $(1-x)+iy$:',
              latex: '\\frac{x+iy}{(1-x)-iy} \\cdot \\frac{(1-x)+iy}{(1-x)+iy} = \\frac{(x - x^2 - y^2) + iy}{(1-x)^2 + y^2}',
            },
            {
              label: 'اعمال نامعادله بر قسمت حقیقی',
              text: 'مخرج نامنفی است (با فرض $z \\ne 1$) پس طرفین را در مخرج ضرب می‌کنیم:',
              latex: 'x - x^2 - y^2 \\ge -\\frac{1}{2}((1-x)^2 + y^2) = -\\frac{1}{2} + x - \\frac{1}{2}x^2 - \\frac{1}{2}y^2',
            },
            {
              label: 'ساده‌سازی نهایی',
              text: 'حذف $x$ از دو طرف و مرتب‌سازی:',
              latex: '\\frac{1}{2} \\ge \\frac{1}{2}x^2 + \\frac{1}{2}y^2 \\Rightarrow x^2 + y^2 \\le 1 \\quad (z \\ne 1)',
            },
          ],
          answerLatex: 'x^2 + y^2 \\le 1, \\quad (x,y) \\ne (1,0)',
        },
        {
          id: 'ch1-ex3',
          number: '۳',
          question: 'مکان هندسی نقاطی را بیابید که در معادله $|z-a||z+a| = a^2$ ($a \\in \\mathbb{R}$) صدق می‌کنند.',
          hint: '$z=x+iy$ قرار دهید، دو طرف را به توان ۲ برسانید و به فرم قطبی ببرید.',
          steps: [
            {
              label: 'جایگذاری و توان دوم',
              text: 'تبدیل اندازه‌ها به مختصات دکارتی:',
              latex: '((x-a)^2+y^2)((x+a)^2+y^2) = a^4',
            },
            {
              label: 'بسط و ساده‌سازی',
              text: 'با استفاده از اتحاد مزدوج $(x^2-a^2)^2 + y^2((x-a)^2+(x+a)^2)+y^4 = a^4$:',
              latex: 'x^4 + 2x^2y^2 + y^4 = 2a^2(x^2-y^2) \\Rightarrow (x^2+y^2)^2 = 2a^2(x^2-y^2)',
            },
            {
              label: 'تبدیل به مختصات قطبی',
              text: 'قرار دادن $x^2+y^2=r^2$ و $x^2-y^2=r^2\\cos 2\\theta$:',
              latex: 'r^4 = 2a^2 r^2 \\cos 2\\theta \\Rightarrow r^2 = 2a^2\\cos 2\\theta \\quad (\\text{لمنیسکات})',
            },
          ],
          answerLatex: '(x^2+y^2)^2 = 2a^2(x^2-y^2) \\iff r^2 = 2a^2\\cos 2\\theta',
        },
      ],
      exercises: [
        {
          id: 'ch1-pr1-1',
          number: '۱-۱',
          difficulty: 'پایه',
          question: 'مکان هندسی نقاط صادق در $\\operatorname{Re}\\left(\\frac{1}{\\bar{z}} + 1\\right) > 2$ را بیابید.',
          hint: '$\\frac{1}{\\bar{z}} = \\frac{z}{|z|^2}$ است؛ قسمت حقیقی آن برابر $\\frac{x}{x^2+y^2}$ می‌شود.',
          steps: [
            {
              label: 'ساده‌سازی کسر',
              text: 'استفاده از $\\operatorname{Re}(1/\\bar{z}) = \\frac{x}{x^2+y^2}$:',
              latex: '\\frac{x}{x^2+y^2} + 1 > 2 \\Rightarrow \\frac{x}{x^2+y^2} > 1 \\Rightarrow x^2 - x + y^2 < 0',
            },
            {
              label: 'مربع کامل',
              text: 'تکمیل مربع برای $x$:',
              latex: '\\left(x - \\frac{1}{2}\\right)^2 + y^2 < \\frac{1}{4}',
            },
          ],
          answerLatex: '\\left(x-\\frac{1}{2}\\right)^2 + y^2 < \\frac{1}{4} \\; (\\text{درون دایره به مرکز } (\\tfrac{1}{2},0) \\text{ و شعاع } \\tfrac{1}{2})',
        },
        {
          id: 'ch1-pr1-2',
          number: '۱-۲',
          difficulty: 'پایه',
          question: 'مکان هندسی نقاط صادق در $\\left|\\frac{z-i}{z+i}\\right| \\le 1$ را بیابید.',
          hint: 'فاصله نقطه تا $i$ کمتر یا مساوی فاصله آن تا $-i$ است.',
          steps: [
            {
              label: 'تبدیل به مختصات دکارتی',
              text: 'ضرب در مخرج مثبت $|z+i|$ و توان ۲:',
              latex: 'x^2 + (y-1)^2 \\le x^2 + (y+1)^2 \\Rightarrow -2y \\le 2y \\Rightarrow y \\ge 0',
            },
          ],
          answerLatex: 'y \\ge 0 \\; (\\text{نیم‌صفحه بالایی شامل محور حقیقی})',
        },
        {
          id: 'ch1-pr1-3',
          number: '۱-۳',
          difficulty: 'امتحانی',
          question: 'مکان هندسی نقاط صادق در $\\left|\\frac{z-3}{z+3}\\right| < 2$ را بیابید.',
          hint: 'دو طرف را در $|z+3|$ ضرب کنید و به توان ۲ برسانید.',
          steps: [
            {
              label: 'توان دوم و بسط',
              text: '$(x-3)^2+y^2 < 4((x+3)^2+y^2)$:',
              latex: 'x^2 - 6x + 9 + y^2 < 4x^2 + 24x + 36 + 4y^2 \\Rightarrow 3x^2 + 30x + 3y^2 + 27 > 0',
            },
            {
              label: 'تقسیم بر ۳ و مربع کامل',
              text: '$x^2 + 10x + y^2 + 9 > 0$:',
              latex: '(x+5)^2 + y^2 > 16',
            },
          ],
          answerLatex: '(x+5)^2 + y^2 > 16 \\; (\\text{بیرون دایره به مرکز } (-5,0) \\text{ و شعاع } 4)',
        },
        {
          id: 'ch1-pr1-4',
          number: '۱-۴',
          difficulty: 'امتحانی',
          question: 'مکان هندسی نقاط صادق در $|z-1| - |1 + \\operatorname{Re}(z)| = 0$ را بیابید.',
          hint: '$|z-1| = |1+x|$ یعنی فاصله نقطه تا $(1,0)$ برابر فاصله آن تا خط $x=-1$ است (تعریف سهمی).',
          steps: [
            {
              label: 'توان دوم دو طرف',
              text: '$(x-1)^2 + y^2 = (x+1)^2$:',
              latex: 'x^2 - 2x + 1 + y^2 = x^2 + 2x + 1 \\Rightarrow y^2 = 4x',
            },
          ],
          answerLatex: 'y^2 = 4x \\; (\\text{سهمی با کانون } (1,0))',
        },
        {
          id: 'ch1-pr1-5',
          number: '۱-۵',
          difficulty: 'امتحانی',
          question: 'مکان هندسی نقاط صادق در $\\operatorname{Re}\\left(\\frac{1}{z} + 2i\\right) \\le \\frac{\\operatorname{Im}(z-\\bar{z})}{|z|^2}$ را بیابید.',
          hint: 'توجه کنید $\\operatorname{Re}(2i)=0$ و $z-\\bar{z}=2iy$ پس $\\operatorname{Im}(z-\\bar{z})=2y$.',
          steps: [
            {
              label: 'ساده‌سازی دو طرف',
              text: 'قسمت حقیقی $1/z$ برابر $\\frac{x}{x^2+y^2}$ است:',
              latex: '\\frac{x}{x^2+y^2} \\le \\frac{2y}{x^2+y^2} \\quad (z \\ne 0)',
            },
            {
              label: 'حذف مخرج مثبت',
              text: 'چون $x^2+y^2 > 0$:',
              latex: 'x \\le 2y \\Rightarrow y \\ge \\frac{1}{2}x \\quad (x,y) \\ne (0,0)',
            },
          ],
          answerLatex: 'y \\ge \\frac{1}{2}x, \\quad (x,y) \\ne (0,0)',
        },
        {
          id: 'ch1-pr1-6',
          number: '۱-۶',
          difficulty: 'چالشی',
          question: 'مکان هندسی نقاطی را بیابید که هم‌زمان $\\operatorname{Im}\\left(\\frac{z-i}{z+i}\\right) < \\frac{1}{2}$ و $\\operatorname{Re}\\left(\\frac{z-i}{z+i}\\right) = 0$ باشد.',
          hint: 'ابتدا کسر $\\frac{z-i}{z+i}$ را با ضرب در مزدوج مخرج به بخش حقیقی و موهومی تفکیک کنید.',
          steps: [
            {
              label: 'تفکیک حقیقی و موهومی',
              text: 'ضرب در $x - i(y+1)$:',
              latex: '\\frac{x+i(y-1)}{x+i(y+1)} = \\frac{(x^2+y^2-1) - 2xi}{x^2+(y+1)^2}',
            },
            {
              label: 'اعمال دو شرط',
              text: 'شرط اول $x^2+y^2=1$ (دایره واحد به جز $(0,-1)$) و شرط دوم $\\frac{-2x}{x^2+(y+1)^2} < \\frac{1}{2}$:',
              latex: 'x^2+y^2=1 \\Rightarrow x^2+(y+1)^2 = 2+2y \\Rightarrow \\frac{-2x}{2+2y} < \\frac{1}{2} \\Rightarrow y + 2x + 1 > 0',
            },
          ],
          answerLatex: 'x^2+y^2=1 \\text{ به شرط } y+2x+1 > 0 \\text{ و } (x,y)\\ne(0,-1)',
        },
        {
          id: 'ch1-pr1-7',
          number: '۱-۷',
          difficulty: 'پایه',
          question: 'مکان هندسی نقاط صادق در $z\\bar{z} < 2\\operatorname{Re}(z)$ را بیابید.',
          hint: '$z\\bar{z}=x^2+y^2$ و $\\operatorname{Re}(z)=x$ قرار دهید.',
          steps: [
            {
              label: 'مربع کامل',
              text: '$x^2 + y^2 < 2x \\Rightarrow x^2 - 2x + y^2 < 0$:',
              latex: '(x-1)^2 + y^2 < 1',
            },
          ],
          answerLatex: '(x-1)^2 + y^2 < 1 \\; (\\text{درون دایره به مرکز } (1,0) \\text{ و شعاع } 1)',
        },
        {
          id: 'ch1-pr1-8',
          number: '۱-۸',
          difficulty: 'پایه',
          question: 'مکان هندسی نقاط صادق در $\\operatorname{Im}\\left(\\frac{1}{z-2i}\\right) = \\frac{1}{4}$ را بیابید.',
          hint: 'صورت و مخرج را در $x - i(y-2)$ ضرب کنید.',
          steps: [
            {
              label: 'یافتن قسمت موهومی',
              text: '$\\frac{1}{x+i(y-2)} = \\frac{x - i(y-2)}{x^2+(y-2)^2}$:',
              latex: '\\frac{-(y-2)}{x^2+(y-2)^2} = \\frac{1}{4} \\Rightarrow x^2 + y^2 - 4y + 4 = -4y + 8',
            },
            {
              label: 'ساده‌سازی نهایی',
              text: 'حذف $-4y$ از دو طرف:',
              latex: 'x^2 + y^2 = 4 \\quad (z \\ne 2i)',
            },
          ],
          answerLatex: 'x^2 + y^2 = 4, \\quad (x,y) \\ne (0,2)',
        },
      ],
    },
    {
      id: 'ch1-s3',
      title: 'نمایش قطبی، آرگومان و توان‌های بزرگ',
      tag: 'فرم قطبی',
      intuition:
        'وقتی قرار است یک عدد مختلط را به توان ۱۳۹۸ برسانید، بسط دوجمله‌ای غیرممکن است؛ اما در فرم قطبی $z = r e^{i\\theta}$، توان رساندن فقط اندازه را به توان می‌رساند و زاویه را در توان ضرب می‌کند: $z^n = r^n e^{in\\theta}$.',
      formulas: [
        {
          title: 'تبدیل دکارتی به قطبی',
          latex: 'r = \\sqrt{x^2+y^2}, \\qquad z = r e^{i\\theta} = r(\\cos\\theta + i\\sin\\theta)',
          plainExplain: 'زاویه $\\theta$ بر اساس ربع مختصاتی نقطه $(x,y)$ تعیین می‌شود: در ربع دوم $\\pi - \\alpha$ و در ربع سوم $\\pi + \\alpha$ یا $-\\pi+\\alpha$.',
        },
      ],
      examples: [
        {
          id: 'ch1-ex5',
          number: '۵',
          question: 'اگر $z = \\frac{1}{2} + \\frac{\\sqrt{3}}{2}i$ باشد، حاصل $z^{1398}$ را بیابید.',
          hint: 'اندازه $r=1$ و زاویه در ربع اول $\\theta = \\frac{\\pi}{3}$ است.',
          steps: [
            {
              label: 'تبدیل به فرم قطبی',
              text: '$r = \\sqrt{\\frac{1}{4}+\\frac{3}{4}}=1$ و $\\tan\\theta = \\sqrt{3} \\Rightarrow \\theta = \\frac{\\pi}{3}$:',
              latex: 'z = e^{i\\frac{\\pi}{3}}',
            },
            {
              label: 'اعمال دموآور',
              text: 'چون $1398 / 3 = 466$ عددی زوج است:',
              latex: 'z^{1398} = e^{i\\frac{1398\\pi}{3}} = \\cos(466\\pi) + i\\sin(466\\pi) = 1',
            },
          ],
          answerLatex: 'z^{1398} = 1',
        },
        {
          id: 'ch1-ex6',
          number: '۶',
          question: 'حاصل عبارت $\\left(\\frac{1+\\sqrt{3}i}{1-\\sqrt{3}i}\\right)^{1372}$ را بیابید.',
          hint: 'صورت و مخرج را جداگانه قطبی کنید و زاویه‌ها را از هم کم کنید.',
          steps: [
            {
              label: 'فرم قطبی صورت و مخرج',
              text: 'هر دو اندازه ۲ دارند با زوایای $\\frac{\\pi}{3}$ و $-\\frac{\\pi}{3}$:',
              latex: '\\frac{1+\\sqrt{3}i}{1-\\sqrt{3}i} = \\frac{2e^{i\\pi/3}}{2e^{-i\\pi/3}} = e^{i\\frac{2\\pi}{3}}',
            },
            {
              label: 'توان ۱۳۷۲ و ساده‌سازی زاویه',
              text: 'نوشتن $\\frac{2744\\pi}{3} = 915\\pi - \\frac{\\pi}{3}$:',
              latex: 'e^{i\\frac{2744\\pi}{3}} = \\cos\\left(915\\pi - \\frac{\\pi}{3}\\right) + i\\sin\\left(915\\pi - \\frac{\\pi}{3}\\right) = -\\frac{1}{2} + \\frac{\\sqrt{3}}{2}i',
            },
          ],
          answerLatex: '-\\frac{1}{2} + \\frac{\\sqrt{3}}{2}i',
        },
        {
          id: 'ch1-ex7',
          number: '۷',
          question: 'اگر $z = \\frac{-1+\\sqrt{3}i}{-\\sqrt{3}+i}$ باشد، به ازای چه مقادیری از $n$ عدد $z^n$ حقیقی محض است؟',
          hint: 'صورت و مخرج هر دو در ربع دوم هستند؛ پس زاویه هر دو را به شکل $\\pi - \\alpha$ بنویسید.',
          steps: [
            {
              label: 'تبدیل صورت و مخرج به قطبی',
              text: 'صورت زاویه $\\frac{2\\pi}{3}$ و مخرج زاویه $\\frac{5\\pi}{6}$ دارد:',
              latex: 'z = \\frac{2e^{i2\\pi/3}}{2e^{i5\\pi/6}} = e^{-i\\frac{\\pi}{6}} \\Rightarrow z^n = \\cos\\left(\\frac{n\\pi}{6}\\right) - i\\sin\\left(\\frac{n\\pi}{6}\\right)',
            },
            {
              label: 'شرط حقیقی محض بودن',
              text: 'قسمت موهومی باید صفر شود:',
              latex: '\\sin\\left(\\frac{n\\pi}{6}\\right) = 0 \\Rightarrow \\frac{n\\pi}{6} = k\\pi \\Rightarrow n = 6k',
            },
          ],
          answerLatex: 'n = 6k \\quad (k \\in \\mathbb{Z})',
        },
      ],
      exercises: [
        {
          id: 'ch1-pr5',
          number: '۵',
          difficulty: 'پایه',
          question: 'حاصل عبارت $\\left(\\frac{\\sqrt{3}+i}{\\sqrt{3}-i}\\right)^{10}$ را بیابید.',
          hint: 'صورت زاویه $\\frac{\\pi}{6}$ و مخرج زاویه $-\\frac{\\pi}{6}$ دارد.',
          steps: [
            {
              label: 'تقسیم قطبی و توان ۱۰',
              text: 'نسبت برابر $e^{i\\pi/3}$ می‌شود:',
              latex: '\\left(e^{i\\frac{\\pi}{3}}\\right)^{10} = e^{i\\frac{10\\pi}{3}} = e^{i\\left(3\\pi + \\frac{\\pi}{3}\\right)} = -\\cos\\frac{\\pi}{3} - i\\sin\\frac{\\pi}{3}',
            },
          ],
          answerLatex: '-\\frac{1}{2} - \\frac{\\sqrt{3}}{2}i',
        },
        {
          id: 'ch1-pr11',
          number: '۱۱',
          difficulty: 'پایه',
          question: 'اگر $z = 1 + \\sqrt{3}i$ باشد، حاصل $\\frac{z^7}{\\bar{z}}$ را بیابید.',
          hint: '$z = 2e^{i\\pi/3}$ و $\\bar{z} = 2e^{-i\\pi/3}$ است.',
          steps: [
            {
              label: 'محاسبه به فرم قطبی',
              text: 'اندازه $2^7/2 = 64$ و زاویه $\\frac{7\\pi}{3} - (-\\frac{\\pi}{3}) = \\frac{8\\pi}{3}$:',
              latex: '\\frac{z^7}{\\bar{z}} = 64 e^{i\\frac{8\\pi}{3}} = 64 e^{i\\frac{2\\pi}{3}} = 64\\left(-\\frac{1}{2} + \\frac{\\sqrt{3}}{2}i\\right)',
            },
          ],
          answerLatex: '-32 + 32\\sqrt{3}i',
        },
        {
          id: 'ch1-pr12',
          number: '۱۲',
          difficulty: 'امتحانی',
          question: 'اگر $z = \\frac{\\sqrt{3}}{2} + \\frac{1}{2}i$ باشد، حاصل $e^{\\pi z^3}$ را بیابید.',
          hint: 'ابتدا $z^3$ را با دموآور پیدا کنید؛ نتیجه عدد بسیار ساده‌ای است.',
          steps: [
            {
              label: 'محاسبه z^3',
              text: '$z = e^{i\\pi/6}$ پس:',
              latex: 'z^3 = e^{i\\frac{3\\pi}{6}} = e^{i\\frac{\\pi}{2}} = i',
            },
            {
              label: 'جایگذاری در نمایی',
              text: 'استفاده از اتحاد اویلر $e^{i\\pi} = -1$:',
              latex: 'e^{\\pi z^3} = e^{i\\pi} = -1',
            },
          ],
          answerLatex: '-1',
        },
      ],
    },
    {
      id: 'ch1-s4',
      title: 'دستور دموآور و اثبات اتحادهای مثلثاتی و جبری',
      tag: 'دموآور و اثبات',
      intuition:
        'هر وقت در صورت سوال $z^n + \\bar{z}^n$ یا $x^n + \\frac{1}{x^n}$ دیدید، فوراً سراغ فرم قطبی بروید: چون $e^{in\\theta} + e^{-in\\theta} = 2\\cos(n\\theta)$، قسمت‌های موهومی دقیقاً یکدیگر را خنثی می‌کنند.',
      formulas: [
        {
          title: 'اتحادهای طلایی اویلر',
          latex: 'e^{i\\alpha} + e^{-i\\alpha} = 2\\cos\\alpha, \\qquad e^{i\\alpha} - e^{-i\\alpha} = 2i\\sin\\alpha',
          plainExplain: 'این دو رابطه سریع‌ترین راه برای جمع یک عدد مختلط با مزدوج یا معکوس آن روی دایره واحد است.',
        },
      ],
      examples: [
        {
          id: 'ch1-ex8',
          number: '۸',
          examTag: 'خواجه نصیر — آبان ۹۶',
          question: 'اگر $z = -1 + \\sqrt{3}i$ باشد، مقدار $z^n + \\bar{z}^n$ را محاسبه کنید.',
          hint: '$z = 2e^{i2\\pi/3}$ و $\\bar{z} = 2e^{-i2\\pi/3}$ بنویسید.',
          steps: [
            {
              label: 'توان nام عدد و مزدوجش',
              text: 'اعمال دموآور برای هر دو:',
              latex: 'z^n = 2^n e^{i\\frac{2n\\pi}{3}}, \\qquad \\bar{z}^n = 2^n e^{-i\\frac{2n\\pi}{3}}',
            },
            {
              label: 'جمع و ساده‌سازی',
              text: 'بخش‌های سینوسی قرینه هستند و حذف می‌شوند:',
              latex: 'z^n + \\bar{z}^n = 2^n\\left(2\\cos\\frac{2n\\pi}{3}\\right) = 2^{n+1}\\cos\\left(\\frac{2n\\pi}{3}\\right)',
            },
          ],
          answerLatex: '2^{n+1}\\cos\\left(\\frac{2n\\pi}{3}\\right)',
        },
        {
          id: 'ch1-ex9',
          number: '۹',
          examTag: 'خواجه نصیر',
          question: 'اگر $x + \\frac{1}{x} = 2\\cos\\theta$ ($0 \\le \\theta \\le \\frac{\\pi}{2}$) باشد، ثابت کنید $x^n + \\frac{1}{x^n} = 2\\cos(n\\theta)$.',
          hint: 'طرفین را در $x$ ضرب کنید و معادله درجه دوم را بر حسب $x$ حل کنید.',
          steps: [
            {
              label: 'حل معادله درجه دوم',
              text: '$x^2 - 2x\\cos\\theta + 1 = 0$:',
              latex: 'x = \\frac{2\\cos\\theta \\pm \\sqrt{4\\cos^2\\theta - 4}}{2} = \\cos\\theta \\pm i\\sin\\theta = e^{\\pm i\\theta}',
            },
            {
              label: 'اعمال دموآور',
              text: 'معکوس $x$ برابر $e^{\\mp i\\theta}$ است؛ پس:',
              latex: 'x^n + \\frac{1}{x^n} = e^{\\pm in\\theta} + e^{\\mp in\\theta} = 2\\cos(n\\theta)',
            },
          ],
          answerLatex: 'x^n + \\frac{1}{x^n} = 2\\cos(n\\theta)',
        },
      ],
      exercises: [
        {
          id: 'ch1-pr6',
          number: '۶',
          examTag: 'خواجه نصیر',
          difficulty: 'امتحانی',
          question: 'اگر $\\alpha$ و $\\beta$ ریشه‌های معادله $x^2 - x + 1 = 0$ باشند، ثابت کنید $\\alpha^n + \\beta^n = 2\\cos\\left(\\frac{n\\pi}{3}\\right)$.',
          hint: 'ریشه‌های معادله $\\frac{1 \\pm \\sqrt{3}i}{2} = e^{\\pm i\\pi/3}$ هستند.',
          steps: [
            {
              label: 'یافتن ریشه‌ها و فرم قطبی',
              text: 'از فرمول دلتا داریم:',
              latex: '\\alpha, \\beta = \\frac{1 \\pm i\\sqrt{3}}{2} = e^{\\pm i\\frac{\\pi}{3}}',
            },
            {
              label: 'توان nام و جمع',
              text: 'با دستور دموآور:',
              latex: '\\alpha^n + \\beta^n = e^{i\\frac{n\\pi}{3}} + e^{-i\\frac{n\\pi}{3}} = 2\\cos\\left(\\frac{n\\pi}{3}\\right)',
            },
          ],
          answerLatex: '\\alpha^n + \\beta^n = 2\\cos\\left(\\frac{n\\pi}{3}\\right)',
        },
        {
          id: 'ch1-pr8',
          number: '۸',
          difficulty: 'پایه',
          question: 'درستی تساوی $(1+\\sqrt{3}i)^n + (1-\\sqrt{3}i)^n = 2^{n+1}\\cos\\left(\\frac{n\\pi}{3}\\right)$ را اثبات کنید.',
          hint: '$1 \\pm \\sqrt{3}i = 2e^{\\pm i\\pi/3}$.',
          steps: [
            {
              label: 'تبدیل به قطبی و جمع',
              text: 'اعمال توان $n$:',
              latex: '(2e^{i\\pi/3})^n + (2e^{-i\\pi/3})^n = 2^n\\left(2\\cos\\frac{n\\pi}{3}\\right) = 2^{n+1}\\cos\\left(\\frac{n\\pi}{3}\\right)',
            },
          ],
          answerLatex: '2^{n+1}\\cos\\left(\\frac{n\\pi}{3}\\right)',
        },
        {
          id: 'ch1-pr9',
          number: '۹',
          difficulty: 'چالشی',
          question: 'اگر $\\alpha, \\beta, \\gamma$ زوایای یک مثلث باشند، حاصل $(\\sin\\alpha+i\\cos\\alpha)^{1389}(\\sin\\beta+i\\cos\\beta)^{1389}(\\sin\\gamma+i\\cos\\gamma)^{1389}$ را بیابید.',
          hint: '$\\sin\\theta + i\\cos\\theta = i(\\cos\\theta - i\\sin\\theta) = i e^{-i\\theta}$ است و $\\alpha+\\beta+\\gamma=\\pi$.',
          steps: [
            {
              label: 'تبدیل به فرم نمایی',
              text: 'فاکتورگیری از $i$ در هر پرانتز:',
              latex: '\\sin\\theta + i\\cos\\theta = i e^{-i\\theta} \\Rightarrow \\text{حاصل} = i^{3\\times 1389} e^{-i\\cdot 1389(\\alpha+\\beta+\\gamma)}',
            },
            {
              label: 'جایگذاری جمع زوایای مثلث',
              text: 'چون $\\alpha+\\beta+\\gamma=\\pi$ و $4167 \\equiv 3 \\pmod 4$ پس $i^{4167}=-i$ و $e^{-i1389\\pi}=-1$:',
              latex: '(-i)(-1) = i',
            },
          ],
          answerLatex: 'i',
        },
        {
          id: 'ch1-pr10',
          number: '۱۰',
          difficulty: 'چالشی',
          question: 'مقادیر اصلی $A = i^{i^3}$ و $B = i^i$ را بیابید.',
          hint: 'از تعریف $w^z = e^{z\\ln w}$ و $i = e^{i\\pi/2}$ استفاده کنید.',
          steps: [
            {
              label: 'محاسبه B',
              text: 'نوشتن $i = e^{i\\pi/2}$ (شاخه اصلی):',
              latex: 'B = i^i = \\left(e^{i\\frac{\\pi}{2}}\\right)^i = e^{i^2\\frac{\\pi}{2}} = e^{-\\frac{\\pi}{2}}',
            },
            {
              label: 'محاسبه A',
              text: 'چون $i^3 = -i$ است:',
              latex: 'A = i^{-i} = \\left(e^{i\\frac{\\pi}{2}}\\right)^{-i} = e^{\\frac{\\pi}{2}}',
            },
          ],
          answerLatex: 'A = e^{\\pi/2}, \\quad B = e^{-\\pi/2}',
        },
        {
          id: 'ch1-pr13',
          number: '۱۳',
          difficulty: 'پایه',
          question: 'اگر $z + \\frac{1}{z} = 2\\cos\\left(\\frac{\\pi}{12}\\right)$ باشد، حاصل $z^6 + \\frac{1}{z^6}$ را بیابید.',
          hint: 'دقیقاً مطابق مثال ۹ داریم $z^n + z^{-n} = 2\\cos(n\\theta)$.',
          steps: [
            {
              label: 'استفاده از نتیجه مثال ۹',
              text: 'با $\\theta = \\frac{\\pi}{12}$ و $n=6$:',
              latex: 'z^6 + \\frac{1}{z^6} = 2\\cos\\left(6\\cdot\\frac{\\pi}{12}\\right) = 2\\cos\\left(\\frac{\\pi}{2}\\right) = 0',
            },
          ],
          answerLatex: '0',
        },
        {
          id: 'ch1-pr14',
          number: '۱۴',
          examTag: 'خواجه نصیر',
          difficulty: 'امتحانی',
          question: 'ثابت کنید $\\left(\\frac{1+i\\tan\\theta}{1-i\\tan\\theta}\\right)^n = \\frac{1+i\\tan(n\\theta)}{1-i\\tan(n\\theta)}$.',
          hint: '$\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}$ بگذارید و صورت و مخرج را در $\\cos\\theta$ ضرب کنید.',
          steps: [
            {
              label: 'تبدیل کسر به اویلر',
              text: 'ضرب صورت و مخرج در $\\cos\\theta$:',
              latex: '\\frac{1+i\\tan\\theta}{1-i\\tan\\theta} = \\frac{\\cos\\theta + i\\sin\\theta}{\\cos\\theta - i\\sin\\theta} = \\frac{e^{i\\theta}}{e^{-i\\theta}} = e^{2i\\theta}',
            },
            {
              label: 'توان nام و بازگشت به تانژانت',
              text: 'تقسیم صورت و مخرج بر $\\cos(n\\theta)$:',
              latex: '(e^{2i\\theta})^n = e^{2in\\theta} = \\frac{\\cos(n\\theta)+i\\sin(n\\theta)}{\\cos(n\\theta)-i\\sin(n\\theta)} = \\frac{1+i\\tan(n\\theta)}{1-i\\tan(n\\theta)}',
            },
          ],
          answerLatex: '\\left(\\frac{1+i\\tan\\theta}{1-i\\tan\\theta}\\right)^n = \\frac{1+i\\tan(n\\theta)}{1-i\\tan(n\\theta)}',
        },
        {
          id: 'ch1-pr15',
          number: '۱۵',
          difficulty: 'امتحانی',
          question: 'ثابت کنید $(1+\\cos\\alpha+i\\sin\\alpha)^n = 2^n\\cos^n\\left(\\frac{\\alpha}{2}\\right)\\left(\\cos\\frac{n\\alpha}{2}+i\\sin\\frac{n\\alpha}{2}\\right)$.',
          hint: 'از اتحادهای نصف کمان $1+\\cos\\alpha = 2\\cos^2\\frac{\\alpha}{2}$ و $\\sin\\alpha = 2\\sin\\frac{\\alpha}{2}\\cos\\frac{\\alpha}{2}$ استفاده کنید.',
          steps: [
            {
              label: 'فاکتورگیری با نصف کمان',
              text: 'تبدیل عبارت داخل پرانتز به فرم قطبی:',
              latex: '1+\\cos\\alpha+i\\sin\\alpha = 2\\cos\\frac{\\alpha}{2}\\left(\\cos\\frac{\\alpha}{2}+i\\sin\\frac{\\alpha}{2}\\right) = 2\\cos\\frac{\\alpha}{2}\\, e^{i\\frac{\\alpha}{2}}',
            },
            {
              label: 'اعمال دموآور',
              text: 'به توان $n$ رساندن:',
              latex: '2^n\\cos^n\\left(\\frac{\\alpha}{2}\\right)\\left(\\cos\\frac{n\\alpha}{2}+i\\sin\\frac{n\\alpha}{2}\\right)',
            },
          ],
          answerLatex: '2^n\\cos^n\\left(\\frac{\\alpha}{2}\\right)\\left(\\cos\\frac{n\\alpha}{2}+i\\sin\\frac{n\\alpha}{2}\\right)',
        },
        {
          id: 'ch1-pr16',
          number: '۱۶',
          examTag: 'خواجه نصیر',
          difficulty: 'چالشی',
          question: 'ثابت کنید $\\frac{1+\\sin\\theta+i\\cos\\theta}{1+\\sin\\theta-i\\cos\\theta} = \\sin\\theta+i\\cos\\theta$ و از آن نتیجه بگیرید $(1+\\sin\\frac{\\pi}{5}+i\\cos\\frac{\\pi}{5})^{10} + (1+\\sin\\frac{\\pi}{5}-i\\cos\\frac{\\pi}{5})^{10} = 0$.',
          hint: '$z = \\sin\\theta+i\\cos\\theta$ روی دایره واحد است پس $\\bar{z} = 1/z$ و $\\frac{1+z}{1+1/z} = z$.',
          steps: [
            {
              label: 'اثبات قسمت اول',
              text: 'با $z=\\sin\\theta+i\\cos\\theta$ داریم $|z|=1 \\Rightarrow \\bar{z}=1/z$:',
              latex: '\\frac{1+z}{1+\\bar{z}} = \\frac{1+z}{1+1/z} = z = \\sin\\theta + i\\cos\\theta',
            },
            {
              label: 'نتیجه‌گیری برای توان ۱۰',
              text: 'برای $\\theta=\\frac{\\pi}{5}$ داریم $z = \\cos\\frac{3\\pi}{10}+i\\sin\\frac{3\\pi}{10} = e^{i3\\pi/10}$؛ پس $z^{10} = e^{i3\\pi} = -1$:',
              latex: '\\left(\\frac{1+z}{1+\\bar{z}}\\right)^{10} = z^{10} = -1 \\Rightarrow (1+z)^{10} + (1+\\bar{z})^{10} = 0',
            },
          ],
          answerLatex: '\\left(1+\\sin\\frac{\\pi}{5}+i\\cos\\frac{\\pi}{5}\\right)^{10} + \\left(1+\\sin\\frac{\\pi}{5}-i\\cos\\frac{\\pi}{5}\\right)^{10} = 0',
        },
      ],
    },
    {
      id: 'ch1-s5',
      title: 'ریشه‌های nام عدد مختلط',
      tag: 'ریشه‌گیری مختلط',
      intuition:
        'هر عدد مختلط غیرصفر دقیقاً $n$ ریشه $n$ام متمایز دارد که روی دایره‌ای به شعاع $r^{1/n}$ و با فاصله زاویه‌ای مساوی $\\frac{2\\pi}{n}$ چیده شده‌اند (رئوس یک $n$-ضلعی منتظم). یک چک سریع و طلایی سر جلسه امتحان: مجموع همه ریشه‌ها باید دقیقاً صفر شود.',
      formulas: [
        {
          title: 'فرمول ریشه‌های nام',
          latex: 'z_k = r^{\\frac{1}{n}} e^{i\\frac{2k\\pi + \\theta}{n}}, \\qquad k = 0, 1, \\dots, n-1',
          plainExplain: 'اولین ریشه با $k=0$ در زاویه $\\theta/n$ است و برای هر ریشه بعدی کافی است $\\frac{2\\pi}{n}$ به زاویه اضافه کنید.',
        },
      ],
      tip: {
        title: 'آزمون صحت فوری',
        body: 'پس از محاسبه همه ریشه‌های $n$ام، آن‌ها را با هم جمع کنید؛ اگر مجموعشان برابر $0$ نشد، حتماً در زاویه یکی از ریشه‌ها اشتباه کرده‌اید.',
      },
      checkpoint: {
        id: 'ch1-cp2',
        prompt: 'ریشه‌های چهارم عدد $-1$ روی صفحه مختلط چه شکلی می‌سازند؟',
        options: [
          'مربعی با رئوس در زوایای ۴۵، ۱۳۵، ۲۲۵ و ۳۱۵ درجه',
          'مربعی روی محورهای حقیقی و موهومی',
          'مثلث متساوی‌الاضلاع',
          'دو نقطه روی محور موهومی',
        ],
        correctIndex: 0,
        feedback: 'چون $-1 = e^{i\\pi}$ است، اولین ریشه چهارم در $\\pi/4$ (۴۵ درجه) قرار می‌گیرد و بقیه با گام ۹۰ درجه می‌چرخند.',
      },
      examples: [
        {
          id: 'ch1-ex10',
          number: '۱۰',
          examTag: 'خواجه نصیر — اردیبهشت ۹۸',
          question: 'عدد مختلط $z = (1+i)^6 + 8i - 8$ را در نظر بگیرید. الف) نمایش قطبی $z$ و ب) ریشه‌های سوم $z$ را بیابید.',
          hint: 'ابتدا $(1+i)^6$ را با دموآور ساده کنید تا خود $z$ به یک عدد ساده تبدیل شود.',
          steps: [
            {
              label: 'ساده‌سازی z و نمایش قطبی',
              text: '$1+i = \\sqrt{2}e^{i\\pi/4} \\Rightarrow (1+i)^6 = 8e^{i3\\pi/2} = -8i$:',
              latex: 'z = -8i + 8i - 8 = -8 = 8e^{i\\pi}',
            },
            {
              label: 'یافتن ریشه‌های سوم',
              text: 'شعاع $\\sqrt[3]{8}=2$ و زوایا $\\frac{2k\\pi+\\pi}{3}$ برای $k=0,1,2$:',
              latex: 'z_0 = 2e^{i\\pi/3} = 1+\\sqrt{3}i, \\quad z_1 = -2, \\quad z_2 = 2e^{i5\\pi/3} = 1-\\sqrt{3}i',
            },
          ],
          answerLatex: 'z = 8e^{i\\pi}, \\quad \\text{ریشه‌ها: } 1+\\sqrt{3}i,\\; -2,\\; 1-\\sqrt{3}i',
        },
        {
          id: 'ch1-ex11',
          number: '۱۱',
          question: 'معادله $z^4 = \\left(\\frac{1-\\sqrt{3}i}{1+\\sqrt{3}i}\\right)^3$ را حل کنید.',
          hint: 'سمت راست را قطبی کنید؛ متوجه می‌شوید برابر $e^{-2\\pi i} = 1$ است.',
          steps: [
            {
              label: 'ساده‌سازی سمت راست',
              text: '$1-\\sqrt{3}i = 2e^{-i\\pi/3}$ و $1+\\sqrt{3}i = 2e^{i\\pi/3}$:',
              latex: 'z^4 = \\left(e^{-i\\frac{2\\pi}{3}}\\right)^3 = e^{-2\\pi i} = 1',
            },
            {
              label: 'ریشه‌های چهارم واحد',
              text: 'برای $k=0,1,2,3$:',
              latex: 'z_k = e^{i\\frac{k\\pi}{2}} \\Rightarrow z \\in \\{1,\\; i,\\; -1,\\; -i\\}',
            },
          ],
          answerLatex: 'z \\in \\{1,\\; i,\\; -1,\\; -i\\}',
        },
        {
          id: 'ch1-ex12',
          number: '۱۲',
          question: 'اگر $z_1$ و $z_2$ ریشه‌های غیرحقیقی $z^3 = 1$ باشند، حاصل $(z_1+1)^n + (z_2+1)^n$ را بیابید.',
          hint: 'ریشه‌های غیرحقیقی $-\\frac{1}{2} \\pm \\frac{\\sqrt{3}}{2}i$ هستند؛ با افزودن ۱ به فرم $e^{\\pm i\\pi/3}$ در می‌آیند.',
          steps: [
            {
              label: 'یافتن z1+1 و z2+1',
              text: 'ریشه‌های غیرحقیقی $z^3=1$ برابر $-\\frac{1}{2}\\pm\\frac{\\sqrt{3}}{2}i$ هستند:',
              latex: 'z_1 + 1 = \\frac{1}{2} + \\frac{\\sqrt{3}}{2}i = e^{i\\frac{\\pi}{3}}, \\qquad z_2 + 1 = \\frac{1}{2} - \\frac{\\sqrt{3}}{2}i = e^{-i\\frac{\\pi}{3}}',
            },
            {
              label: 'توان nام و جمع',
              text: 'استفاده از دموآور:',
              latex: 'e^{i\\frac{n\\pi}{3}} + e^{-i\\frac{n\\pi}{3}} = 2\\cos\\left(\\frac{n\\pi}{3}\\right)',
            },
          ],
          answerLatex: '2\\cos\\left(\\frac{n\\pi}{3}\\right)',
        },
        {
          id: 'ch1-ex13',
          number: '۱۳',
          question: 'ریشه‌های سوم عدد $-i$ را بیابید.',
          hint: '$-i = e^{i3\\pi/2}$ است.',
          steps: [
            {
              label: 'فرم قطبی و فرمول ریشه سوم',
              text: 'با $r=1$ و $\\theta = \\frac{3\\pi}{2}$ برای $k=0,1,2$:',
              latex: 'z_k = \\cos\\left(\\frac{2k\\pi + 3\\pi/2}{3}\\right) + i\\sin\\left(\\frac{2k\\pi + 3\\pi/2}{3}\\right)',
            },
            {
              label: 'مقداردهی k=0,1,2',
              text: 'زوایا $\\frac{\\pi}{2}$، $\\frac{7\\pi}{6}$ و $\\frac{11\\pi}{6}$:',
              latex: 'z_0 = i, \\quad z_1 = -\\frac{\\sqrt{3}}{2}-\\frac{1}{2}i, \\quad z_2 = \\frac{\\sqrt{3}}{2}-\\frac{1}{2}i',
            },
          ],
          answerLatex: 'i, \\quad -\\frac{\\sqrt{3}}{2}-\\frac{1}{2}i, \\quad \\frac{\\sqrt{3}}{2}-\\frac{1}{2}i',
        },
        {
          id: 'ch1-ex14',
          number: '۱۴',
          question: 'ریشه‌های دوم، سوم و چهارم عدد $-1$ را بیابید.',
          hint: '$-1 = e^{i\\pi}$ است؛ برای هر فرجه $n$ زاویه اول $\\frac{\\pi}{n}$ و گام چرخش $\\frac{2\\pi}{n}$ خواهد بود.',
          steps: [
            {
              label: 'ریشه‌های دوم (n=2)',
              text: 'زوایای $\\frac{\\pi}{2}$ و $\\frac{3\\pi}{2}$:',
              latex: 'z_0 = i, \\qquad z_1 = -i',
            },
            {
              label: 'ریشه‌های سوم (n=3)',
              text: 'زوایای $\\frac{\\pi}{3}$، $\\pi$ و $\\frac{5\\pi}{3}$:',
              latex: 'z_0 = \\frac{1}{2}+\\frac{\\sqrt{3}}{2}i, \\qquad z_1 = -1, \\qquad z_2 = \\frac{1}{2}-\\frac{\\sqrt{3}}{2}i',
            },
            {
              label: 'ریشه‌های چهارم (n=4)',
              text: 'زوایای $\\frac{\\pi}{4}, \\frac{3\\pi}{4}, \\frac{5\\pi}{4}, \\frac{7\\pi}{4}$:',
              latex: 'z = \\pm\\frac{\\sqrt{2}}{2} \\pm \\frac{\\sqrt{2}}{2}i',
            },
          ],
          answerLatex: 'n=2:\\{\\pm i\\},\\; n=3:\\{-1,\\tfrac{1\\pm\\sqrt{3}i}{2}\\},\\; n=4:\\{\\tfrac{\\pm\\sqrt{2}\\pm\\sqrt{2}i}{2}\\}',
        },
      ],
      exercises: [
        {
          id: 'ch1-pr17',
          number: '۱۷',
          difficulty: 'پایه',
          question: 'ریشه‌های سوم و چهارم عدد $i$ را بیابید.',
          hint: '$i = e^{i\\pi/2}$ است.',
          steps: [
            {
              label: 'ریشه‌های سوم',
              text: 'زوایای $\\frac{\\pi}{6}, \\frac{5\\pi}{6}, \\frac{3\\pi}{2}$:',
              latex: 'z_0 = \\frac{\\sqrt{3}}{2}+\\frac{1}{2}i, \\quad z_1 = -\\frac{\\sqrt{3}}{2}+\\frac{1}{2}i, \\quad z_2 = -i',
            },
            {
              label: 'ریشه‌های چهارم',
              text: 'زوایای $\\frac{\\pi}{8} + k\\frac{\\pi}{2}$ برای $k=0,1,2,3$:',
              latex: 'w_k = e^{i\\left(\\frac{\\pi}{8}+\\frac{k\\pi}{2}\\right)}, \\quad k=0,1,2,3',
            },
          ],
          answerLatex: 'n=3:\\{\\pm\\tfrac{\\sqrt{3}}{2}+\\tfrac{1}{2}i, -i\\},\\; n=4:\\{e^{i(\\frac{\\pi}{8}+\\frac{k\\pi}{2})}\\}',
        },
        {
          id: 'ch1-pr18',
          number: '۱۸',
          difficulty: 'پایه',
          question: 'ریشه‌های چهارم عدد مختلط $-8 + 8\\sqrt{3}i$ را بیابید.',
          hint: 'اندازه $r=16$ و زاویه در ربع دوم $\\theta = \\frac{2\\pi}{3}$ است.',
          steps: [
            {
              label: 'فرم قطبی',
              text: '$r = \\sqrt{64+192} = 16$ و $\\theta = \\frac{2\\pi}{3}$:',
              latex: 'z_k = 16^{1/4} e^{i\\frac{2k\\pi + 2\\pi/3}{4}} = 2e^{i\\left(\\frac{\\pi}{6}+\\frac{k\\pi}{2}\\right)}',
            },
            {
              label: 'چهار ریشه نهایی',
              text: 'برای $k=0,1,2,3$:',
              latex: 'z_0 = \\sqrt{3}+i, \\; z_1 = -1+\\sqrt{3}i, \\; z_2 = -\\sqrt{3}-i, \\; z_3 = 1-\\sqrt{3}i',
            },
          ],
          answerLatex: '\\pm(\\sqrt{3}+i), \\quad \\pm(-1+\\sqrt{3}i)',
        },
        {
          id: 'ch1-pr20',
          number: '۲۰',
          difficulty: 'امتحانی',
          question: 'فرض کنید $z_1, z_2, z_3, z_4$ ریشه‌های چهارم $4e^{i\\frac{4\\pi}{3}}$ باشند به‌طوری‌که هر $z_i$ در ربع $i$ام قرار دارد. مقدار $\\frac{z_3+z_4}{z_1+z_2}$ را بیابید.',
          hint: 'ریشه‌های چهارم روی دو قطر عمود بر هم قرار دارند؛ پس $z_3 = -z_1$ و $z_4 = -z_2$!',
          steps: [
            {
              label: 'استفاده از تقارن ریشه‌های چهارم',
              text: 'زوایا $\\frac{\\pi}{3}$ (ربع ۱)، $\\frac{5\\pi}{6}$ (ربع ۲)، $\\frac{4\\pi}{3}$ (ربع ۳) و $\\frac{11\\pi}{6}$ (ربع ۴) هستند. واضح است $z_3 = -z_1$ و $z_4 = -z_2$:',
              latex: '\\frac{z_3+z_4}{z_1+z_2} = \\frac{-z_1 - z_2}{z_1+z_2} = -1',
            },
          ],
          answerLatex: '-1',
        },
      ],
    },
    {
      id: 'ch1-s6',
      title: 'حل معادلات چندجمله‌ای و کسری مختلط',
      tag: 'معادلات مختلط',
      intuition:
        'برای حل معادلات درجه‌بالا در اعداد مختلط، معمولاً یا با دسته‌بندی و فاکتورگیری معادله را به عوامل ساده‌تر می‌شکنیم، یا از مجموع تصاعد هندسی $1+z+\\dots+z^{n-1}=\\frac{z^n-1}{z-1}$ و تغییر متغیر $w = \\frac{1+z}{1-z}$ استفاده می‌کنیم.',
      examples: [
        {
          id: 'ch1-ex15',
          number: '۱۵',
          question: 'معادله $1 + iz + z^2 - iz^3 + z^4 + iz^5 = 0$ را حل کنید.',
          hint: 'جملات زوج و فرد را جداگانه دسته‌بندی کنید تا از $(1 - z^2 + z^4)$ فاکتور بگیرید.',
          steps: [
            {
              label: 'فاکتورگیری',
              text: 'اصلاح علامت‌ها مطابق جزوه (دسته‌بندی $(1-z^2+z^4)(1+iz)=0$):',
              latex: '(1 - z^2 + z^4)(1 + iz) = 0 \\Rightarrow \\begin{cases} 1+iz = 0 \\Rightarrow z = i \\\\ z^4 - z^2 + 1 = 0 \\end{cases}',
            },
            {
              label: 'حل معادله درجه ۴ با تغییر متغیر',
              text: 'قرار دادن $x = z^2 \\Rightarrow x = \\frac{1 \\pm \\sqrt{3}i}{2} = e^{\\pm i\\pi/3}$:',
              latex: 'z = \\pm e^{i\\pi/6} = \\pm\\left(\\frac{\\sqrt{3}}{2}+\\frac{1}{2}i\\right), \\qquad z = \\pm e^{-i\\pi/6} = \\pm\\left(\\frac{\\sqrt{3}}{2}-\\frac{1}{2}i\\right)',
            },
          ],
          answerLatex: 'z = i, \\quad z = \\pm\\frac{\\sqrt{3}}{2} \\pm \\frac{1}{2}i',
        },
        {
          id: 'ch1-ex16',
          number: '۱۶',
          examTag: 'خواجه نصیر',
          question: 'نشان دهید جواب معادله $(1+z)^5 = (1-z)^5$ برابر است با $z_k = i\\tan\\left(\\frac{k\\pi}{5}\\right)$.',
          hint: 'طرفین را بر $(1-z)^5$ تقسیم کنید و $w = \\frac{1+z}{1-z}$ بگذارید.',
          steps: [
            {
              label: 'تغییر متغیر و ریشه پنجم واحد',
              text: 'با $w = \\frac{1+z}{1-z}$ داریم $w^5 = 1 \\Rightarrow w_k = e^{i\\frac{2k\\pi}{5}}$ ($k=0,1,2,3,4$):',
              latex: 'z = \\frac{w-1}{w+1} = \\frac{e^{i\\frac{2k\\pi}{5}} - 1}{e^{i\\frac{2k\\pi}{5}} + 1}',
            },
            {
              label: 'فاکتورگیری از نصف زاویه',
              text: 'فاکتور گرفتن $e^{i\\frac{k\\pi}{5}}$ از صورت و مخرج:',
              latex: 'z_k = \\frac{e^{i\\frac{k\\pi}{5}} - e^{-i\\frac{k\\pi}{5}}}{e^{i\\frac{k\\pi}{5}} + e^{-i\\frac{k\\pi}{5}}} = \\frac{2i\\sin(k\\pi/5)}{2\\cos(k\\pi/5)} = i\\tan\\left(\\frac{k\\pi}{5}\\right)',
            },
          ],
          answerLatex: 'z_k = i\\tan\\left(\\frac{k\\pi}{5}\\right), \\quad k = 0,1,2,3,4',
        },
      ],
      exercises: [
        {
          id: 'ch1-pr19',
          number: '۱۹',
          difficulty: 'امتحانی',
          question: 'معادله $z^5 + z^4 + z^3 + z^2 + z = 0$ را حل کنید.',
          hint: 'ابتدا از $z$ فاکتور بگیرید و سپس طرفین را در $(z-1)$ ضرب کنید تا $z^5 - 1 = 0$ شود.',
          steps: [
            {
              label: 'فاکتورگیری از z',
              text: 'یک ریشه $z=0$ است و برای بقیه داریم $z^4+z^3+z^2+z+1=0$ (با $z\\ne 1$).',
              latex: '(z-1)(z^4+z^3+z^2+z+1) = z^5 - 1 = 0',
            },
            {
              label: 'حذف ریشه اضافی z=1',
              text: 'ریشه‌های پنجم واحد برای $k=1,2,3,4$:',
              latex: 'z = 0, \\qquad z_k = e^{i\\frac{2k\\pi}{5}} \\; (k=1,2,3,4)',
            },
          ],
          answerLatex: 'z = 0, \\quad z_k = e^{i\\frac{2k\\pi}{5}} \\; (k=1,2,3,4)',
        },
        {
          id: 'ch1-pr21',
          number: '۲۱',
          difficulty: 'چالشی',
          question: 'اگر $z = e^{i\\theta}$ (روی دایره واحد، با $r=1$) باشد، ثابت کنید $\\operatorname{Re}\\left(\\sqrt{\\frac{1+z}{1-z}}\\right) = \\pm\\sqrt{\\frac{1}{2}\\cot\\frac{\\theta}{2}}$.',
          hint: 'عبارت $\\frac{1+e^{i\\theta}}{1-e^{i\\theta}}$ را با فاکتورگیری $e^{i\\theta/2}$ ساده کنید تا به $i\\cot\\frac{\\theta}{2}$ برسید.',
          steps: [
            {
              label: 'ساده‌سازی زیر رادیکال',
              text: 'فاکتورگیری از $e^{i\\theta/2}$:',
              latex: '\\frac{1+e^{i\\theta}}{1-e^{i\\theta}} = \\frac{e^{-i\\theta/2}+e^{i\\theta/2}}{e^{-i\\theta/2}-e^{i\\theta/2}} = \\frac{2\\cos(\\theta/2)}{-2i\\sin(\\theta/2)} = i\\cot\\frac{\\theta}{2}',
            },
            {
              label: 'ریشه دوم گرفتن',
              text: 'چون $\\sqrt{i} = \\pm\\frac{1+i}{\\sqrt{2}}$ (برای $\\cot(\\theta/2) > 0$) داریم:',
              latex: '\\sqrt{i\\cot\\frac{\\theta}{2}} = \\pm\\frac{1+i}{\\sqrt{2}}\\sqrt{\\cot\\frac{\\theta}{2}} \\Rightarrow \\operatorname{Re} = \\pm\\sqrt{\\frac{1}{2}\\cot\\frac{\\theta}{2}}',
            },
          ],
          answerLatex: '\\operatorname{Re}\\left(\\sqrt{\\frac{1+z}{1-z}}\\right) = \\pm\\sqrt{\\frac{1}{2}\\cot\\frac{\\theta}{2}}',
        },
      ],
    },
  ],
};
