import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  Compass,
  Crown,
  Database,
  Gamepad2,
  Globe,
  ScanFace,
  Share2,
  Sparkles,
  Target,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeInSection from "@/components/FadeInSection";
import CTABanner from "@/components/CTABanner";
import WordRotator from "./components/WordRotator";
import GameReel from "./components/GameReel";
import ScreenTour from "./components/ScreenTour";
import BetDemo from "./components/BetDemo";
import RoleAvatar, { type AvatarKind } from "./components/RoleAvatar";

export const metadata: Metadata = {
  title: "The Culture Table: POSH Training as a Team Game | Zrutam",
  description:
    "A 5-player online game where teams debate real workplace situations and bet coins on the right call. POSH awareness your team will actually remember.",
  openGraph: {
    title: "The Culture Table: POSH Training as a Team Game | Zrutam",
    description:
      "A 5-player online game where teams debate real workplace situations and bet coins on the right call.",
  },
};

const ROLES: {
  letter: string;
  name: string;
  text: string;
  Icon: LucideIcon;
  tile: string;
  ring: string;
  avatar: AvatarKind;
  player: string;
}[] = [
  { letter: "C", name: "The Captain", text: "Places the team's bet each round and locks in the final call.", Icon: Crown, tile: "bg-teal-500", ring: "border-teal-500", avatar: "priya", player: "Priya" },
  { letter: "K", name: "The Coin Keeper", text: "Watches the team's coins and keeps the bets disciplined.", Icon: Database, tile: "bg-amber-500", ring: "border-amber-500", avatar: "dev", player: "Dev" },
  { letter: "N", name: "The Connector", text: "Reads the room across teams and picks up bonus tasks.", Icon: Share2, tile: "bg-teal-700", ring: "border-teal-700", avatar: "maya", player: "Maya" },
  { letter: "S", name: "The Storyteller", text: "Gets secret clue cards that help the team find the right answer.", Icon: BookOpen, tile: "bg-ink", ring: "border-navy-600", avatar: "arjun", player: "Arjun" },
  { letter: "M", name: "The Mirror", text: "Holds a second set of clue cards, so the team sees the full picture.", Icon: ScanFace, tile: "bg-navy-500", ring: "border-navy-400", avatar: "sana", player: "Sana" },
];

const RIVALS = [
  {
    name: "Self-paced courses",
    kind: "Video and click-through e-learning",
    offers: "An animated course, often around 45 minutes, that each employee completes on their own, with certificates and admin reports.",
    gap: "No team or live discussion. Nobody hears how a colleague would handle the same situation.",
    fix: "Teams of five debate every scenario live, and each player has a role that gives them a reason to speak.",
  },
  {
    name: "Gamified modules",
    kind: "Points, badges and leaderboards",
    offers: "Branching scenarios with points, leaderboards and badges, hosted on your LMS or as a managed service.",
    gap: "Usually played solo, and points and badges don't show how sure someone was of an answer.",
    fix: "Teams stake coins on their answer. The size of each bet shows HR where a team was confident, and where it was confidently wrong.",
  },
  {
    name: "Trainer-led sessions",
    kind: "Classroom or virtual workshops",
    offers: "A 2 to 3 hour awareness session for 30 to 50 people, in person or virtual, using practical exercises and real scenarios.",
    gap: "In a batch of 30 to 50, few people get to speak. Travel and venue cost extra, and there's often no formal assessment.",
    fix: "Everyone plays online in a team of five, with no venue to book. A 12-question baseline quiz gives HR a report before the rounds begin.",
  },
];

const FEATURES: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: Globe, title: "Fully online", text: "Play from anywhere." },
  { Icon: Users, title: "5 players per team", text: "Small enough that everyone speaks." },
  { Icon: Compass, title: "Employee & manager tracks", text: "Separate question sets for each." },
  { Icon: Clock, title: "Your timing", text: "We set round length to fit your schedule." },
  { Icon: Target, title: "Scenario-based", text: "Real workplace situations, not theory." },
  { Icon: Gamepad2, title: "Mini-games included", text: "Four team games to earn extra coins." },
];

const pill =
  "inline-flex items-center gap-2 rounded-full border border-navy-100 bg-white px-3.5 py-1.5 text-sm font-medium text-navy-600";

