// lucide-react (the version pinned in this project) has no Facebook glyph,
// so this is a small inline SVG sized/coloured to match the lucide icons
// used alongside it (currentColor fill, same size prop convention).
export function FacebookIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 12.06C22 6.48 17.52 2 11.94 2 6.36 2 1.88 6.48 1.88 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.42V9.41c0-2.4 1.43-3.72 3.61-3.72 1.05 0 2.15.19 2.15.19v2.36h-1.21c-1.19 0-1.56.74-1.56 1.5v1.8h2.66l-.43 2.91h-2.23V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}
