import {
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  forwardRef,
} from 'react'

const baseClass =
  'w-full bg-[var(--bg-3)] border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-3)] font-mono text-sm rounded-md px-3 transition-all duration-150 glow-focus hover:border-[var(--border-2)] focus:border-[var(--green)]'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-xs text-[var(--text-2)] tracking-wide">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={[
            baseClass,
            'h-9',
            error ? 'border-[var(--red)]' : '',
            className,
          ].join(' ')}
          {...props}
        />
        {error && <p className="text-xs text-[var(--red)]">{error}</p>}
        {hint && !error && (
          <p className="text-xs text-[var(--text-3)]">{hint}</p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-xs text-[var(--text-2)] tracking-wide">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={[
            baseClass,
            'py-2.5 resize-none',
            error ? 'border-[var(--red)]' : '',
            className,
          ].join(' ')}
          {...props}
        />
        {error && <p className="text-xs text-[var(--red)]">{error}</p>}
        {hint && !error && (
          <p className="text-xs text-[var(--text-3)]">{hint}</p>
        )}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'
