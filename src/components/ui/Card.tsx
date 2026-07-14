export function cardClasses(hover = true, extra = "") {
  return `bg-white border border-navy-100 rounded-2xl shadow-card ${
    hover ? "transition-all duration-300 hover:shadow-lift hover:-translate-y-1" : ""
  } ${extra}`;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return <div className={cardClasses(hover, className)}>{children}</div>;
}
