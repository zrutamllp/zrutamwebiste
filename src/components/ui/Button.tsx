import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "outline" | "text";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper px-7 py-3.5 hover:bg-navy-700 hover:shadow-lift hover:-translate-y-0.5",
  outline:
    "border border-navy-200 text-ink px-7 py-3.5 hover:border-ink hover:-translate-y-0.5",
  text: "text-teal-600 hover:text-teal-700 px-1 py-1 group",
};

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {variant === "text" && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      )}
    </Link>
  );
}
