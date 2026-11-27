import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw, Check, X } from 'lucide-react';

interface ConfirmResetButtonProps {
  label: string;
  confirmLabel?: string;
  onConfirm: () => void;
  disabled?: boolean;
  compact?: boolean;
}

export function ConfirmResetButton({
  label,
  confirmLabel = 'تأیید ریست؟',
  onConfirm,
  disabled = false,
  compact = false,
}: ConfirmResetButtonProps) {
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const t = window.setTimeout(() => setConfirming(false), 5000);
    return () => window.clearTimeout(t);
  }, [confirming]);

  if (disabled) return null;

  return (
    <div className="no-print inline-flex items-center">
      <AnimatePresence mode="wait" initial={false}>
        {!confirming ? (
          <motion.button
            key="idle"
            type="button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onClick={() => setConfirming(true)}
            className={`inline-flex items-center gap-1.5 rounded-xl font-medium transition-colors cursor-pointer ${
              compact ? 'px-2.5 py-1.5 text-[11px]' : 'px-3 py-1.5 text-xs'
            }`}
            style={{
              backgroundColor: 'var(--bg-subtle)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{label}</span>
          </motion.button>
        ) : (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1 rounded-xl p-1"
            style={{
              backgroundColor: 'var(--danger-bg)',
              border: '1px solid var(--danger-border)',
            }}
          >
            <button
              type="button"
              onClick={() => {
                onConfirm();
                setConfirming(false);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer"
              style={{ backgroundColor: 'var(--danger-solid)', color: 'var(--on-brand)' }}
            >
              <Check className="w-3 h-3" />
              {confirmLabel}
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              aria-label="انصراف از ریست"
              className="p-1 rounded-lg cursor-pointer"
              style={{ color: 'var(--danger-text)' }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
