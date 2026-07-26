"use client";

import Marquee from "react-fast-marquee";

const ROW_ONE = [
  { name: "React.js",     cat: "frontend" },
  { name: "Node.js",      cat: "backend"  },
  { name: "MongoDB",      cat: "database" },
  { name: "Express.js",   cat: "backend"  },
  { name: "JavaScript",   cat: "language" },
  { name: "REST APIs",    cat: "backend"  },
  { name: "JWT Auth",     cat: "security" },
  { name: "Next.js",      cat: "frontend" },
  { name: "TypeScript",   cat: "language" },
  { name: "Mongoose",     cat: "database" },
];

const ROW_TWO = [
  { name: "Vercel",       cat: "tools"    },
  { name: "Git",          cat: "tools"    },
  { name: "HTML5",        cat: "frontend" },
  { name: "CSS3",         cat: "frontend" },
  { name: "Firebase",     cat: "tools"    },
  { name: "Recharts",     cat: "frontend" },
  { name: "Multer",       cat: "tools"    },
  { name: "Tailwind CSS", cat: "frontend" },
  { name: "Postman",      cat: "tools"    },
  { name: "VS Code",      cat: "tools"    },
];

const CAT_COLORS: Record<string, string> = {
  frontend: "hsl(199 89% 52%)",
  backend:  "hsl(142 71% 45%)",
  database: "hsl(271 91% 65%)",
  language: "hsl(252 87% 63%)",
  security: "hsl(24 95% 55%)",
  tools:    "hsl(240 5% 58%)",
};

function TechChip({ item }: { item: { name: string; cat: string } }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 mx-1.5 rounded-lg glass border border-border/30 text-sm font-mono text-muted-foreground whitespace-nowrap select-none hover:border-primary/30 hover:text-foreground transition-colors">
      <div
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{
          background: CAT_COLORS[item.cat],
          boxShadow: `0 0 5px ${CAT_COLORS[item.cat]}`,
        }}
      />
      {item.name}
    </div>
  );
}

export function TechMarquee() {
  return (
    <div className="relative py-8 overflow-hidden border-y border-border/20">
      <div className="space-y-3">
        {/* Row 1 — left to right */}
        <Marquee
          speed={38}
          gradient
          gradientColor="var(--marquee-fade-color, hsl(240 10% 3.9%))"
          gradientWidth={80}
          pauseOnHover
        >
          {ROW_ONE.map((item) => (
            <TechChip key={item.name} item={item} />
          ))}
        </Marquee>

        {/* Row 2 — right to left */}
        <Marquee
          speed={32}
          direction="right"
          gradient
          gradientColor="var(--marquee-fade-color, hsl(240 10% 3.9%))"
          gradientWidth={80}
          pauseOnHover
        >
          {ROW_TWO.map((item) => (
            <TechChip key={item.name} item={item} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
