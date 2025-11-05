export default function HeroWave({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative h-44 w-full rounded-2xl bg-brand/90 overflow-hidden">
      {/* simple decorative waves */}
      <div className="absolute inset-0 opacity-40 [background:radial-gradient(1200px_200px_at_-10%_-50%,white,transparent),radial-gradient(1200px_200px_at_110%_150%,white,transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.2)_20%,transparent_20%),linear-gradient(60deg,rgba(255,255,255,.2)_20%,transparent_20%)] bg-[length:20px_20px]" />
      <div className="relative z-10 h-full w-full flex items-center justify-center text-white font-semibold">{children}</div>
    </div>
  );
}
