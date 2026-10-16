import React from "react";
import ReactDOM from "react-dom/client";
import {
  ArrowUpRight,
  FileText,
  Gamepad2,
  Mail,
  MapPin,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { PixelWorld } from "./pixel-world";
import "./styles.css";

type PanelId = "projects" | "resume" | "about" | "contact";

const panels: Record<
  PanelId,
  {
    year: string;
    title: string;
    kicker: string;
    copy: string;
    tags: string[];
    bullets?: string[];
    links?: Array<{ label: string; href: string }>;
  }
> = {
  projects: {
    year: "01",
    title: "Projects",
    kicker: "Shipped products & merged open source",
    copy: "Two live products, plus 11 bug fixes merged upstream into Microsoft Agent Framework, Docling, Promptfoo, Temporal and Kubernetes Agent Sandbox.",
    bullets: [
      "Pet Health App organizes pet medical records into a clear health timeline and helps owners understand their pet's health history.",
      "AI Chat Timeline adds timeline navigation, smart pinning, prompt library, and revision tools to ChatGPT and Claude.",
      "Microsoft Agent Framework (3 merged): fan-out targets deduplicated in .NET and Python; switch-case errors surface instead of routing to default.",
      "Docling (3 merged): pipes inside Markdown and AsciiDoc table cells no longer split cells.",
      "Promptfoo (2 merged): --env-file and config env honored by the Langfuse integration, prompt separator and assertion concurrency.",
      "Temporal Python SDK (2 merged): cancellation now works for local activities in retry backoff and for tasks awaiting an external workflow cancel.",
      "Kubernetes Agent Sandbox (1 merged): Python SDK sync kubectl tunnels no longer stall on unread stdout.",
    ],
    tags: ["Published", "Chrome Extension", "Open Source", "Merged"],
    links: [
      { label: "Pet Health App", href: "https://pet-agent.vercel.app/" },
      {
        label: "AI Chat Timeline",
        href: "https://chromewebstore.google.com/detail/ai-chat-timeline/ekjdciljnpfpolompiflnlglkooabpbg",
      },
      {
        label: "Agent Framework PRs",
        href: "https://github.com/microsoft/agent-framework/pulls?q=is%3Apr+author%3ARachelWanggg",
      },
      {
        label: "Docling PRs",
        href: "https://github.com/docling-project/docling/pulls?q=is%3Apr+author%3ARachelWanggg",
      },
      {
        label: "Promptfoo PRs",
        href: "https://github.com/promptfoo/promptfoo/pulls?q=is%3Apr+author%3ARachelWanggg",
      },
      {
        label: "Temporal PRs",
        href: "https://github.com/temporalio/sdk-python/pulls?q=is%3Apr+author%3ARachelWanggg",
      },
      {
        label: "Agent Sandbox #1950",
        href: "https://github.com/kubernetes-sigs/agent-sandbox/pull/1950",
      },
    ],
  },
  resume: {
    year: "02",
    title: "Resume",
    kicker: "Gen AI Software Engineer | Agents & RAG",
    copy: "Early career software engineer building multi-agent orchestration systems and RAG pipelines end to end in Python and TypeScript. MS in Computer Science at Santa Clara University.",
    bullets: [
      "Marketeq (Jun 2026 - Present), Gen AI SDE Intern: LangGraph + MCP multi-agent content pipeline with checkpoint crash recovery (-41% reprocessing time) and grounding guardrails (-57% factual corrections); Terraform + GitHub Actions on AWS, serving 30+ weekly content requests.",
      "EastSolve (Dec 2025 - May 2026), Gen AI SDE Intern: pet health record app in Next.js + FastAPI; RAG over FDA/CDC data with pgvector, Neo4j and hybrid search + cross-encoder reranking, lifting top-5 precision from 71% to 89% and cutting hallucinated responses by 34%.",
      "eKutir (Jul 2025 - Nov 2025), Gen AI SDE Intern: contract lifecycle REST APIs and event-driven state machine; ETL pipelines into Postgres processing 5K+ records weekly; retries and audit logging cut failed sync incidents by 45%.",
      "Open source: 11 merged PRs across Microsoft Agent Framework, Docling, Promptfoo, the Temporal Python SDK and Kubernetes Agent Sandbox.",
      "SCU MVP Lab (Apr - Jun 2025): LangGraph + Claude Vision QA pipeline with a feedback loop, raising acceptance rate to 96% without human review.",
      "Education: MS Computer Science, Santa Clara University (2024 - 2026); BS Mathematics, University of British Columbia (2019 - 2023).",
    ],
    tags: ["Python", "TypeScript", "LangGraph", "MCP", "RAG", "AWS"],
    links: [{ label: "Download PDF", href: "/Ruiqi_Wang_resume.pdf" }],
  },
  about: {
    year: "03",
    title: "About Rachel",
    kicker: "AI engineer building agentic systems",
    copy: "Early career software engineer with hands-on experience building multi-agent orchestration systems and retrieval-augmented generation pipelines in Python and TypeScript, from framing ambiguous asks with users to shipped APIs, agent tooling, and cloud deployments.",
    tags: ["LangGraph", "MCP", "RAG", "Next.js", "AWS"],
  },
  contact: {
    year: "04",
    title: "Contact",
    kicker: "Open for AI engineering roles",
    copy: "I am especially interested in AI product engineering, agent architecture, full-stack AI tools, and products where technical depth meets playful UX.",
    tags: ["AI Engineer", "Full-stack", "Santa Clara"],
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/ruiqi-wang-rach01",
      },
      { label: "GitHub", href: "https://github.com/RachelWanggg" },
    ],
  },
};

