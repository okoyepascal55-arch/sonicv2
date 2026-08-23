export default function LimeWaveDivider() {
  return (
    <div className="w-full h-8 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M0 16 Q 100 0 200 16 T 400 16 T 600 16 T 800 16 T 1000 16 T 1200 16"
          fill="none"
          stroke="oklch(var(--primary-500))"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}