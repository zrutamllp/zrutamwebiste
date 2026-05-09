export type ProgressMetric = {
  label: string;
  value: number;
  barClass: string;
};

export type DashboardStat = {
  value: string;
  label: string;
};

export const heroProgressMetrics: ProgressMetric[] = [
  { label: "Leadership Development", value: 87, barClass: "bg-teal-400" },
  { label: "Technical Upskilling", value: 94, barClass: "bg-amber" },
  { label: "Behavioral Reskilling", value: 79, barClass: "bg-teal-300" },
];

export const heroDashboardStats: DashboardStat[] = [
  { value: "500+", label: "Companies" },
  { value: "98%", label: "Satisfaction" },
];
