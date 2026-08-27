interface KreationWavyDividerProps {
  darkBackground?: boolean;
}

export default function KreationWavyDivider({ darkBackground = false }: KreationWavyDividerProps) {
  const path = 'M0,12 Q50,6 100,12 T200,12 T300,12 T400,12 T500,12 T600,12 T700,12 T800,12 T900,12 T1000,12 T1100,12 T1200,12 T1300,12 T1400,12 T1500,12 T1600,12 T1700,12 T1800,12 T1900,12 T2000,12';
  const lowerPath = 'M0,12 Q50,18 100,12 T200,12 T300,12 T400,12 T500,12 T600,12 T700,12 T800,12 T900,12 T1000,12 T1100,12 T1200,12 T1300,12 T1400,12 T1500,12 T1600,12 T1700,12 T1800,12 T1900,12 T2000,12';
  const bg = darkBackground ? 'bg-foreground-950' : 'bg-white';
  return (
    <div className={`relative w-full h-6 overflow-hidden ${bg}`} aria-hidden="true">
      <svg className="absolute top-0 w-[200%] h-full" viewBox="0 0 2000 24" preserveAspectRatio="none"><path d={path} fill="none" stroke="oklch(0.81 0.19 115)" strokeWidth="1.8" strokeLinecap="round" /></svg>
      <svg className="absolute top-1 w-[200%] h-full" viewBox="0 0 2000 24" preserveAspectRatio="none"><path d={lowerPath} fill="none" stroke="oklch(0.72 0.18 115)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" /></svg>
      <svg className="absolute top-2 w-[200%] h-full" viewBox="0 0 2000 24" preserveAspectRatio="none"><path d={path} fill="none" stroke="oklch(0.81 0.19 115)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" /></svg>
    </div>
  );
}
