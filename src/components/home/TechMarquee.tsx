"use client";

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

function MarqueeRow({ items, reverse = false }: { items: typeof ROW_ONE; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`flex gap-3 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      aria-hidden="true"
    >
      {doubled.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-border/30 text-sm font-mono text-muted-foreground whitespace-nowrap select-none"
        >
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{
              background: CAT_COLORS[item.cat],
              boxShadow: `0 0 5px ${CAT_COLORS[item.cat]}`,
            }}
          />
          {item.name}
        </div>
      ))}
    </div>
  );
}

export function TechMarquee() {
  return (
    <div className="relative py-8 overflow-hidden border-y border-border/20 marquee-pause">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

      <div className="space-y-3">
        <MarqueeRow items={ROW_ONE} />
        <MarqueeRow items={ROW_TWO} reverse />
      </div>
    </div>
  );
}
