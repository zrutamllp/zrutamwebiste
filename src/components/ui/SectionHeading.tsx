export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignCls} mb-12 md:mb-16`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight text-ink text-balance">
        {title}
      </h2>
      {lede && (
        <p className="mt-5 text-lg leading-relaxed text-navy-600 max-w-[65ch]">
          {lede}
        </p>
      )}
    </div>
  );
}