const projects = [
  {
    title: "Pet Health App",
    href: "https://pet-agent.vercel.app/",
    meta: "Pet health record app",
    copy: "Organizes pet medical records into a clear health timeline and helps owners understand their pet's health history and get answers to health questions.",
    tags: ["Agents", "Medical records", "Vercel"],
  },
  {
    title: "AI Chat Timeline",
    href: "https://chromewebstore.google.com/detail/ai-chat-timeline/ekjdciljnpfpolompiflnlglkooabpbg",
    meta: "Published Chrome extension",
    copy: "Adds timeline navigation, smart pinning, prompt library, and optional prompt revision for long ChatGPT and Claude conversations.",
    tags: ["Chrome Web Store", "5.0 rating", "19 users"],
  },
];

const contributions = [
  {
    repo: "Microsoft Agent Framework",
    slug: "microsoft/agent-framework",
    stars: 14164,
    prs: [
      {
        pr: 9432,
        copy: ".NET: fan-out targets are deduplicated so each one runs once.",
      },
      {
        pr: 8739,
        copy: "Python: fan-out selection results no longer run a target twice.",
      },
      {
        pr: 8490,
        copy: "Switch-case errors surface instead of silently routing to default.",
      },
    ],
  },
  {
    repo: "Docling",
    slug: "docling-project/docling",
    stars: 68986,
    prs: [
      {
        pr: 4378,
        copy: "AsciiDoc: backslash-escaped pipes stay inside their table cell.",
      },
      {
        pr: 4371,
        copy: "Markdown: every character-reference spelling of a pipe stays in its cell.",
      },
      {
        pr: 4313,
        copy: "Markdown: backslash-escaped pipes no longer split table cells.",
      },
    ],
  },
  {
    repo: "Promptfoo",
    slug: "promptfoo/promptfoo",
    stars: 26060,
    prs: [
      {
        pr: 11059,
        copy: "--env-file and config env now apply to prompt separator and assertion concurrency.",
      },
      {
        pr: 10937,
        copy: "Langfuse settings are read at fetch time, so --env-file and config env work.",
      },
    ],
  },
  {
    repo: "Temporal Python SDK",
    slug: "temporalio/sdk-python",
    stars: 1224,
    prs: [
      {
        pr: 1975,
        copy: "Cancelling the task that awaits an external workflow cancel now works.",
      },
      {
        pr: 1972,
        copy: "Cancelling a local activity during its retry backoff now takes effect.",
      },
    ],
  },
  {
    repo: "Kubernetes Agent Sandbox",
    slug: "kubernetes-sigs/agent-sandbox",
    stars: 4279,
    prs: [
      {
        pr: 1950,
        copy: "Python SDK: sync kubectl tunnels no longer stall on unread stdout.",
      },
    ],
  },
];

const mergedCount = contributions.reduce((sum, item) => sum + item.prs.length, 0);
const authorPrs = (slug: string) =>
  `https://github.com/${slug}/pulls?q=is%3Apr+author%3ARachelWanggg`;

