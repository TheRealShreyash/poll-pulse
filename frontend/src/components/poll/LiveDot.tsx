// src/components/poll/LiveDot.tsx
export function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block w-[6px] h-[6px] rounded-full bg-green-bar animate-blink flex-shrink-0 ${className}`}
    />
  );
}