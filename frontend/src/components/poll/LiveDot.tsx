export function LiveDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block w-1.5 h-1.5 rounded-full bg-green-bar animate-blink shrink-0 ${className}`}
    />
  );
}