// Star counts: render the baked-in fallback, then refresh from the public
// GitHub API (no token) at most once per 12 hours per browser.
const STARS_KEY = "oss-stars";
const STARS_TTL = 12 * 60 * 60 * 1000;
const fallbackStars = Object.fromEntries(
  contributions.map((item) => [item.slug, item.stars]),
);
const formatStars = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function readCachedStars(): Record<string, number> | null {
  try {
    const cached = JSON.parse(localStorage.getItem(STARS_KEY) ?? "null");
    if (
      cached &&
      Date.now() - cached.savedAt < STARS_TTL &&
      contributions.every(({ slug }) => slug in cached.stars)
    ) {
      return cached.stars;
    }
  } catch {
    // storage blocked or corrupted: fall through to a fresh fetch
  }
  return null;
}

function useRepoStars() {
  const [stars, setStars] = React.useState<Record<string, number>>(
    () => ({ ...fallbackStars, ...readCachedStars() }),
  );

  React.useEffect(() => {
    if (readCachedStars()) return;
    let cancelled = false;

    Promise.all(
      contributions.map(async ({ slug }) => {
        const response = await fetch(`https://api.github.com/repos/${slug}`);
        if (!response.ok) throw new Error(String(response.status));
        const repo: { stargazers_count: number } = await response.json();
        return [slug, repo.stargazers_count] as const;
      }),
    )
      .then((entries) => {
        const fresh = Object.fromEntries(entries);
        if (!cancelled) setStars(fresh);
        try {
          localStorage.setItem(
            STARS_KEY,
            JSON.stringify({ savedAt: Date.now(), stars: fresh }),
          );
        } catch {
          // storage unavailable: next visit just fetches again
        }
      })
      .catch(() => {
        // rate limited or offline: keep showing the fallback counts
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return stars;
}

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ruiqi-wang-rach01",
    icon: "in",
  },
  { label: "GitHub", href: "https://github.com/RachelWanggg", icon: "github" },
  { label: "Email", href: "mailto:rachelwangrq2@gmail.com", icon: "mail" },
];

const coreSkills = [
  "LangGraph + MCP",
  "multi-agent orchestration",
  "RAG pipelines",
  "full-stack AI",
  "AWS + Terraform",
];

function App() {
  const [activePanel, setActivePanel] = React.useState<PanelId | null>(null);
  const panel = activePanel ? panels[activePanel] : null;
  const stars = useRepoStars();

  return (
    <main className="app-shell">
      <header className="top-bar" aria-label="Portfolio navigation">
        <a className="brand-pill" href="#home" aria-label="Ruiqi Wang home">
          RW
        </a>
        <nav className="nav-links">
          {Object.entries(panels).map(([id, item]) => (
            <button
              className={activePanel === id ? "is-active" : ""}
              key={id}
              onClick={() => setActivePanel(id as PanelId)}
              type="button"
            >
              {item.title.replace("Rachel", "").trim()}
            </button>
          ))}
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="hero-main">
            <p className="eyebrow">
              <Gamepad2 size={17} /> AI engineer portfolio
            </p>
            <h1>Rachel Wang</h1>
            <p className="hero-summary">
              I build multi-agent systems, RAG pipelines, and full-stack AI
              tools that turn ambiguous asks into shipped, production-ready
              systems.
            </p>
            <div className="skill-block" aria-label="Core skills">
              <span className="skill-label">Core stack</span>
              <ul>
                {coreSkills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hero-side">
            <div className="hero-sticker">
              <img
                alt="Retro pixel sticker portrait of Rachel Wang"
                src="/ruiqi-pixel-sticker.png"
              />
            </div>
            <div className="cta-row">
              <a
                className="cta-primary"
                href="/Ruiqi_Wang_resume.pdf"
                rel="noreferrer"
                target="_blank"
              >
                <FileText size={17} /> Resume PDF
              </a>
              <button
                className="cta-secondary"
                onClick={() => setActivePanel("contact")}
                type="button"
              >
                <Mail size={17} /> Contact
              </button>
            </div>
            <div className="social-row" aria-label="Profile links">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  aria-label={label}
                  href={href}
                  key={href}
                  rel="noreferrer"
                  target="_blank"
                  title={label}
                >
                  <SocialIcon icon={Icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="game-frame" aria-label="Playable pixel portfolio map">
          <PixelWorld onOpenPanel={(id) => setActivePanel(id)} />
          <p className="map-hint">
            <Gamepad2 size={15} />
            <span className="hint-desktop">Walk with arrow keys / WASD, or click a sign</span>
            <span className="hint-touch">Tap a sign to explore</span>
          </p>
        </div>
      </section>

      <section
        className="content-section showcase"
        aria-label="Projects and open source"
      >
        <article className="showcase-card">
          <h2 className="section-title">Projects</h2>
          <ul className="showcase-list">
            {projects.map((project) => (
              <li key={project.href}>
                <a href={project.href} rel="noreferrer" target="_blank">
                  <span className="item-title">
                    {project.title} <ArrowUpRight size={16} />
                  </span>
                  <span className="item-meta">{project.meta}</span>
                  <span className="item-copy">{project.copy}</span>
                </a>
              </li>
            ))}
          </ul>
        </article>
        <article className="showcase-card showcase-card--pink oss-card">
          <div className="oss-head">
            <h2 className="section-title">Open Source</h2>
            <ul className="oss-stats" aria-label="Open source summary">
              <li>
                <strong>{mergedCount}</strong> merged PRs
              </li>
              <li>
                <strong>{contributions.length}</strong> projects
              </li>
            </ul>
          </div>
          <ul className="oss-grid">
            {contributions.map((item) => (
              <li className="oss-repo" key={item.slug}>
                <div className="oss-repo-head">
                  <a
                    className="oss-repo-name"
                    href={authorPrs(item.slug)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {item.repo} <ArrowUpRight size={15} />
                  </a>
                  <a
                    aria-label={`${stars[item.slug]} GitHub stars`}
                    className="oss-stars-badge"
                    href={`https://github.com/${item.slug}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Star size={12} />
                    {formatStars.format(stars[item.slug]).toLowerCase()}
                  </a>
                </div>
                <ul className="oss-prs">
                  {item.prs.map((pr) => (
                    <li key={pr.pr}>
                      <a
                        href={`https://github.com/${item.slug}/pull/${pr.pr}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <span className="item-pr">#{pr.pr}</span>
                        <span className="item-copy">{pr.copy}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {panel ? (
        <aside className="modal-backdrop" aria-label={`${panel.title} details`}>
          <div className="modal-card">
            <button
              aria-label="Close panel"
              className="icon-button"
              onClick={() => setActivePanel(null)}
              type="button"
            >
              <X size={20} />
            </button>
            <div className="modal-sticker">
              <Sparkles size={22} />
              <span>{panel.year}</span>
            </div>
            <h2>{panel.title}</h2>
            <p className="modal-kicker">
              <MapPin size={17} /> {panel.kicker}
            </p>
            <p>{panel.copy}</p>
            {panel.bullets ? (
              <ul className="resume-list">
                {panel.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
            <ul className="tag-list">
              {panel.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            {panel.links ? (
              <div className="modal-links">
                {panel.links.map((link) => (
                  <a
                    href={link.href}
                    key={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ArrowUpRight size={16} /> {link.label}
                  </a>
                ))}
              </div>
            ) : null}
            {activePanel === "contact" ? (
              <a className="mail-link" href="mailto:rachelwangrq2@gmail.com">
                <Mail size={17} /> rachelwangrq2@gmail.com
              </a>
            ) : null}
          </div>
        </aside>
      ) : null}
    </main>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "in") {
    return <span className="linkedin-mark">in</span>;
  }

  if (icon === "github") {
    return (
      <svg aria-hidden="true" className="github-mark" viewBox="0 0 24 24">
        <path
          d="M12 2.4c-5.4 0-9.8 4.4-9.8 9.8 0 4.3 2.8 8 6.7 9.3.5.1.7-.2.7-.5v-1.8c-2.7.6-3.3-1.2-3.3-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.6.3-1.1.6-1.3-2.2-.2-4.5-1.1-4.5-4.8 0-1.1.4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.5 1 2.6 0 3.7-2.3 4.6-4.5 4.8.4.3.7.9.7 1.9V21c0 .3.2.6.7.5 3.9-1.3 6.7-5 6.7-9.3 0-5.4-4.4-9.8-9.8-9.8Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return <Mail size={17} />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
