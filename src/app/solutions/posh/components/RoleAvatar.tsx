import { Mic } from "lucide-react";

export type AvatarKind = "priya" | "dev" | "maya" | "arjun" | "sana";

type Look = {
  skin: string;
  shade: string;
  hair: string;
  /* tile background, top → bottom */
  from: string;
  to: string;
};

const LOOKS: Record<AvatarKind, Look> = {
  priya: { skin: "#C68642", shade: "#A86B32", hair: "#1F1A17", from: "#BAE6FD", to: "#0EA5E9" },
  dev: { skin: "#E8B98A", shade: "#C99467", hair: "#2B2118", from: "#FEF3C7", to: "#F59E0B" },
  maya: { skin: "#8D5524", shade: "#6E3F18", hair: "#1A1412", from: "#7DD3FC", to: "#0369A1" },
  arjun: { skin: "#B07444", shade: "#8E5A31", hair: "#151515", from: "#8AA0B5", to: "#16324B" },
  sana: { skin: "#F1C9A5", shade: "#D7A57F", hair: "#3B2416", from: "#E4EBF1", to: "#8AA0B5" },
};

const EYE = "#1B1B2B";
const LIP = "#7A2C2C";

/* shoulders + neck + ears + head + face; outfit and hair are layered around it */
function Person({ look, outfit, beard = false }: { look: Look; outfit: string; beard?: boolean }) {
  return (
    <>
      <path d="M26 160 C28 128 60 113 100 113 C140 113 172 128 174 160 Z" fill={outfit} />
      <path d="M87 94 L87 117 Q100 126 113 117 L113 94 Z" fill={look.shade} />
      <ellipse cx="71" cy="75" rx="5.5" ry="8.5" fill={look.shade} />
      <ellipse cx="129" cy="75" rx="5.5" ry="8.5" fill={look.shade} />
      <ellipse cx="100" cy="70" rx="29" ry="33" fill={look.skin} />
      {/* brows */}
      <path d="M83 63 Q89 59 95 62" fill="none" stroke={look.hair} strokeWidth="3" strokeLinecap="round" />
      <path d="M105 62 Q111 59 117 63" fill="none" stroke={look.hair} strokeWidth="3" strokeLinecap="round" />
      {/* eyes with catchlights */}
      <ellipse cx="89" cy="73" rx="3.2" ry="3.8" fill={EYE} />
      <ellipse cx="111" cy="73" rx="3.2" ry="3.8" fill={EYE} />
      <circle cx="90.2" cy="71.6" r="1.1" fill="#FFFFFF" />
      <circle cx="112.2" cy="71.6" r="1.1" fill="#FFFFFF" />
      {/* nose + blush */}
      <path d="M100 76 Q96.5 84 101 85.5" fill="none" stroke={look.shade} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="83" cy="86" r="5" fill="#F87171" opacity=".18" />
      <circle cx="117" cy="86" r="5" fill="#F87171" opacity=".18" />
      {!beard && <path d="M91 91 Q100 100 109 91 Q100 95 91 91 Z" fill={LIP} />}
    </>
  );
}

