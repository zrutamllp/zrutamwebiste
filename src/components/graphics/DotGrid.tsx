type DotGridProps = {
  className?: string;
  rows?: number;
  cols?: number;
};

export default function DotGrid({ className = "", rows = 8, cols = 12 }: DotGridProps) {
  const spacing = 24;
  const width = cols * spacing;
  const height = rows * spacing;
  const dots: { cx: number; cy: number }[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ cx: c * spacing + spacing / 2, cy: r * spacing + spacing / 2 });
    }
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {dots.map((d) => (
        <circle key={`${d.cx}-${d.cy}`} cx={d.cx} cy={d.cy} r="1.5" fill="#0B2239" fillOpacity="0.1" />
      ))}
    </svg>
  );
}
