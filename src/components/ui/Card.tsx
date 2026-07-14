export default function Card({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`bg-white border border-navy-100 rounded-2xl shadow-card ${
        hover ? "transition-all duration-300 hover:shadow-lift hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