function Figure({ kind }: { kind: AvatarKind }) {
  const look = LOOKS[kind];
  switch (kind) {
    case "priya": // long hair with a side fringe, navy blazer, gold captain's pin
      return (
        <>
          <path
            d="M68 74 C62 36 80 26 100 26 C122 26 140 38 132 74 L138 140 Q120 147 116 128 L116 92 L84 92 L84 128 Q80 147 62 140 Z"
            fill={look.hair}
          />
          <Person look={look} outfit="#0B2239" />
          <path d="M84 115 L100 142 L116 115 Q100 121 84 115 Z" fill="#FAF9F6" />
          <path d="M84 115 L100 145 L90 160 M116 115 L100 145 L110 160" fill="none" stroke="#16324B" strokeWidth="2.5" />
          <circle cx="132" cy="138" r="4" fill="#FBBF24" />
          <path d="M71 66 C70 42 84 33 102 33 C120 33 132 45 129 66 C123 53 110 47 98 50 C88 53 79 59 71 66 Z" fill={look.hair} />
          <circle cx="71" cy="85" r="2.6" fill="#FBBF24" />
          <circle cx="129" cy="85" r="2.6" fill="#FBBF24" />
        </>
      );
    case "dev": // side-parted hair, round glasses, navy suit, teal tie
      return (
        <>
          <Person look={look} outfit="#16324B" />
          <path d="M86 116 L100 140 L114 116 Q100 121 86 116 Z" fill="#FFFFFF" />
          <path d="M96 119 L104 119 L102.5 125 L97.5 125 Z" fill="#0284C7" />
          <path d="M97.5 125 L94.5 133 L100 155 L105.5 133 L102.5 125 Z" fill="#0EA5E9" />
          <path d="M71 64 C67 38 84 29 103 30 C121 31 134 42 129 64 C126 52 118 46 108 46 C96 45 83 50 73 62 Z" fill={look.hair} />
          <path d="M84 40 Q96 32 112 36" fill="none" stroke="#4A3A2C" strokeWidth="2" strokeLinecap="round" />
          <rect x="79.5" y="65" width="19" height="15" rx="6.5" fill="#FFFFFF" fillOpacity=".18" stroke="#0B2239" strokeWidth="2.8" />
          <rect x="101.5" y="65" width="19" height="15" rx="6.5" fill="#FFFFFF" fillOpacity=".18" stroke="#0B2239" strokeWidth="2.8" />
          <path d="M98.5 71 L101.5 71" stroke="#0B2239" strokeWidth="2.8" />
        </>
      );
    case "maya": { // big curly hair, amber hoodie, gold hoops
      const curls = Array.from({ length: 14 }, (_, n) => {
        const t = (n / 14) * Math.PI * 2;
        return [100 + Math.cos(t) * 38, 64 + Math.sin(t) * 34, n % 2 ? 13 : 15];
      });
      return (
        <>
          <circle cx="100" cy="62" r="38" fill={look.hair} />
          {curls.map(([cx, cy, r]) => (
            <circle key={`${cx.toFixed(1)}-${cy.toFixed(1)}`} cx={cx} cy={cy} r={r} fill={look.hair} />
          ))}
          <Person look={look} outfit="#F59E0B" />
          <path d="M70 121 Q100 103 130 121 L123 130 Q100 116 77 130 Z" fill="#D97706" />
          <path d="M92 124 L92 146 M108 124 L108 146" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="92" cy="148" r="2.4" fill="#FFFFFF" />
          <circle cx="108" cy="148" r="2.4" fill="#FFFFFF" />
          {[[82, 41, 9], [94, 36, 9.5], [107, 36, 9.5], [119, 42, 9]].map(([cx, cy, r]) => (
            <circle key={`f${cx}`} cx={cx} cy={cy} r={r} fill={look.hair} />
          ))}
          <circle cx="71" cy="87" r="4" fill="none" stroke="#FBBF24" strokeWidth="2" />
          <circle cx="129" cy="87" r="4" fill="none" stroke="#FBBF24" strokeWidth="2" />
        </>
      );
    }
    case "arjun": // quiff, full beard and moustache, teal shirt with white collar
      return (
        <>
          <Person look={look} outfit="#0EA5E9" beard />
          <path d="M84 115 L94 132 L100 120 L106 132 L116 115 Q100 121 84 115 Z" fill="#FFFFFF" />
          <circle cx="100" cy="140" r="1.8" fill="#FFFFFF" />
          <circle cx="100" cy="150" r="1.8" fill="#FFFFFF" />
          <path d="M71 76 C72 102 86 110 100 110 C114 110 128 102 129 76 C124 90 115 99 100 99 C85 99 76 90 71 76 Z" fill={look.hair} />
          <path d="M89 89.5 Q100 83.5 111 89.5 Q100 92.5 89 89.5 Z" fill={look.hair} />
          <path d="M94.5 94.5 Q100 97.5 105.5 94.5" fill="none" stroke={LIP} strokeWidth="2.6" strokeLinecap="round" />
          <path d="M71 62 C66 34 86 26 104 28 C122 29 134 40 129 62 C126 50 118 44 108 44 C96 44 82 48 72 62 Z" fill={look.hair} />
          <path d="M88 32 Q104 15 121 31 Q106 25 92 36 Z" fill={look.hair} />
        </>
      );
    case "sana": // top bun with a band, drop earrings, teal turtleneck
      return (
        <>
          <circle cx="100" cy="27" r="13" fill={look.hair} />
          <Person look={look} outfit="#0EA5E9" />
          <path d="M86 104 L86 121 Q100 128 114 121 L114 104 Q100 111 86 104 Z" fill="#0284C7" />
          <path d="M71 66 C70 44 84 36 100 36 C116 36 130 44 129 66 C123 54 112 48 100 48 C88 48 77 54 71 66 Z" fill={look.hair} />
          <rect x="90" y="36" width="20" height="5" rx="2.5" fill="#F59E0B" />
          <ellipse cx="71" cy="88" rx="2.4" ry="4" fill="#F59E0B" />
          <ellipse cx="129" cy="88" rx="2.4" ry="4" fill="#F59E0B" />
        </>
      );
  }
}

/* video-call style tile: illustrated person on a role-coloured gradient, name + mic chip */
export default function RoleAvatar({
  kind,
  name,
  ring,
}: {
  kind: AvatarKind;
  name: string;
  ring: string;
}) {
  const { from, to } = LOOKS[kind];
  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 ${ring}`}
      style={{ background: `linear-gradient(160deg, ${from}, ${to})` }}
    >
      <svg
        viewBox="0 0 200 160"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMax meet"
        role="img"
        aria-label={`Illustration of ${name}`}
      >
        <circle cx="100" cy="78" r="66" fill="#FFFFFF" opacity=".22" />
        <circle cx="28" cy="26" r="3" fill="#FFFFFF" opacity=".5" />
        <circle cx="172" cy="40" r="4" fill="#FFFFFF" opacity=".35" />
        <circle cx="160" cy="18" r="2" fill="#FFFFFF" opacity=".5" />
        <Figure kind={kind} />
      </svg>
      <span className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 rounded-md bg-navy-900/65 px-1.5 py-0.5 text-[11px] font-medium text-paper backdrop-blur-sm">
        <Mic className="h-3 w-3" /> {name}
      </span>
    </div>
  );
}
