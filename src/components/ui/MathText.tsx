import katex from 'katex';
import { useMemo } from 'react';

export function MathFormula({
  latex,
  display = true,
  className = '',
}: {
  latex: string;
  display?: boolean;
  className?: string;
}) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode: display,
        throwOnError: false,
        strict: false,
        trust: true,
      });
    } catch {
      return latex;
    }
  }, [latex, display]);

  return (
    <span
      className={display ? `block ${className}` : `inline ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function RichMathText({ text, className = '' }: { text: string; className?: string }) {
  const segments = useMemo(() => {
    return text.split(/(\*\*[^*]+\*\*|\$[^$]+\$|\n)/g).filter(Boolean);
  }, [text]);

  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (seg === '\n') return <br key={i} />;
        if (seg.startsWith('**') && seg.endsWith('**')) {
          return (
            <strong key={i} className="font-bold" style={{ color: 'var(--text-primary)' }}>
              <RichMathText text={seg.slice(2, -2)} />
            </strong>
          );
        }
        if (seg.startsWith('$') && seg.endsWith('$')) {
          return <MathFormula key={i} latex={seg.slice(1, -1)} display={false} />;
        }
        return <span key={i}>{seg}</span>;
      })}
    </span>
  );
}
