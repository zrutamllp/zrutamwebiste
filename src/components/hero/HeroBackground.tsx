export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-teal/10 blur-3xl" />
      <div className="absolute -bottom-48 -left-48 w-[560px] h-[560px] rounded-full bg-teal/5 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-navy-50/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(14,165,233,0.12),transparent)]" />
    </div>
  );
}
