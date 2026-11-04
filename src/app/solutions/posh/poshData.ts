/* POSH Pulse Check: 6 law scenarios (knowledge) + 4 honesty checks (action).
   Question and profile wording lives in poshContent.json. */
import content from "./poshContent.json";

export type KnowledgeQuestion = {
  label: string;
  q: string;
  opts: string[];
  correct: number;
  law: string;
};

export type ActionQuestion = {
  q: string;
  opts: string[]; // scored 0 / 1 / 2 in order
};

export type ProfileKey = "spectator" | "guesser" | "expert" | "champion";

export type Profile = {
  name: string;
  short: string;
  /* tailwind classes kept literal so the JIT picks them up */
  text: string;
  bg: string;
  border: string;
  tag: string;
  body: string;
  steps: string[];
};

export const KNOWLEDGE: KnowledgeQuestion[] = content.knowledge;

export const ACTION: ActionQuestion[] = content.action;

const STYLES: Record<ProfileKey, Pick<Profile, "text" | "bg" | "border">> = {
  spectator: { text: "text-navy-500", bg: "bg-navy-500", border: "border-navy-500" },
  guesser: { text: "text-amber-600", bg: "bg-amber-600", border: "border-amber-600" },
  expert: { text: "text-teal-600", bg: "bg-teal-600", border: "border-teal-600" },
  champion: { text: "text-ink", bg: "bg-ink", border: "border-ink" },
};

export const PROFILES = Object.fromEntries(
  (Object.keys(STYLES) as ProfileKey[]).map((k) => [k, { ...content.profiles[k], ...STYLES[k] }])
) as Record<ProfileKey, Profile>;

export type Step = { type: "K" | "A"; i: number };

export const ORDER: Step[] = [
  ...KNOWLEDGE.map((_, i) => ({ type: "K" as const, i })),
  ...ACTION.map((_, i) => ({ type: "A" as const, i })),
];

export type Answer = Step & { pick: number };

export function scoreAll(answers: Answer[]) {
  let k = 0;
  let a = 0;
  answers.forEach((ans) => {
    if (ans.type === "K") {
      if (ans.pick === KNOWLEDGE[ans.i].correct) k++;
    } else {
      a += ans.pick;
    }
  });
  const key: ProfileKey =
    k >= 4 ? (a >= 5 ? "champion" : "expert") : a >= 5 ? "guesser" : "spectator";
  return { k, a, key };
}