export default function PoshLandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-paper grain">
        <div
          className="absolute inset-0 bg-grid-dots opacity-50 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_65%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-7 px-6 pt-32 text-center md:pt-40">
          <span className={pill}>
            <Sparkles className="h-4 w-4 text-teal-600" /> POSH awareness, reimagined
          </span>
          <h1 className="font-display max-w-4xl text-balance text-4xl leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
            <span className="sr-only">POSH training your team will actually want to play.</span>
            <span aria-hidden="true">
              POSH training your team will actually want to{" "}
              <span className="block">
                <WordRotator />
              </span>
            </span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-navy-600 md:text-xl">
            The Culture Table is a 5-player online game where teams debate real workplace
            situations and bet coins on the right call. Learn the law. Build trust. Have fun doing
            it.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/contact/">
              Book a Demo <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#how" variant="outline">
              See how it works
            </Button>
          </div>
          <p className="text-sm text-navy-500">
            Teams of 5 · Fully online · Employee &amp; manager tracks
          </p>
          <div className="mt-6 w-full max-w-5xl">
            <GameReel />
          </div>
        </div>
      </section>

      {/* Inside the game */}
      <section id="inside" className="scroll-mt-24 bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            align="center"
            eyebrow="Inside the game"
            title={
              <>
                From game code to <em className="italic text-teal-600">final standings.</em>
              </>
            }
            lede="These are real screens. Tap through what your players will see."
          />
          <FadeInSection>
            <ScreenTour />
          </FadeInSection>
        </div>
      </section>

      {/* Why it's different */}
      <section className="bg-paper-warm py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            align="center"
            eyebrow="Why it's different"
            title={
              <>
                Slides get skipped. <em className="italic text-teal-600">Games get talked about.</em>
              </>
            }
          />
          <FadeInSection className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            <div className="grid content-start gap-4 rounded-2xl border border-dashed border-navy-200 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-navy-500">
                The usual POSH training
              </p>
              <ul className="grid gap-3">
                {["Long slides.", "Click-through videos.", "Zero recall.", "Everyone's checking their phone."].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-lg text-navy-400 line-through decoration-navy-300">
                    <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-navy-100">
                      <X className="h-3 w-3 text-navy-500" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid content-start gap-4 rounded-2xl border border-navy-100 bg-white p-7 shadow-lift">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-600">
                With The Culture Table
              </p>
              <ul className="grid gap-3">
                {["Real scenarios.", "Live team debate.", "Every answer has stakes.", "People talk about it after."].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-lg text-ink">
                    <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-teal-500">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-24 bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title={
              <>
                One session. <em className="italic text-teal-600">Three stages.</em>
              </>
            }
          />
          <div className="-mt-6 mb-12 flex flex-wrap justify-center gap-2.5">
            <span className={pill}><Users className="h-4 w-4 text-teal-600" /> 5 players a team</span>
            <span className={pill}><Compass className="h-4 w-4 text-teal-600" /> Employee &amp; manager tracks</span>
            <span className={pill}><Clock className="h-4 w-4 text-teal-600" /> Timing set for you</span>
          </div>
          <FadeInSection className="grid gap-10 md:grid-cols-3">
            {[
              { n: "12", u: "questions", h: "Warm-up quiz", p: "Role-specific POSH questions. Employees and managers get different sets." },
              { n: "12", u: "rounds", h: "Real situations", p: "Read the scenario, debate the 4 options, then bet your coins." },
              { n: "1", u: "debrief", h: "Results & reflection", p: "See the right answer, how every team bet, and where the coins went. Then talk it through." },
            ].map((s) => (
              <div key={s.h} className="grid content-start gap-2 border-t border-navy-100 pt-5">
                <span className="font-display text-5xl tracking-tight text-ink">
                  {s.n}
                  <small className="ml-2 font-sans text-sm text-navy-500">{s.u}</small>
                </span>
                <h3 className="text-lg font-semibold text-ink">{s.h}</h3>
                <p className="text-navy-600">{s.p}</p>
              </div>
            ))}
          </FadeInSection>
          <p className="mt-10 text-center text-sm text-navy-500">
            A 15-minute mini-game session before the rounds lets teams earn extra coins together.
          </p>
        </div>
      </section>

      {/* Betting */}
      <section id="bet" className="scroll-mt-24 bg-paper-warm py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            align="center"
            eyebrow="The betting mechanic"
            title={
              <>
                Bet on what you believe.{" "}
                <em className="italic text-teal-600">Win coins from every wrong call.</em>
              </>
            }
            lede="Your Captain can back one answer or split coins across several. Get it right and you keep your stake, plus a share of every coin the table lost. Spread when unsure, go big when certain."
          />
          <FadeInSection className="mx-auto max-w-3xl">
            <BetDemo />
          </FadeInSection>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="scroll-mt-24 bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            align="center"
            eyebrow="The team"
            title={
              <>
                Five players. Five roles. <em className="italic text-teal-600">One team.</em>
              </>
            }
          />
          <FadeInSection className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {ROLES.map(({ letter, name, text, Icon, tile, ring, avatar, player }) => (
              <article
                key={name}
                className="relative grid content-start gap-2.5 rounded-2xl border border-navy-100 bg-white px-4 pb-8 pt-11 transition-all duration-300 hover:-translate-y-1.5 hover:-rotate-1 hover:shadow-lift"
              >
                <span className="font-display absolute left-4 top-3.5 text-lg text-ink">{letter}</span>
                <span className="font-display absolute bottom-3.5 right-4 rotate-180 text-sm text-navy-300">{letter}</span>
                <div className="relative mb-2">
                  <RoleAvatar kind={avatar} name={player} ring={ring} />
                  <span
                    className={`absolute grid h-8 w-8 -rotate-6 place-items-center rounded-lg text-white shadow-lift ${tile}`}
                    style={{ top: -8, right: -8 }}
                    aria-hidden="true"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="px-1 text-base font-semibold text-ink">{name}</h3>
                <p className="px-1 text-sm leading-relaxed text-navy-600">{text}</p>
              </article>
            ))}
          </FadeInSection>
          <p className="mt-10 text-center text-sm text-navy-500">
            Every voice matters. The roles make sure of it.
          </p>
        </div>
      </section>

      {/* Compare */}
      <section id="compare" className="scroll-mt-24 bg-paper-warm py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            align="center"
            eyebrow="How it compares"
            title={
              <>
                Three common approaches.{" "}
                <em className="italic text-teal-600">What they leave open.</em>
              </>
            }
            lede="Each of these does a job. None of them puts five colleagues at a table arguing a real case with something at stake."
          />
          <FadeInSection className="grid gap-4">
            {RIVALS.map((r) => (
              <article
                key={r.name}
                className="grid gap-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-card lg:grid-cols-[.8fr_1.1fr_1.1fr_1.1fr] lg:gap-7"
              >
                <div>
                  <h3 className="font-display text-xl text-ink">{r.name}</h3>
                  <span className="text-sm text-navy-500">{r.kind}</span>
                </div>
                {[
                  { label: "What it offers", text: r.offers, lc: "text-navy-400", tc: "text-navy-600" },
                  { label: "The gap", text: r.gap, lc: "text-amber-600", tc: "text-navy-600" },
                  { label: "How we solve it", text: r.fix, lc: "text-teal-600", tc: "font-medium text-ink" },
                ].map((c) => (
                  <div key={c.label} className="grid content-start gap-1.5">
                    <b className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${c.lc}`}>{c.label}</b>
                    <p className={`text-sm leading-relaxed ${c.tc}`}>{c.text}</p>
                  </div>
                ))}
              </article>
            ))}
          </FadeInSection>
          <p className="mt-8 text-center text-sm text-navy-500">
            Based on typical POSH training offerings in India, reviewed October 2026. Individual
            providers may differ.
          </p>
        </div>
      </section>

      {/* Built for companies */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            align="center"
            eyebrow="Built for companies"
            title={
              <>
                Easy for HR to run. <em className="italic text-teal-600">Easy for teams to join.</em>
              </>
            }
          />
          <FadeInSection className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ Icon, title, text }) => (
              <div key={title} className="grid content-start gap-2 border-t border-navy-100 pt-5">
                <Icon className="mb-1 h-6 w-6 text-teal-600" />
                <h3 className="text-lg font-semibold text-ink">{title}</h3>
                <p className="text-navy-600">{text}</p>
              </div>
            ))}
          </FadeInSection>
        </div>
      </section>

      {/* Pulse Check */}
      <section className="bg-paper pb-4">
        <div className="mx-auto max-w-6xl px-6">
          <FadeInSection className="flex flex-col items-start gap-6 rounded-3xl border border-navy-100 bg-white p-8 shadow-card md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-teal-600">
                Free · 3 minutes
              </p>
              <h2 className="font-display text-balance text-3xl leading-tight tracking-tight text-ink md:text-4xl">
                Where do <em className="italic text-teal-600">you</em> stand with POSH?
              </h2>
              <p className="mt-3 text-lg text-navy-600">
                Ten quick situations reveal which of four profiles you are — and the one blind
                spot to fix.
              </p>
            </div>
            <Link
              href="/solutions/posh/pulse-check/"
              className="inline-flex flex-none items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-medium text-paper transition-all hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-lift"
            >
              Take the Pulse Check <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeInSection>
        </div>
      </section>

      <CTABanner
        title={
          <>
            Make your next POSH session the one people{" "}
            <em className="italic text-teal-300">remember.</em>
          </>
        }
        subtitle="Book a 20-minute demo and we'll walk your team through a live round."
        primaryCTA={{ text: "Book a Demo", href: "/contact/" }}
        secondaryCTA={{ text: "Take the Pulse Check", href: "/solutions/posh/pulse-check/" }}
      />
    </>
  );
}
